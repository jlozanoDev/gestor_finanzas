# Auth and API

## Recommended split of responsibilities

- `shared/config/env.ts`: environment access
- `shared/services/api/http.ts`: common request behavior
- `modules/<feature>/services/*.api.ts`: endpoint-specific calls
- `modules/<feature>/stores/*.ts`: business state and async flow
- `modules/<feature>/composables/*.ts`: UI-facing orchestration when needed

## Sanctum fit

Choose Sanctum when:

1. Laravel owns the main web platform.
2. Cookie-based auth is acceptable.
3. The app benefits from standard Laravel session patterns.

## JWT fit

Choose JWT when:

1. The frontend is deployed separately.
2. Multiple clients will consume the same API.
3. Token lifecycle is acceptable as explicit frontend work.

## Frontend reminders

- Keep token or session handling out of presentational components.
- Reflect auth mode consistently across guards, store, and request layer.
- Keep API assumptions documented when a Laravel contract is introduced.
