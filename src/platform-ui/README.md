# Platform UI Scaffold

This folder is a UI-only platform split scaffold for future web/mobile divergence.

## Purpose

- Keep shared app data, backend logic, and assets intact.
- Enable separate web and mobile layout/motion systems.
- Provide a clean location for platform-specific UI components.

## Boundaries

- Allowed here: layout tokens, animation tokens, platform UI wrappers, platform UI implementations.
- Not allowed here: API calls, Supabase logic, data transforms, schema logic, or business rules.

## Rules

- Mobile is frozen by default and should stay baseline-equivalent unless explicitly approved.
- Web can evolve independently for layout and animation.
- Platform component naming:
  - Implementations: `*.web.tsx` and `*.mobile.tsx`
  - Shared wrappers: `*Platform.tsx`

