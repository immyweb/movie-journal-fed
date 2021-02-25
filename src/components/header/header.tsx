import React from 'react';

import styles from './header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.heading}>Movie Journal</h1>
    </header>
  );
};

export default Header;
