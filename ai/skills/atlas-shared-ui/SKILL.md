---
name: atlas-shared-ui
description: Build or refine shared UI primitives and visual patterns for Atlas Finanzas. Use when creating reusable components, layout primitives, shared Tailwind patterns, accessibility improvements, or polishing the visual system without breaking module boundaries.
---

# Atlas Shared UI

## Treat shared UI as a design system layer

1. Keep shared components generic and domain-agnostic.
2. Prefer a small API over a highly configurable component.
3. Use Tailwind utilities directly unless the pattern is repeated enough to deserve abstraction.
4. Preserve the current visual direction unless the task explicitly asks for a redesign.

Read [references/ui-rules.md](/C:/Users/j-loz/Documents/01.Proyectos/gestor_finanzas/ai/skills/atlas-shared-ui/references/ui-rules.md) before adding or broadening any shared component.

## Build shared components carefully

- Use `PascalCase.vue` and the `Base` prefix for low-level primitives.
- Keep text, labels, and semantics neutral.
- Expose only the props that are necessary for real consumers.
- Prefer slots over prop explosion when composition is cleaner.
- Keep loading, disabled, and focus states explicit.

## Accessibility baseline

- Preserve keyboard access.
- Keep visible focus states.
- Use semantic elements before ARIA workarounds.
- Ensure contrast remains readable on the existing dark palette.

## Styling rules

- Reuse spacing, radius, and color patterns already present in the repo.
- Prefer shared tokens in Tailwind config if a value becomes repeated.
- Avoid ad hoc component-scoped styles unless Tailwind cannot express the need clearly.

## Pair with other project skills when needed

- Read `atlas-feature-module` too when the component is being introduced inside a feature and may or may not belong in `shared/`.
- Read `atlas-quality-gates` too when the change affects snapshots, tests, linting, or release readiness.
