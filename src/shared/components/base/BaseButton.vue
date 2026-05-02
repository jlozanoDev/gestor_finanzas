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
    'inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary: 'bg-brand-500 text-white hover:bg-brand-400',
    secondary: 'border border-white/15 bg-white/5 text-white hover:bg-white/10',
    ghost: 'text-slate-200 hover:bg-white/5',
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
