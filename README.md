# Atlas Finanzas

Base frontend profesional con Vue 3 + TypeScript + Vite, pensada para un producto de finanzas que necesita crecer por dominios sin caer en una estructura plana difícil de mantener.

## Stack

- Vue 3 con Composition API y `<script setup>`
- TypeScript
- Vite
- Vue Router
- Pinia
- TailwindCSS
- Vitest + Vue Test Utils
- ESLint + Prettier

## Scripts

- `npm run dev`: entorno local
- `npm run build`: build de producción
- `npm run preview`: preview local del build
- `npm run typecheck`: validación de tipos con `vue-tsc`
- `npm run lint`: reglas de calidad
- `npm run lint:fix`: auto-fix donde sea seguro
- `npm run format`: formato con Prettier
- `npm run format:check`: verificación de formato
- `npm run test`: tests unitarios
- `npm run test:watch`: tests en watch mode
- `npm run test:coverage`: cobertura
- `npm run ci`: pipeline local de calidad

## Primer arranque

```bash
npm install
copy .env.example .env
npm run dev
```

## Qué incluye

- Estructura modular por dominios en `src/modules`
- `home` placeholder como landing inicial
- Módulo de ejemplo `auth` con vista, componente, store, composable y servicio
- Configuración centralizada para variables de entorno y capa HTTP
- Alias `@` apuntando a `src`
- Workflow base de CI en GitHub Actions

## Documentación de arquitectura

La guía de estructura, convenciones, escalado e integración futura con Laravel está en [docs/architecture.md](/C:/Users/j-loz/Documents/01.Proyectos/gestor_finanzas/docs/architecture.md).
