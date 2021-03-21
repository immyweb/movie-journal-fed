import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.css';

import Header from './components/header/header';
// import { AddMovie } from './components/add-movie/add-movie';
import { SearchMovie } from './components/search-movie/search-movie';
// import { MovieDetail } from './components/movie-detail/movie-detail';
import { MoviesList } from './components/movies-list/movies-list';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    {/* <AddMovie /> */}
    {/* <MovieDetail /> */}
    <SearchMovie />
    <MoviesList />
  </React.StrictMode>,
  document.getElementById('root'),
);
