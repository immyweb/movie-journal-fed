import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { EditMovie } from './edit-movie';

const setState = jest.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStateMock: any = (initState: any) => [initState, setState];

const movie = {
  theMovieDbId: 464052,
  posterPath: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
  title: 'Wonder Woman 1984',
  releaseDate: '2020-12-16',
  review: 'Not as good as the first movie',
  rating: 6,
  like: false,
  date_watched: '2021-01-01',
  id: '6165a13402f54c3f9ab18901',
  setMovieEdited: useStateMock,
};

describe('Edit Movie component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should contain a title, poster image, date field, review field, rating field, like checkbox and submit button', () => {
    const { getByText, getByAltText, getByLabelText, getByRole } = render(
      <EditMovie {...movie} onCloseModal={() => {}} />,
    );
    expect(getByText('Edit movie')).toBeInTheDocument();
    expect(getByAltText(/wonder woman 1984/i)).toBeInTheDocument();
    expect(getByLabelText('Date watched')).toBeInTheDocument();
    expect(getByLabelText('Review')).toBeInTheDocument();
    expect(getByLabelText('Rating')).toBeInTheDocument();
    expect(getByLabelText('Like')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should submit form and show correct success message', async () => {
    const { findByText, getByLabelText, getByRole } = render(
      <EditMovie {...movie} onCloseModal={() => {}} />,
    );
    userEvent.type(getByLabelText('Date watched'), '2021-01-01');
    userEvent.type(getByLabelText('Review'), 'Prefer the first movie');
    userEvent.type(getByLabelText('Rating'), '7');
    const checkbox = getByRole('checkbox');
    userEvent.click(checkbox);
    userEvent.click(getByRole('button'));
    expect(await findByText('Movie updated!')).toBeInTheDocument();
  });
});
