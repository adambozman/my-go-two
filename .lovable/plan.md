

## Fix: Stacked Deck — Center Card Only, Stacked Above

The current implementation stacks the **entire coverflow** (title + all cards) and offsets downward. The user wants:
1. Only the **center card image** from other sections peeking behind — not the full coverflow with flanking pills and title
2. Stacked **above** (upward offset), not below
3. No title pill on the stacked background cards

### Approach

**`src/pages/dashboard/MyGoTwo.tsx`** — Change the stacked deck rendering:
- The **active section** renders normally: `CoverflowTitlePill` + full `GoTwoCoverFlow` (unchanged)
- **Non-active sections** render only a single static card (the center/active item's image from that section) — no coverflow, no title, no flanking pills
- Background cards offset **upward** (`y: -distance * 24`) instead of downward
- Background cards are just a styled `div` with the hero image, matching the active card dimensions and border-radius
- Tapping a background card sets `activeSectionIndex` to that section

**`src/index.css`** — Minor tweak: ensure stacked layers align to center properly

### Files

| File | Change |
|---|---|
| `src/pages/dashboard/MyGoTwo.tsx` | Non-active sections render only a single centered card image (no coverflow/title), offset upward |
| `src/index.css` | Adjust stacked layer alignment if needed |

