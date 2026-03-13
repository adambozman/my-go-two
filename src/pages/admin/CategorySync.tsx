import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORY_REGISTRY_SEED, ROWS_BY_SECTION, CategoryRegistryRow } from "@/data/categoryRegistrySeed";

type SectionStatus = {
  total: number;
  inserted: number;
  updated: number;
  errors: string[];
  status: "idle" | "running" | "done" | "error";
  existingCount?: number;
};

const SECTION_LABELS: Record<string, string> = {
  "style-fit": "Style & Fit",
  "food-drink": "Food & Drink",
  "gifts-wishlist": "Gifts & Wishlist",
  "home-living": "Home & Living",
  "entertainment": "Entertainment & Interests",
};

export default function CategorySync() {
  const [sectionStatus, setSectionStatus] = useState<Record<string, SectionStatus>>({});
  const [globalStatus, setGlobalStatus] = useState<"idle" | "running" | "done">("idle");
  const [dbCounts, setDbCounts] = useState<Record<string, number>>({});

  const updateSection = (section: string, patch: Partial<SectionStatus>) => {
    setSectionStatus(prev => ({
      ...prev,
      [section]: { ...prev[section], ...patch },
    }));
  };

  const fetchDbCounts = async () => {
    const counts: Record<string, number> = {};
    for (const section of Object.keys(ROWS_BY_SECTION)) {
      const { count } = await supabase
        .from("category_registry")
        .select("*", { count: "exact", head: true })
        .eq("section", section)
        .eq("page", "mygotwo");
      counts[section] = count ?? 0;
    }
    setDbCounts(counts);
  };

  const syncSection = async (section: string) => {
    const rows = ROWS_BY_SECTION[section];
    updateSection(section, {
      total: rows.length,
      inserted: 0,
      updated: 0,
      errors: [],
      status: "running",
    });

    let inserted = 0;
    let updated = 0;
    const errors: string[] = [];

    for (const row of rows) {
      const payload = {
        key: row.key,
        label: row.label,
        section: row.section,
        page: row.page,
        genders: row.genders,
        sort_order: row.sort_order,
        is_active: row.is_active,
        fields: row.fields as never,
        subcategories: row.subcategories as never,
        is_system: true,
        is_shared: false,
        level: 2,
      };

      // Check if exists
      const { data: existing } = await supabase
        .from("category_registry")
        .select("id")
        .eq("key", row.key)
        .eq("page", "mygotwo")
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("category_registry")
          .update(payload)
          .eq("id", existing.id);
        if (error) {
          errors.push(`UPDATE ${row.key}: ${error.message}`);
        } else {
          updated++;
        }
      } else {
        const { error } = await supabase
          .from("category_registry")
          .insert(payload);
        if (error) {
          errors.push(`INSERT ${row.key}: ${error.message}`);
        } else {
          inserted++;
        }
      }

      updateSection(section, { inserted, updated, errors });
    }

    updateSection(section, {
      status: errors.length > 0 ? "error" : "done",
      inserted,
      updated,
      errors,
    });

    return errors.length === 0;
  };

  const syncAll = async () => {
    setGlobalStatus("running");
    setSectionStatus({});
    for (const section of Object.keys(ROWS_BY_SECTION)) {
      await syncSection(section);
    }
    setGlobalStatus("done");
    fetchDbCounts();
  };

  const syncOne = async (section: string) => {
    setGlobalStatus("running");
    await syncSection(section);
    setGlobalStatus("done");
    fetchDbCounts();
  };

  const deleteSection = async (section: string) => {
    if (!confirm(`Delete ALL rows for section "${section}" from the database? This cannot be undone.`)) return;
    const { error } = await supabase
      .from("category_registry")
      .delete()
      .eq("section", section)
      .eq("page", "mygotwo");
    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert(`Deleted all rows for ${section}`);
      fetchDbCounts();
    }
  };

  const statusColor = (status?: SectionStatus["status"]) => {
    if (!status || status === "idle") return "#6b7280";
    if (status === "running") return "#f59e0b";
    if (status === "done") return "#10b981";
    if (status === "error") return "#ef4444";
    return "#6b7280";
  };

  const statusIcon = (status?: SectionStatus["status"]) => {
    if (!status || status === "idle") return "○";
    if (status === "running") return "⟳";
    if (status === "done") return "✓";
    if (status === "error") return "✗";
    return "○";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f0f0f",
      color: "#e5e7eb",
      fontFamily: "monospace",
      padding: "32px",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{
              width: 10, height: 10, borderRadius: "50%",
              background: globalStatus === "running" ? "#f59e0b" : globalStatus === "done" ? "#10b981" : "#6b7280",
            }} />
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#f9fafb" }}>
              Category Registry Sync
            </h1>
          </div>
          <p style={{ color: "#6b7280", fontSize: 13, margin: 0 }}>
            {CATEGORY_REGISTRY_SEED.length} rows across {Object.keys(ROWS_BY_SECTION).length} sections · Upserts by key, safe to re-run anytime
          </p>
        </div>

        {/* Global actions */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          <button
            onClick={syncAll}
            disabled={globalStatus === "running"}
            style={{
              background: "#2d6870",
              color: "#fff",
              border: "none",
              padding: "10px 24px",
              borderRadius: 8,
              fontFamily: "monospace",
              fontSize: 14,
              fontWeight: 600,
              cursor: globalStatus === "running" ? "not-allowed" : "pointer",
              opacity: globalStatus === "running" ? 0.6 : 1,
            }}
          >
            {globalStatus === "running" ? "⟳ Syncing..." : "↑ Sync All Sections"}
          </button>
          <button
            onClick={fetchDbCounts}
            style={{
              background: "transparent",
              color: "#9ca3af",
              border: "1px solid #374151",
              padding: "10px 20px",
              borderRadius: 8,
              fontFamily: "monospace",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            ↻ Refresh DB Counts
          </button>
        </div>

        {/* Section cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.entries(ROWS_BY_SECTION).map(([section, rows]) => {
            const st = sectionStatus[section];
            const dbCount = dbCounts[section];
            const seedCount = rows.length;
            const inSync = dbCount === seedCount;

            return (
              <div
                key={section}
                style={{
                  background: "#1a1a1a",
                  border: `1px solid ${st?.status === "error" ? "#7f1d1d" : st?.status === "done" ? "#064e3b" : "#2d2d2d"}`,
                  borderRadius: 10,
                  padding: "20px 24px",
                }}
              >
                {/* Section header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ color: statusColor(st?.status), fontSize: 16 }}>
                        {statusIcon(st?.status)}
                      </span>
                      <span style={{ fontWeight: 700, fontSize: 15, color: "#f9fafb" }}>
                        {SECTION_LABELS[section] || section}
                      </span>
                      <span style={{
                        fontSize: 11,
                        background: "#2d2d2d",
                        color: "#9ca3af",
                        padding: "2px 8px",
                        borderRadius: 4,
                      }}>
                        {section}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      Seed: <span style={{ color: "#d1d5db" }}>{seedCount} rows</span>
                      {dbCount !== undefined && (
                        <>
                          {" · "}DB: <span style={{ color: inSync ? "#10b981" : "#f59e0b" }}>{dbCount} rows</span>
                          {" · "}
                          <span style={{ color: inSync ? "#10b981" : "#f59e0b" }}>
                            {inSync ? "✓ in sync" : "⚠ out of sync"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => syncOne(section)}
                      disabled={globalStatus === "running"}
                      style={{
                        background: "#2d6870",
                        color: "#fff",
                        border: "none",
                        padding: "6px 16px",
                        borderRadius: 6,
                        fontFamily: "monospace",
                        fontSize: 12,
                        cursor: globalStatus === "running" ? "not-allowed" : "pointer",
                        opacity: globalStatus === "running" ? 0.5 : 1,
                      }}
                    >
                      Sync
                    </button>
                    <button
                      onClick={() => deleteSection(section)}
                      disabled={globalStatus === "running"}
                      style={{
                        background: "transparent",
                        color: "#ef4444",
                        border: "1px solid #7f1d1d",
                        padding: "6px 16px",
                        borderRadius: 6,
                        fontFamily: "monospace",
                        fontSize: 12,
                        cursor: globalStatus === "running" ? "not-allowed" : "pointer",
                        opacity: globalStatus === "running" ? 0.5 : 1,
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                {st && st.status === "running" && (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ background: "#2d2d2d", borderRadius: 4, height: 4, overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        background: "#2d6870",
                        borderRadius: 4,
                        width: `${Math.round(((st.inserted + st.updated) / st.total) * 100)}%`,
                        transition: "width 0.2s",
                      }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>
                      {st.inserted + st.updated} / {st.total} rows processed
                    </div>
                  </div>
                )}

                {/* Done stats */}
                {st && (st.status === "done" || st.status === "error") && (
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    <span style={{ color: "#10b981" }}>+{st.inserted} inserted</span>
                    {" · "}
                    <span style={{ color: "#60a5fa" }}>↺ {st.updated} updated</span>
                    {st.errors.length > 0 && (
                      <>
                        {" · "}
                        <span style={{ color: "#ef4444" }}>{st.errors.length} errors</span>
                        <div style={{ marginTop: 8, background: "#1f1010", borderRadius: 6, padding: "8px 12px" }}>
                          {st.errors.map((e, i) => (
                            <div key={i} style={{ color: "#f87171", fontSize: 11, marginBottom: 2 }}>{e}</div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Row preview */}
                <details style={{ marginTop: 12 }}>
                  <summary style={{ fontSize: 11, color: "#4b5563", cursor: "pointer", userSelect: "none" }}>
                    {seedCount} rows in seed ▾
                  </summary>
                  <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {rows.map(row => (
                      <span key={row.key} style={{
                        fontSize: 10,
                        background: "#2d2d2d",
                        color: "#9ca3af",
                        padding: "2px 8px",
                        borderRadius: 4,
                      }}>
                        {row.key} [{row.genders.join("/")}]
                      </span>
                    ))}
                  </div>
                </details>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid #1f1f1f", fontSize: 11, color: "#374151" }}>
          <p>Route: <code style={{ color: "#4b5563" }}>/admin/category-sync</code></p>
          <p>To add new data: edit the migration SQL → run <code style={{ color: "#4b5563" }}>npm run generate:seed</code> → hit Sync All.</p>
          <p>All syncs are upserts keyed on <code style={{ color: "#4b5563" }}>key + page</code>. Safe to run multiple times.</p>
        </div>
      </div>
    </div>
  );
}
