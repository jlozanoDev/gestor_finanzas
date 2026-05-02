import { env } from '@/shared/config/env';
import { http } from '@/shared/services/api/http';

import type { AuthCredentials, AuthSession } from '../types/auth.types';

const mockSession: AuthSession = {
  token: 'demo-session-token',
  user: {
    id: 'usr_demo_1',
    fullName: 'Equipo Finanzas',
    email: 'demo@atlasfinanzas.app',
    role: 'admin',
  },
};

async function wait(milliseconds: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

export async function signInRequest(credentials: AuthCredentials): Promise<AuthSession> {
  if (!env.apiBaseUrl) {
    await wait(500);

    if (
      credentials.email === 'demo@atlasfinanzas.app' &&
      credentials.password === 'demo1234'
    ) {
      return mockSession;
    }

    throw new Error('Credenciales no válidas para el modo demo.');
  }

  return http.post<AuthSession>('/auth/login', credentials);
}
