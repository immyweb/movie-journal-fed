import React, { useState, useEffect, useRef } from 'react';

import Modal from '../modal/modal';
import { AddMovie } from '../add-movie/add-movie';
import SearchResult from './search-result';
import { searchMovie } from '../../adapters/themoviesdb-client';
import { filterResults } from './helpers';

import { IResult } from '../../types/types';

import styles from '../search-movie/search-movie.module.css';

const SearchMovie = (): JSX.Element => {
  const [title, setTitle] = useState<string>('');
  const [results, setResults] = useState<IResult[]>([]);
  const [noResult, setNoResult] = useState<boolean>(false);
  const [selected, setSelected] = useState<IResult>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const onSearch = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    // Reset list
    setResults([]);

    searchMovie(title).then(response => {
      if (response.results.length) {
        const filtered = filterResults(response.results);
        setNoResult(false);
        setResults(filtered);
      } else {
        if (mountedRef.current) {
          setNoResult(true);
        }
      }
    });
  };

  const onSelect = (result: IResult) => {
    setSelected(result);
    setResults([]);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const renderResults = (results: IResult[]) => {
    return results.map(result => {
      return (
        <SearchResult
          {...result}
          onSelect={onSelect}
          key={result.theMovieDbId}
        />
      );
    });
  };

  return (
    <section className={styles.searchMovie}>
      <h2 className={styles.heading}>What did you watch?</h2>
      <div className={styles.formContainer}>
        <form onSubmit={onSearch}>
          <label htmlFor="title" className={styles.labelText}>
            Title
          </label>
          <input
            className={styles.input}
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={e => setTitle(e.target.value)}
          />
          <button className={styles.submit}>Find</button>
        </form>
        {results.length > 0 && title.length > 0 && (
          <ul
            className={styles.dropdown}
            role="region"
            aria-live="polite"
            data-testid="search-results"
          >
            {renderResults(results)}
          </ul>
        )}
        {noResult && (
          <p
            className={styles.noResult}
            role="region"
            aria-live="polite"
            data-testid="no-results"
          >
            No results found. Please try again.
          </p>
        )}
        {showModal && selected && (
          <Modal
            content={<AddMovie {...selected} onCloseModal={onCloseModal} />}
            onCloseModal={onCloseModal}
          />
        )}
      </div>
    </section>
  );
};

export default SearchMovie;
