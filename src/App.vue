<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useDark, useToggle } from '@vueuse/core';
import { Sun, Moon, LayoutDashboard, LogIn, Wallet, ListCollapse, TrendingUp } from 'lucide-vue-next';

import { env } from '@/shared/config/env';

const route = useRoute();

const navigation = [
  { label: 'Inicio', to: { name: 'home' }, icon: LayoutDashboard },
  { label: 'Cuentas', to: { name: 'accounts' }, icon: Wallet },
  { label: 'Movimientos', to: { name: 'transactions' }, icon: ListCollapse },
  { label: 'Inversiones', to: { name: 'investments' }, icon: TrendingUp },
  { label: 'Acceso', to: { name: 'auth-sign-in' }, icon: LogIn },
];

const pageLabel = computed(() => route.meta.title ?? env.appTitle);

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
    <!-- Decorative Background Effects -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        class="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl transition-opacity duration-300 dark:bg-white/10"
      />
      <div
        class="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/3 translate-y-1/3 rounded-full bg-emerald-400/10 blur-3xl transition-opacity duration-300 dark:bg-emerald-400/10"
      />
    </div>

    <div class="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <header
        class="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200/50 bg-white/60 p-4 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/5 dark:shadow-soft sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5"
      >
        <div class="flex items-center gap-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30 dark:bg-zinc-200 dark:text-zinc-900 dark:shadow-black/30">
            <LayoutDashboard class="h-6 w-6" stroke-width="1.5" />
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-brand-500 dark:text-zinc-300">
              Gestor de Finanzas
            </p>
            <h1 class="text-xl font-bold text-slate-800 dark:text-white">
              {{ env.appTitle }}
            </h1>
          </div>
        </div>

        <div class="flex items-center justify-between gap-4 sm:justify-end">
          <nav class="flex gap-2 overflow-x-auto">
            <RouterLink
              v-for="item in navigation"
              :key="item.label"
              :to="item.to"
              class="group flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
              active-class="bg-brand-50 text-brand-600 dark:bg-white/10 dark:text-zinc-100"
            >
              <component :is="item.icon" class="h-4 w-4" stroke-width="2" />
              {{ item.label }}
            </RouterLink>
          </nav>
          
          <div class="h-6 w-px bg-slate-200 dark:bg-white/10 hidden sm:block"></div>

          <button
            @click="toggleDark()"
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white dark:focus:ring-zinc-500 dark:focus:ring-offset-zinc-950"
            aria-label="Toggle dark mode"
          >
            <Sun v-if="isDark" class="h-5 w-5" stroke-width="1.5" />
            <Moon v-else class="h-5 w-5" stroke-width="1.5" />
          </button>
        </div>
      </header>

      <main class="flex-1 rounded-2xl border border-slate-200/50 bg-white/60 p-6 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-soft sm:p-8">
        <header class="mb-8 border-b border-slate-200 pb-6 dark:border-white/10">
          <h2 class="text-2xl font-bold text-slate-800 dark:text-zinc-50">
            {{ pageLabel }}
          </h2>
          <p class="mt-2 text-sm text-slate-500 dark:text-zinc-400">
            Administra tus finanzas de manera inteligente.
          </p>
        </header>
        
        <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
