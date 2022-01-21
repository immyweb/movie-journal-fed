import React, { useState } from 'react';

import { updateMovie } from '../../adapters/movies-client';
import requests from '../../config/requests';
import { parseYear } from '../../utils/parseYear';
import { IMovieListItem } from '../../types/types';

import styles from './edit-movie.module.css';

type IEditMovie = {
  date_watched: string;
  like: boolean;
  rating: number;
  review: string;
  id: string;
  theMovieDbId: number;
  title: string;
  posterPath: string;
  releaseDate: string;
};

interface FormElements extends HTMLFormControlsCollection {
  date: HTMLInputElement;
  review: HTMLInputElement;
  rating: HTMLInputElement;
  like: HTMLInputElement;
}

interface editMovieFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const EditMovie = ({
  date_watched,
  like,
  rating,
  review,
  theMovieDbId,
  id,
  title,
  posterPath,
  releaseDate,
}: IEditMovie): JSX.Element => {
  const [postSucess, setPostSucess] = useState<boolean>(false);

  const handleSubmit = (evt: React.FormEvent<editMovieFormElement>) => {
    evt.preventDefault();

    const { date, review, rating, like } = evt.currentTarget.elements;
    const movie: IMovieListItem = {
      title,
      theMovieDbId,
      dateWatched: date.value,
      posterImg: posterPath,
      review: review.value,
      releaseDate,
      rating: parseInt(rating.value),
      like: like.checked,
    };

    updateMovie(id, movie).then(() => {
      setPostSucess(true);
    });
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          {posterPath && (
            <img src={`${requests.imgUrl}${posterPath}`} alt={title} />
          )}
        </div>
        <div className={styles.content}>
          <h3 className={styles.subHeading}>Edit movie</h3>
          <h2 className={styles.heading}>
            {title}{' '}
            <span className={styles.date}>({parseYear(releaseDate)})</span>
          </h2>
          <label htmlFor="date" className={styles.label}>
            Date watched
          </label>
          <input
            type="date"
            name="date"
            id="date"
            defaultValue={date_watched}
            required
          />
          <label htmlFor="review" className={styles.label}>
            Review
          </label>
          <textarea name="review" id="review" defaultValue={review} required />
          <label htmlFor="rating" className={styles.label}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            min="1"
            max="10"
            defaultValue={rating}
            required
          />
          <label htmlFor="like" className={styles.label}>
            Like
          </label>
          <input type="checkbox" name="like" id="like" defaultChecked={like} />
          <input type="submit" value="update" className={styles.submit} />
          {postSucess && <p data-testid="post-success">Movie updated!</p>}
        </div>
      </form>
    </section>
  );
};
