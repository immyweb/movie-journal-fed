import React from 'react';
import { useThemeContext } from '../../context/theme-context';

import styles from './theme-toggle.module.css';

const ThemeToggle = (): JSX.Element => {
  const { dark, toggleDark } = useThemeContext();

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleDark?.();
  };

  return (
    <div className="theme-toggle">
      <h4>{dark ? 'Darkmode ON' : 'Darkmode OFF'}</h4>
      <button className={styles.toggle} onClick={handleOnClick}>
        Toggle dark mode
      </button>
    </div>
  );
};

export default ThemeToggle;
