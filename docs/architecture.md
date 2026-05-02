# Arquitectura Frontend

## Enfoque general

La base está organizada con un enfoque híbrido:

- `modules/` para el dominio y las features.
- `shared/` para piezas realmente reutilizables entre módulos.
- `router/`, `stores/` y `app/` para composición global.

La idea es evitar dos problemas frecuentes:

1. Un `src/components` gigante sin contexto de negocio.
2. Un exceso de abstracción temprana que hace lenta la evolución.

## Estructura de carpetas y por qué existe

```text
src/
  app/
  modules/
  router/
  shared/
  stores/
```

### `src/app`

Contiene el “arranque” de la aplicación y los providers globales. Es el sitio correcto para acoplar `main.ts` con infraestructura transversal, sin mezclarla con lógica de negocio.

### `src/modules`

Es el corazón del proyecto. Cada módulo agrupa todo lo relativo a una feature o dominio:

- `views/`: pantallas del módulo
- `components/`: componentes internos del módulo
- `stores/`: estado de Pinia propio del dominio
- `services/`: acceso a API o casos de infraestructura del módulo
- `composables/`: lógica reutilizable dentro del dominio
- `types/`: contratos del módulo

Esto mejora:

- cohesión
- descubribilidad
- mantenimiento por equipos
- escalado futuro hacia bounded contexts

### `src/router`

Centraliza composición de rutas, guardas y tipado de `meta`. Mantener esto fuera de los módulos evita duplicar configuración global, pero las rutas concretas nacen dentro de cada módulo.

### `src/shared`

Solo entra aquí lo que es genuinamente compartido:

- componentes base
- composables genéricos
- estilos globales
- configuración
- utilidades
- capa HTTP común

Si algo solo lo usa un módulo, debe vivir dentro del módulo.

### `src/stores`

Se reserva para la inicialización global de Pinia y plugins transversales. Los stores de negocio viven en cada módulo.

## Configuración inicial

### `vite.config.ts`

- activa el plugin de Vue
- configura alias `@`
- deja preparado el entorno de test

### `main.ts`

- crea la app
- registra Pinia
- registra Vue Router
- monta estilos globales

### `router`

- compone las rutas desde cada módulo
- aplica guardas globales
- usa lazy loading para dividir el bundle por vistas

### `store`

- Pinia se inicializa una sola vez
- los stores de dominio se importan bajo demanda desde sus módulos

## Módulo de ejemplo: `auth`

Se incluye como muestra de una feature real sin sobreconstruir:

- `views/AuthSignInView.vue`
- `components/AuthLoginForm.vue`
- `stores/useAuthStore.ts`
- `services/auth.api.ts`
- `composables/useSignInForm.ts`
- `types/auth.types.ts`

Este módulo demuestra el flujo recomendado:

1. La vista orquesta layout y composición.
2. El componente encapsula UI y eventos.
3. El composable mueve fuera la lógica del formulario.
4. El store mantiene estado y acciones de negocio.
5. El servicio habla con la API o con un mock controlado.

## Buenas prácticas adoptadas

### Separación de lógica

- La vista no conoce detalles de API.
- El componente no concentra reglas complejas.
- La llamada asíncrona se encapsula en store y servicios.
- La lógica de formulario se extrae a un composable.

### Reutilización de componentes

Los componentes compartidos usan prefijo `Base` y una API pequeña. No deben contener lógica de dominio.

### Manejo de errores

- La capa HTTP normaliza errores.
- El store captura y expone estado
- Los composables presentan mensajes listos para UI

### Organización del código

- un archivo, una responsabilidad principal
- tipos junto al dominio
- rutas por módulo
- imports a través de alias

## Convenciones de nombres recomendadas

- Componentes Vue: `PascalCase.vue`
- Composables: `useXxx.ts`
- Stores Pinia: `useXxxStore.ts`
- Servicios API: `feature.api.ts`
- Tipos: `feature.types.ts`
- Rutas de módulo: `feature.routes.ts`
- Variables y funciones: `camelCase`
- Constantes de configuración: `UPPER_SNAKE_CASE` solo si son verdaderas constantes

## Cómo escalarlo a futuro

### Cuando aparezcan más dominios

Crear módulos como:

- `modules/accounts`
- `modules/transactions`
- `modules/budgets`
- `modules/reports`

Cada uno con sus `views`, `components`, `stores`, `services` y `types`.

### Cuando crezca el equipo

- mantener `shared/` pequeño y curado
- documentar contratos de API por módulo
- revisar ownership por dominio
- añadir Storybook si el sistema de componentes crece

### Cuando aumente la complejidad

- introducir layouts por área
- separar DTOs de modelos de UI
- añadir interceptores para refresh token
- añadir tests por módulo
- mover validaciones a librerías como Zod o Valibot si el dominio lo exige

## Integración futura con Laravel

La base encaja bien con Laravel API o monolito desacoplado.

Recomendación:

- usar `VITE_API_BASE_URL` para apuntar al backend
- centralizar `fetch` o `axios` en `shared/services/api`
- mapear DTOs de Laravel en la capa `services`

### Si el backend es Laravel con Sanctum

Es la opción más cómoda si frontend y backend comparten dominio principal o una estrategia controlada de cookies.

Ventajas:

- CSRF bien resuelto
- flujo estándar de Laravel
- menos exposición manual de tokens en frontend

### Si el backend es Laravel API puro con JWT

Es útil cuando el frontend vive desacoplado o en dominios distintos.

Ventajas:

- despliegue más independiente
- mejor encaje con apps móviles y múltiples clientes

Coste:

- más trabajo en refresh tokens
- mayor cuidado con almacenamiento y expiración

## Estrategia de autenticación recomendada

Para un proyecto financiero:

- `Sanctum` si el ecosistema está controlado por Laravel y mismo dominio
- `JWT + refresh token` si se prevé multi-cliente o separación fuerte frontend/backend

Si hoy hubiera que decidir sin más contexto, elegiría:

- `Sanctum` para panel interno o SaaS clásico Laravel-first
- `JWT` para arquitectura API-first con posibilidad de apps móviles
