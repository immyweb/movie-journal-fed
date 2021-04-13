import React from 'react';

import SearchMovie from '../components/search-movie/search-movie';
import MoviesList from '../components/movies-list/movies-list';

const Home = (): JSX.Element => {
  return (
    <>
      <SearchMovie />
      <MoviesList />
    </>
  );
};

export default Home;
