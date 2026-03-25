import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Images, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { resolveStorageUrl } from "@/lib/storageRefs";

type SourceKind = "pages" | "cards" | "templates" | "profile" | "connections";

interface GalleryPhoto {
  id: string;
  rawUrl: string;
  resolvedUrl: string;
  title: string;
  subtitle: string;
  source: SourceKind;
  createdAt: string | null;
  usages: string[];
}

const FILTERS: Array<{ key: SourceKind | "all"; label: string }> = [
  { key: "all", label: "All Photos" },
  { key: "pages", label: "Page Photos" },
  { key: "cards", label: "My Cards" },
  { key: "templates", label: "Templates" },
  { key: "profile", label: "Profile" },
  { key: "connections", label: "Connections" },
];

const SOURCE_LABELS: Record<SourceKind, string> = {
  pages: "Pages",
  cards: "My Go Two",
  templates: "Templates",
  profile: "Profile",
  connections: "Connections",
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

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function normalizeSubtitle(...parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).join(" · ");
}

export default function PhotoGallery() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  const loadPhotos = useCallback(async () => {
    setLoading(true);

    const [
      { data: categoryRegistry },
      { data: categoryImages },
      { data: profile },
      { data: cardEntries },
      { data: customTemplates },
      { data: couples },
    ] = await Promise.all([
      supabase
        .from("category_registry")
        .select("key, label, page, section, subcategories")
        .eq("is_active", true),
      supabase
        .from("category_images")
        .select("category_key, image_url, gender, created_at")
        .order("created_at", { ascending: false }),
      user
        ? supabase
            .from("profiles")
            .select("avatar_url, display_name, updated_at")
            .eq("user_id", user.id)
            .maybeSingle()
        : Promise.resolve({ data: null }),
      user
        ? supabase
            .from("card_entries")
            .select("id, entry_name, group_name, card_key, image_url, created_at, updated_at")
            .eq("user_id", user.id)
            .not("image_url", "is", null)
            .order("updated_at", { ascending: false })
        : Promise.resolve({ data: [] }),
      user
        ? supabase
            .from("custom_templates")
            .select("id, name, category, image_url, created_at")
            .eq("user_id", user.id)
            .not("image_url", "is", null)
            .order("created_at", { ascending: false })
        : Promise.resolve({ data: [] }),
      user
        ? supabase
            .from("couples")
            .select("id, display_label, photo_url, updated_at, created_at")
            .or(`inviter_id.eq.${user.id},invitee_id.eq.${user.id}`)
            .not("photo_url", "is", null)
            .order("updated_at", { ascending: false })
        : Promise.resolve({ data: [] }),
    ]);

    const registryMeta = new Map<string, { title: string; subtitle: string }>();

    for (const row of categoryRegistry || []) {
      registryMeta.set(row.key, {
        title: row.label,
        subtitle: normalizeSubtitle(row.page, row.section),
      });

      const subcategories = Array.isArray(row.subcategories) ? row.subcategories : [];
      for (const subcategory of subcategories) {
        const sub = subcategory as Record<string, unknown>;
        const subId = typeof sub?.id === "string" ? sub.id : "";
        const subName = typeof sub?.name === "string" ? sub.name : "";
        const products = Array.isArray(sub?.products) ? sub.products : [];

        if (subId) {
          registryMeta.set(subId, {
            title: subName || row.label,
            subtitle: normalizeSubtitle(row.label, row.page),
          });
        }

        for (const product of products) {
          const productId = typeof product?.id === "string" ? product.id : "";
          const productName = typeof product?.name === "string" ? product.name : "";
          if (!productId) continue;

          registryMeta.set(productId, {
            title: productName || subName || row.label,
            subtitle: normalizeSubtitle(row.label, subName || row.section),
          });
        }
      }
    }

    const records: Array<Omit<GalleryPhoto, "resolvedUrl">> = [];

    for (const row of categoryImages || []) {
      const meta = registryMeta.get(row.category_key);
      records.push({
        id: `page-${row.gender}-${row.category_key}`,
        rawUrl: row.image_url,
        title: meta?.title || row.category_key,
        subtitle: normalizeSubtitle(meta?.subtitle || "Saved page image", row.gender),
        source: "pages",
        createdAt: row.created_at || null,
        usages: ["Website page"],
      });
    }

    if (profile?.avatar_url && user) {
      records.push({
        id: `profile-${user.id}`,
        rawUrl: profile.avatar_url,
        title: profile.display_name || "Profile photo",
        subtitle: "Saved from your profile",
        source: "profile",
        createdAt: profile.updated_at ?? null,
        usages: ["Top bar", "Settings", "Connection identity"],
      });
    }

    for (const row of cardEntries || []) {
      if (!row.image_url) continue;
      records.push({
        id: `card-${row.id}`,
        rawUrl: row.image_url,
        title: row.entry_name || "Untitled card",
        subtitle: normalizeSubtitle(row.group_name, row.card_key),
        source: "cards",
        createdAt: row.updated_at || row.created_at || null,
        usages: ["My Go Two card"],
      });
    }

    for (const row of customTemplates || []) {
      if (!row.image_url) continue;
      records.push({
        id: `template-${row.id}`,
        rawUrl: row.image_url,
        title: row.name || "Custom template",
        subtitle: row.category || "Template",
        source: "templates",
        createdAt: row.created_at || null,
        usages: ["Custom template"],
      });
    }

    for (const row of couples || []) {
      if (!row.photo_url) continue;
      records.push({
        id: `connection-${row.id}`,
        rawUrl: row.photo_url,
        title: row.display_label || "Connection photo",
        subtitle: "Saved from connections",
        source: "connections",
        createdAt: row.updated_at || row.created_at || null,
        usages: ["Dashboard home", "Connection card"],
      });
    }

    const grouped = new Map<string, Omit<GalleryPhoto, "id" | "resolvedUrl">>();
    for (const record of records) {
      const existing = grouped.get(record.rawUrl);
      if (existing) {
        existing.usages = uniqueStrings([...existing.usages, ...record.usages]);
        if (!existing.createdAt || (record.createdAt && record.createdAt > existing.createdAt)) {
          existing.createdAt = record.createdAt;
          existing.title = record.title;
          existing.subtitle = record.subtitle;
          existing.source = record.source;
        }
        continue;
      }

      grouped.set(record.rawUrl, { ...record });
    }

    const resolved = await Promise.all(
      Array.from(grouped.values()).map(async (record, index) => ({
        id: `${record.source}-${index}`,
        rawUrl: record.rawUrl,
        resolvedUrl: await resolveStorageUrl(record.rawUrl),
        title: record.title,
        subtitle: record.subtitle,
        source: record.source,
        createdAt: record.createdAt,
        usages: uniqueStrings(record.usages),
      })),
    );

    setPhotos(
      resolved
        .filter((record) => !!record.resolvedUrl)
        .sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTime - aTime;
        }),
    );
    setLoading(false);
    setRefreshing(false);
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    void loadPhotos();
  }, [authLoading, loadPhotos]);

  const filteredPhotos = useMemo(() => {
    if (filter === "all") return photos;
    return photos.filter((photo) => photo.source === filter);
  }, [photos, filter]);

  const counts = useMemo(
    () =>
      photos.reduce<Record<SourceKind, number>>(
        (acc, photo) => {
          acc[photo.source] += 1;
          return acc;
        },
        { pages: 0, cards: 0, templates: 0, profile: 0, connections: 0 },
      ),
    [photos],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <h1 className="text-lg font-semibold">Photo Gallery</h1>
            <p className="text-xs text-muted-foreground">
              Every saved photo across page images, cards, templates, profile, and connections.
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
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {!user && !authLoading && (
          <div className="mb-6 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            Showing page photos. Sign in to also see photos saved in your cards, templates, profile, and connections.
          </div>
        )}

        <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {FILTERS.map((item) => {
            const count = item.key === "all" ? photos.length : counts[item.key as SourceKind];

            return (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                  filter === item.key
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:bg-muted/50"
                }`}
              >
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="text-xs text-muted-foreground">
                  {count} photo{count === 1 ? "" : "s"}
                </div>
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
            Loading photos...
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-border bg-card/50 px-6 text-center">
            <Images className="h-10 w-10 text-muted-foreground" />
            <div>
              <h2 className="text-lg font-semibold">No photos here yet</h2>
              <p className="text-sm text-muted-foreground">
                This filter does not have any saved images yet.
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
                    src={photo.resolvedUrl}
                    alt={photo.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{photo.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{photo.subtitle}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {SOURCE_LABELS[photo.source]}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {photo.usages.map((usage) => (
                      <span
                        key={usage}
                        className="rounded-full border border-border px-2 py-1 text-[10px] text-muted-foreground"
                      >
                        {usage}
                      </span>
                    ))}
                  </div>

                  {photo.createdAt && (
                    <p className="text-xs text-muted-foreground">Saved {formatDate(photo.createdAt)}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
