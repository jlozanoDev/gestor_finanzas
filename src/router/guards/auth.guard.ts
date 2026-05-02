import type { Router } from 'vue-router';

import pinia from '@/stores';

import { useAuthStore } from '@/modules/auth/stores/useAuthStore';

export function applyAuthGuard(router: Router) {
  router.beforeEach((to) => {
    const authStore = useAuthStore(pinia);

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return { name: 'auth-sign-in' };
    }

    if (to.meta.guestOnly && authStore.isAuthenticated) {
      return { name: 'home' };
    }

    return true;
  });
}
