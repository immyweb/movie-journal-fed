import React from 'react';

import { removeMovie } from '../../adapters/movies-client';
import styles from './delete-movie.module.css';

export const DeleteMovie = ({
  onCloseModal,
  id,
}: {
  onCloseModal: () => void;
  id: string;
}): JSX.Element => {
  const onDeleteMovie = () => {
    removeMovie(id).then(() => {
      onCloseModal();
    });
  };

  return (
    <section>
      <p>Are you sure you want to delete this movie entry?</p>
      <div className={styles.btnHolder}>
        <button className={styles.editBtn} onClick={onDeleteMovie}>
          Yes
        </button>
        <button className={styles.deleteBtn} onClick={onCloseModal}>
          No
        </button>
      </div>
    </section>
  );
};
