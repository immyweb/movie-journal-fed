import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { getMovies } from '../../adapters/movies-client';
import requests from '../../config/requests';
import { IMovieListItem } from '../../types/types';
import { parseYear } from '../../utils/parseYear';

import styles from './movies-list.module.css';

const MoviesList = (): JSX.Element => {
  const [movieData, setMovieData] = useState<IMovieListItem[]>([]);
  const mountedRef = useRef(false);

  const sortByDateWatched = (data: IMovieListItem[]) => {
    const sortedData = data;
    return sortedData.sort((a, b) => {
      return +new Date(b.dateWatched) - +new Date(a.dateWatched);
    });
  };

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    getMovies().then(data => {
      const sortedDate = sortByDateWatched(data);
      if (mountedRef.current) {
        setMovieData(sortedDate);
      }
    });
  }, []);

  const renderMovies = () => {
    return movieData.map(movie => {
      const { title, dateWatched, rating, posterImg, id } = movie;
      return (
        <li className={styles.movie} key={title}>
          <Link to={`/detail/${id}`} className={styles.movieLink}>
            <img
              src={`${requests.imgUrl}${posterImg}`}
              alt={title}
              className={styles.poster}
            />
          </Link>
          <h3 className={styles.movieTitle}>{title}</h3>
          <p>{parseYear(dateWatched)}</p>
          <p>{rating}</p>
        </li>
      );
    });
  };

  return (
    <section className={styles.moviesList}>
      <h2 className={styles.heading}>Your movies</h2>
      <ul className={styles.movieContainer}>{renderMovies()}</ul>
    </section>
  );
};

export default MoviesList;
