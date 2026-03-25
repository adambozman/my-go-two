# MyGoTwo Web Coverflow Baseline

This file preserves the approved web coverflow baseline for `MyGoTwo`.

Do not change this coverflow casually. If a future change is requested, compare it against this file first.

## Status

This is the current approved baseline as of 2026-03-25.

## Mounting

- Rendered directly as a sibling under the web header from `src/pages/dashboard/MyGoTwo.tsx`
- Not mounted through overlay containers, viewport shells, or extra positioning layers
- The header and the coverflow are rendered the same way at the page level: direct children of the page root

## Page Relationship

- The coverflow is visually independent from the page
- No invisible layout boxes are allowed around it
- No footers
- No empty layers
- No quote layer
- No shell layer influencing the deck

## Stage Geometry

- Root element: one `section` with `aria-label="My Go Two coverflow"`
- Width: `w-full max-w-[1220px]`
- Horizontal spacing: `px-4 sm:px-6 md:px-8`
- Vertical placement: `mt-[26vh]`
- Minimum stage height: `520px`

## Card Geometry

- Card width: `244px`
- Card height: `376px`
- Card corner radius: `34px`
- Cards are absolutely positioned from `left: 50%`, `top: 0`
- Cards are centered with `margin-left: -122px`
- Transform origin: `center bottom`
- Transform style: `preserve-3d`

## Card Poses

- `-3`: `x -452`, `y 104`, `scale 0.71`, `rotate -24`, `rotateY 32`, `zIndex 10`
- `-2`: `x -320`, `y 57`, `scale 0.81`, `rotate -16`, `rotateY 22`, `zIndex 20`
- `-1`: `x -172`, `y 17`, `scale 0.94`, `rotate -8`, `rotateY 11`, `zIndex 30`
- `0`: `x 0`, `y 0`, `scale 1.17`, `rotate 0`, `rotateY 0`, `zIndex 40`
- `1`: `x 172`, `y 17`, `scale 0.94`, `rotate 8`, `rotateY -11`, `zIndex 30`
- `2`: `x 320`, `y 57`, `scale 0.81`, `rotate 16`, `rotateY -22`, `zIndex 20`
- `3`: `x 452`, `y 104`, `scale 0.71`, `rotate 24`, `rotateY -32`, `zIndex 10`

## Stage Offset

- Internal deck offset: `STAGE_OFFSET_Y = 56`
- This offset is part of the approved composition and should be preserved unless the user requests otherwise

## Active Card Position

- The active card is intentionally mounted slightly lower than the middle of the page
- The card should sit just below page midpoint, not centered above it

## Motion

- Duration: `0.62s`
- Easing: `[0.22, 1, 0.36, 1]`
- Reduced motion: duration `0`
- No blur
- No overlay tint
- No brightness or saturation treatment
- Cards render full color

## Hover

- Hover is only applied to non-active side cards
- Hover scale increase: `0.03`
- Hover lift: `-10px`

## Controls

- Controls are part of the same stage
- Controls are positioned at `top: 438 + STAGE_OFFSET_Y`
- Left control:
  - size `56px`
  - blurred white glass background
- Right control:
  - size `56px`
  - orange gradient background
- Dots:
  - inactive `8px`
  - active `28px`
  - active dot is black

## Visual Rules

- Cards must remain full color
- The circular dip is reduced from the earlier deeper version by 25 percent
- The current dip amount is approved
- Do not add opacity fades to the cards
- Do not add blur to the cards
- Do not add overlay treatments to the cards

## Interaction

- Click side card to promote it
- Left and right arrow buttons move one card at a time
- Keyboard arrows are enabled

## Files

- `src/pages/dashboard/MyGoTwo.tsx`
- `src/platform-ui/web/mygotwo/MyGoTwoWebCoverflowStage.tsx`
