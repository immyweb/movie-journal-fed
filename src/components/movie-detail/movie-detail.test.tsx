import React from 'react';
import { render } from '@testing-library/react';

import MovieDetail from './movie-detail';
import {
  movieDetailResponse,
  movieDbCreditResponse,
  movieDbDetailResponse,
} from '../../__mocks__/mock-data';

test('Movie Detail shows image, title, rating, review, watched, director, cast and genres', async () => {
  const { findByText, findByAltText } = render(
    <MovieDetail id={movieDetailResponse.id} />,
  );

  expect(await findByText(movieDetailResponse.title)).toBeInTheDocument();
  expect(await findByAltText(movieDetailResponse.title)).toBeInTheDocument();
  expect(
    await findByText(`${movieDetailResponse.rating}/10`),
  ).toBeInTheDocument();
  expect(await findByText(movieDetailResponse.review)).toBeInTheDocument();
  expect(
    await findByText(`Watched: ${movieDetailResponse.dateWatched}`),
  ).toBeInTheDocument();

  // Director
  expect(
    await findByText(movieDbCreditResponse.crew[21].name),
  ).toBeInTheDocument();

  //Cast
  expect(
    await findByText(movieDbCreditResponse.cast[0].name),
  ).toBeInTheDocument();
  expect(
    await findByText(movieDbCreditResponse.cast[1].name),
  ).toBeInTheDocument();
  expect(
    await findByText(movieDbCreditResponse.cast[2].name),
  ).toBeInTheDocument();

  // Genres
  expect(
    await findByText(movieDbDetailResponse.genres[0].name),
  ).toBeInTheDocument();
  expect(
    await findByText(movieDbDetailResponse.genres[1].name),
  ).toBeInTheDocument();
});
