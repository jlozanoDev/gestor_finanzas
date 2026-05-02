import { env } from '@/shared/config/env';

interface HttpOptions extends RequestInit {
  headers?: HeadersInit;
}

export class HttpError extends Error {
  status: number;
  payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.payload = payload;
  }
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

async function request<T>(endpoint: string, options: HttpOptions = {}) {
  const response = await fetch(`${env.apiBaseUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof payload === 'object' && payload && 'message' in payload
        ? String(payload.message)
        : 'No se pudo completar la solicitud.';

    throw new HttpError(message, response.status, payload);
  }

  return payload as T;
}

export const http = {
  get<T>(endpoint: string, options?: HttpOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  },
  post<T>(endpoint: string, body?: unknown, options?: HttpOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },
};
