import { IMovieListItem } from '../types/types';
import Config from '../../config';

type ApiRequest = {
  method: string;
  body?: IMovieListItem;
};

export function client<TResponse>(
  endpoint: string,
  { method, body }: ApiRequest,
): Promise<TResponse> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Config.TOKEN}`,
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
