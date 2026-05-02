# Module Checklist

## New feature checklist

1. Confirm the domain belongs in `src/modules/<feature>`.
2. Create only the folders the feature really needs.
3. Add routes in `feature.routes.ts`.
4. Keep store names and file names aligned.
5. Route backend access through `services/`.
6. Keep UI-only concerns out of the store.
7. Add or update tests when shared behavior changes.

## Boundary rules

- Move code to `shared/` only after a second real consumer appears.
- Keep feature-specific types close to the module.
- If a helper depends on domain vocabulary, it stays in the module.
- If a component has app-wide semantics and no business coupling, it can move to `shared/components`.

## Recommended feature flow

1. Define the route and the main view.
2. Create internal components only if the screen needs decomposition.
3. Add the composable when interaction logic starts to grow.
4. Add the store when state must survive between components or actions.
5. Add the service when the feature needs backend or mock integration.
