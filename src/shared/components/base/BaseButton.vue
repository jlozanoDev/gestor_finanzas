<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  loading: false,
});

const classes = computed(() => {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-zinc-500 dark:focus:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300',
    secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10',
    ghost: 'text-slate-600 hover:bg-slate-100 dark:text-zinc-200 dark:hover:bg-white/5',
  };

  return `${base} ${variants[props.variant]}`;
});
</script>

<template>
  <button :type="type" :class="classes" :disabled="loading">
    <span v-if="loading">Procesando...</span>
    <slot v-else />
  </button>
</template>
