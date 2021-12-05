import { client } from './api-client';
import requests from '../config/requests';

import { IMovieListItem, IMovies, IMovie } from '../types/types';

function postMovie(movieItemData: IMovieListItem): Promise<IMovieListItem[]> {
  return client(`${requests.dbApi}/add-movie`, {
    method: 'POST',
    body: movieItemData,
  });
}

function getMovies(): Promise<IMovies> {
  return client(`${requests.dbApi}/movies`, {
    method: 'GET',
  });
}

function getMovie(id: string): Promise<IMovie> {
  return client(`${requests.dbApi}/movie/${id}`, {
    method: 'GET',
  });
}

function updateMovie(
  listItemId: number,
  updates: IMovieListItem,
): Promise<IMovieListItem[]> {
  return client(`${requests.dbApi}/edit-movie/${listItemId}`, {
    method: 'PUT',
    body: updates,
  });
}

function removeMovie(id: number): Promise<IMovieListItem[]> {
  return client(`${requests.dbApi}/delete-movie/${id}`, {
    method: 'DELETE',
  });
}

export { postMovie, getMovies, getMovie, updateMovie, removeMovie };
