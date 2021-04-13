import { client } from './api-client';
import requests from '../config/requests';
import { IMovieDetailApi } from '../types/detailTypes';
import { IMovieCredits } from '../types/creditTypes';

import { ISearchTitleResults } from '../types/searchTitleResults';

function searchMovie(title: string): Promise<ISearchTitleResults> {
  return client(`${requests.baseURL}${requests.fetchId}${title}`, {
    method: 'GET',
  });
}

function getMovieDetail(id: number): Promise<IMovieDetailApi> {
  return client(`${requests.baseURL}movie/${id}${requests.fetchDetail}`, {
    method: 'GET',
  });
}

function getMovieCredits(id: number): Promise<IMovieCredits> {
  return client(`${requests.baseURL}movie/${id}${requests.fetchCredits}`, {
    method: 'GET',
  });
}

export { searchMovie, getMovieDetail, getMovieCredits };
