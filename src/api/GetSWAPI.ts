import { MovieType } from '@/components/MovieType';
import { SWAPIFilmListType } from '@/api/SWAPITypes';

export async function getMovies() {
  const response = await fetch('https://swapi.dev/api/films/');
  const data: SWAPIFilmListType = await response.json();
  const transformedMoviesData: MovieType[] = data.results.map((movieData) => ({
    id: movieData.episode_id,
    title: movieData.title,
    releaseDate: movieData.release_date,
    openingText: movieData.opening_crawl,
  }));
  return transformedMoviesData;
}
