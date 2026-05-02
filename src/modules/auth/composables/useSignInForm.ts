import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { env } from '@/shared/config/env';
import { useAsyncTask } from '@/shared/composables/useAsyncTask';

import { useAuthStore } from '../stores/useAuthStore';

export function useSignInForm() {
  const router = useRouter();
  const authStore = useAuthStore();
  const email = ref('demo@atlasfinanzas.app');
  const password = ref('demo1234');
  const fieldErrors = reactive({
    email: '',
    password: '',
  });
  const { errorMessage, isLoading, execute } = useAsyncTask();

  const isDemoMode = computed(() => !env.apiBaseUrl);
  const feedback = computed(() => authStore.error ?? errorMessage.value);

  function validate() {
    fieldErrors.email = '';
    fieldErrors.password = '';

    if (!email.value.trim()) {
      fieldErrors.email = 'El email es obligatorio.';
    }

    if (!password.value.trim()) {
      fieldErrors.password = 'La contraseña es obligatoria.';
    }

    return !fieldErrors.email && !fieldErrors.password;
  }

  async function submit() {
    if (!validate()) {
      return;
    }

    const session = await execute(() =>
      authStore.signIn({
        email: email.value.trim(),
        password: password.value,
      }),
    );

    if (!session) {
      return;
    }

    await router.push({ name: 'home' });
  }

  return {
    email,
    password,
    fieldErrors,
    submit,
    feedback,
    isSubmitting: isLoading,
    isDemoMode,
  };
}
