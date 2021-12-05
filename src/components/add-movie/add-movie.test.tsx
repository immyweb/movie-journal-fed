import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { AddMovie } from './add-movie';

const result = {
  theMovieDbId: 464052,
  posterImg: '/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg',
  title: 'Wonder Woman 1984',
  releaseDate: '2020-12-16',
};

test('should pass accessibility tests', async () => {
  const { container } = render(<AddMovie {...result} />);
  expect(await axe(container)).toHaveNoViolations();
});

test('should contain a title, poster image, date field, review field, rating field, like checkbox and submit button', () => {
  const { getByText, getByAltText, getByLabelText, getByRole } = render(
    <AddMovie {...result} />,
  );
  expect(getByText('I watched...')).toBeInTheDocument();
  expect(getByAltText(/wonder woman 1984/i)).toBeInTheDocument();
  expect(getByLabelText('Date watched')).toBeInTheDocument();
  expect(getByLabelText('Review')).toBeInTheDocument();
  expect(getByLabelText('Rating')).toBeInTheDocument();
  expect(getByLabelText('Like')).toBeInTheDocument();
  expect(getByRole('button')).toBeInTheDocument();
});

test('should submit form and show correct success message', async () => {
  const { findByText, getByLabelText, getByRole } = render(
    <AddMovie {...result} />,
  );
  userEvent.type(getByLabelText('Date watched'), '2021-01-01');
  userEvent.type(getByLabelText('Review'), 'Not as good as first movie');
  userEvent.type(getByLabelText('Rating'), '7');
  const checkbox = getByRole('checkbox');
  userEvent.click(checkbox);
  userEvent.click(getByRole('button'));
  expect(await findByText('Thank you for your submission')).toBeInTheDocument();
});
