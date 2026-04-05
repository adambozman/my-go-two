import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { deleteImageUrl, setImageUrl } from "@/lib/imageOverrides";
import { makeStorageRef, parseStorageRef, resolveStorageUrls } from "@/lib/storageRefs";
import {
  MYGOTWO_CARD_LIVE_IMAGE_SIZE,
  MYGOTWO_COLLAPSE_LIVE_IMAGE_SIZE,
  MYGOTWO_STRIP_LIVE_IMAGE_SIZE,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.data";
import {
  MYGOTWO_CATEGORY_TARGETS,
  MYGOTWO_COLLAPSE_SLOT_TARGETS,
  MYGOTWO_SLOT_TARGETS,
  type MyGoTwoSlotTarget,
} from "@/platform-ui/web/mygotwo/myGoTwoStripGallery.images";

type SlotAssignment = {
  key: string;
  image_url: string;
  display_url: string;
  created_at: string | null;
  path: string;
  name: string;
};

type ManualCleanupItem = {
  image_url: string;
  name: string;
  path: string;
  reason: string;
  slots: string[];
};

type SlotPreviewSpec = {
  width: number;
  height: number;
  cropLabel: string;
  usageLabel: string;
  previewSurfaceClassName: string;
  previewFrameClassName: string;
};

const SLOT_PREVIEW_SPECS: Record<MyGoTwoSlotTarget["kind"], SlotPreviewSpec> = {
  strip: {
    width: MYGOTWO_STRIP_LIVE_IMAGE_SIZE.width,
    height: MYGOTWO_STRIP_LIVE_IMAGE_SIZE.height,
    cropLabel: "Narrow vertical live strip crop",
    usageLabel: "Matches the live category strip on My Go Two.",
    previewSurfaceClassName: "min-h-[23rem]",
    previewFrameClassName: "mx-auto w-[72px] max-w-full overflow-hidden rounded-[1.4rem] border border-border/70 bg-black/5 shadow-sm",
  },
  card: {
    width: MYGOTWO_CARD_LIVE_IMAGE_SIZE.width,
    height: MYGOTWO_CARD_LIVE_IMAGE_SIZE.height,
    cropLabel: "Opened category card crop",
    usageLabel: "Matches the large category image after the strip opens.",
    previewSurfaceClassName: "min-h-[17rem]",
    previewFrameClassName: "w-full overflow-hidden rounded-[1.4rem] border border-border/70 bg-black/5 shadow-sm",
  },
  collapse: {
    width: MYGOTWO_COLLAPSE_LIVE_IMAGE_SIZE.width,
    height: MYGOTWO_COLLAPSE_LIVE_IMAGE_SIZE.height,
    cropLabel: "Collapsed repeat-stage crop",
    usageLabel: "Matches the repeat image used while the stage is collapsed.",
    previewSurfaceClassName: "min-h-[15rem]",
    previewFrameClassName: "w-full overflow-hidden rounded-[1.4rem] border border-border/70 bg-black/5 shadow-sm",
  },
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

function createPhotoPath(target: MyGoTwoSlotTarget, file: File) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const basename = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "image";

  return `${target.folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${basename}.${extension}`;
}

function formatTargetSize(width: number, height: number) {
  return `${width} x ${height} px`;
}

function SlotPreview({
  title,
  description,
  target,
  assignment,
  deleting,
  onDelete,
}: {
  title: string;
  description: string;
  target: MyGoTwoSlotTarget;
  assignment: SlotAssignment | null;
  deleting: boolean;
  onDelete: () => void;
}) {
  const previewSpec = SLOT_PREVIEW_SPECS[target.kind];

  return (
    <div className="rounded-3xl border border-border bg-card/65 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Target size {formatTargetSize(previewSpec.width, previewSpec.height)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{previewSpec.cropLabel}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-destructive"
          onClick={onDelete}
          disabled={!assignment || deleting}
        >
          <Trash2 className="h-3.5 w-3.5" />
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>

      <div className={`mt-4 flex items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/45 px-4 py-5 ${previewSpec.previewSurfaceClassName}`}>
        <div
          className={previewSpec.previewFrameClassName}
          style={{ aspectRatio: `${previewSpec.width} / ${previewSpec.height}` }}
        >
          {assignment?.display_url ? (
            <img
              src={assignment.display_url}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">
              No image uploaded
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-xs text-muted-foreground">
          {previewSpec.usageLabel}
        </p>
        <p className="truncate text-sm font-medium">
          {assignment?.name ?? "Empty slot"}
        </p>
        <p className="text-xs text-muted-foreground">
          {assignment ? `Uploaded ${formatDate(assignment.created_at)}` : "Upload at or above the target size to keep the crop clean."}
        </p>
      </div>
    </div>
  );
}

function getCategoryUploadLabel(targetKey: string, categoryLabel: string) {
  return targetKey.endsWith("-card")
    ? `${categoryLabel} Card`
    : `${categoryLabel} Small`;
}

function getSlotSelectionSummary(target: MyGoTwoSlotTarget | null, categoryLabel?: string) {
  if (!target) {
    return "Select a live slot to upload into.";
  }

  const previewSpec = SLOT_PREVIEW_SPECS[target.kind];
  const slotLabel = categoryLabel ? getCategoryUploadLabel(target.key, categoryLabel) : target.label;

  return `${slotLabel} uses ${formatTargetSize(previewSpec.width, previewSpec.height)} and previews with the live crop below.`;
}

export default function PhotoGallery() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingUploadTargetKeyRef = useRef<string | null>(null);
  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [assignedSlots, setAssignedSlots] = useState<Record<string, SlotAssignment>>({});
  const [manualCleanupItems, setManualCleanupItems] = useState<ManualCleanupItem[]>([]);
  const [categoryUploadSelections, setCategoryUploadSelections] = useState<Record<string, string>>(
    () =>
      Object.fromEntries(
        MYGOTWO_CATEGORY_TARGETS.map((target) => [target.slug, target.stripKey]),
      ),
  );
  const [repeatUploadTargetKey, setRepeatUploadTargetKey] = useState(
    MYGOTWO_COLLAPSE_SLOT_TARGETS[0]?.key ?? "",
  );

  const slotTargetsByKey = useMemo(
    () => new Map(MYGOTWO_SLOT_TARGETS.map((target) => [target.key, target])),
    [],
  );

  const loadAssignedSlots = useCallback(async () => {
    if (!user) {
      setAssignedSlots({});
      setLoadingAssignments(false);
      return;
    }

    setLoadingAssignments(true);

    const slotKeys = MYGOTWO_SLOT_TARGETS.map((target) => target.key);
    const { data, error } = await supabase
      .from("category_images")
      .select("category_key, image_url, created_at")
      .eq("gender", "male")
      .in("category_key", slotKeys);

    if (error) {
      toast({
        title: "Failed to load assignments",
        description: error.message,
        variant: "destructive",
      });
      setAssignedSlots({});
      setLoadingAssignments(false);
      return;
    }

    const rows = data ?? [];
    const resolvedUrls = await resolveStorageUrls(rows.map((row) => row.image_url));
    const nextAssignments: Record<string, SlotAssignment> = {};

    rows.forEach((row, index) => {
      const storageRef = parseStorageRef(row.image_url);
      const path = storageRef?.path ?? "";
      nextAssignments[row.category_key] = {
        key: row.category_key,
        image_url: row.image_url,
        display_url: resolvedUrls[index] ?? "",
        created_at: row.created_at ?? null,
        path,
        name: path.split("/").pop() ?? row.image_url,
      };
    });

    setAssignedSlots(nextAssignments);
    setLoadingAssignments(false);
  }, [toast, user]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setAssignedSlots({});
      setLoadingAssignments(false);
      return;
    }

    void loadAssignedSlots();
  }, [authLoading, loadAssignedSlots, user]);

  const queueManualCleanup = useCallback(
    (assignment: SlotAssignment, reason: string, slots: string[]) => {
      setManualCleanupItems((current) => {
        const nextItem: ManualCleanupItem = {
          image_url: assignment.image_url,
          name: assignment.name,
          path: assignment.path,
          reason,
          slots,
        };

        const existingIndex = current.findIndex((item) => item.image_url === assignment.image_url);
        if (existingIndex < 0) {
          return [...current, nextItem];
        }

        const next = [...current];
        next[existingIndex] = nextItem;
        return next;
      });
    },
    [],
  );

  const clearManualCleanupItem = useCallback((imageUrl: string) => {
    setManualCleanupItems((current) => current.filter((item) => item.image_url !== imageUrl));
  }, []);

  const getOtherUsageLabels = useCallback(
    (imageUrl: string, excludedKey: string) =>
      MYGOTWO_SLOT_TARGETS.filter(
        (target) =>
          target.key !== excludedKey && assignedSlots[target.key]?.image_url === imageUrl,
      ).map((target) => target.label),
    [assignedSlots],
  );

  const removeStorageFileIfUnused = useCallback(
    async (assignment: SlotAssignment, excludedKey: string) => {
      const remainingUsage = getOtherUsageLabels(assignment.image_url, excludedKey);
      if (remainingUsage.length > 0) {
        return false;
      }

      const storageRef = parseStorageRef(assignment.image_url);
      if (!storageRef) {
        queueManualCleanup(assignment, "Stored photo reference is invalid.", remainingUsage);
        return true;
      }

      const { error } = await supabase.storage.from(storageRef.bucket).remove([storageRef.path]);
      if (error) {
        queueManualCleanup(assignment, error.message, remainingUsage);
        return true;
      }

      clearManualCleanupItem(assignment.image_url);
      return false;
    },
    [clearManualCleanupItem, getOtherUsageLabels, queueManualCleanup],
  );

  const triggerUpload = useCallback((targetKey: string) => {
    pendingUploadTargetKeyRef.current = targetKey;
    fileInputRef.current?.click();
  }, []);

  const uploadToTarget = useCallback(
    async (targetKey: string, file: File) => {
      if (!user) return;

      const target = slotTargetsByKey.get(targetKey);
      if (!target) return;

      setUploadingKey(targetKey);

      const currentAssignment = assignedSlots[targetKey] ?? null;

      try {
        const path = createPhotoPath(target, file);
        const { error: uploadError } = await supabase.storage
          .from("photo-bank")
          .upload(path, file, { contentType: file.type, upsert: false });

        if (uploadError) {
          throw uploadError;
        }

        const nextImageRef = makeStorageRef("photo-bank", path);
        await setImageUrl(target.key, nextImageRef);

        let cleanupQueued = false;
        if (currentAssignment && currentAssignment.image_url !== nextImageRef) {
          cleanupQueued = await removeStorageFileIfUnused(currentAssignment, targetKey);
        }

        toast({
          title: "Image uploaded",
          description: cleanupQueued
            ? `${target.label} was updated. The replaced file was queued for manual cleanup.`
            : `${target.label} now points directly to the new storage image.`,
        });

        await loadAssignedSlots();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Upload failed.";
        toast({
          title: "Upload failed",
          description: message,
          variant: "destructive",
        });
      } finally {
        setUploadingKey(null);
      }
    },
    [assignedSlots, loadAssignedSlots, removeStorageFileIfUnused, slotTargetsByKey, toast, user],
  );

  const handleUploadInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      const targetKey = pendingUploadTargetKeyRef.current;

      pendingUploadTargetKeyRef.current = null;

      if (!file || !targetKey) {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      await uploadToTarget(targetKey, file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [uploadToTarget],
  );

  const handleDeleteSlotImage = useCallback(
    async (targetKey: string) => {
      const target = slotTargetsByKey.get(targetKey);
      const assignment = assignedSlots[targetKey];

      if (!target || !assignment) return;

      setDeletingKey(targetKey);

      try {
        await deleteImageUrl(target.key);
        const cleanupQueued = await removeStorageFileIfUnused(assignment, targetKey);

        toast({
          title: "Image deleted",
          description: cleanupQueued
            ? `${target.label} was cleared. The storage file was queued for manual cleanup.`
            : `${target.label} was cleared from storage and from the live slot.`,
        });

        await loadAssignedSlots();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Delete failed.";
        toast({
          title: "Delete failed",
          description: message,
          variant: "destructive",
        });
      } finally {
        setDeletingKey(null);
      }
    },
    [assignedSlots, loadAssignedSlots, removeStorageFileIfUnused, slotTargetsByKey, toast],
  );

  const pageLoading = authLoading || loadingAssignments;
  const categoryGroups = MYGOTWO_CATEGORY_TARGETS.map((target) => ({
    ...target,
    stripTarget: slotTargetsByKey.get(target.stripKey) ?? null,
    cardTarget: slotTargetsByKey.get(target.cardKey) ?? null,
    stripAssignment: assignedSlots[target.stripKey] ?? null,
    cardAssignment: assignedSlots[target.cardKey] ?? null,
    uploadTargetKey: categoryUploadSelections[target.slug] ?? target.stripKey,
  }));
  const repeatAssignments = MYGOTWO_COLLAPSE_SLOT_TARGETS.map((target) => ({
    target,
    assignment: assignedSlots[target.key] ?? null,
  }));

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
              Each upload box uses the live My Go Two crop ratio and shows the target image size.
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadInputChange}
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
          <div className="space-y-6">
            <section className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5">
              <p className="text-sm font-semibold">Category uploads</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Each category has two live images: a narrow strip image and a separate opened-card image.
              </p>

              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                {categoryGroups.map((group) => (
                  <section key={group.id} className="rounded-3xl border border-border bg-card/50 p-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold">{group.label}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Pick the live slot first. The preview box below matches the live crop for that slot.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <select
                          value={group.uploadTargetKey}
                          onChange={(event) =>
                            setCategoryUploadSelections((current) => ({
                              ...current,
                              [group.slug]: event.target.value,
                            }))
                          }
                          className="h-10 min-w-[180px] rounded-md border border-input bg-background px-3 text-sm"
                        >
                          <option value={group.stripKey}>{group.label} Small</option>
                          <option value={group.cardKey}>{group.label} Card</option>
                        </select>
                        <Button
                          className="gap-2"
                          onClick={() => triggerUpload(group.uploadTargetKey)}
                          disabled={Boolean(uploadingKey || deletingKey)}
                        >
                          <ImagePlus className="h-4 w-4" />
                          {uploadingKey === group.uploadTargetKey ? "Uploading..." : "Upload"}
                        </Button>
                      </div>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">
                      {getSlotSelectionSummary(slotTargetsByKey.get(group.uploadTargetKey) ?? null, group.label)}
                    </p>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <SlotPreview
                        title="Small"
                        description="Used on the live strip."
                        target={group.stripTarget ?? {
                          key: group.stripKey,
                          id: group.id,
                          label: `${group.label} Small`,
                          kind: "strip",
                          slug: group.slug,
                          folder: group.stripFolder,
                        }}
                        assignment={group.stripAssignment}
                        deleting={deletingKey === group.stripKey}
                        onDelete={() => void handleDeleteSlotImage(group.stripKey)}
                      />
                      <SlotPreview
                        title="Card"
                        description="Used when the category opens."
                        target={group.cardTarget ?? {
                          key: group.cardKey,
                          id: group.id,
                          label: `${group.label} Card`,
                          kind: "card",
                          slug: group.slug,
                          folder: group.cardFolder,
                        }}
                        assignment={group.cardAssignment}
                        deleting={deletingKey === group.cardKey}
                        onDelete={() => void handleDeleteSlotImage(group.cardKey)}
                      />
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold">Step 1 repeat photos</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    These five photos feed the repeating preview/collapse stage.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <select
                    value={repeatUploadTargetKey}
                    onChange={(event) => setRepeatUploadTargetKey(event.target.value)}
                    className="h-10 min-w-[180px] rounded-md border border-input bg-background px-3 text-sm"
                  >
                    {MYGOTWO_COLLAPSE_SLOT_TARGETS.map((target) => (
                      <option key={target.key} value={target.key}>
                        {target.label}
                      </option>
                    ))}
                  </select>
                  <Button
                    className="gap-2"
                    onClick={() => triggerUpload(repeatUploadTargetKey)}
                    disabled={!repeatUploadTargetKey || Boolean(uploadingKey || deletingKey)}
                  >
                    <ImagePlus className="h-4 w-4" />
                    {uploadingKey === repeatUploadTargetKey ? "Uploading..." : "Upload"}
                  </Button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {repeatAssignments.map(({ target, assignment }) => (
                  <SlotPreview
                    key={target.key}
                    title={target.label}
                    description="Rotates only while collapsed."
                    target={target}
                    assignment={assignment}
                    deleting={deletingKey === target.key}
                    onDelete={() => void handleDeleteSlotImage(target.key)}
                  />
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-card p-4 shadow-sm">
              <p className="text-sm font-semibold">Manual cleanup list</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Files that could not be deleted automatically. Hand this list back for manual cleanup.
              </p>

              <div className="mt-4 space-y-3">
                {manualCleanupItems.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No manual cleanup items queued.</p>
                ) : (
                  manualCleanupItems.map((item) => (
                    <div key={item.image_url} className="rounded-2xl border border-border px-3 py-3">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="mt-1 break-all text-xs text-muted-foreground">{item.image_url}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Reason: {item.reason}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.slots.length ? `Slots: ${item.slots.join(", ")}` : "No linked slots"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

// Codebase classification: runtime Photo Gallery upload surface for live My Go Two slot images.
