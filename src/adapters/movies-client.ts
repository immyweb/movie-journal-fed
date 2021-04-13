import { client } from './api-client';
import requests from '../config/requests';

import { IMovieListItem } from '../types/types';

function postMovie(movieItemData: IMovieListItem): Promise<IMovieListItem[]> {
  return client(`${requests.dbApi}`, {
    method: 'POST',
    body: movieItemData,
  });
}

function getMovies(): Promise<IMovieListItem[]> {
  return client(`${requests.dbApi}`, {
    method: 'GET',
  });
}

function getMovie(id: number): Promise<IMovieListItem> {
  return client(`${requests.dbApi}${id}`, {
    method: 'GET',
  });
}

function updateMovie(
  listItemId: number,
  updates: IMovieListItem,
): Promise<IMovieListItem[]> {
  return client(`${requests.dbApi}${listItemId}`, {
    method: 'PUT',
    body: updates,
  });
}

function removeMovie(id: number): Promise<IMovieListItem[]> {
  return client(`${requests.dbApi}${id}`, {
    method: 'DELETE',
  });
}

export { postMovie, getMovies, getMovie, updateMovie, removeMovie };
