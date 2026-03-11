import { useState, useEffect, useRef } from "react";
import { Pencil, Check, Camera, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PHOTO_SETS: Record<string, { id: string; url: string }[]> = {
  partner: [
    { id: "p1", url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&h=625&fit=crop&q=80" },
    { id: "p2", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=625&fit=crop&q=80" },
    { id: "p3", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=625&fit=crop&q=80" },
    { id: "p4", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=625&fit=crop&q=80" },
    { id: "p5", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=625&fit=crop&q=80" },
    { id: "p6", url: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&h=625&fit=crop&q=80" },
  ],
  mom: [
    { id: "m1", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=625&fit=crop&q=80" },
    { id: "m2", url: "https://images.unsplash.com/photo-1581403341630-a6e0b9d2d257?w=500&h=625&fit=crop&q=80" },
    { id: "m3", url: "https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=500&h=625&fit=crop&q=80" },
    { id: "m4", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=625&fit=crop&q=80" },
    { id: "m5", url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&h=625&fit=crop&q=80" },
    { id: "m6", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=625&fit=crop&q=80" },
  ],
  dad: [
    { id: "d1", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=625&fit=crop&q=80" },
    { id: "d2", url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=625&fit=crop&q=80" },
    { id: "d3", url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=625&fit=crop&q=80" },
    { id: "d4", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=625&fit=crop&q=80" },
    { id: "d5", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=625&fit=crop&q=80" },
    { id: "d6", url: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&h=625&fit=crop&q=80" },
  ],
  sister: [
    { id: "s1", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=625&fit=crop&q=80" },
    { id: "s2", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=625&fit=crop&q=80" },
    { id: "s3", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=625&fit=crop&q=80" },
    { id: "s4", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=625&fit=crop&q=80" },
    { id: "s5", url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=625&fit=crop&q=80" },
    { id: "s6", url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&h=625&fit=crop&q=80" },
  ],
  brother: [
    { id: "b1", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=625&fit=crop&q=80" },
    { id: "b2", url: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&h=625&fit=crop&q=80" },
    { id: "b3", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=625&fit=crop&q=80" },
    { id: "b4", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=625&fit=crop&q=80" },
    { id: "b5", url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=500&h=625&fit=crop&q=80" },
    { id: "b6", url: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=500&h=625&fit=crop&q=80" },
  ],
  friend: [
    { id: "f1", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=625&fit=crop&q=80" },
    { id: "f2", url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&h=625&fit=crop&q=80" },
    { id: "f3", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=625&fit=crop&q=80" },
    { id: "f4", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=625&fit=crop&q=80" },
    { id: "f5", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=625&fit=crop&q=80" },
    { id: "f6", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=625&fit=crop&q=80" },
  ],
  coworker: [
    { id: "c1", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=625&fit=crop&q=80" },
    { id: "c2", url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=625&fit=crop&q=80" },
    { id: "c3", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=625&fit=crop&q=80" },
    { id: "c4", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=625&fit=crop&q=80" },
    { id: "c5", url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=625&fit=crop&q=80" },
    { id: "c6", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=625&fit=crop&q=80" },
  ],
};

const LABEL_TO_KEY: Record<string, string> = {
  partner: "partner", husband: "partner", wife: "partner", boyfriend: "partner", girlfriend: "partner", babe: "partner", bae: "partner",
  mom: "mom", mother: "mom", mama: "mom", mommy: "mom",
  dad: "dad", father: "dad", papa: "dad", daddy: "dad",
  sister: "sister", sis: "sister",
  brother: "brother", bro: "brother",
  sibling: "friend",
  "best friend": "friend", friend: "friend", bestie: "friend", bff: "friend",
  "co-worker": "coworker", coworker: "coworker", colleague: "coworker", boss: "coworker",
};

function getPhotosForLabel(label: string): { id: string; url: string }[] {
  const lower = label.toLowerCase().trim();
  const key = LABEL_TO_KEY[lower];
  if (key && PHOTO_SETS[key]) return PHOTO_SETS[key];
  for (const [keyword, setKey] of Object.entries(LABEL_TO_KEY)) {
    if (lower.includes(keyword)) return PHOTO_SETS[setKey];
  }
  return PHOTO_SETS.partner;
}

interface CardEditButtonProps {
  title: string;
  onRename?: (newTitle: string) => void;
  onSaveConnection?: (newTitle: string, newImage: string, email?: string) => void;
  currentImage?: string;
  currentEmail?: string;
  maxLength?: number;
  isConnection?: boolean;
  isNewConnection?: boolean;
}

const CardEditButton = ({
  title, onRename, onSaveConnection, currentImage, currentEmail,
  maxLength, isConnection, isNewConnection,
}: CardEditButtonProps) => {
  const [editing, setEditing] = useState(isNewConnection || false);
  const [value, setValue] = useState(title);
  const [email, setEmail] = useState(currentEmail || "");
  const [selectedPhoto, setSelectedPhoto] = useState(currentImage || "");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close edit panel when clicking outside
  useEffect(() => {
    if (!editing) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setEditing(false);
      }
    };
    // Use setTimeout to avoid the same click that opened the panel from closing it
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing]);

  useEffect(() => {
    if (editing) {
      setValue(title);
      setSelectedPhoto(currentImage || "");
      setEmail(currentEmail || "");
    }
  }, [editing, title, currentImage, currentEmail]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Please sign in to upload photos");
        return;
      }

      const ext = file.name.split(".").pop() || "jpg";
      const filePath = `${user.id}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("connection-photos")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("connection-photos")
        .getPublicUrl(filePath);

      setSelectedPhoto(publicUrl);
      toast.success("Photo uploaded!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload photo");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (editing && isConnection) {
    const photos = getPhotosForLabel(value || title);
    return (
      <div
        ref={panelRef}
        className="absolute inset-0 z-20 flex flex-col rounded-2xl p-4 overflow-y-auto"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Email field — only for new or editable connections */}
        <label className="text-[11px] font-medium text-white/60 mb-1 tracking-wide uppercase">Their Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm bg-white/90 text-gray-900 outline-none mb-3"
          placeholder="name@example.com"
          type="email"
          disabled={!!currentEmail && !isNewConnection}
          onKeyDown={(e) => {
            if (e.key === "Escape") setEditing(false);
          }}
        />

        {/* Label field */}
        <label className="text-[11px] font-medium text-white/60 mb-1 tracking-wide uppercase">Display Label</label>
        <input
          value={value}
          maxLength={maxLength || 20}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm bg-white/90 text-gray-900 outline-none mb-3"
          placeholder="What do you call them?"
          autoFocus={!isNewConnection}
          onKeyDown={(e) => {
            if (e.key === "Escape") setEditing(false);
          }}
        />

        {/* Photo grid */}
        <label className="text-[11px] font-medium text-white/60 mb-1.5 tracking-wide uppercase">Photo</label>
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          <button
            className="relative rounded-lg overflow-hidden aspect-square flex flex-col items-center justify-center gap-1 border border-dashed border-white/30"
            style={{ background: "rgba(255,255,255,0.08)" }}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="w-5 h-5 text-white/70 animate-spin" />
            ) : (
              <>
                <Camera className="w-5 h-5 text-white/70" />
                <span className="text-[9px] text-white/50 font-medium uppercase tracking-wide">Upload</span>
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          {photos.map((photo) => {
            const isSelected = selectedPhoto === photo.url;
            return (
              <button
                key={photo.id}
                className="relative rounded-lg overflow-hidden aspect-square"
                onClick={() => setSelectedPhoto(photo.url)}
              >
                <img src={photo.url} alt={photo.id} className="w-full h-full object-cover" />
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(45,104,112,0.45)" }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#2D6870" }}>
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}

          {selectedPhoto && !photos.some((p) => p.url === selectedPhoto) && (
            <button
              className="relative rounded-lg overflow-hidden aspect-square"
              onClick={() => {}}
            >
              <img src={selectedPhoto} alt="Your photo" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(45,104,112,0.45)" }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#2D6870" }}>
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Save button */}
        <button
          className="w-full rounded-lg py-2 text-sm font-semibold text-white mt-auto"
          style={{ background: "#2D6870" }}
          onClick={() => {
            const finalLabel = value.trim() || title;
            const finalPhoto = selectedPhoto || currentImage || "";
            const finalEmail = email.trim();

            if (finalEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(finalEmail)) {
              toast.error("Please enter a valid email address");
              return;
            }

            onSaveConnection?.(finalLabel, finalPhoto, finalEmail || undefined);
            setEditing(false);
          }}
        >
          Save
        </button>
      </div>
    );
  }

  if (editing) {
    return (
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-2xl p-4"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          value={value}
          maxLength={maxLength}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm bg-white/90 text-gray-900 outline-none"
          placeholder="Card name"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") { onRename?.(value.trim() || title); setEditing(false); }
            else if (e.key === "Escape") setEditing(false);
          }}
          onBlur={() => { onRename?.(value.trim() || title); setEditing(false); }}
        />
      </div>
    );
  }

  return (
    <button
      className="absolute z-10 flex items-center justify-center rounded-full"
      style={{ top: 8, right: 8, width: 28, height: 28, background: "rgba(255,255,255,0.8)" }}
      onClick={(e) => { e.stopPropagation(); setEditing(true); }}
    >
      <Pencil className="w-[14px] h-[14px]" style={{ color: "#2D6870" }} />
    </button>
  );
};

export default CardEditButton;
