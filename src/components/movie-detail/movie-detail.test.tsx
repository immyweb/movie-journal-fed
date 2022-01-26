import React from 'react';
import { render } from '@testing-library/react';

import MovieDetail from './movie-detail';
import {
  movieDetailResponse,
  movieDbCreditResponse,
  movieDbDetailResponse,
} from '../../__mocks__/mock-data';

describe('Movie Detail component', () => {
  it('should contain an image, title, rating, review, watched, director, cast and genres', async () => {
    const { findByText, findByAltText } = render(
      <MovieDetail id={movieDetailResponse.movie._id} />,
    );

    expect(
      await findByText(movieDetailResponse.movie.title),
    ).toBeInTheDocument();
    expect(
      await findByAltText(movieDetailResponse.movie.title),
    ).toBeInTheDocument();
    expect(
      await findByText(`${movieDetailResponse.movie.rating}/10`),
    ).toBeInTheDocument();
    expect(
      await findByText(movieDetailResponse.movie.review),
    ).toBeInTheDocument();
    expect(
      await findByText(`Watched: ${movieDetailResponse.movie.dateWatched}`),
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
});
