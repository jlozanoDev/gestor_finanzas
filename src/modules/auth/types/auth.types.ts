export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}
