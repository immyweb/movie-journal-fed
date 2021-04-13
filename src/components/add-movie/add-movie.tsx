import React, { useState } from 'react';

import { postMovie } from '../../adapters/movies-client';

import requests from '../../config/requests';
import { parseYear } from '../../utils/parseYear';
import { IResult, IMovieListItem } from '../../types/types';

import styles from './add-movie.module.css';

export const AddMovie = ({
  title,
  id,
  posterImg,
  releaseDate,
}: IResult): JSX.Element => {
  const [dateWatched, setDateWatched] = useState<string>();
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [like, setLike] = useState<boolean>(false);
  const [postSucess, setPostSucess] = useState<boolean>(false);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (dateWatched && review && rating) {
      const movie: IMovieListItem = {
        title,
        id,
        dateWatched,
        posterImg,
        review,
        releaseDate,
        rating: parseInt(rating),
        like,
      };
      postMovie(movie).then(() => {
        setPostSucess(true);
      });
    }
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
            value={'2021-04-08'}
            onChange={e => setDateWatched(e.target.value)}
            required
          />
          <label htmlFor="review" className={styles.label}>
            Review
          </label>
          <textarea
            name="review"
            id="review"
            placeholder={`Add a review`}
            onChange={e => setReview(e.target.value)}
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
            onChange={e => setRating(e.target.value)}
            required
          />
          <label htmlFor="like" className={styles.label}>
            Like
          </label>
          <input
            type="checkbox"
            name="like"
            id="like"
            onChange={e => setLike(e.target.checked)}
          />
          <input type="submit" value="submit" className={styles.submit} />
          {postSucess && <p>Thank you for your submission</p>}
        </div>
      </form>
    </section>
  );
};
