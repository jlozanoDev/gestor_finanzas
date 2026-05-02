<script setup lang="ts">
import { env } from '@/shared/config/env';
import { Layers, Rocket, Code, Layout, Blocks, CreditCard, PieChart, Activity } from 'lucide-vue-next';
</script>

<template>
  <section class="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
    <article
      class="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-brand-50 via-white to-emerald-50 p-8 shadow-sm transition-all duration-300 dark:border-white/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-soft"
    >
      <div class="relative z-10">
        <div class="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-brand-600 dark:text-slate-300">
          <Rocket class="h-4 w-4" />
          <span>Inicio del Proyecto</span>
        </div>
        <h2 class="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          {{ env.appTitle }} está listo para crecer.
        </h2>
        <p class="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Esta vista inicial es un punto de partida limpio. El valor real está en la
          arquitectura de la aplicación: módulos por dominio, estado aislado, rutas componibles y un diseño espectacular.
        </p>

        <div class="mt-8 flex flex-wrap gap-3 text-sm text-slate-700 dark:text-slate-200">
          <span class="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:text-slate-100"><Code class="h-4 w-4" /> Vue 3</span>
          <span class="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:text-slate-100"><Layers class="h-4 w-4" /> TypeScript</span>
          <span class="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:text-slate-100"><Blocks class="h-4 w-4" /> Pinia</span>
          <span class="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm transition-colors hover:border-brand-300 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:text-slate-100"><Layout class="h-4 w-4" /> TailwindCSS</span>
        </div>
      </div>

      <Layers class="absolute -bottom-10 -right-10 h-64 w-64 text-brand-500/5 pointer-events-none dark:text-white/10" />
    </article>

    <aside class="grid gap-4">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-soft">
        <p class="text-sm font-bold uppercase tracking-[0.18em] text-brand-500 dark:text-slate-300">Próximos Pasos</p>
        <h3 class="mt-3 text-xl font-semibold text-slate-800 dark:text-white">Dominios Sugeridos</h3>
        <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          <li class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
              <Activity class="h-4 w-4" />
            </div>
            Cuentas y balance consolidado
          </li>
          <li class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-white/10 dark:text-slate-200">
              <CreditCard class="h-4 w-4" />
            </div>
            Movimientos y categorización
          </li>
          <li class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-white/10 dark:text-slate-200">
              <PieChart class="h-4 w-4" />
            </div>
            Presupuestos y reportes
          </li>
        </ul>
      </div>

      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-soft">
        <div class="flex items-center gap-2">
          <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-white/10 dark:text-slate-200">
            <Blocks class="h-4 w-4" />
          </div>
          <p class="text-sm font-bold uppercase tracking-[0.18em] text-amber-600 dark:text-slate-300">Arquitectura</p>
        </div>
        <h3 class="mt-3 text-xl font-semibold text-slate-800 dark:text-white">Módulo de Autenticación</h3>
        <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          El proyecto trae una feature de autenticación mínima lista para integrarse para mostrar organización de código.
        </p>
      </div>
    </aside>
  </section>
</template>
