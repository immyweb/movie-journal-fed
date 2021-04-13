import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

import MoviesList from './movies-list';

test('MoviesList renders list of movies', async () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { getByText, findAllByRole } = render(
    <Router history={history}>
      <MoviesList />
    </Router>,
  );

  expect(getByText(/your movies/i)).toBeInTheDocument();
  expect(await findAllByRole('listitem')).toHaveLength(11);
  expect(await findAllByRole('img')).toHaveLength(11);
  expect(await findAllByRole('link')).toHaveLength(11);
});

// TODO: Check link works
