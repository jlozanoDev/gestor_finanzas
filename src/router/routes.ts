import type { RouteRecordRaw } from 'vue-router';

import { authRoutes } from '@/modules/auth/auth.routes';
import { homeRoutes } from '@/modules/home/home.routes';
import { accountsRoutes } from '@/modules/accounts/accounts.routes';
import { transactionsRoutes } from '@/modules/transactions/transactions.routes';
import { investmentsRoutes } from '@/modules/investments/investments.routes';

export const routes: RouteRecordRaw[] = [...homeRoutes, ...authRoutes, ...accountsRoutes, ...transactionsRoutes, ...investmentsRoutes];
