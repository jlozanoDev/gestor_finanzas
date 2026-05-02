import type { RouteRecordRaw } from 'vue-router';

export const transactionsRoutes: RouteRecordRaw[] = [
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('./views/TransactionsView.vue'),
    meta: {
      title: 'Movimientos',
    },
  },
];
