import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import SearchMovie from '../search-movie';

const response = {
  page: 1,
  total_pages: 6,
  total_results: 108,
  results: [
    {
      adult: false,
      backdrop_path: '/inJjDhCjfhh3RtrJWBmmDqeuSYC.jpg',
      genre_ids: [28, 878],
      id: 399566,
      original_language: 'en',
      original_title: 'Godzilla vs. Kong',
      overview:
        'In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.',
      popularity: 10755.513,
      poster_path: '/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
      release_date: '2021-03-24',
      title: 'Godzilla vs. Kong',
      video: false,
      vote_average: 8.4,
      vote_count: 4014,
    },
    {
      adult: false,
      backdrop_path: '/zCjZfevPFBbOh2SAx2syIBHSqEI.jpg',
      genre_ids: [28, 18, 878],
      id: 124905,
      original_language: 'en',
      original_title: 'Godzilla',
      overview:
        'Ford Brody, a Navy bomb expert, has just reunited with his family in San Francisco when he is forced to go to Japan to help his estranged father, Joe. Soon, both men are swept up in an escalating crisis when an ancient alpha predator arises from the sea to combat malevolent adversaries that threaten the survival of humanity. The creatures leave colossal destruction in their wake, as they make their way toward their final battleground: San Francisco.',
      popularity: 161.235,
      poster_path: '/iBZhbCVhLpyxAfW1B8ePUxjScrx.jpg',
      release_date: '2014-05-14',
      title: 'Godzilla',
      video: false,
      vote_average: 6.2,
      vote_count: 6820,
    },
    {
      adult: false,
      backdrop_path: '/jb6Ju38HmKX0bYHCmAxs8HyNeJ2.jpg',
      genre_ids: [878, 28],
      id: 373571,
      original_language: 'en',
      original_title: 'Godzilla: King of the Monsters',
      overview:
        "Follows the heroic efforts of the crypto-zoological agency Monarch as its members face off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah. When these ancient super-species, thought to be mere myths, rise again, they all vie for supremacy, leaving humanity's very existence hanging in the balance.",
      popularity: 441.053,
      poster_path: '/pU3bnutJU91u3b4IeRPQTOP8jhV.jpg',
      release_date: '2019-05-29',
      title: 'Godzilla: King of the Monsters',
      video: false,
      vote_average: 6.7,
      vote_count: 3952,
    },
  ],
};

const server = setupServer(
  rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
    return res(ctx.json(response));
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test('should pass accessibility tests', async () => {
  const { container } = render(<SearchMovie />);
  expect(await axe(container)).toHaveNoViolations();
});

test('Should display search results in dropdown', async () => {
  const { getByText, findAllByRole, getByLabelText, queryByRole } = render(
    <SearchMovie />,
  );
  const input = getByLabelText(/title/i);

  userEvent.type(input, 'godzilla');
  userEvent.click(getByText(/find/i));

  expect(await findAllByRole('listitem')).toHaveLength(3);
  expect(await findAllByRole('img')).toHaveLength(3);

  userEvent.clear(input);
  expect(await queryByRole('listitem')).toBeNull();
  expect(await queryByRole('img')).toBeNull();
});

// TODO: Refactor
test('Should display no results message when API returns no matches', async () => {
  server.use(
    rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
      return res(
        ctx.json({
          page: 1,
          total_pages: 6,
          total_results: 108,
          results: [],
        }),
      );
    }),
  );
  const { getByText, getByLabelText, findByText } = render(<SearchMovie />);
  const input = getByLabelText(/title/i);

  userEvent.type(input, 'sasasa');
  userEvent.click(getByText(/find/i));
  expect(
    await findByText('No results found. Please try again.'),
  ).toBeInTheDocument();
});

test('Should display add movie modal when user selects movie from dropdown', async () => {
  const { getByText, getByLabelText, findByText, findByLabelText } = render(
    <SearchMovie />,
  );
  const input = getByLabelText(/title/i);
  userEvent.type(input, 'godzilla');
  userEvent.click(getByText(/find/i));

  const movie = await findByText('Godzilla vs. Kong');
  expect(movie).toBeInTheDocument();

  userEvent.click(movie);

  expect(await findByText('I watched...')).toBeInTheDocument();
  expect(await findByLabelText('Date watched')).toBeInTheDocument();
  expect(await findByLabelText('Review')).toBeInTheDocument();
  expect(await findByLabelText('Rating')).toBeInTheDocument();
  expect(await findByLabelText('Like')).toBeInTheDocument();
});
