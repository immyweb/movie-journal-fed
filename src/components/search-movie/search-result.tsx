import React from 'react';

import requests from '../../config/requests';
import { IResult } from '../../types/types';
import { parseYear } from '../../utils/parseYear';

import styles from '../search-movie/search-movie.module.css';

interface ISearchResult extends IResult {
  onSelect: (result: IResult) => void;
}

const SearchResult = ({
  id,
  posterImg,
  title,
  releaseDate,
  onSelect,
}: ISearchResult): JSX.Element => {
  const result = { id, posterImg, title, releaseDate };
  return (
    <li key={id} className={styles.item} onClick={() => onSelect(result)}>
      <img
        src={`${requests.imgUrl}${posterImg}`}
        alt={title}
        className={styles.poster}
      />
      <div className={styles.info}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.date}>({parseYear(releaseDate)})</p>
      </div>
    </li>
  );
};

export default SearchResult;
