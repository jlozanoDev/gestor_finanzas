<script setup lang="ts">
import BaseButton from '@/shared/components/base/BaseButton.vue';

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
    class="space-y-5 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft"
    @submit.prevent="submit"
  >
    <div class="space-y-1">
      <h2 class="text-xl font-semibold text-white">Entrar</h2>
      <p class="text-sm text-slate-400">
        La UI es real, pero el backend puede conectarse después sin cambiar la estructura.
      </p>
    </div>

    <div
      v-if="isDemoMode"
      class="rounded-2xl border border-brand-400/30 bg-brand-500/10 px-4 py-3 text-sm text-brand-50"
    >
      Modo demo activo. Usa <strong>demo@atlasfinanzas.app</strong> y
      <strong>demo1234</strong>.
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium text-slate-200" for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        autocomplete="email"
        class="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-brand-400"
        placeholder="nombre@empresa.com"
      />
      <p v-if="fieldErrors.email" class="text-sm text-rose-300">
        {{ fieldErrors.email }}
      </p>
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium text-slate-200" for="password">Contraseña</label>
      <input
        id="password"
        v-model="password"
        type="password"
        autocomplete="current-password"
        class="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-brand-400"
        placeholder="••••••••"
      />
      <p v-if="fieldErrors.password" class="text-sm text-rose-300">
        {{ fieldErrors.password }}
      </p>
    </div>

    <div v-if="feedback" class="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
      {{ feedback }}
    </div>

    <BaseButton class="w-full" :loading="isSubmitting" type="submit">
      Acceder
    </BaseButton>
  </form>
</template>
