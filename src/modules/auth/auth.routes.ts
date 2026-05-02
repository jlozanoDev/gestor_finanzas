import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/sign-in',
    name: 'auth-sign-in',
    component: () => import('./views/AuthSignInView.vue'),
    meta: {
      title: 'Acceso a la plataforma',
      guestOnly: true,
    },
  },
];
