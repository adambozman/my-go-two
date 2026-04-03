import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ImagePlus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { deleteImageUrl, setImageUrl } from "@/lib/imageOverrides";
import {
  makeStorageRef,
  parseStorageRef,
  resolveStorageUrls,
} from "@/lib/storageRefs";
import {
  MYGOTWO_COLLAPSE_SLOT_TARGETS,
  MYGOTWO_SLOT_TARGETS,
  MYGOTWO_STRIP_SLOT_TARGETS,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

type PhotoBankFile = {
  id: string;
  name: string;
  created_at: string | null;
  updated_at: string | null;
  path: string;
  image_url: string;
  display_url: string;
};

type AssignedSlot = {
  key: string;
  label: string;
  kind: "strip" | "collapse";
  image_url: string;
  display_url: string;
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

function createPhotoPath(file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const basename = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "image";

  return `bank/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${basename}.${extension}`;
}

export default function PhotoGallery() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [photos, setPhotos] = useState<PhotoBankFile[]>([]);
  const [assignedSlots, setAssignedSlots] = useState<AssignedSlot[]>([]);
  const [selectedTargetKey, setSelectedTargetKey] = useState(MYGOTWO_SLOT_TARGETS[0]?.key ?? "");
  const [selectedPhotoRef, setSelectedPhotoRef] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const loadPhotos = useCallback(async () => {
    if (!user) {
      setPhotos([]);
      setLoadingPhotos(false);
      return;
    }

    setLoadingPhotos(true);

    const { data, error } = await supabase.storage.from("photo-bank").list("bank", {
      limit: 200,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });

    if (error) {
      toast({
        title: "Failed to load photos",
        description: error.message,
        variant: "destructive",
      });
      setPhotos([]);
      setLoadingPhotos(false);
      return;
    }

    const files = (data ?? []).filter((item) => Boolean(item.name));
    const refs = files.map((item) => makeStorageRef("photo-bank", `bank/${item.name}`));
    const resolvedUrls = await resolveStorageUrls(refs);

    setPhotos(
      files.map((item, index) => ({
        id: item.id || `photo-bank-${item.name}`,
        name: item.name,
        created_at: item.created_at ?? null,
        updated_at: item.updated_at ?? null,
        path: `bank/${item.name}`,
        image_url: refs[index],
        display_url: resolvedUrls[index] ?? "",
      })),
    );
    setLoadingPhotos(false);
  }, [toast, user]);

  const loadAssignedSlots = useCallback(async () => {
    if (!user) {
      setAssignedSlots([]);
      setLoadingAssignments(false);
      return;
    }

    setLoadingAssignments(true);

    const slotKeys = MYGOTWO_SLOT_TARGETS.map((target) => target.key);
    const { data, error } = await supabase
      .from("category_images")
      .select("category_key, image_url")
      .eq("gender", "male")
      .in("category_key", slotKeys);

    if (error) {
      toast({
        title: "Failed to load assignments",
        description: error.message,
        variant: "destructive",
      });
      setAssignedSlots([]);
      setLoadingAssignments(false);
      return;
    }

    const rows = data ?? [];
    const resolvedUrls = await resolveStorageUrls(rows.map((row) => row.image_url));
    const assignedByKey = new Map<string, { image_url: string; display_url: string }>();

    rows.forEach((row, index) => {
      assignedByKey.set(row.category_key, {
        image_url: row.image_url,
        display_url: resolvedUrls[index] ?? "",
      });
    });

    setAssignedSlots(
      MYGOTWO_SLOT_TARGETS.map((target) => {
        const assigned = assignedByKey.get(target.key);
        return {
          key: target.key,
          label: target.label,
          kind: target.kind,
          image_url: assigned?.image_url ?? "",
          display_url: assigned?.display_url ?? "",
        };
      }),
    );
    setLoadingAssignments(false);
  }, [toast, user]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setPhotos([]);
      setAssignedSlots([]);
      setLoadingPhotos(false);
      setLoadingAssignments(false);
      return;
    }

    void loadPhotos();
    void loadAssignedSlots();
  }, [authLoading, loadAssignedSlots, loadPhotos, user]);

  const filteredPhotos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return photos;

    return photos.filter((photo) => photo.name.toLowerCase().includes(normalized));
  }, [photos, query]);

  useEffect(() => {
    if (!photos.length) {
      setSelectedPhotoRef(null);
      return;
    }

    if (selectedPhotoRef && photos.some((photo) => photo.image_url === selectedPhotoRef)) {
      return;
    }

    setSelectedPhotoRef(photos[0].image_url);
  }, [photos, selectedPhotoRef]);

  const selectedTarget = useMemo(
    () => MYGOTWO_SLOT_TARGETS.find((target) => target.key === selectedTargetKey) ?? null,
    [selectedTargetKey],
  );

  const selectedAssignment = useMemo(
    () => assignedSlots.find((slot) => slot.key === selectedTargetKey) ?? null,
    [assignedSlots, selectedTargetKey],
  );

  const selectedPhoto = useMemo(
    () => photos.find((photo) => photo.image_url === selectedPhotoRef) ?? null,
    [photos, selectedPhotoRef],
  );

  const usageByImageUrl = useMemo(() => {
    const usage = new Map<string, string[]>();

    assignedSlots.forEach((slot) => {
      if (!slot.image_url) return;
      const current = usage.get(slot.image_url) ?? [];
      current.push(slot.label);
      usage.set(slot.image_url, current);
    });

    return usage;
  }, [assignedSlots]);

  const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length || !user) return;

    setUploading(true);

    try {
      for (const file of files) {
        const path = createPhotoPath(file);
        const { error } = await supabase.storage
          .from("photo-bank")
          .upload(path, file, { contentType: file.type, upsert: false });

        if (error) {
          throw error;
        }
      }

      toast({
        title: "Uploaded",
        description: `${files.length} image${files.length === 1 ? "" : "s"} added to storage.`,
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
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [loadPhotos, toast, user]);

  const handleAssignSelected = useCallback(async () => {
    if (!selectedTarget || !selectedPhoto) return;

    setAssigning(true);

    try {
      await setImageUrl(selectedTarget.key, selectedPhoto.image_url);
      await loadAssignedSlots();
      toast({
        title: "Slot updated",
        description: `${selectedTarget.label} now uses ${selectedPhoto.name}.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Assign failed.";
      toast({
        title: "Assign failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setAssigning(false);
    }
  }, [loadAssignedSlots, selectedPhoto, selectedTarget, toast]);

  const handleClearSelectedTarget = useCallback(async () => {
    if (!selectedTarget) return;

    setClearing(true);

    try {
      await deleteImageUrl(selectedTarget.key);
      await loadAssignedSlots();
      toast({
        title: "Slot cleared",
        description: `${selectedTarget.label} was reset.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Clear failed.";
      toast({
        title: "Clear failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setClearing(false);
    }
  }, [loadAssignedSlots, selectedTarget, toast]);

  const handleDeleteSelectedPhoto = useCallback(async () => {
    if (!selectedPhoto) return;

    setDeleting(true);

    try {
      const linkedSlots = assignedSlots.filter((slot) => slot.image_url === selectedPhoto.image_url);

      for (const slot of linkedSlots) {
        await deleteImageUrl(slot.key);
      }

      const storageRef = parseStorageRef(selectedPhoto.image_url);
      if (!storageRef) {
        throw new Error("Stored photo reference is invalid.");
      }

      const { error } = await supabase.storage.from(storageRef.bucket).remove([storageRef.path]);
      if (error) {
        throw error;
      }

      toast({
        title: "Photo deleted",
        description: linkedSlots.length
          ? "The image was removed from storage and cleared from any slots using it."
          : "The image was removed from storage.",
      });

      await Promise.all([loadPhotos(), loadAssignedSlots()]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Delete failed.";
      toast({
        title: "Delete failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  }, [assignedSlots, loadAssignedSlots, loadPhotos, selectedPhoto, toast]);

  const pageLoading = authLoading || loadingPhotos || loadingAssignments;
  const selectedPhotoUsage = selectedPhoto ? usageByImageUrl.get(selectedPhoto.image_url) ?? [] : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold">Photo Gallery</h1>
            <p className="text-xs text-muted-foreground">
              Upload images, pick a slot, and wire the storage image straight into My Go Two.
            </p>
          </div>
          <Button
            className="ml-auto gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={!user || authLoading || uploading}
          >
            <ImagePlus className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload Images"}
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
            Sign in to use the photo gallery.
          </div>
        ) : pageLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
            Loading photo gallery...
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="space-y-4">
              <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold">My Go Two slot</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Choose the exact strip or collapse slot you want to replace.
                </p>

                <label className="mt-4 block text-sm font-medium" htmlFor="mygotwo-slot-target">
                  Target slot
                </label>
                <select
                  id="mygotwo-slot-target"
                  value={selectedTargetKey}
                  onChange={(event) => setSelectedTargetKey(event.target.value)}
                  className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <optgroup label="Strip slots">
                    {MYGOTWO_STRIP_SLOT_TARGETS.map((target) => (
                      <option key={target.key} value={target.key}>
                        {target.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Collapse slots">
                    {MYGOTWO_COLLAPSE_SLOT_TARGETS.map((target) => (
                      <option key={target.key} value={target.key}>
                        {target.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </section>

              <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{selectedTarget?.label ?? "No slot selected"}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedTarget?.kind === "collapse"
                        ? "Used in the rotating collapse state."
                        : "Used in the strip layout."}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void handleClearSelectedTarget()}
                    disabled={!selectedAssignment?.image_url || clearing}
                  >
                    {clearing ? "Clearing..." : "Clear"}
                  </Button>
                </div>

                <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-muted">
                  {selectedAssignment?.display_url ? (
                    <img
                      src={selectedAssignment.display_url}
                      alt={selectedAssignment.label}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center text-sm text-muted-foreground">
                      No image assigned
                    </div>
                  )}
                </div>
              </section>

              <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold">Selected image</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Pick an image from the grid, then assign it to the slot above.
                </p>

                <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-muted">
                  {selectedPhoto?.display_url ? (
                    <img
                      src={selectedPhoto.display_url}
                      alt={selectedPhoto.name}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/5] items-center justify-center text-sm text-muted-foreground">
                      Select an image
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2">
                  <p className="truncate text-sm font-medium">
                    {selectedPhoto?.name ?? "No image selected"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedPhoto ? `Added ${formatDate(selectedPhoto.created_at || selectedPhoto.updated_at)}` : "Choose an image from storage."}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedPhotoUsage.length
                      ? `In use: ${selectedPhotoUsage.join(", ")}`
                      : "Not assigned to any slot"}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    className="gap-2"
                    onClick={() => void handleAssignSelected()}
                    disabled={!selectedTarget || !selectedPhoto || assigning}
                  >
                    {assigning ? "Assigning..." : `Use For ${selectedTarget?.label ?? "Slot"}`}
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 text-destructive"
                    onClick={() => void handleDeleteSelectedPhoto()}
                    disabled={!selectedPhoto || deleting}
                  >
                    <Trash2 className="h-4 w-4" />
                    {deleting ? "Deleting..." : "Delete Image"}
                  </Button>
                </div>
              </section>
            </aside>

            <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative w-full max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search uploaded images"
                    className="pl-9"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {filteredPhotos.length} image{filteredPhotos.length === 1 ? "" : "s"}
                </p>
              </div>

              {filteredPhotos.length === 0 ? (
                <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 text-center">
                  <ImagePlus className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <h2 className="text-lg font-semibold">No uploaded images yet</h2>
                    <p className="text-sm text-muted-foreground">
                      Upload images here, then assign them directly into My Go Two slots.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredPhotos.map((photo) => {
                    const isSelected = selectedPhotoRef === photo.image_url;
                    const usage = usageByImageUrl.get(photo.image_url) ?? [];

                    return (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => setSelectedPhotoRef(photo.image_url)}
                        className={`overflow-hidden rounded-3xl border bg-card text-left shadow-sm transition ${
                          isSelected
                            ? "border-foreground ring-2 ring-foreground/10"
                            : "border-border hover:border-foreground/30"
                        }`}
                      >
                        <div className="aspect-[4/5] bg-muted">
                          <img
                            src={photo.display_url}
                            alt={photo.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="space-y-2 p-4">
                          <p className="truncate text-sm font-semibold">{photo.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {usage.length ? `Used in ${usage.join(", ")}` : "Not assigned"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(photo.created_at || photo.updated_at)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
