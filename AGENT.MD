# AGENT.MD

## Propósito

Este repositorio contiene la base frontend de **Atlas Finanzas**, construida con Vue 3, TypeScript y Vite.

El objetivo de este archivo es servir como guía operativa para cualquier agente, desarrollador o colaborador que haga cambios en el proyecto.

## Stack oficial

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- TailwindCSS
- Vitest
- ESLint
- Prettier

## Skills del proyecto

El contenido canÃ³nico de las skills vive en `ai/skills/` para que pueda servir a distintos agentes de IA sin depender de una herramienta concreta.

La carpeta `.codex/skills/` queda solo como capa de compatibilidad para Codex y debe apuntar a las skills canÃ³nicas, no ser la fuente principal.

Antes de empezar un trabajo, el agente debe leer una o varias skills segÃºn el tipo de cambio. Las skills son acumulables y se pueden usar en paralelo de contexto si la tarea mezcla varias dimensiones.

### Selector de skills

- Leer `ai/skills/atlas-feature-module/SKILL.md` cuando el trabajo afecte a mÃ³dulos de dominio, nuevas features, vistas, rutas, stores, composables, servicios o tipos en `src/modules`.
- Leer `ai/skills/atlas-shared-ui/SKILL.md` cuando el trabajo afecte a componentes reutilizables, patrones visuales compartidos, layout base, accesibilidad o decisiones de `shared/components`.
- Leer `ai/skills/atlas-quality-gates/SKILL.md` cuando el trabajo afecte a testing, linting, TypeScript, scripts de `package.json`, configuraciÃ³n de Vite/Vitest/Tailwind/ESLint o CI/CD.
- Leer `ai/skills/atlas-laravel-integration/SKILL.md` cuando el trabajo afecte a integraciÃ³n con backend Laravel, autenticaciÃ³n, capa HTTP, variables de entorno o contratos API.

### Combinaciones recomendadas

- Feature nueva con UI propia: `atlas-feature-module`
- Feature nueva con componente reutilizable: `atlas-feature-module` + `atlas-shared-ui`
- Refactor de componente base y tests: `atlas-shared-ui` + `atlas-quality-gates`
- IntegraciÃ³n de login real con Laravel: `atlas-feature-module` + `atlas-laravel-integration` + `atlas-quality-gates`
- Cambio en tooling que afecta a una feature concreta: `atlas-feature-module` + `atlas-quality-gates`

## Principios del proyecto

1. Priorizar claridad y mantenibilidad sobre abstracciones prematuras.
2. Organizar el código por dominio o feature siempre que sea posible.
3. Mantener la lógica de negocio fuera de los componentes de UI.
4. Reutilizar solo lo que realmente sea compartido.
5. Evitar boilerplate innecesario.
6. Preparar la base para integrarse con backend sin rehacer la estructura.

## Estructura esperada

```text
src/
  app/
  modules/
  router/
  shared/
  stores/
```

### `src/app`

Inicialización global de la app y composición de providers.

### `src/modules`

Cada feature debe vivir en su propio módulo. Ejemplos futuros:

- `auth`
- `accounts`
- `transactions`
- `budgets`
- `reports`

Estructura interna recomendada por módulo:

```text
modules/feature-name/
  components/
  composables/
  services/
  stores/
  types/
  views/
  feature.routes.ts
```

### `src/shared`

Solo para piezas compartidas entre varios módulos:

- componentes base
- composables genéricos
- configuración
- estilos globales
- utilidades
- servicios transversales

Si algo solo pertenece a un módulo, no debe vivir en `shared`.

### `src/router`

Composición de rutas, tipado de meta y guardas globales.

### `src/stores`

Bootstrap global de Pinia y posibles plugins transversales. Los stores de negocio deben vivir dentro de cada módulo.

## Convenciones de nombres

- Componentes Vue: `PascalCase.vue`
- Composables: `useXxx.ts`
- Stores Pinia: `useXxxStore.ts`
- Servicios API: `feature.api.ts`
- Tipos: `feature.types.ts`
- Rutas del módulo: `feature.routes.ts`
- Variables y funciones: `camelCase`

## Reglas para componentes

1. Usar Composition API con `<script setup>`.
2. Mantener los componentes enfocados en presentación e interacción.
3. No llamar directamente a la API desde componentes de UI.
4. Extraer lógica compleja de formularios o flujos a composables.
5. Los componentes compartidos deben tener una API simple, estable y sin lógica de dominio.

## Reglas para composables

1. Usar composables para encapsular lógica reutilizable o compleja.
2. Prefijar siempre con `use`.
3. No mezclar responsabilidad de UI con acceso a red salvo casos muy concretos.
4. Si un composable es específico de una feature, debe vivir dentro de su módulo.
5. Si es transversal, puede vivir en `src/shared/composables`.

## Reglas para stores

1. Un store representa estado y acciones de negocio, no detalles visuales.
2. Mantener estado, acciones y getters mínimos y coherentes.
3. No duplicar estado derivable.
4. Centralizar en el store los estados asíncronos importantes de una feature cuando tenga sentido.
5. Evitar convertir Pinia en un contenedor global de todo el proyecto.

## Reglas para servicios y API

1. Toda llamada HTTP debe pasar por la capa compartida de API.
2. Los servicios de dominio viven en `modules/<feature>/services`.
3. Normalizar errores para no repartir manejo inconsistente por la UI.
4. No acoplar componentes a la forma cruda de respuestas del backend si se puede evitar.
5. Mapear o adaptar DTOs en la capa de servicios cuando el backend lo requiera.

## Variables de entorno

Usar `import.meta.env` a través de la capa de configuración:

- `src/shared/config/env.ts`

Variables actuales:

- `VITE_APP_TITLE`
- `VITE_API_BASE_URL`

No acceder a variables de entorno directamente desde múltiples sitios si ya existe un wrapper central.

## Routing

1. Las rutas de cada dominio se definen dentro del módulo.
2. La composición final de rutas vive en `src/router/routes.ts`.
3. Usar lazy loading para las vistas.
4. Usar `meta` para necesidades transversales como `requiresAuth` o `guestOnly`.

## Testing

Base de testing:

- Vitest
- Vue Test Utils

Reglas:

1. Añadir tests unitarios a componentes base y lógica reutilizable.
2. Priorizar tests sobre comportamiento, no sobre implementación interna.
3. Cuando una feature crezca, acompañar stores y composables críticos con tests.

## Calidad de código

Antes de cerrar cambios, usar cuando sea posible:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## CI/CD

El workflow base está en:

- `.github/workflows/ci.yml`

Toda contribución debería mantener verde como mínimo:

- lint
- typecheck
- test
- build

## Estilo de trabajo recomendado

1. Hacer cambios pequeños y coherentes.
2. No mover código a `shared` demasiado pronto.
3. Si una feature crece, ampliar su módulo antes de crear nuevas capas globales.
4. Documentar decisiones relevantes de arquitectura en `docs/architecture.md`.
5. Mantener la `home` actual como placeholder hasta que exista un alcance real de producto.

## Integración futura con Laravel

Si el backend será Laravel:

- usar `VITE_API_BASE_URL` como punto de entrada
- mantener servicios por dominio
- valorar `Sanctum` si el frontend comparte ecosistema y dominio
- valorar `JWT + refresh token` si la arquitectura será más desacoplada

## Qué no hacer

- No meter toda la app en `src/components`.
- No duplicar utilidades en varios módulos.
- No mezclar lógica de negocio con renderizado si puede separarse.
- No crear abstracciones genéricas sin un segundo caso real.
- No añadir páginas o features inventadas fuera del alcance pedido.

## Referencias internas

- Arquitectura detallada: `docs/architecture.md`
- Arranque del proyecto: `README.md`
