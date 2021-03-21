import { IMovieListItem } from '../types/types';

export const getMovies = async (url: string): Promise<IMovieListItem[]> => {
  return await fetch(url, { cache: 'no-store' })
    .then(data => data.json())
    .catch(e => {
      // tslint:disable-next-line:no-console
      console.log('Movie data fetch failed', e);
    });
};
