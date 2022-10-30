import MovieList from './components/MovieList';
import './App.css';
import { useState } from 'react';
import { MovieType } from '@/components/MovieType';
import { SWAPIType, SWAPIFilmListType } from '@/api/SWAPITypes';
import { getMovies } from '@/api/GetSWAPI'

function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const transformedMoviesData = await getMovies();
    setMovies(transformedMoviesData);
    setIsLoading(false);
  }

  const moviesContent = isLoading ? (
    <p>Loading...</p>
  ) : movies.length > 0 ? (
    <MovieList movies={movies} />
  ) : (
    <p>Found no movies.</p>
  );

  return (
    <>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {moviesContent}
      </section>
    </>
  );
}

export default App;
