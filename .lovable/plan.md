

## Fix: Active Card Position Consistency Across Levels

The active center card on the Level 1 stacked deck is in a different viewport position than the active card on deeper levels (Level 2+). The card must sit at the exact same coordinates on every screen.

### Root cause

- **Deeper levels** use `.coverflow-stage-shell` which has `padding-top: 18px`, then a 62px title pill, then the carousel stage — the card lands at a specific vertical offset.
- **Level 1 stacked deck** uses `.stacked-deck-layer` with `padding-top: 18px` but the `GoTwoCoverFlow` component now renders the `sectionTitle` **inside** the card (no external title pill). This means the card sits higher because there's no 62px title pill pushing it down.

### Fix

**`src/index.css`** — Adjust `.stacked-deck-layer` padding-top to account for the missing external title pill. Since deeper levels have 18px shell padding + 62px title pill = 80px before the carousel stage, the stacked deck layer needs the same effective offset so the card lands in the same spot.

- Set `.stacked-deck-layer` `padding-top` to match the total offset used by `.coverflow-stage-shell` + title pill (80px)
- Set `.stacked-deck-layer--bg` `padding-top` to match so background hero cards also align to the same center-card position

**`src/pages/dashboard/MyGoTwo.tsx`** — No structural changes needed, just the CSS alignment fix ensures the GoTwoCoverFlow's stage places the active card at the same viewport position as TemplateCoverFlow on deeper levels.

| File | Change |
|---|---|
| `src/index.css` | Adjust stacked-deck-layer padding to match coverflow-stage-shell + title pill offset |

