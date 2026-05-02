---
name: atlas-quality-gates
description: Validate and maintain the quality toolchain of Atlas Finanzas. Use when changing linting, formatting, tests, CI/CD, build configuration, package scripts, or when preparing frontend changes for delivery and verification.
---

# Atlas Quality Gates

## Use this validation order

1. Check the scope of the change.
2. Run the smallest relevant verification first.
3. Escalate to broader checks only when the changed surface justifies it.
4. Keep the project scripts as the source of truth.

Read [references/verification-matrix.md](references/verification-matrix.md) before editing tooling or deciding what to verify.

## Preserve one way of working

- Prefer repository scripts over ad hoc commands.
- Keep lint, typecheck, test, and build aligned between local work and CI.
- Update documentation if a script or quality gate changes.
- Keep CI focused on deterministic checks that contributors can run locally.

## Tooling changes

- If `package.json` scripts change, verify that README or architecture docs still match.
- If Vite, Vitest, ESLint, Tailwind, or TypeScript config changes, look for cross-file drift.
- If a test dependency is added, ensure the config references it correctly.

## Pair with other project skills when needed

- Read `atlas-feature-module` too for feature work that needs targeted validation.
- Read `atlas-shared-ui` too when shared components or styling primitives change.
- Read `atlas-laravel-integration` too when backend connectivity affects env, HTTP, or auth behavior.
