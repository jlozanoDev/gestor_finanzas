import type { RouteRecordRaw } from 'vue-router';

export const accountsRoutes: RouteRecordRaw[] = [
  {
    path: '/accounts',
    name: 'accounts',
    component: () => import('./views/AccountsView.vue'),
    meta: {
      title: 'Mis Cuentas',
    },
  },
];
