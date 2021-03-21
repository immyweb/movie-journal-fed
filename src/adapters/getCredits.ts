import { IMovieCredits } from '../types/creditTypes';

export const getCredits = async (url: string): Promise<IMovieCredits[]> => {
  return await fetch(url, { cache: 'no-store' })
    .then(data => data.json())
    .catch(e => {
      // tslint:disable-next-line:no-console
      console.log('Movie data fetch failed', e);
    });
};
