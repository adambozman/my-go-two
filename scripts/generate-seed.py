#!/usr/bin/env python3
"""
Re-generates src/data/categoryRegistrySeed.ts from supabase/migrations SQL files.
Run: python3 scripts/generate-seed.py

Add new sections by appending to MIGRATION_FILES below.
"""

import re, json, os, sys

MIGRATION_FILES = [
    ("style-fit",      "supabase/migrations/20260313200000_style_fit_full_rebuild.sql"),
    ("food-drink",     "supabase/migrations/20260313210000_food_drink_full_rebuild.sql"),
    ("gifts-wishlist", "supabase/migrations/20260313220000_gifts_wishlist.sql"),
    ("home-living",    "supabase/migrations/20260313230000_home_living.sql"),
    ("entertainment",  "supabase/migrations/20260313240000_entertainment.sql"),
]

OUTPUT_FILE = "src/data/categoryRegistrySeed.ts"

# ─── Parse ───────────────────────────────────────────────────────────────────

all_rows = []

for section, filepath in MIGRATION_FILES:
    if not os.path.exists(filepath):
        print(f"⚠  Missing: {filepath} — skipping")
        continue

    with open(filepath, 'r') as f:
        content = f.read()

    row_starts = [m.start() for m in re.finditer(r"\n\('", content)]
    if content.lstrip().startswith("('"):
        row_starts = [0] + row_starts

    rows_text = []
    for i, start in enumerate(row_starts):
        end = row_starts[i+1] if i+1 < len(row_starts) else len(content)
        rows_text.append(content[start:end].strip())

    section_rows = 0
    for row_text in rows_text:
        m = re.match(r"\('([^']+)','([^']+)','([^']+)','([^']+)',ARRAY\[([^\]]+)\],(\d+),(true|false),", row_text)
        if not m:
            continue

        key        = m.group(1)
        label      = m.group(2)
        sec        = m.group(3)
        page       = m.group(4)
        genders    = re.findall(r"'([^']+)'", m.group(5))
        sort_order = int(m.group(6))
        is_active  = m.group(7) == 'true'

        jsonb_blocks = re.findall(r"'(\[.*?\])'::jsonb", row_text, re.DOTALL)

        fields        = []
        subcategories = []

        if len(jsonb_blocks) >= 1:
            try: fields = json.loads(jsonb_blocks[0])
            except: pass
        if len(jsonb_blocks) >= 2:
            try: subcategories = json.loads(jsonb_blocks[1])
            except: pass

        # measurements rows store subcategory data in fields slot
        if key.startswith('measurements-') and fields and not subcategories:
            subcategories = fields
            fields = []

        all_rows.append({
            "key": key, "label": label, "section": sec, "page": page,
            "genders": genders, "sort_order": sort_order, "is_active": is_active,
            "fields": fields, "subcategories": subcategories,
        })
        section_rows += 1

    print(f"  ✓  {section}: {section_rows} rows")

# ─── Emit TypeScript ──────────────────────────────────────────────────────────

sections = {}
for row in all_rows:
    sections.setdefault(row['section'], []).append(row)

lines = [
    "// AUTO-GENERATED — do not edit directly.",
    "// Source: supabase/migrations/*.sql",
    "// Regenerate: python3 scripts/generate-seed.py",
    "",
    "export interface CategoryRegistryRow {",
    "  key: string;",
    "  label: string;",
    "  section: string;",
    "  page: string;",
    "  genders: string[];",
    "  sort_order: number;",
    "  is_active: boolean;",
    "  fields: unknown[];",
    "  subcategories: unknown[];",
    "}",
    "",
    "export const CATEGORY_REGISTRY_SEED: CategoryRegistryRow[] = ",
    json.dumps(all_rows, indent=2) + ";",
    "",
    f"export const SECTIONS = {json.dumps(list(sections.keys()))};",
    "",
    "export const ROWS_BY_SECTION: Record<string, CategoryRegistryRow[]> = {",
]
for sec in sections:
    lines.append(f"  '{sec}': CATEGORY_REGISTRY_SEED.filter(r => r.section === '{sec}'),")
lines.append("};")

output = "\n".join(lines)

with open(OUTPUT_FILE, 'w') as f:
    f.write(output)

print(f"\n✅  Wrote {len(all_rows)} rows → {OUTPUT_FILE} ({len(output):,} chars)")
print(f"    Sections: {', '.join(sections.keys())}")
