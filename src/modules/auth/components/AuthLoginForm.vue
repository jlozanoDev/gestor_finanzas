<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';
import { Mail, Lock, LogIn, AlertCircle, HelpCircle } from 'lucide-vue-next';

import { useSignInForm } from '../composables/useSignInForm';

const {
  email,
  password,
  fieldErrors,
  submit,
  feedback,
  isSubmitting,
  isDemoMode,
} = useSignInForm();
</script>

<template>
  <form
    class="flex flex-col space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-zinc-900/80 dark:shadow-soft"
    @submit.prevent="submit"
  >
    <div class="space-y-1">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-zinc-50">Entrar</h2>
      <p class="text-sm text-slate-500 dark:text-zinc-400">
        Inicia sesion en tu cuenta para gestionar tus finanzas.
      </p>
    </div>

    <div
      v-if="isDemoMode"
      class="flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800 dark:border-white/10 dark:bg-zinc-800/70 dark:text-zinc-200"
    >
      <HelpCircle class="mt-0.5 h-5 w-5 shrink-0 text-brand-500 dark:text-zinc-300" />
      <div>
        <p class="mb-1 font-semibold">Modo demo activo</p>
        <p class="opacity-90">Usa <strong>demo@atlasfinanzas.app</strong> y <strong>demo1234</strong>.</p>
      </div>
    </div>

    <div class="space-y-2">
      <label class="text-sm font-bold text-slate-700 dark:text-zinc-200" for="email">Email</label>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <Mail class="h-5 w-5" stroke-width="1.5" />
        </div>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-zinc-950/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-500/10"
          placeholder="nombre@empresa.com"
        />
      </div>
      <p v-if="fieldErrors.email" class="text-sm font-medium text-rose-500 dark:text-rose-400">
        {{ fieldErrors.email }}
      </p>
    </div>

    <div class="space-y-2">
      <label class="text-sm font-bold text-slate-700 dark:text-zinc-200" for="password">Contrasena</label>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <Lock class="h-5 w-5" stroke-width="1.5" />
        </div>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-zinc-950/80 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-500/10"
          placeholder="••••••••"
        />
      </div>
      <p v-if="fieldErrors.password" class="text-sm font-medium text-rose-500 dark:text-rose-400">
        {{ fieldErrors.password }}
      </p>
    </div>

    <div v-if="feedback" class="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300">
      <AlertCircle class="h-5 w-5 shrink-0" />
      {{ feedback }}
    </div>

    <div class="mt-2 flex-1"></div>

    <BaseButton class="flex w-full items-center justify-center gap-2 py-3.5 text-base font-semibold shadow-lg shadow-brand-500/20 transition-all hover:-translate-y-0.5 hover:shadow-brand-500/30 dark:shadow-black/20 dark:hover:shadow-black/30" :loading="isSubmitting" type="submit">
      <LogIn v-if="!isSubmitting" class="h-5 w-5" stroke-width="2" />
      <span>Acceder</span>
    </BaseButton>
  </form>
</template>
