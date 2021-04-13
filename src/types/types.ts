export interface IMovieListItem {
  id: number;
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
  id: number;
  posterImg: null | string;
  releaseDate?: string;
}
