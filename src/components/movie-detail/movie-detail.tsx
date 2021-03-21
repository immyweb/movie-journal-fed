import React, { useEffect, useState } from 'react';
import axios from '../../adapters/axios';

// import { IMovieDetail } from '../../types/types';
import requests from '../../config/requests';

interface IGenre {
  id: number;
  name: string;
}

export const MovieDetail: React.FC = () => {
  // const [movieId, setMovieId] = useState<number>();
  const [movieTitle, setMovieTitle] = useState<string>('');
  const [movieImage, setMovieImage] = useState<string>('');
  const [movieDesc, setMovieDesc] = useState<string>('');
  const [movieReleaseDate, setMovieReleaseDate] = useState<string>('');
  const [movieRuntime, setMovieRuntime] = useState<number>();
  const [movieGenres, setMovieGenres] = useState<IGenre[]>();
  const [movieDirector, setMovieDirector] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  // const [movieCast, setMovieCast] = useState<string[]>();

  useEffect(() => {
    axios
      .get(`${requests.fetchId}tenet`)
      .then(response => {
        // console.log(response.data.results[0].id);
        const id = response.data.results[0].id;
        // setMovieId(id);
        return axios.get(`movie/${id}${requests.fetchDetail}`);
      })
      .then(response => {
        // console.log('detail', response);
        const data = response.data;
        setMovieTitle(data.title);
        setMovieImage(data.poster_path);
        setMovieDesc(data.overview);
        setMovieReleaseDate(data.release_date);
        setMovieRuntime(data.runtime);
        setMovieGenres(data.genres);
        const id = data.id;
        return axios.get(`movie/${id}${requests.fetchCredits}`);
      })
      .then(response => {
        // console.log('credits', response);
        setMovieDirector(response.data.crew[0].name);
        setLoaded(true);
        // setMovieCast(response.data.)
      });
  }, []);

  return loaded ? (
    <section>
      <h2>{movieTitle}</h2>
      <img
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movieImage}`}
        alt={movieTitle}
      />
      <p>{movieDesc}</p>
      <p>{movieReleaseDate}</p>
      <p>{movieRuntime}</p>
      <ul>
        <li>Genre</li>
        <li>Genre</li>
        <li>Genre</li>
      </ul>
      <p>{movieDirector}</p>
      <ul>
        <li>Cast</li>
        <li>Cast</li>
        <li>Cast</li>
        <li>Cast</li>
      </ul>
    </section>
  ) : (
    <div>No data</div>
  );
};
