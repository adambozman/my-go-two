import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, ImagePlus, RefreshCw, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { deleteImageUrl, setImageUrl } from "@/lib/imageOverrides";
import { cleanupLegacyBrokenImageRows } from "@/lib/legacyImageCleanup";
import {
  makeStorageRef,
  parseStorageRef,
  resolveStorageUrl,
  resolveStorageUrls,
  toStorageRefIfPossible,
} from "@/lib/storageRefs";
import {
  MYGOTWO_COLLAPSE_SLOT_TARGETS,
  MYGOTWO_SLOT_TARGETS,
  MYGOTWO_STRIP_SLOT_TARGETS,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

type BankPhoto = {
  id: string;
  image_url: string;
  filename: string | null;
  created_at: string;
  category_key: string;
};

type ResolvedBankPhoto = BankPhoto & {
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

export default function PhotoGallery() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [photos, setPhotos] = useState<ResolvedBankPhoto[]>([]);
  const [assignedSlots, setAssignedSlots] = useState<AssignedSlot[]>([]);
  const [selectedTargetKey, setSelectedTargetKey] = useState(MYGOTWO_SLOT_TARGETS[0]?.key ?? "");
  const [query, setQuery] = useState("");
  const hasCleanedLegacyRowsRef = useRef(false);

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

    const rows = (data ?? []) as BankPhoto[];
    const resolvedUrls = await resolveStorageUrls(rows.map((photo) => photo.image_url));
    const withUrls = rows.map((photo, index) => ({
      ...photo,
      display_url: resolvedUrls[index] ?? "",
    }));

    setPhotos(withUrls);
    setLoading(false);
    setRefreshing(false);
  }, [toast]);

  const loadAssignedSlots = useCallback(async () => {
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
      return;
    }

    const rows = data ?? [];
    const resolvedUrls = await resolveStorageUrls(rows.map((row) => row.image_url));
    const byKey = new Map<string, { image_url: string; display_url: string }>();

    rows.forEach((row, index) => {
      byKey.set(row.category_key, {
        image_url: row.image_url,
        display_url: resolvedUrls[index] ?? "",
      });
    });

    setAssignedSlots(
      MYGOTWO_SLOT_TARGETS.map((target) => {
        const assigned = byKey.get(target.key);
        return {
          key: target.key,
          label: target.label,
          kind: target.kind,
          image_url: assigned?.image_url ?? "",
          display_url: assigned?.display_url ?? "",
        };
      }),
    );
  }, [toast]);

  useEffect(() => {
    if (authLoading) return;
    void loadPhotos();
    void loadAssignedSlots();
  }, [authLoading, loadAssignedSlots, loadPhotos]);

  useEffect(() => {
    if (authLoading || !user || hasCleanedLegacyRowsRef.current) return;

    hasCleanedLegacyRowsRef.current = true;

    void (async () => {
      try {
        const result = await cleanupLegacyBrokenImageRows();
        if (result.deletedBankRows || result.deletedAssignedRows) {
          await Promise.all([loadPhotos(), loadAssignedSlots()]);
          toast({
            title: "Removed broken image rows",
            description: `${result.deletedBankRows} bank rows and ${result.deletedAssignedRows} assigned rows were deleted.`,
          });
        }
      } catch (error) {
        console.error("Legacy image cleanup failed:", error);
      }
    })();
  }, [authLoading, loadAssignedSlots, loadPhotos, toast, user]);

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

  const selectedTarget = useMemo(
    () => MYGOTWO_SLOT_TARGETS.find((target) => target.key === selectedTargetKey) ?? null,
    [selectedTargetKey],
  );

  const selectedAssignment = useMemo(
    () => assignedSlots.find((slot) => slot.key === selectedTargetKey) ?? null,
    [assignedSlots, selectedTargetKey],
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
            .from("photo-bank")
            .upload(path, file, { contentType: file.type, upsert: false });

          if (uploadError) throw uploadError;

          const { error: insertError } = await supabase.from("category_bank_photos").insert({
            category_key: "dev-bank",
            image_url: makeStorageRef("photo-bank", path),
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

  const handleAssign = useCallback(
    async (photo: BankPhoto) => {
      if (!selectedTarget) return;

      setAssigningId(photo.id);

      try {
        await setImageUrl(selectedTarget.key, photo.image_url);
        toast({
          title: "Slot updated",
          description: `${selectedTarget.label} now uses ${photo.filename || "this image"}.`,
        });
        await loadAssignedSlots();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Assign failed.";
        toast({
          title: "Assign failed",
          description: message,
          variant: "destructive",
        });
      } finally {
        setAssigningId(null);
      }
    },
    [loadAssignedSlots, selectedTarget, toast],
  );

  const handleClearSelectedTarget = useCallback(async () => {
    if (!selectedTarget) return;

    try {
      await deleteImageUrl(selectedTarget.key);
      toast({
        title: "Slot cleared",
        description: `${selectedTarget.label} was reset.`,
      });
      await loadAssignedSlots();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Clear failed.";
      toast({
        title: "Clear failed",
        description: message,
        variant: "destructive",
      });
    }
  }, [loadAssignedSlots, selectedTarget, toast]);

  const handleDelete = useCallback(
    async (photo: BankPhoto) => {
      setDeletingId(photo.id);

      try {
        const linkedSlots = assignedSlots.filter((slot) => slot.image_url === photo.image_url);

        for (const slot of linkedSlots) {
          await deleteImageUrl(slot.key);
        }

        const storageRef = parseStorageRef(toStorageRefIfPossible(photo.image_url));
        const path = storageRef?.path ?? "";
        const bucket = storageRef?.bucket ?? "";

        const { error: deleteRowError } = await supabase
          .from("category_bank_photos")
          .delete()
          .eq("id", photo.id);

        if (deleteRowError) throw deleteRowError;

        if (path && bucket) {
          const { error: removeFileError } = await supabase.storage.from(bucket).remove([path]);
          if (removeFileError) throw removeFileError;
        }

        setPhotos((current) => current.filter((item) => item.id !== photo.id));
        await loadAssignedSlots();
        toast({
          title: "Deleted",
          description: linkedSlots.length
            ? "Image removed from the bank and cleared from any slots using it."
            : "Image removed from the bank.",
        });
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
    [assignedSlots, loadAssignedSlots, toast],
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
            <h1 className="text-lg font-semibold">Photo Editor</h1>
            <p className="text-xs text-muted-foreground">
              Upload bank images, then assign them directly to strip or collapse slots.
            </p>
          </div>
          <Button
            variant="outline"
            className="ml-auto gap-2"
            onClick={() => {
              setRefreshing(true);
              void Promise.all([loadPhotos(), loadAssignedSlots()]).finally(() => {
                setRefreshing(false);
              });
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
            Sign in to use the photo editor.
          </div>
        ) : (
          <>
            <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
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

                <div className="mb-3 flex flex-col gap-2">
                  <label className="text-sm font-medium" htmlFor="mygotwo-slot-target">
                    Target slot
                  </label>
                  <select
                    id="mygotwo-slot-target"
                    value={selectedTargetKey}
                    onChange={(event) => setSelectedTargetKey(event.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
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
                </div>

                <div className="flex flex-wrap gap-2">
                  {assignedSlots.map((slot) => (
                    <button
                      key={slot.key}
                      type="button"
                      onClick={() => setSelectedTargetKey(slot.key)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        slot.key === selectedTargetKey
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-background text-foreground"
                      }`}
                    >
                      {slot.label}
                      {slot.display_url ? " • set" : " • empty"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-4 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{selectedTarget?.label ?? "No slot selected"}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedTarget?.kind === "collapse"
                        ? "Used in the rotating collapse state."
                        : "Used in the normal strip state."}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void handleClearSelectedTarget()}
                    disabled={!selectedAssignment?.image_url}
                  >
                    Clear Slot
                  </Button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-muted">
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
              </div>
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
                    Upload images here, then assign them straight into the strip slots above.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredPhotos.map((photo) => {
                  const usage = usageByImageUrl.get(photo.image_url) ?? [];

                  return (
                    <article
                      key={photo.id}
                      className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
                    >
                      <div className="aspect-[4/5] bg-muted">
                        <img
                          src={photo.display_url}
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

                        {usage.length ? (
                          <p className="text-xs text-muted-foreground">
                            In use: {usage.join(", ")}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground">Not assigned to any slot</p>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            className="gap-2"
                            onClick={() => void handleAssign(photo)}
                            disabled={assigningId === photo.id || !selectedTarget}
                          >
                            {assigningId === photo.id ? "Saving..." : `Use For ${selectedTarget?.label ?? "Slot"}`}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => void copyText(photo.image_url, "Storage ref")}
                          >
                            <Copy className="h-3.5 w-3.5" />
                            Copy Ref
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
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
