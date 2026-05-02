import type { RouteRecordRaw } from 'vue-router';

import { authRoutes } from '@/modules/auth/auth.routes';
import { homeRoutes } from '@/modules/home/home.routes';

export const routes: RouteRecordRaw[] = [...homeRoutes, ...authRoutes];
