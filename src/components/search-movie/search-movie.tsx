import React, { useState } from 'react';

import styles from '../add-movie/add-movie.module.css';

export const SearchMovie: React.FC = () => {
  const [title, setTitle] = useState('');

  return (
    <section className={styles.addMovie}>
      <h3 className={styles.heading}>What did you watch?</h3>
      <form>
        <label htmlFor="title" className={styles.label}>
          <span className={styles.labelText}>Title</span>
          <input
            type="text"
            value={title}
            name="title"
            onChange={e => setTitle(e.target.value)}
          />
        </label>
      </form>
    </section>
  );
};
