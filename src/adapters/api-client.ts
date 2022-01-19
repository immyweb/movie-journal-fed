import { IMovieListItem } from '../types/types';

type ApiRequest = {
  method: string;
  body?: IMovieListItem;
};

export function client<TResponse>(
  endpoint: string,
  { method, body }: ApiRequest,
): Promise<TResponse> {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${process.env.TOKEN}`,
  };

  const config = {
    method,
    headers: {
      ...headers,
    },
    body: body && JSON.stringify(body),
  };

  return window.fetch(`${endpoint}`, config).then(async response => {
    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  });
}
