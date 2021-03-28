const API_KEY = '91997a6c1324b664a7a4cabc3874dcf6';

const requests = {
  fetchId: `search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=`,
  fetchDetail: `?api_key=${API_KEY}&language=en-US`,
  fetchCredits: `/credits?api_key=${API_KEY}&language=en-US`,
  imgUrl: `https://www.themoviedb.org/t/p/w220_and_h330_face/`,
};

export default requests;
