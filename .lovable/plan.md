

## Fix: Vertical Coverflow — True Continuous Circular Carousel

### Problems

1. **Vertical swipe is clamped** — stops at first/last section instead of wrapping around like horizontal does
2. **Desktop has no vertical navigation** — vertical swipe/scroll only works on mobile touch; desktop users can only click background cards
3. **Build errors** — `CoverFlowCarousel.tsx` has TypeScript errors on touch handler types (lines 136-137)

### Changes

| File | Change |
|---|---|
| `src/pages/dashboard/MyGoTwo.tsx` | Make vertical section navigation wrap circularly (modulo `orderedSections.length`) matching horizontal behavior. Add `wheel` event listener for desktop vertical scrolling between sections. The `distance` calculation already wraps — just fix `setActiveSectionIndex` to wrap too. |
| `src/components/ui/CoverFlowCarousel.tsx` | Fix TS errors: cast touch handler parameter types to `React.TouchEvent<HTMLDivElement>` instead of custom object types |

### Detail

**Vertical wrap fix** (MyGoTwo.tsx lines 789-794):
```tsx
// Before (clamped):
if (dy > 0 && activeSectionIndex < orderedSections.length - 1)
  setActiveSectionIndex(activeSectionIndex + 1);

// After (circular):
if (dy > 0)
  setActiveSectionIndex((activeSectionIndex + 1) % orderedSections.length);
else if (dy < 0)
  setActiveSectionIndex((activeSectionIndex - 1 + orderedSections.length) % orderedSections.length);
```

**Desktop wheel handler** — add `onWheel` to the stacked deck container that debounces and calls the same circular index change on vertical scroll.

**TS fix** (CoverFlowCarousel.tsx lines 104, 111) — use `React.TouchEvent<HTMLDivElement>` as the parameter type.

