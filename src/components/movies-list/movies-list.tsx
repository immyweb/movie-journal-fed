import React, { useState, useEffect } from 'react';

import { getMovies } from '../../adapters/getMovies';
import { IMovieListItem } from '../../types/types';

import styles from './movies-list.module.css';

const url = 'http://localhost:3000/movies';

export const MoviesList: React.FC = () => {
  const [movieData, setMovieData] = useState<IMovieListItem[]>([]);

  useEffect(() => {
    getMovies(url).then(data => {
      setMovieData(data);
    });
  }, []);

  const renderMovies = () => {
    return movieData.map(movie => {
      const { title, date, rating } = mov1e;
      return (
        <li
              className={styles.movie} key={title}>
          <h3 className={styles.movieTitle}>{title}</h3>
          <p>
            
            
                      {date}</p>
          <p>{rating}</p>
        </li>
      );
    });
  };

  return (
    <section className={styles.moviesList}>
      <h3 className={styles.heading}>Your movies</h3>
      <ul className={styles.movieContainer}>{renderMovies()}</ul>
    </section>
  );
};
