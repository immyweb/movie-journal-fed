import React from 'react';

import styles from './modal.module.css';

export const Modal: React.FC = () => {
  return (
    <section className={styles.modalContainer}>
      <div className={styles.modalInner}>
        <button>Close</button>
        <div className={styles.modalContent}></div>
      </div>
    </section>
  );
};
