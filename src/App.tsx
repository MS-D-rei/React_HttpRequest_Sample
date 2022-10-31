import MovieList from './components/MovieList';
import { useCallback, useEffect, useState } from 'react';
import { MovieType } from '@/components/MovieType';
import { SWAPIFilmListType } from '@/api/SWAPITypes';
import './App.css';

function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  // function fetchMoviesHandler() {
  //   fetch('https://swapi.dev/api/films/')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setMovies(data.results);
  //     });
  // }

  const fetchMovieHandler = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('response is not ok');
      }
      console.log(response);
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
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        setError(err.message);
      } else {
        console.log('Unexpected Error');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  const moviesContent = isLoading ? (
    <p>Loading...</p>
  ) : movies.length > 0 ? (
    <MovieList movies={movies} />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <p>Found no movies.</p>
  );

  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{moviesContent}</section>
    </>
  );
}

export default App;
