type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly details: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

const apiBaseUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    return response.text();
  }

  return response.json();
}

export async function request<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const response = await fetch(`${apiBaseUrl}/${path.replace(/^\//, '')}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'message' in payload &&
      typeof payload.message === 'string'
        ? payload.message
        : `La solicitud falló con estado ${response.status}.`;

    throw new ApiError(response.status, message, payload);
  }

  return payload as T;
}
