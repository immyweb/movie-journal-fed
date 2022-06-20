import Config from '../../config';

const requests = {
  dbApi: 'http://localhost:8000/api',
  baseURL: 'https://api.themoviedb.org/3/',
  fetchId: `search/movie?api_key=${Config.API_KEY}&language=en-US&page=1&include_adult=false&query=`,
  fetchDetail: `?api_key=${Config.API_KEY}&language=en-US`,
  fetchCredits: `/credits?api_key=${Config.API_KEY}&language=en-US`,
  imgUrl: `https://www.themoviedb.org/t/p/w220_and_h330_face/`,
};

export default requests;
