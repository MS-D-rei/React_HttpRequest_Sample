import MovieList from './components/MovieList';
import './App.css';
import { useState } from 'react';
import { MovieType } from '@/components/MovieType';
import { SWAPIType, SWAPIFilmListType } from '@/api/SWAPITypes';

function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);

  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films/')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setMovies(data.results);
  //     });
  // }

  async function fetchMovieHandler() {
    const response = await fetch('https://swapi.dev/api/films/');
    const data: SWAPIFilmListType = await response.json();
    const transformedMoviesData: MovieType[] = data.results.map(
      (movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        releaseDate: movieData.release_date,
        openingText: movieData.opening_crawl,
      })
    );
    setMovies(transformedMoviesData);
  }

  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MovieList movies={movies} />
      </section>
    </>
  );
}

export default App;
