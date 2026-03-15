

## Plan: Multi-Entry System Using Coverflow

### Current flow
Section coverflow → Category coverflow → Subcategory coverflow → **FieldForm (single save)**

### New flow
Section coverflow → Category coverflow → Subcategory coverflow → **User Groups coverflow** → **Entries coverflow** → FieldForm

When a user reaches what is currently level 4 (the leaf card, e.g. "Fast Food"), instead of opening a single form, they see a coverflow of their **user-created groups** (e.g. "Taco Bell", "McDonald's") plus a special "+ New Group" card. Tapping a group shows that group's **entries** as another coverflow (e.g. "My usual", "Late night") plus a "+ New Entry" card. Tapping an entry opens the existing FieldForm to edit it.

### Database

**New table: `card_entries`**

```sql
CREATE TABLE public.card_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  card_key text NOT NULL,
  group_name text NOT NULL,
  entry_name text NOT NULL,
  field_values jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_card_entries_user_key ON public.card_entries(user_id, card_key);
ALTER TABLE public.card_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own entries" ON public.card_entries FOR ALL
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Partners can view entries" ON public.card_entries FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM couples
    WHERE couples.status = 'accepted'
      AND ((couples.inviter_id = card_entries.user_id AND couples.invitee_id = auth.uid())
        OR (couples.invitee_id = card_entries.user_id AND couples.inviter_id = auth.uid()))
  ));

CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.card_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

### UI changes (MyGoTwo.tsx)

Replace the current `FieldForm` terminal state with two new coverflow levels:

1. **Group Coverflow** — When a user selects a leaf card, query `card_entries` for that `card_key` and extract distinct `group_name` values. Render each group as a coverflow card using the existing `CoverFlowCarousel`. The last card is always a styled "+ New Group" card. Tapping it shows a name prompt (modal or inline). Tapping an existing group drills into entries.

2. **Entry Coverflow** — Filter entries by selected `group_name`. Render each as a coverflow card labeled with `entry_name`. Last card is "+ New Entry" which prompts for entry name first, then opens the FieldForm. Tapping an existing entry opens FieldForm pre-filled for editing.

3. **FieldForm** — Largely unchanged. Save does `INSERT` (new) or `UPDATE` (existing) on `card_entries` instead of upserting `user_preferences.favorites`. Add a delete button for existing entries.

The `card_key` format stays: `${coverFlowState.name}__${subcategoryName || ""}__${subtype.name}`.

### Back navigation

Extends the existing pattern with two new levels:
- FieldForm → Entry Coverflow
- Entry Coverflow → Group Coverflow  
- Group Coverflow → previous level (existing)

### New state in MyGoTwo

- `activeGroup: { name: string } | null` — which group is selected
- `editingEntry: CardEntry | null` — which entry is being edited (null = new)
- `entries: CardEntry[]` — fetched from DB when reaching the group/entry level

### Files to modify
- **New migration** — `card_entries` table + RLS + trigger
- **`src/pages/dashboard/MyGoTwo.tsx`** — Add group coverflow + entry coverflow levels, refactor FieldForm save to use `card_entries`, wire back navigation
- **`src/pages/Search.tsx`** — Add `card_entries` to search results (group_name, entry_name, field_values)

