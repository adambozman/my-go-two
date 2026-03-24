# Platform Component Conventions

This folder holds UI-only platform component scaffolding.

## Pattern

- Wrapper entrypoint: `*Platform.tsx`
- Web implementation: `*.web.tsx`
- Mobile implementation: `*.mobile.tsx`

## Rules

- Wrappers define shared UI props contracts only.
- Implementations contain layout/animation differences only.
- Do not add backend, API, data transforms, or Supabase logic here.
- Mobile implementations are baseline-locked unless explicitly approved.

