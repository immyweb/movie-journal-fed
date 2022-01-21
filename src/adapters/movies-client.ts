import { client } from './api-client';
import requests from '../config/requests';

import { IMovieListItem, IMovies, IMovie } from '../types/types';

const postMovie = (
  movieItemData: IMovieListItem,
): Promise<IMovieListItem[]> => {
  return client<IMovieListItem[]>(`${requests.dbApi}/add-movie`, {
    method: 'POST',
    body: movieItemData,
  });
};

const getMovies = (): Promise<IMovies> => {
  return client<IMovies>(`${requests.dbApi}/movies`, {
    method: 'GET',
  });
};

const getMovie = (id: string): Promise<IMovie> => {
  return client<IMovie>(`${requests.dbApi}/movie/${id}`, {
    method: 'GET',
  });
};

const updateMovie = (
  listItemId: string,
  updates: IMovieListItem,
): Promise<IMovieListItem[]> => {
  return client<IMovieListItem[]>(
    `${requests.dbApi}/edit-movie/${listItemId}`,
    {
      method: 'PUT',
      body: updates,
    },
  );
};

const removeMovie = (id: string): Promise<IMovieListItem[]> => {
  return client<IMovieListItem[]>(`${requests.dbApi}/delete-movie/${id}`, {
    method: 'DELETE',
  });
};

export { postMovie, getMovies, getMovie, updateMovie, removeMovie };
