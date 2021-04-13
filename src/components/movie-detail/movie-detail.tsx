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

type IDetail = {
  title: string;
  poster_path: string;
  release_date: string;
  date_watched: string;
  like: boolean;
  rating: number;
  review: string;
  director: string;
};

type IMovieDetail = {
  id: number;
};

const MovieDetail = ({ id }: IMovieDetail): JSX.Element => {
  const [movieDetail, setMovieDetail] = useState<IDetail>();
  const [movieGenres, setMovieGenres] = useState<Genre[]>();
  const [movieCast, setMovieCast] = useState<Cast[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDirector = (crew: Cast[]): string => {
    const result = crew.filter(obj => {
      return obj.job === 'Director';
    });
    return result[0].name;
  };

  const getCast = (cast: Cast[], number: number): Cast[] => {
    const data: Cast[] = [];
    for (let i = 0; i < number; i++) {
      data.push(cast[i]);
    }
    return data;
  };

  useEffect(() => {
    Promise.all([getMovieDetail(id), getMovieCredits(id), getMovie(id)]).then(
      responses => {
        const movieInfo = {
          title: responses[0].title,
          poster_path: responses[0].poster_path,
          release_date: responses[0].release_date,
          date_watched: responses[2].dateWatched,
          like: responses[2].like,
          rating: responses[2].rating,
          review: responses[2].review,
          director: getDirector(responses[1].crew),
        };
        setMovieDetail(movieInfo);

        const genres = responses[0].genres;
        setMovieGenres(genres);

        const cast = getCast(responses[1].cast, 3);
        setMovieCast(cast);

        setIsLoading(false);
      },
    );
  }, [id]);

  const renderGenres = () => {
    return movieGenres?.map(genre => {
      return <li key={genre.name}>{genre.name}</li>;
    });
  };

  const renderCast = () => {
    return movieCast?.map(cast => {
      return <li key={cast.name}>{cast.name}</li>;
    });
  };

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
            <span className={styles.releaseDate}>
              {parseYear(movieDetail?.release_date)}
            </span>
          </h2>
          <p>{`${movieDetail?.rating}/10`}</p>
          <p>{`Watched: ${movieDetail?.date_watched}`}</p>
          <p>{movieDetail?.review}</p>
          <p>{movieDetail?.like ? 'Liked' : null}</p>
          <h3 className={styles.detailHeading}>Director</h3>
          <p>{movieDetail?.director}</p>
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
