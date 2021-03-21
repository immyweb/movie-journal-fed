import { IMovieDetailApi } from '../types/detailTypes';

export const getDetail = async (url: string): Promise<IMovieDetailApi[]> => {
  return await fetch(url, { cache: 'no-store' })
    .then(data => data.json())
    .catch(e => {
      // tslint:disable-next-line:no-console
      console.log('Movie data fetch failed', e);
    });
};
