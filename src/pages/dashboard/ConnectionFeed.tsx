import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Clock3, RefreshCw, UserRound } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { resolveStorageUrl } from "@/lib/storageRefs";

interface ConnectionFeedRow {
  feed_item_id: string;
  couple_id: string;
  connection_label: string | null;
  item_kind: string | null;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  section: string | null;
  event_at: string | null;
}

function formatRelativeDateLabel(value?: string | null) {
  if (!value) return "Just updated";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just updated";

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.round(diffMs / 86400000);

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

const sectionLabelMap: Record<string, string> = {
  style: "Style & Fit",
  food: "Food & Drink",
  favorites: "Favorites",
  personal: "Personal",
  profile: "Profile",
  derived: "Derived",
  calendar: "Calendar",
  everyday: "Everyday",
};

export default function ConnectionFeed() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCoupleId = searchParams.get("coupleId");
  const [rows, setRows] = useState<ConnectionFeedRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoupleId, setSelectedCoupleId] = useState<string>(initialCoupleId || "all");
  const [resolvedImages, setResolvedImages] = useState<Record<string, string>>({});

  useEffect(() => {
    const coupleIdFromQuery = searchParams.get("coupleId");
    setSelectedCoupleId(coupleIdFromQuery || "all");
  }, [searchParams]);

  const loadFeed = useCallback(async () => {
    setLoading(true);
    const { data } = await (supabase.rpc as any)("get_connection_feed", {
      p_limit: 120,
      p_couple_id: selectedCoupleId === "all" ? null : selectedCoupleId,
    });

    setRows(Array.isArray(data) ? (data as ConnectionFeedRow[]) : []);
    setLoading(false);
  }, [selectedCoupleId]);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  useEffect(() => {
    let cancelled = false;

    const loadImages = async () => {
      const imageValues = Array.from(new Set(rows.map((row) => row.image_url).filter(Boolean)));
      if (imageValues.length === 0) {
        if (!cancelled) setResolvedImages({});
        return;
      }

      const nextEntries = await Promise.all(
        imageValues.map(async (value) => [value as string, await resolveStorageUrl(value)] as const),
      );

      if (!cancelled) {
        setResolvedImages(Object.fromEntries(nextEntries));
      }
    };

    loadImages();

    return () => {
      cancelled = true;
    };
  }, [rows]);

  const connectionFilters = useMemo(() => {
    const map = new Map<string, string>();
    rows.forEach((row) => {
      map.set(row.couple_id, row.connection_label || "Connection");
    });
    return Array.from(map.entries()).map(([id, label]) => ({ id, label }));
  }, [rows]);

  return (
    <div className="min-h-screen p-6 md:p-8">
      <section
        className="mx-auto w-full max-w-[1360px] rounded-[34px] p-6 md:p-8"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.64) 0%, rgba(244,237,227,0.72) 100%)",
          border: "1px solid rgba(255,255,255,0.84)",
          boxShadow: "0 18px 44px rgba(30,74,82,0.08), inset 0 1px 0 rgba(255,255,255,0.58)",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em]"
            style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.74)", border: "1px solid rgba(255,255,255,0.88)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back Home
          </button>

          <div className="flex items-center gap-2">
            <select
              value={selectedCoupleId}
              onChange={(event) => {
                const nextValue = event.target.value;
                setSelectedCoupleId(nextValue);
                if (nextValue === "all") {
                  setSearchParams({});
                } else {
                  setSearchParams({ coupleId: nextValue });
                }
              }}
              className="rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] outline-none"
              style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.74)", borderColor: "rgba(255,255,255,0.88)" }}
            >
              <option value="all">All Connections</option>
              {selectedCoupleId !== "all" && !connectionFilters.find((filter) => filter.id === selectedCoupleId) ? (
                <option value={selectedCoupleId}>Selected Connection</option>
              ) : null}
              {connectionFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>
                  {filter.label}
                </option>
              ))}
            </select>

            <button
              onClick={loadFeed}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em]"
              style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.74)", border: "1px solid rgba(255,255,255,0.88)" }}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[10px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-cedar-grove)" }}>
            Connection Feed
          </p>
          <h1 className="mt-2 text-[54px] leading-[0.94]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
            Updates from your people.
          </h1>
        </div>

        <div className="mt-7 space-y-3">
          {loading ? (
            <div className="rounded-[24px] px-5 py-6" style={{ background: "rgba(255,255,255,0.62)", border: "1px solid rgba(255,255,255,0.84)" }}>
              <p className="text-sm" style={{ color: "var(--swatch-text-light)" }}>Loading connection feed...</p>
            </div>
          ) : rows.length === 0 ? (
            <div className="rounded-[24px] px-5 py-6" style={{ background: "rgba(255,255,255,0.62)", border: "1px solid rgba(255,255,255,0.84)" }}>
              <p className="text-sm" style={{ color: "var(--swatch-text-light)" }}>No connection feed updates yet.</p>
            </div>
          ) : (
            rows.map((row) => (
              <article
                key={row.feed_item_id}
                className="rounded-[24px] p-4 md:p-5"
                style={{ background: "rgba(255,255,255,0.66)", border: "1px solid rgba(255,255,255,0.86)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "white", background: "rgba(30,74,82,0.76)" }}>
                        {sectionLabelMap[row.section || "everyday"] || "Everyday"}
                      </span>
                      <span className="rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.14em]" style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.74)", border: "1px solid rgba(255,255,255,0.86)" }}>
                        {row.connection_label || "Connection"}
                      </span>
                    </div>

                    <h2 className="mt-3 text-[31px] leading-[0.95]" style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--swatch-teal)" }}>
                      {row.title || "Shared update"}
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--swatch-antique-coin)" }}>
                      {row.body || row.subtitle || "Shared a new update with you."}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-[11px]" style={{ color: "var(--swatch-text-light)" }}>
                      <Clock3 className="h-3.5 w-3.5" />
                      <span>{formatRelativeDateLabel(row.event_at)}</span>
                    </div>
                  </div>

                  {(resolvedImages[row.image_url || ""] || row.image_url) ? (
                    <img
                      src={resolvedImages[row.image_url || ""] || row.image_url || ""}
                      alt={row.title || "Connection update"}
                      className="h-24 w-24 rounded-[18px] object-cover"
                      style={{ border: "1px solid rgba(255,255,255,0.9)" }}
                    />
                  ) : (
                    <span className="inline-flex h-24 w-24 items-center justify-center rounded-[18px]" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)" }}>
                      <UserRound className="h-5 w-5" style={{ color: "var(--swatch-text-light)" }} />
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => navigate(`/dashboard/connections/${row.couple_id}`)}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.12em]"
                    style={{ fontFamily: "'Jost', sans-serif", color: "var(--swatch-teal)", background: "rgba(255,255,255,0.76)", border: "1px solid rgba(255,255,255,0.88)" }}
                  >
                    Open Connection
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
