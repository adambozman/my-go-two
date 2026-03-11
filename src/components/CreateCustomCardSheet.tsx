import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus, X, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Field {
  name: string;
  type: "text" | "select";
  placeholder?: string;
  options?: string[];
}

interface CreateCustomCardSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  categoryLabel: string;
  onCreated: () => void;
}

const STEPS = ["title", "image", "fields", "review"] as const;
type Step = (typeof STEPS)[number];

const CreateCustomCardSheet = ({
  open,
  onOpenChange,
  category,
  categoryLabel,
  onCreated,
}: CreateCustomCardSheetProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>("title");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [fields, setFields] = useState<Field[]>([
    { name: "", type: "text", placeholder: "" },
  ]);
  const [saving, setSaving] = useState(false);

  // New select option state
  const [newOptionText, setNewOptionText] = useState<Record<number, string>>({});

  const reset = () => {
    setStep("title");
    setName("");
    setImageUrl("");
    setImagePrompt("");
    setFields([{ name: "", type: "text", placeholder: "" }]);
    setNewOptionText({});
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const generateImage = async () => {
    const prompt = imagePrompt.trim() || name;
    if (!prompt) return;
    setGeneratingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-card-image", {
        body: { prompt },
      });
      if (error) throw error;
      if (data?.image_url) {
        setImageUrl(data.image_url);
        toast.success("Image generated!");
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to generate image. Try again.");
    } finally {
      setGeneratingImage(false);
    }
  };

  const addField = () => {
    setFields([...fields, { name: "", type: "text", placeholder: "" }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, updates: Partial<Field>) => {
    setFields(fields.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  };

  const addOption = (fieldIndex: number) => {
    const text = (newOptionText[fieldIndex] || "").trim();
    if (!text) return;
    const field = fields[fieldIndex];
    updateField(fieldIndex, { options: [...(field.options || []), text] });
    setNewOptionText({ ...newOptionText, [fieldIndex]: "" });
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const field = fields[fieldIndex];
    updateField(fieldIndex, {
      options: (field.options || []).filter((_, i) => i !== optionIndex),
    });
  };

  const handleSave = async () => {
    if (!user || !name.trim()) return;
    setSaving(true);
    try {
      const validFields = fields
        .filter((f) => f.name.trim())
        .map((f) => ({
          name: f.name.trim(),
          type: f.type,
          placeholder: f.placeholder || `Enter ${f.name.toLowerCase()}...`,
          ...(f.type === "select" && f.options ? { options: f.options } : {}),
        }));

      const { error } = await supabase.from("custom_templates").insert({
        user_id: user.id,
        category,
        name: name.trim(),
        image_url: imageUrl || null,
        default_fields: validFields,
      });

      if (error) throw error;
      toast.success(`"${name}" added to ${categoryLabel}!`);
      handleClose();
      onCreated();
    } catch (e: any) {
      toast.error(e.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case "title":
        return name.trim().length > 0;
      case "image":
        return true; // image is optional
      case "fields":
        return fields.some((f) => f.name.trim());
      case "review":
        return true;
    }
  };

  const nextStep = () => {
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const prevStep = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  const stepIndex = STEPS.indexOf(step);

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/30">
            <div className="flex items-center justify-between">
              <SheetTitle
                className="text-lg"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "var(--swatch-viridian-odyssey)",
                }}
              >
                Add to {categoryLabel}
              </SheetTitle>
              <div className="flex gap-1">
                {STEPS.map((s, i) => (
                  <div
                    key={s}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i <= stepIndex ? 24 : 12,
                      background:
                        i <= stepIndex
                          ? "var(--swatch-teal)"
                          : "var(--swatch-sand-mid)",
                    }}
                  />
                ))}
              </div>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <AnimatePresence mode="wait">
              {step === "title" && (
                <motion.div
                  key="title"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2
                      className="text-xl font-semibold mb-1"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "var(--swatch-viridian-odyssey)",
                      }}
                    >
                      What do you want to track?
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Give your card a name — anything you want your partner to know.
                    </p>
                  </div>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sexy Time, Comfort Foods, Dream Trips..."
                    className="rounded-xl text-lg py-6"
                    autoFocus
                  />
                </motion.div>
              )}

              {step === "image" && (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2
                      className="text-xl font-semibold mb-1"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "var(--swatch-viridian-odyssey)",
                      }}
                    >
                      Choose a cover image
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Describe the vibe and we'll generate one for you.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        placeholder={`e.g. "${name}" aesthetic`}
                        className="rounded-xl flex-1"
                      />
                      <Button
                        onClick={generateImage}
                        disabled={generatingImage}
                        className="rounded-xl gap-2"
                        style={{
                          background: "var(--swatch-teal)",
                        }}
                      >
                        {generatingImage ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        Generate
                      </Button>
                    </div>

                    {/* Image preview */}
                    <div
                      className="aspect-[4/5] max-w-[280px] mx-auto rounded-2xl overflow-hidden"
                      style={{
                        background: imageUrl
                          ? undefined
                          : "linear-gradient(135deg, var(--swatch-viridian-odyssey), var(--swatch-teal))",
                      }}
                    >
                      {generatingImage ? (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                          <Loader2
                            className="h-8 w-8 animate-spin text-white"
                          />
                          <p className="text-white/70 text-sm">Generating...</p>
                        </div>
                      ) : imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                          <ImageIcon className="h-10 w-10 text-white/40" />
                          <p className="text-white/60 text-sm text-center px-4">
                            Generate an image or skip for a default card
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "fields" && (
                <motion.div
                  key="fields"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2
                      className="text-xl font-semibold mb-1"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "var(--swatch-viridian-odyssey)",
                      }}
                    >
                      What info should it capture?
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Add fields your partner can fill in.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {fields.map((field, i) => (
                      <div
                        key={i}
                        className="card-design-neumorph p-4 space-y-3"
                      >
                        <div className="flex items-center gap-2">
                          <Input
                            value={field.name}
                            onChange={(e) =>
                              updateField(i, { name: e.target.value })
                            }
                            placeholder="Field name (e.g. Preferred Time)"
                            className="rounded-xl flex-1"
                          />
                          {fields.length > 1 && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeField(i)}
                              className="flex-shrink-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Label className="text-xs text-muted-foreground w-12">
                            Type
                          </Label>
                          <Select
                            value={field.type}
                            onValueChange={(v: "text" | "select") => {
                              updateField(i, {
                                type: v,
                                options: v === "select" ? field.options || [] : undefined,
                              });
                            }}
                          >
                            <SelectTrigger className="rounded-xl h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text input</SelectItem>
                              <SelectItem value="select">
                                Dropdown (choices)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {field.type === "select" && (
                          <div className="space-y-2 pl-2">
                            <Label className="text-xs text-muted-foreground">
                              Options
                            </Label>
                            <div className="flex flex-wrap gap-2">
                              {(field.options || []).map((opt, oi) => (
                                <span
                                  key={oi}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs"
                                  style={{
                                    background: "rgba(45,104,112,0.1)",
                                    color: "var(--swatch-teal)",
                                  }}
                                >
                                  {opt}
                                  <button
                                    onClick={() => removeOption(i, oi)}
                                    className="hover:opacity-70"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                value={newOptionText[i] || ""}
                                onChange={(e) =>
                                  setNewOptionText({
                                    ...newOptionText,
                                    [i]: e.target.value,
                                  })
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addOption(i);
                                  }
                                }}
                                placeholder="Add option..."
                                className="rounded-xl h-8 text-sm flex-1"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addOption(i)}
                                className="rounded-xl h-8"
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    <Button
                      variant="outline"
                      onClick={addField}
                      className="rounded-xl w-full gap-2"
                    >
                      <Plus className="h-4 w-4" /> Add Field
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2
                      className="text-xl font-semibold mb-1"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        color: "var(--swatch-viridian-odyssey)",
                      }}
                    >
                      Looking good!
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Here's a preview of your card.
                    </p>
                  </div>

                  {/* Card preview */}
                  <div className="max-w-[280px] mx-auto">
                    <div
                      className="rounded-2xl overflow-hidden ring-2 ring-primary shadow-2xl"
                      style={{ aspectRatio: "4/5" }}
                    >
                      <div className="relative w-full h-full">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full"
                            style={{
                              background:
                                "linear-gradient(135deg, var(--swatch-viridian-odyssey), var(--swatch-teal))",
                            }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3
                            className="text-white font-semibold text-sm leading-tight drop-shadow"
                            style={{
                              fontFamily: "'Cormorant Garamond', serif",
                            }}
                          >
                            {name}
                          </h3>
                          <p className="text-white/70 text-xs mt-1">
                            {fields.filter((f) => f.name.trim()).length} fields
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fields summary */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Fields
                    </Label>
                    {fields
                      .filter((f) => f.name.trim())
                      .map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ background: "var(--swatch-teal)" }}
                          />
                          <span>{f.name}</span>
                          <span className="text-muted-foreground text-xs">
                            ({f.type === "select"
                              ? `${(f.options || []).length} options`
                              : "text"})
                          </span>
                        </div>
                      ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border/30 flex items-center gap-3">
            {stepIndex > 0 && (
              <Button
                variant="ghost"
                onClick={prevStep}
                className="rounded-full gap-1"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            )}
            <div className="flex-1" />
            {step === "review" ? (
              <Button
                onClick={handleSave}
                disabled={saving}
                className="rounded-full gap-2 px-6"
                style={{
                  background: "var(--swatch-teal)",
                }}
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Create Card
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="rounded-full gap-1 px-6"
                style={{
                  background: "var(--swatch-teal)",
                }}
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateCustomCardSheet;
