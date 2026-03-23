

## Stacked Vertical Coverflow Behind Active Section

The active section's horizontal coverflow stays exactly as-is. Behind it, the other sections' coverflows are rendered as a **vertical stack** — like a deck of cards where each "card" is an entire coverflow row. They peek out above and below the active section, offset vertically and scaled slightly down, creating depth.

### How it works

At Level 1 in `MyGoTwo.tsx`, instead of rendering sections as separate snap-scrolling `coverflow-stage-shell` divs, render them as a **stacked deck** — all sections occupy the same viewport space, with the active section on top and others layered behind with vertical offsets.

### Changes

**1. `src/pages/dashboard/MyGoTwo.tsx` — Stacked deck rendering**

Replace the `orderedSections.map(...)` block (lines 778–795) with a stacked layout:
- All sections render inside a single `coverflow-stage-shell`
- Each section is absolutely positioned
- The active section: `z-index: 10`, `scale: 1`, `y: 0`
- Sections above: offset upward (`y: -30px * distance`), `scale: 0.95`, lower z-index
- Sections below: offset downward, same scaling pattern
- Use Framer Motion `animate` for smooth transitions when `activeSectionIndex` changes
- Tapping a peeking section sets `activeSectionIndex` to that section (replaces snap-scroll navigation)

**2. `src/index.css` — Adjust stage shell**

Add a stacked variant or modify the existing shell to support `position: relative` for the container with absolutely positioned children.

### Visual result

```text
       ┌─── other section (peek top) ───┐   ← offset -30px, scale 0.95
      ┌┤─── other section (peek top) ───┤┐  ← offset -16px, scale 0.97
  ┌───┤┤═══ ACTIVE SECTION COVERFLOW ═══┤┤───┐
  │   ││  [pill] [CARD] [pill]          ││   │  ← full size, z-index top
  └───┤┤════════════════════════════════┤┤───┘
      └┤─── other section (peek bot) ───┤┘  ← offset +16px, scale 0.97
       └─── other section (peek bot) ───┘   ← offset +30px, scale 0.95
```

### Interaction
- Tapping a peeking section brings it to the front (becomes the active section)
- The vertical snap-scroll is replaced by this stacked deck navigation at Level 1
- Existing horizontal swipe within each coverflow is unchanged

### Technical details

- Each stacked section still renders a full `GoTwoCoverFlow` but only the active one is interactive (pointer-events)
- Background sections get `pointer-events: none` except for a click overlay to select them
- The section dots on the right side remain and sync with `activeSectionIndex`
- Framer Motion `layout` or `animate` handles the vertical offset transitions

| File | Change |
|---|---|
| `src/pages/dashboard/MyGoTwo.tsx` | Replace snap-scroll sections with stacked deck layout |
| `src/index.css` | Add stacked container styles |

