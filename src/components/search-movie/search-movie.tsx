import React, { useState } from 'react';
import axios from '../../adapters/axios';

import styles from '../search-movie/search-movie.module.css';

import requests from '../../config/requests';

import { IMovieIDResult } from '../../types/idTypes';

interface IResult {
  title: string;
  id: number;
  posterImg: null | string;
  releaseDate?: string;
}

// Type movie
// Search
// API request
// 3 results in dropdown
// Select item
// Display Review Movie component

export const SearchMovie: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [results, setResults] = useState<IResult[]>([]);

  const handleSearch = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // Reset list
    setResults([]);

    axios.get(`${requests.fetchId}${title}`).then(response => {
      const filtered = filterResults(response.data.results);
      console.log(filtered);

      setResults(filtered);
    });
  };

  const filterResults = (data: IMovieIDResult[]) => {
    const filtered = [];
    for (let i = 0; i < 3; i++) {
      const item = {
        title: data[i].title,
        id: data[i].id,
        posterImg: data[i].poster_path,
        releaseDate: data[i].release_date,
      };
      filtered.push(item);
    }
    return filtered;
  };

  const parseDate = (date?: string) => {
    return date?.slice(0, 4);
  };

  const onSelect = (result: IResult) => {
    console.log(result);
  };

  const renderResults = (results: IResult[]) => {
    return results.map(result => {
      const { id, posterImg, title, releaseDate } = result;
      return (
        <li key={id} className={styles.item}>
          <img
            src={`${requests.imgUrl}${posterImg}`}
            alt={title}
            className={styles.poster}
          />
          <div className={styles.info}>
            <h4 className={styles.title}>{title}</h4>
            <p className={styles.date}>({parseDate(releaseDate)})</p>
          </div>
          <button className={styles.select} onClick={() => onSelect(result)}>
            Select
          </button>
        </li>
      );
    });
  };

  return (
    <section className={styles.searchMovie}>
      <h3 className={styles.heading}>What did you watch?</h3>
      <div className={styles.formContainer}>
        <form onSubmit={handleSearch}>
          <label htmlFor="title">
            <span className={styles.labelText}>Title</span>
            <input
              className={styles.input}
              type="text"
              value={title}
              name="title"
              onChange={e => setTitle(e.target.value)}
            />
          </label>
          <button className={styles.submit}>Find</button>
        </form>
        {results.length > 0 && (
          <ul className={styles.dropdown}>{renderResults(results)}</ul>
        )}
      </div>
    </section>
  );
};
