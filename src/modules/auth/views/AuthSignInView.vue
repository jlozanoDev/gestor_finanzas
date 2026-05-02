<script setup lang="ts">
import AuthLoginForm from '../components/AuthLoginForm.vue';
</script>

<template>
  <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
    <article
      class="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 p-8 shadow-soft"
    >
      <p class="text-sm uppercase tracking-[0.22em] text-brand-200/80">Módulo de ejemplo</p>
      <h2 class="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-white">
        Referencia de arquitectura para autenticación.
      </h2>
      <p class="mt-4 max-w-2xl text-base leading-7 text-slate-300">
        Esta pantalla existe para mostrar cómo organizar una feature real: vista, componente,
        store, servicio y composable, sin convertir el scaffold en una demo gigante.
      </p>

      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p class="text-sm font-medium text-brand-100">Responsabilidad clara</p>
          <p class="mt-2 text-sm leading-6 text-slate-300">
            Cada archivo del módulo tiene un único foco para facilitar mantenimiento.
          </p>
        </div>
        <div class="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p class="text-sm font-medium text-brand-100">Preparado para backend</p>
          <p class="mt-2 text-sm leading-6 text-slate-300">
            Si configuras `VITE_API_BASE_URL`, el mock desaparece y entra la capa HTTP real.
          </p>
        </div>
      </div>
    </article>

    <AuthLoginForm />
  </section>
</template>
