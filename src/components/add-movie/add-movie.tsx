import React, { useState } from 'react';

import { postMovie } from '../../adapters/movies-client';

import requests from '../../config/requests';
import { parseYear } from '../../utils/parseYear';
import { IResult, IMovieListItem } from '../../types/types';

import styles from './add-movie.module.css';

interface FormElements extends HTMLFormControlsCollection {
  date: HTMLInputElement;
  review: HTMLInputElement;
  rating: HTMLInputElement;
  like: HTMLInputElement;
}

interface AddMovieFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface IAddMovie extends IResult {
  onCloseModal: () => void;
}

export const AddMovie = ({
  title,
  theMovieDbId,
  posterImg,
  releaseDate,
  onCloseModal,
}: IAddMovie): JSX.Element => {
  const [postSucess, setPostSucess] = useState<boolean>(false);

  const handleSubmit = (evt: React.FormEvent<AddMovieFormElement>) => {
    evt.preventDefault();

    const { date, review, rating, like } = evt.currentTarget.elements;
    const movie: IMovieListItem = {
      title,
      theMovieDbId,
      dateWatched: date.value,
      posterImg,
      review: review.value,
      releaseDate,
      rating: parseInt(rating.value),
      like: like.checked,
    };
    postMovie(movie).then(() => {
      setPostSucess(true);
      onCloseModal();
    });
  };

  return (
    <section className={styles.addMovie}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          {posterImg && (
            <img src={`${requests.imgUrl}${posterImg}`} alt={title} />
          )}
        </div>
        <div className={styles.content}>
          <h3 className={styles.subHeading}>I watched...</h3>
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
            defaultValue={'2021-04-08'}
            required
          />
          <label htmlFor="review" className={styles.label}>
            Review
          </label>
          <textarea
            name="review"
            id="review"
            placeholder={`Add a review`}
            required
          />
          <label htmlFor="rating" className={styles.label}>
            Rating
          </label>
          <input
            type="number"
            name="rating"
            id="rating"
            min="1"
            max="10"
            required
          />
          <label htmlFor="like" className={styles.label}>
            Like
          </label>
          <input type="checkbox" name="like" id="like" />
          <input type="submit" value="submit" className={styles.submit} />
          {postSucess && (
            <p data-testid="post-success">Thank you for your submission</p>
          )}
        </div>
      </form>
    </section>
  );
};
