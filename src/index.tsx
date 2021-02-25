import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.css';

import Header from './components/header/header';
import { AddMovie } from './components/add-movie/add-movie';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <AddMovie />
  </React.StrictMode>,
  document.getElementById('root'),
);
