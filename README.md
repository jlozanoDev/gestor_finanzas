# Atlas Finanzas

Gestor de finanzas personal profesional y **offline-first** construido con Vue 3 + TypeScript + Vite. Utiliza SQLite nativo en el navegador para garantizar privacidad y persistencia sin necesidad de un backend.

## Stack

- **Core**: Vue 3 (Composition API, `<script setup>`)
- **Estado**: Pinia
- **Base de Datos**: [SQLite Wasm](https://sqlite.org/wasm) + OPFS (Origin Private File System)
- **Gráficos**: Chart.js + vue-chartjs
- **Estilos**: TailwindCSS (con soporte completo para modo claro/oscuro)
- **Iconos**: Lucide Vue
- **Utilidades**: VueUse
- **Calidad**: Vitest, ESLint, Prettier

## Características principales

- **Dashboard Inteligente**: Visualización del patrimonio neto total, liquidez e inversiones con gráficos de distribución de gastos.
- **Gestión de Cuentas**: Control de múltiples cuentas bancarias, efectivo y tarjetas con balances en tiempo real.
- **Registro de Movimientos**: Sistema de ingresos y gastos con categorización automática y actualización de saldos.
- **Portafolio de Inversiones**: Seguimiento de activos, precios de mercado y cálculo de rentabilidad (P&L).
- **Privacidad Total**: Tus datos financieros nunca salen de tu navegador. Se guardan en un archivo SQLite local persistente.

## Scripts

- `npm run dev`: Inicia el entorno local con soporte OPFS.
- `npm run build`: Genera el bundle de producción optimizado.
- `npm run preview`: Previsualización local del build.
- `npm run lint`: Ejecuta el linter para asegurar calidad de código.
- `npm run format`: Aplica formato con Prettier.
- `npm run test`: Ejecuta la suite de pruebas unitarias con Vitest.

## Primer arranque

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

> **Nota sobre OPFS**: Para que SQLite funcione correctamente, el navegador debe soportar OPFS (Chrome, Edge, Safari recientes) y el servidor debe servir las cabeceras `COOP` y `COEP` (ya configurado en `vite.config.ts`).

## Estructura de Módulos

La aplicación sigue una arquitectura modular por dominios:

- `src/modules/home`: Dashboard y lógica de agregación.
- `src/modules/accounts`: Gestión de cuentas y balances.
- `src/modules/transactions`: Registro de ingresos, gastos y categorías.
- `src/modules/investments`: Seguimiento de activos e inversiones.
- `src/modules/database`: Infraestructura y servicio de SQLite.
- `src/modules/auth`: Sistema de acceso (actualmente en modo local auto-login).

## Documentación adicional

- [Arquitectura Detallada](docs/architecture.md)
- [Plan de Implementación V1](C:/Users/j-loz/.gemini/antigravity/brain/ecded05c-6ef7-4c2d-bc39-3fa96f9e886c/artifacts/implementation_plan_v1.md)
