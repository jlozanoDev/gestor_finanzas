---
name: atlas-laravel-integration
description: Connect Atlas Finanzas to a Laravel backend with clear frontend boundaries. Use when wiring API calls, auth flows, environment variables, Sanctum or JWT strategies, request layers, DTO mapping, or backend-aware frontend modules.
---

# Atlas Laravel Integration

## Keep the frontend boundary explicit

1. Read backend-facing values from `src/shared/config/env.ts`.
2. Keep transport logic in `src/shared/services/api`.
3. Keep domain-specific API calls inside each module service.
4. Keep backend response shaping out of presentational components.

Read [references/auth-and-api.md](/C:/Users/j-loz/Documents/01.Proyectos/gestor_finanzas/ai/skills/atlas-laravel-integration/references/auth-and-api.md) before adding auth or changing the HTTP contract.

## Integration rules

- Use `VITE_API_BASE_URL` as the backend entry point.
- Keep shared HTTP behavior in the common client.
- Let feature services adapt DTOs to frontend-friendly shapes when needed.
- Surface user-friendly errors through stores and composables.

## Auth guidance

- Prefer Sanctum when frontend and Laravel share a controlled ecosystem or same-site cookie model.
- Prefer JWT with refresh flow when the frontend is strongly decoupled or multi-client.
- Keep auth decisions reflected in guards, stores, and HTTP behavior together.

## Pair with other project skills when needed

- Read `atlas-feature-module` too when the backend integration belongs to a specific domain.
- Read `atlas-quality-gates` too when env handling, tests, or CI behavior changes.
