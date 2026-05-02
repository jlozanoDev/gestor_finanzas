<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

import { env } from '@/shared/config/env';

const route = useRoute();

const navigation = [
  { label: 'Inicio', to: { name: 'home' } },
  { label: 'Acceso', to: { name: 'auth-sign-in' } },
];

const pageLabel = computed(() => route.meta.title ?? env.appTitle);
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-100">
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute left-0 top-0 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
      />
      <div
        class="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl"
      />
    </div>

    <div class="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 sm:px-8">
      <header
        class="mb-10 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 shadow-soft backdrop-blur"
      >
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.24em] text-brand-200/80">
              Frontend Blueprint
            </p>
            <h1 class="text-2xl font-semibold text-white">
              {{ env.appTitle }}
            </h1>
          </div>

          <nav class="flex flex-wrap gap-3">
            <RouterLink
              v-for="item in navigation"
              :key="item.label"
              :to="item.to"
              class="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-brand-300 hover:text-white"
              active-class="border-brand-300 bg-brand-500/10 text-white"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </div>

        <p class="text-sm text-slate-300">
          {{ pageLabel }}
        </p>
      </header>

      <main class="flex-1">
        <RouterView />
      </main>
    </div>
  </div>
</template>
