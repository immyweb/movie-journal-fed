import { rest } from 'msw';
import {
  moviesListResponse,
  movieDetailResponse,
  movieDbSearchMovieResponse,
  movieDbCreditResponse,
  movieDbDetailResponse,
} from './mock-data';

export const handlers = [
  // Post movie
  rest.post('http://localhost:8000/api/add-movie', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(moviesListResponse));
  }),

  // Get Movies
  rest.get('http://localhost:8000/api/movies', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(moviesListResponse));
  }),

  // Get Single Movie
  rest.get('http://localhost:8000/api/movie/:movieId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(movieDetailResponse));
  }),

  // Search movies
  rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(movieDbSearchMovieResponse));
  }),

  // Get movie detail
  rest.get('https://api.themoviedb.org/3/movie/:movieId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(movieDbDetailResponse));
  }),

  // Get credits
  rest.get(
    'https://api.themoviedb.org/3/movie/:movieId/credits/',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(movieDbCreditResponse));
    },
  ),
];
