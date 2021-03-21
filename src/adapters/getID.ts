import { IMovieID } from '../types/idTypes';

export const getId = (url: string): Promise<IMovieID> => {
  return fetch(url, { cache: 'no-store' })
    .then(data => data.json())
    .catch(e => {
      // tslint:disable-next-line:no-console
      console.log('Movie data fetch failed', e);
    });
};
