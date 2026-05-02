import { ref } from 'vue';

import { formatError } from '@/shared/utils/formatError';

export function useAsyncTask() {
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  async function execute<T>(task: () => Promise<T>) {
    isLoading.value = true;
    errorMessage.value = null;

    try {
      return await task();
    } catch (error) {
      errorMessage.value = formatError(error);
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    errorMessage,
    execute,
  };
}
