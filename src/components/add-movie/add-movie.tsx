import React, { useState } from 'react';

import styles from './add-movie.module.css';

export const AddMovie: React.FC = () => {
  const [name, setName] = useState('');

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(name);
  };

  return (
    <section className={styles.addMovie}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="add">
          Add a movie <input type="text" value={name} name="add" onChange={(e) => setName(e.target.value)} />
        </label>
        <input type="submit" value="submit" />
      </form>
    </section>
  );
};
