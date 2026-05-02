import { createRouter, createWebHistory } from 'vue-router';

import { applyAuthGuard } from './guards/auth.guard';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

applyAuthGuard(router);

export default router;
