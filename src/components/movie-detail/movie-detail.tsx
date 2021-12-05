import React, { useEffect, useState } from 'react';

import {
  getMovieDetail,
  getMovieCredits,
} from '../../adapters/themoviesdb-client';
import { getMovie } from '../../adapters/movies-client';
import { parseYear } from '../../utils/parseYear';
import { Genre } from '../../types/detailTypes';
import { Cast } from '../../types/creditTypes';
import styles from './movie-detail.module.css';

type IMovieMeta = {
  date_watched: string;
  like: boolean;
  rating: number;
  review: string;
};

type IDetail = {
  title: string;
  poster_path: string;
  release_date: string;
  director: string;
};

type IMovieDetail = {
  id: string;
};

const MovieDetail = ({ id }: IMovieDetail): JSX.Element => {
  const [movieMeta, setMovieMeta] = useState<IMovieMeta>();
  const [movieDetail, setMovieDetail] = useState<IDetail>();
  const [movieGenres, setMovieGenres] = useState<Genre[]>();
  const [movieCast, setMovieCast] = useState<Cast[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  function getDirector(crew: Cast[]): string {
    const result = crew.filter(obj => {
      return obj.job === 'Director';
    });
    return result[0].name;
  }

  function getCast(cast: Cast[], number: number): Cast[] {
    const data: Cast[] = [];
    for (let i = 0; i < number; i++) {
      data.push(cast[i]);
    }
    return data;
  }

  useEffect(() => {
    function fetchMovieDetails(id: number) {
      Promise.all([getMovieDetail(id), getMovieCredits(id)]).then(responses => {
        const movieInfo = {
          title: responses[0].title,
          poster_path: responses[0].poster_path,
          release_date: responses[0].release_date,
          director: getDirector(responses[1].crew),
        };
        setMovieDetail(movieInfo);

        const genres = responses[0].genres;
        setMovieGenres(genres);

        const cast = getCast(responses[1].cast, 3);
        setMovieCast(cast);

        setIsLoading(false);
      });
    }

    function getMovieInfo(id: string) {
      getMovie(id).then(data => {
        const { dateWatched, like, rating, review, theMovieDbId } = data.movie;
        const movieMeta = {
          date_watched: dateWatched,
          like,
          rating,
          review,
        };
        setMovieMeta(movieMeta);
        fetchMovieDetails(theMovieDbId);
      });
    }

    getMovieInfo(id);
  }, [id]);

  function renderGenres() {
    return movieGenres?.map(genre => {
      return <li key={genre.name}>{genre.name}</li>;
    });
  }

  function renderCast() {
    return movieCast?.map(cast => {
      return <li key={cast.name}>{cast.name}</li>;
    });
  }

  return isLoading === false ? (
    <section className={styles.movieDetail}>
      <div className={styles.detailInfo}>
        <img
          src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movieDetail?.poster_path}`}
          alt={movieDetail?.title}
          className={styles.detailImage}
        />
        <div className={styles.detailContent}>
          <h2 className={styles.detailTitle}>
            {movieDetail?.title}{' '}
            <span className={styles.releaseDate} data-testid="release-date">
              {parseYear(movieDetail?.release_date)}
            </span>
          </h2>
          <p data-testid="rating">{`${movieMeta?.rating}/10`}</p>
          <p data-testid="date-watched">{`Watched: ${movieMeta?.date_watched}`}</p>
          <p data-testid="review">{movieMeta?.review}</p>
          <p data-testid="liked">{movieMeta?.like ? 'Liked' : null}</p>
          <h3 className={styles.detailHeading}>Director</h3>
          <p data-testid="director">{movieDetail?.director}</p>
          <div className={styles.detailMeta}>
            <div>
              <h3 className={styles.detailHeading}>Cast</h3>
              <ul>{renderCast()}</ul>
            </div>
            <div>
              <h3 className={styles.detailHeading}>Genres</h3>
              <ul>{renderGenres()}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className={styles.movieDetail}>Loading...</section>
  );
};

export default MovieDetail;
