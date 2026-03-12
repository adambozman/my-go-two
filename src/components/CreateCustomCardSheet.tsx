import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus, X, Loader2, Sparkles, Image as ImageIcon, RefreshCw } from "lucide-react";
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
import { usePersonalization } from "@/contexts/PersonalizationContext";
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

const STEPS = ["title", "fields", "image", "review"] as const;
type Step = (typeof STEPS)[number];

const CreateCustomCardSheet = ({
  open,
  onOpenChange,
  category,
  categoryLabel,
  onCreated,
}: CreateCustomCardSheetProps) => {
  const { user } = useAuth();
  const { gender } = usePersonalization();
  const [step, setStep] = useState<Step>("title");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [generatingImage, setGeneratingImage] = useState(false);
  const [fields, setFields] = useState<Field[]>([]);
  const [generatingFields, setGeneratingFields] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newOptionText, setNewOptionText] = useState<Record<number, string>>({});

  const reset = () => {
    setStep("title");
    setName("");
    setImageUrl("");
    setFields([]);
    setNewOptionText({});
    setGeneratingFields(false);
    setGeneratingImage(false);
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const generateFields = async () => {
    setGeneratingFields(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-card-fields", {
        body: { title: name, category: categoryLabel },
      });
      if (error) throw error;
      if (data?.fields) {
        setFields(data.fields.map((f: any) => ({
          name: f.name,
          type: f.type || "text",
          placeholder: f.placeholder || `Enter ${f.name.toLowerCase()}...`,
          options: f.options || undefined,
        })));
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Couldn't generate fields. Add them manually.");
      setFields([{ name: "", type: "text", placeholder: "" }]);
    } finally {
      setGeneratingFields(false);
    }
  };

  const generateImage = async () => {
    setGeneratingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-card-image", {
        body: { prompt: name },
      });
      if (error) throw error;
      if (data?.image_url) {
        setImageUrl(data.image_url);
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Image generation failed. You can skip this step.");
    } finally {
      setGeneratingImage(false);
    }
  };

  // After entering title, auto-generate fields and image in parallel
  const handleTitleNext = async () => {
    setStep("fields");
    // Fire both in parallel
    generateFields();
    generateImage();
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

  const nextStep = () => {
    if (step === "title") {
      handleTitleNext();
      return;
    }
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const prevStep = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  const canProceed = () => {
    switch (step) {
      case "title":
        return name.trim().length > 0;
      case "fields":
        return !generatingFields && fields.some((f) => f.name.trim());
      case "image":
        return !generatingImage;
      case "review":
        return true;
    }
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
                      Name your card — AI will set everything up for you.
                    </p>
                  </div>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sexy Time, Comfort Foods, Dream Trips..."
                    className="rounded-xl text-lg py-6"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && name.trim()) {
                        e.preventDefault();
                        nextStep();
                      }
                    }}
                  />
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
                      {generatingFields ? "Setting up your card..." : "Review your fields"}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {generatingFields
                        ? "AI is creating the perfect fields for you."
                        : "Edit, add, or remove fields as you like."}
                    </p>
                  </div>

                  {generatingFields ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                      <div className="relative">
                        <Loader2
                          className="h-10 w-10 animate-spin"
                          style={{ color: "var(--swatch-teal)" }}
                        />
                        <Sparkles
                          className="h-4 w-4 absolute -top-1 -right-1"
                          style={{ color: "var(--swatch-teal)" }}
                        />
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Generating fields for "{name}"...
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
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
                              placeholder="Field name"
                              className="rounded-xl flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeField(i)}
                              className="flex-shrink-0 h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                            </Button>
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
                                <SelectItem value="select">Dropdown</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {field.type === "select" && (
                            <div className="space-y-2 pl-2">
                              <div className="flex flex-wrap gap-1.5">
                                {(field.options || []).map((opt, oi) => (
                                  <span
                                    key={oi}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
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

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={addField}
                          className="rounded-xl flex-1 gap-2"
                        >
                          <Plus className="h-4 w-4" /> Add Field
                        </Button>
                        <Button
                          variant="outline"
                          onClick={generateFields}
                          className="rounded-xl gap-2"
                        >
                          <RefreshCw className="h-4 w-4" /> Regenerate
                        </Button>
                      </div>
                    </div>
                  )}
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
                      Cover Image
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {generatingImage
                        ? "AI is creating your cover image..."
                        : imageUrl
                        ? "Here's your card cover. Regenerate if you'd like a different one."
                        : "Generate a cover image for your card."}
                    </p>
                  </div>

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
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                        <p className="text-white/70 text-sm">Generating...</p>
                      </div>
                    ) : imageUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imageUrl}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3
                            className="text-white font-semibold text-sm drop-shadow"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                          >
                            {name}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                        <ImageIcon className="h-10 w-10 text-white/40" />
                        <p className="text-white/60 text-sm text-center px-4">
                          No image yet
                        </p>
                      </div>
                    )}
                  </div>

                  {!generatingImage && (
                    <div className="flex justify-center">
                      <Button
                        variant="outline"
                        onClick={generateImage}
                        className="rounded-xl gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        {imageUrl ? "Regenerate Image" : "Generate Image"}
                      </Button>
                    </div>
                  )}
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
                      Ready to add "{name}" to {categoryLabel}.
                    </p>
                  </div>

                  {/* Card preview */}
                  <div className="max-w-[240px] mx-auto">
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
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
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
                    <Label className="text-xs text-muted-foreground">Fields</Label>
                    {fields
                      .filter((f) => f.name.trim())
                      .map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
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
                style={{ background: "var(--swatch-teal)" }}
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
                style={{ background: "var(--swatch-teal)" }}
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
