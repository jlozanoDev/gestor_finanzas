<script setup lang="ts">
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-vue-next';
import AuthLoginForm from '../components/AuthLoginForm.vue';
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    <article
      class="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-brand-50 via-white to-slate-50 p-8 shadow-sm transition-all duration-300 dark:border-white/10 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 dark:shadow-soft"
    >
      <div class="relative z-10">
        <div class="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-brand-600 dark:text-zinc-300">
          <ShieldCheck class="h-4 w-4" />
          <span>Módulo de Autenticación</span>
        </div>
        <h2 class="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-slate-900 dark:text-zinc-50">
          Referencia de arquitectura lista para backend.
        </h2>
        <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-zinc-300">
          Esta pantalla existe para mostrar cómo organizar una feature real: vista, componente,
          store, servicio y composable, con un diseño limpio que reacciona al modo claro y oscuro.
        </p>

        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-zinc-900/70">
            <div class="flex items-center gap-2 text-brand-600 dark:text-zinc-200">
              <CheckCircle2 class="h-5 w-5" />
              <p class="text-sm font-bold">Responsabilidad clara</p>
            </div>
            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">
              Cada archivo del módulo tiene un único foco para facilitar mantenimiento.
            </p>
          </div>
          <div class="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-zinc-900/70">
            <div class="flex items-center gap-2 text-emerald-600 dark:text-zinc-200">
              <Info class="h-5 w-5" />
              <p class="text-sm font-bold">Preparado para backend</p>
            </div>
            <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-300">
              Si configuras `VITE_API_BASE_URL`, el mock desaparece y entra la capa HTTP real.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Decorative background icon -->
      <ShieldCheck class="absolute -right-10 -top-10 h-64 w-64 text-brand-500/5 pointer-events-none dark:text-white/10" />
    </article>

    <AuthLoginForm />
  </section>
</template>
