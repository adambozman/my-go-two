# Lint Audit

This file tracks the current lint-check status so it stays visible between sessions.

## Current Status

- `npm.cmd run build`: passes
- `npm.cmd run lint`: fails

## Current Lint Totals

- `123` errors
- `22` warnings

## Main Error Types

- `@typescript-eslint/no-explicit-any`
- `no-empty`
- `react-hooks/exhaustive-deps`
- `@typescript-eslint/no-empty-object-type`
- `@typescript-eslint/no-require-imports`
- `no-useless-escape`

## Priority Files

These are the most relevant files to clean first because they affect My Go Two and shared flow behavior:

- `src/pages/dashboard/MyGoTwo.tsx`
- `src/hooks/useCategoryRegistry.ts`
- `src/components/TemplateCoverFlow.tsx`
- `src/components/ui/CoverFlowCarousel.tsx`
- `src/components/ui/FormCoverFlowCarousel.tsx`
- `src/pages/dashboard/Recommendations.tsx`
- `src/contexts/PersonalizationContext.tsx`

## Important Notes

- The app currently builds successfully.
- The lint failures are mostly repo-wide code-quality issues, not a current build break.
- The first build failure during verification was an environment sandbox/process restriction, not an app compile error.

## Recommended Cleanup Order

1. My Go Two flow files
2. Shared coverflow components
3. Registry/data hooks
4. Personalization/recommendation files
5. General repo-wide `any` cleanup
