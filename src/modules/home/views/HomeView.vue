<script setup lang="ts">
import { env } from '@/shared/config/env';
</script>

<template>
  <section class="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
    <article
      class="rounded-[2rem] border border-white/10 bg-gradient-to-br from-brand-500/15 via-slate-900 to-emerald-500/10 p-8 shadow-soft"
    >
      <p class="text-sm uppercase tracking-[0.24em] text-brand-200/80">Placeholder Home</p>
      <h2 class="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        {{ env.appTitle }} nace con una base lista para crecer.
      </h2>
      <p class="mt-5 max-w-2xl text-base leading-7 text-slate-300">
        Esta home es solo un punto de entrada intencionadamente ligero. El valor real está en la
        arquitectura: módulos por dominio, estado aislado, rutas componibles y una capa compartida
        muy controlada.
      </p>

      <div class="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
        <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2">Vue 3</span>
        <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2">TypeScript</span>
        <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2">Pinia</span>
        <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2">TailwindCSS</span>
        <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2">Vitest</span>
      </div>
    </article>

    <aside class="grid gap-4">
      <div class="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
        <p class="text-sm uppercase tracking-[0.18em] text-slate-400">Qué sigue</p>
        <h3 class="mt-3 text-xl font-semibold text-white">Dominios sugeridos</h3>
        <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-300">
          <li>Cuentas y balance consolidado</li>
          <li>Movimientos y categorización</li>
          <li>Presupuestos y objetivos</li>
          <li>Reportes y proyecciones</li>
        </ul>
      </div>

      <div class="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
        <p class="text-sm uppercase tracking-[0.18em] text-slate-400">Módulo de ejemplo</p>
        <h3 class="mt-3 text-xl font-semibold text-white">`auth` como referencia</h3>
        <p class="mt-3 text-sm leading-6 text-slate-300">
          El proyecto trae una feature de autenticación mínima para mostrar organización real del
          código sin forzar páginas de producto que todavía no existen.
        </p>
      </div>
    </aside>
  </section>
</template>
