import type { RouteRecordRaw } from 'vue-router';

export const investmentsRoutes: RouteRecordRaw[] = [
  {
    path: '/investments',
    name: 'investments',
    component: () => import('./views/InvestmentsView.vue'),
    meta: {
      title: 'Inversiones',
    },
  },
];
