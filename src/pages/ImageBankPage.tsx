import { useState, useRef, type ChangeEvent } from "react";
import { ArrowLeft, ImagePlus, Trash2, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useImageBank } from "@/hooks/useImageBank";
import { toast } from "sonner";

const TAGS = ["hero", "lifestyle", "product", "brand", "general"] as const;

export default function ImageBankPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("general");
  const [filterTag, setFilterTag] = useState<string | undefined>(undefined);
  const { images, loading, refetch } = useImageBank(filterTag);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("image-bank")
          .upload(path, file, { contentType: file.type });

        if (uploadError) {
          toast.error(`Upload failed: ${uploadError.message}`);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("image-bank")
          .getPublicUrl(path);

        await supabase.from("image_bank").insert({
          label: file.name.replace(/\.[^.]+$/, ""),
          tag: selectedTag,
          storage_path: path,
          url: urlData.publicUrl,
        });
      }
      toast.success("Uploaded");
      refetch();
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleDelete = async (id: string, storagePath: string) => {
    await supabase.storage.from("image-bank").remove([storagePath]);
    await supabase.from("image_bank").delete().eq("id", id);
    refetch();
    toast.success("Deleted");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--swatch-cream-light)", fontFamily: "'Jost', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-full hover:bg-black/5">
          <ArrowLeft className="w-5 h-5" style={{ color: "var(--swatch-teal)" }} />
        </button>
        <h1 className="text-[20px] font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
          Image Bank
        </h1>
        <div className="flex-1" />
        <label
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] uppercase tracking-[0.08em] cursor-pointer"
          style={{ background: "var(--swatch-teal)", color: "#fff" }}
        >
          <ImagePlus className="w-4 h-4" />
          {uploading ? "Uploading..." : "Upload"}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Tag selector for upload + filter */}
      <div className="px-5 py-3 flex flex-wrap gap-2 items-center">
        <Tag className="w-3.5 h-3.5" style={{ color: "var(--swatch-antique-coin)" }} />
        <span className="text-[10px] uppercase tracking-[0.1em] mr-1" style={{ color: "var(--swatch-antique-coin)" }}>Upload as:</span>
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTag(t)}
            className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.08em] transition-colors"
            style={{
              background: selectedTag === t ? "var(--swatch-teal)" : "rgba(0,0,0,0.04)",
              color: selectedTag === t ? "#fff" : "var(--swatch-teal)",
            }}
          >
            {t}
          </button>
        ))}

        <span className="mx-2 text-[10px]" style={{ color: "var(--swatch-antique-coin)" }}>|</span>
        <span className="text-[10px] uppercase tracking-[0.1em] mr-1" style={{ color: "var(--swatch-antique-coin)" }}>Filter:</span>
        <button
          onClick={() => setFilterTag(undefined)}
          className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.08em] transition-colors"
          style={{
            background: !filterTag ? "var(--swatch-cedar-grove)" : "rgba(0,0,0,0.04)",
            color: !filterTag ? "#fff" : "var(--swatch-teal)",
          }}
        >
          All
        </button>
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setFilterTag(t)}
            className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.08em] transition-colors"
            style={{
              background: filterTag === t ? "var(--swatch-cedar-grove)" : "rgba(0,0,0,0.04)",
              color: filterTag === t ? "#fff" : "var(--swatch-teal)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Image grid */}
      <div className="px-5 pb-8">
        {loading ? (
          <p className="text-[13px] py-12 text-center" style={{ color: "var(--swatch-antique-coin)" }}>Loading...</p>
        ) : images.length === 0 ? (
          <p className="text-[13px] py-12 text-center" style={{ color: "var(--swatch-antique-coin)" }}>No images yet. Upload some above.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img) => (
              <div key={img.id} className="group relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-2.5">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between w-full">
                    <div>
                      <p className="text-[11px] font-medium text-white truncate">{img.label}</p>
                      <span className="text-[8px] uppercase tracking-[0.1em] text-white/70">{img.tag}</span>
                    </div>
                    <button
                      onClick={() => handleDelete(img.id, img.storage_path)}
                      className="w-7 h-7 rounded-full flex items-center justify-center bg-red-500/80 hover:bg-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
