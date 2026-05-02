import { defineStore } from 'pinia';

import { formatError } from '@/shared/utils/formatError';

import { signInRequest } from '../services/auth.api';
import type { AuthCredentials, AuthSession } from '../types/auth.types';

interface AuthState {
  session: AuthSession | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    session: null,
    status: 'idle',
    error: null,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.session?.token),
    user: (state) => state.session?.user ?? null,
  },
  actions: {
    async signIn(credentials: AuthCredentials) {
      this.status = 'loading';
      this.error = null;

      try {
        const session = await signInRequest(credentials);
        this.session = session;
        this.status = 'success';
        return session;
      } catch (error) {
        this.session = null;
        this.status = 'error';
        this.error = formatError(error);
        throw error;
      }
    },
    signOut() {
      this.session = null;
      this.status = 'idle';
      this.error = null;
    },
  },
});
