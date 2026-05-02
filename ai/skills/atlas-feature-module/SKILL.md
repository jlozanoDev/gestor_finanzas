---
name: atlas-feature-module
description: Create or extend domain features in Atlas Finanzas using the repository's Vue 3 modular architecture. Use when adding or refactoring modules, routes, views, feature components, Pinia stores, composables, services, or domain types inside src/modules.
---

# Atlas Feature Module

## Follow the module-first workflow

1. Start from the target domain in `src/modules`.
2. Keep all feature code inside the module unless it is already shared by multiple domains.
3. Touch `shared/` only for truly reusable primitives.
4. Keep routes in `feature.routes.ts` and compose them from `src/router/routes.ts`.
5. Prefer lazy-loaded views.

## Place code by responsibility

- Put screens in `views/`.
- Put feature-only UI in `components/`.
- Put business state in `stores/`.
- Put network or backend-facing logic in `services/`.
- Put reusable feature logic in `composables/`.
- Put contracts in `types/`.

Read [references/module-checklist.md](/C:/Users/j-loz/Documents/01.Proyectos/gestor_finanzas/ai/skills/atlas-feature-module/references/module-checklist.md) before creating a new module or moving files across boundaries.

## Keep a thin view layer

- Let the view compose layout and feature sections.
- Let the component handle presentation and local interaction.
- Let the composable own complex form or interaction logic.
- Let the store own asynchronous state and business actions.
- Let the service talk to HTTP clients and DTOs.

## Prefer predictable patterns

- Use Composition API with `<script setup>`.
- Use `useXxxStore.ts` for Pinia stores.
- Use `useXxx.ts` for composables.
- Use `feature.api.ts` for API services.
- Use `feature.types.ts` for feature contracts.

## Avoid these mistakes

- Do not add business logic directly inside route files.
- Do not call `fetch` from Vue components.
- Do not move first-use code into `shared/` just to "keep things DRY".
- Do not duplicate error formatting across stores and composables.

## Pair with other project skills when needed

- Read `atlas-shared-ui` together with this skill when the task introduces reusable UI.
- Read `atlas-quality-gates` together with this skill when the task changes tests, linting, or delivery readiness.
- Read `atlas-laravel-integration` together with this skill when the feature connects to backend auth or API flows.
