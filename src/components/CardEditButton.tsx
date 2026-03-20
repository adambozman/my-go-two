import { useState, useEffect, useRef } from "react";
import { Pencil, Check, Camera, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { STOCK_PHOTOS, getPhotosForLabel } from "@/data/stockPhotos";
import { makeStorageRef, resolveStorageUrl } from "@/lib/storageRefs";

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
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [email, setEmail] = useState(currentEmail || "");
  const [selectedPhoto, setSelectedPhoto] = useState(currentImage || "");
  const [resolvedSelectedPhoto, setResolvedSelectedPhoto] = useState(currentImage || "");
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

  useEffect(() => {
    let cancelled = false;

    const loadSelectedPhoto = async () => {
      const resolved = await resolveStorageUrl(selectedPhoto);
      if (!cancelled) {
        setResolvedSelectedPhoto(resolved || "");
      }
    };

    loadSelectedPhoto();

    return () => {
      cancelled = true;
    };
  }, [selectedPhoto]);

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

      setSelectedPhoto(makeStorageRef("connection-photos", filePath));
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
              <img src={resolvedSelectedPhoto} alt="Your photo" className="w-full h-full object-cover" />
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
