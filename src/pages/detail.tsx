import React from 'react';
import { useRouteMatch } from 'react-router';

import MovieDetail from '../components/movie-detail/movie-detail';

const Detail = (): JSX.Element => {
  const match = useRouteMatch();
  const id = parseInt(match.url.split('/')[2]);

  return <MovieDetail id={id} />;
};

export default Detail;
