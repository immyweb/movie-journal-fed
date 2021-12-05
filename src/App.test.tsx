import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { axe } from 'jest-axe';

import App from './App';

test('should pass accessibility tests', async () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { container } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

test('App renders Homepage with Header, Search Movie and Movie List', async () => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { getByText, getByLabelText, findAllByRole } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(getByText(/movie journal/i)).toBeInTheDocument();
  expect(getByText(/what did you watch?/i)).toBeInTheDocument();
  expect(getByLabelText(/title/i)).toBeInTheDocument();
  expect(getByText(/your movies/i)).toBeInTheDocument();
  expect(await findAllByRole('listitem')).toHaveLength(11);
  expect(await findAllByRole('img')).toHaveLength(11);
});

test.skip('App renders Detail and navigate to Homepage', async () => {
  const history = createMemoryHistory({
    initialEntries: ['/detail/6165a1b302f54c3f9ab18904'],
  });
  const { getByText, getByRole, getByLabelText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(getByText(/movie journal/i)).toBeInTheDocument();
  userEvent.click(getByRole('link'));
  expect(getByText(/what did you watch?/i)).toBeInTheDocument();
  expect(getByLabelText(/title/i)).toBeInTheDocument();
});

test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({
    initialEntries: ['/bad-url'],
  });
  const { getByText } = render(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(getByText(/404/i)).toBeInTheDocument();
});
