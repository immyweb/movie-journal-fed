import React from 'react';
import { useRouteMatch } from 'react-router';

import MovieDetail from '../components/movie-detail/movie-detail';

const Detail = (): JSX.Element => {
  const match = useRouteMatch();
  const id = match.url.split('/');

  return <MovieDetail id={id[2]} />;
};

export default Detail;
