import { Result } from '../../types/searchTitleResults';
import { IResult } from '../../types/types';

export const filterResults = (data: Result[]): IResult[] => {
  const filtered = [];
  for (let i = 0; i < 3; i++) {
    const item = {
      title: data[i].title,
      theMovieDbId: data[i].id,
      posterImg: data[i].poster_path,
      releaseDate: data[i].release_date,
    };
    filtered.push(item);
  }
  return filtered;
};
