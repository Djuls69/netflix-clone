const key = '0bde9bd901964f55023e7ae1b2d901bd'

export const urls = {
  trending: `https://api.themoviedb.org/3/trending/all/week?api_key=${key}`,
  originals: `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_networks=213&language=fr`,
  topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=fr&total_results=40`,
  action: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=28`,
  comedy: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=35`,
  horror: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27`,
  romance: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10749`,
  documentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=99`,
  image: 'https://image.tmdb.org/t/p/w500'
}
