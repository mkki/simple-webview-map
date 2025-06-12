interface FetchOptions extends RequestInit {
  baseURL?: string;
}

export const customFetch = async <T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { baseURL = '/api', ...fetchOptions } = options;

  const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const finalOptions: RequestInit = {
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
  };

  try {
    const response = await fetch(fullUrl, finalOptions);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const api = {
  get: <T = unknown>(url: string, options?: FetchOptions) =>
    customFetch<T>(url, { ...options, method: 'GET' }),

  post: <T = unknown>(url: string, body?: unknown, options?: FetchOptions) =>
    customFetch<T>(url, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = unknown>(url: string, body?: unknown, options?: FetchOptions) =>
    customFetch<T>(url, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = unknown>(url: string, options?: FetchOptions) =>
    customFetch<T>(url, { ...options, method: 'DELETE' }),
};
