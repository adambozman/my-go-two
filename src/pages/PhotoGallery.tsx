import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, ImagePlus, RefreshCw, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type BankPhoto = {
  id: string;
  image_url: string;
  filename: string | null;
  created_at: string;
  category_key: string;
};

function formatDate(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function PhotoGallery() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<BankPhoto[]>([]);
  const [query, setQuery] = useState("");

  const loadPhotos = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("category_bank_photos")
      .select("id, image_url, filename, created_at, category_key")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Failed to load bank",
        description: error.message,
        variant: "destructive",
      });
      setPhotos([]);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    setPhotos(data ?? []);
    setLoading(false);
    setRefreshing(false);
  }, [toast]);

  useEffect(() => {
    if (authLoading) return;
    void loadPhotos();
  }, [authLoading, loadPhotos]);

  const filteredPhotos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return photos;

    return photos.filter((photo) => {
      const haystack = [
        photo.filename ?? "",
        photo.category_key ?? "",
        photo.image_url ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [photos, query]);

  const handleUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files?.length) return;

      setUploading(true);

      try {
        for (const file of Array.from(files)) {
          const ext = file.name.split(".").pop() || "jpg";
          const filename = `dev-bank-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;
          const path = `bank/${filename}`;

          const { error: uploadError } = await supabase.storage
            .from("category-images")
            .upload(path, file, { contentType: file.type, upsert: false });

          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage.from("category-images").getPublicUrl(path);
          const { error: insertError } = await supabase.from("category_bank_photos").insert({
            category_key: "dev-bank",
            image_url: urlData.publicUrl,
            filename: file.name,
          });

          if (insertError) throw insertError;
        }

        toast({
          title: "Uploaded",
          description: `${files.length} image${files.length === 1 ? "" : "s"} added to the bank.`,
        });
        await loadPhotos();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Upload failed.";
        toast({
          title: "Upload failed",
          description: message,
          variant: "destructive",
        });
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [loadPhotos, toast],
  );

  const handleDelete = useCallback(
    async (photo: BankPhoto) => {
      setDeletingId(photo.id);

      try {
        const url = new URL(photo.image_url);
        const path = decodeURIComponent(url.pathname.split("/object/public/category-images/")[1] ?? "");

        const { error: deleteRowError } = await supabase
          .from("category_bank_photos")
          .delete()
          .eq("id", photo.id);

        if (deleteRowError) throw deleteRowError;

        if (path) {
          const { error: removeFileError } = await supabase.storage.from("category-images").remove([path]);
          if (removeFileError) throw removeFileError;
        }

        setPhotos((current) => current.filter((item) => item.id !== photo.id));
        toast({ title: "Deleted", description: "Image removed from the bank." });
      } catch (error) {
        const message = error instanceof Error ? error.message : "Delete failed.";
        toast({
          title: "Delete failed",
          description: message,
          variant: "destructive",
        });
      } finally {
        setDeletingId(null);
      }
    },
    [toast],
  );

  const copyText = useCallback(
    async (value: string, label: string) => {
      try {
        await navigator.clipboard.writeText(value);
        toast({ title: "Copied", description: `${label} copied.` });
      } catch {
        toast({
          title: "Copy failed",
          description: "Clipboard write was blocked.",
          variant: "destructive",
        });
      }
    },
    [toast],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold">Dev Image Bank</h1>
            <p className="text-xs text-muted-foreground">
              Upload, preview, search, copy, and delete reusable image assets.
            </p>
          </div>
          <Button
            variant="outline"
            className="ml-auto gap-2"
            onClick={() => {
              setRefreshing(true);
              void loadPhotos();
            }}
            disabled={loading || refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            className="gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={!user || authLoading || uploading}
          >
            <ImagePlus className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {!user && !authLoading ? (
          <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            Sign in to use the dev image bank.
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search filename or ref"
                  className="pl-9"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {filteredPhotos.length} image{filteredPhotos.length === 1 ? "" : "s"}
              </p>
            </div>

            {loading ? (
              <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
                Loading bank...
              </div>
            ) : filteredPhotos.length === 0 ? (
              <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 text-center">
                <ImagePlus className="h-10 w-10 text-muted-foreground" />
                <div>
                  <h2 className="text-lg font-semibold">No banked images yet</h2>
                  <p className="text-sm text-muted-foreground">
                    Upload images here first, then use them in rebuilt assets later.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPhotos.map((photo) => (
                  <article
                    key={photo.id}
                    className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
                  >
                    <div className="aspect-[4/5] bg-muted">
                      <img
                        src={photo.image_url}
                        alt={photo.filename ?? "Bank image"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {photo.filename || "Untitled image"}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {photo.category_key}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => void copyText(photo.image_url, "Public URL")}
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copy URL
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => void copyText(photo.id, "Image id")}
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copy ID
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2 text-destructive"
                          onClick={() => void handleDelete(photo)}
                          disabled={deletingId === photo.id}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {deletingId === photo.id ? "Deleting..." : "Delete"}
                        </Button>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Added {formatDate(photo.created_at)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
