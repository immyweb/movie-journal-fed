import React, { useState } from 'react';

import { postMovie } from '../../adapters/postMovie';

import styles from './add-movie.module.css';

const url = 'http://localhost:3000/movies';

export const AddMovie: React.FC = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const movie = {
      title,
      date,
      rating: parseInt(rating),
      id: Date.now(),
    };

    postMovie(url, movie).then(res => console.log(res));
  };

  return (
    <section className={styles.addMovie}>
      <form onSubmit={handleSubmit}>
        <h3 className={styles.heading}>What did you watch?</h3>
        <label htmlFor="title" className={styles.label}>
          <span className={styles.labelText}>Title</span>
          <input
            type="text"
            value={title}
            name="title"
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="date" className={styles.label}>
          <span className={styles.labelText}>Date</span>
          <input
            type="date"
            name="date"
            value="2021-02-27"
            onChange={e => setDate(e.target.value)}
          />
        </label>
        <label htmlFor="rating" className={styles.label}>
          <span className={styles.labelText}>Rating</span>
          <input
            type="number"
            name="rating"
            min="1"
            max="10"
            onChange={e => setRating(e.target.value)}
          />
        </label>
        <input type="submit" value="submit" className={styles.submit} />
      </form>
    </section>
  );
};
