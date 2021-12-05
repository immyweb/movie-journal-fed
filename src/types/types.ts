export interface IMovieListItem {
  _id?: string;
  theMovieDbId: number;
  title: string;
  dateWatched: string;
  rating: number;
  review: string;
  like: boolean;
  posterImg: null | string;
  releaseDate?: string;
}

export interface IResult {
  title: string;
  theMovieDbId: number;
  posterImg: null | string;
  releaseDate?: string;
}

export interface IMovie {
  movie: IMovieListItem;
}

export interface IMovies {
  movies: IMovieListItem[];
}
