import { IMovieListItem } from '../types/types';

export const postMovie = async (
  url: string,
  movieData: IMovieListItem,
): Promise<IMovieListItem[]> => {
  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(movieData),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  })
    .then(response => response.json())
    .catch(e => {
      // tslint:disable-next-line:no-console
      console.log('Movie post failed', e);
    });
};
