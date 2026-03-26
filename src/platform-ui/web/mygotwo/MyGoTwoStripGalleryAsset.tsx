import { useCallback, useEffect, useMemo, useState } from "react";
import { Image as ImageIcon, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { OVERRIDE_CHANGED_EVENT, setImageUrl } from "@/lib/imageOverrides";
import { MYGOTWO_STRIP_GALLERY_IMAGES } from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

type BankPhoto = {
  id: string;
  image_url: string;
  filename: string | null;
};

function stripImageKey(id: string) {
  return `mygotwo-strip-${id}`;
}

export default function MyGoTwoStripGalleryAsset() {
  const isDev = import.meta.env.DEV;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedStripId, setSelectedStripId] = useState<string | null>(null);
  const [loadingBank, setLoadingBank] = useState(false);
  const [loadingOverrides, setLoadingOverrides] = useState(false);
  const [bankPhotos, setBankPhotos] = useState<BankPhoto[]>([]);
  const [imageOverrides, setImageOverrides] = useState<Record<string, string>>({});

  const strips = useMemo(() => MYGOTWO_STRIP_GALLERY_IMAGES, []);

  const loadOverrides = useCallback(async () => {
    setLoadingOverrides(true);
    const keys = strips.map((strip) => stripImageKey(strip.id));
    const { data } = await supabase
      .from("category_images")
      .select("category_key, image_url")
      .eq("gender", "dev")
      .in("category_key", keys);

    const nextOverrides: Record<string, string> = {};
    for (const row of data ?? []) {
      nextOverrides[row.category_key] = row.image_url;
    }

    setImageOverrides(nextOverrides);
    setLoadingOverrides(false);
  }, [strips]);

  const loadBank = useCallback(async () => {
    setLoadingBank(true);
    const { data } = await supabase
      .from("category_bank_photos")
      .select("id, image_url, filename")
      .order("created_at", { ascending: false });
    setBankPhotos(data ?? []);
    setLoadingBank(false);
  }, []);

  useEffect(() => {
    if (!isDev) return;
    void loadOverrides();
    void loadBank();
  }, [isDev, loadBank, loadOverrides]);

  useEffect(() => {
    if (!isDev) return;

    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail || {};
      const imageKey = typeof detail.imageKey === "string" ? detail.imageKey : "";
      const url = typeof detail.url === "string" ? detail.url : "";
      if (!imageKey.startsWith("mygotwo-strip-")) return;

      setImageOverrides((current) => {
        if (!url) {
          const next = { ...current };
          delete next[imageKey];
          return next;
        }
        return { ...current, [imageKey]: url };
      });
    };

    window.addEventListener(OVERRIDE_CHANGED_EVENT, handler);
    return () => window.removeEventListener(OVERRIDE_CHANGED_EVENT, handler);
  }, [isDev]);

  const assignPhoto = useCallback(
    async (photoUrl: string) => {
      if (!selectedStripId) return;
      await setImageUrl(stripImageKey(selectedStripId), photoUrl, "dev");
      setSelectedStripId(null);
    },
    [selectedStripId],
  );

  return (
    <section
      aria-label="Strip gallery asset"
      className="flex flex-1 items-center justify-center overflow-hidden px-3 py-8 md:px-4 md:py-10"
    >
      <div
        className="overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.58)] shadow-[0_18px_44px_rgba(41,32,24,0.16)]"
        style={{
          width: "95vw",
          height: "95vh",
          maxWidth: "1480px",
          maxHeight: "900px",
        }}
      >
        <div
          className="flex h-full w-full items-stretch gap-[6px] overflow-hidden"
          onMouseLeave={() => setHoveredId(null)}
        >
          {strips.map((strip) => {
            const isHovered = strip.id === hoveredId;
            const imageKey = stripImageKey(strip.id);
            const imageUrl = imageOverrides[imageKey] || strip.image;

            return (
              <div
                key={strip.id}
                aria-label={`Strip ${strip.id}`}
                onMouseEnter={() => setHoveredId(strip.id)}
                className="relative h-full shrink-0 overflow-hidden transition-[flex-grow,filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  flexBasis: 0,
                  flexGrow: isHovered ? 3.6 : hoveredId ? 0.52 : 1,
                  minWidth: isHovered ? "88px" : "18px",
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: `${strip.align ?? "50%"} center`,
                  filter: isHovered ? "saturate(1.04) contrast(1.02)" : "saturate(0.96)",
                  transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                {isDev ? (
                  <button
                    type="button"
                    aria-label={`Edit strip ${strip.id}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedStripId(strip.id);
                    }}
                    className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-[rgba(248,242,233,0.86)] text-[#2c2925] shadow-[0_6px_18px_rgba(41,32,24,0.14)] backdrop-blur-[12px]"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </button>
                ) : null}
                {strip.label ? (
                  <span
                    className="pointer-events-none absolute bottom-4 left-1/2 z-10 text-[12px] font-medium uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.42)]"
                    style={{
                      writingMode: "vertical-rl",
                      transform: "translateX(-50%) rotate(180deg)",
                    }}
                  >
                    {strip.label}
                  </span>
                ) : null}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[1px] bg-white/85"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 right-0 w-[1px] bg-white/85"
                />
              </div>
            );
          })}
        </div>
      </div>
      {isDev && selectedStripId ? (
        <div className="absolute bottom-6 right-6 z-30 w-[min(560px,calc(100vw-2rem))] rounded-[24px] border border-[rgba(255,255,255,0.58)] bg-[rgba(248,242,233,0.94)] p-4 shadow-[0_24px_60px_rgba(41,32,24,0.2)] backdrop-blur-[18px]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#2c2925]">Edit Strip {selectedStripId}</p>
              <p className="text-xs text-[#6d655d]">
                Choose a bank image to replace this strip.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => void loadBank()}
                disabled={loadingBank}
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loadingBank ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setSelectedStripId(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid max-h-[48vh] grid-cols-3 gap-3 overflow-y-auto pr-1 sm:grid-cols-4">
            {loadingOverrides || loadingBank ? (
              <div className="col-span-full py-8 text-center text-sm text-[#6d655d]">Loading bank...</div>
            ) : bankPhotos.length === 0 ? (
              <div className="col-span-full py-8 text-center text-sm text-[#6d655d]">
                No bank images yet. Upload them in Photo Gallery first.
              </div>
            ) : (
              bankPhotos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => void assignPhoto(photo.image_url)}
                  className="overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.58)] bg-white/60 text-left shadow-[0_10px_24px_rgba(41,32,24,0.1)] transition-transform duration-200 hover:scale-[1.02]"
                >
                  <div className="aspect-[4/5] bg-[#e8dfd2]">
                    <img src={photo.image_url} alt={photo.filename ?? photo.id} className="h-full w-full object-cover" />
                  </div>
                  <div className="px-2.5 py-2">
                    <p className="truncate text-[11px] font-medium text-[#2c2925]">
                      {photo.filename || photo.id}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
