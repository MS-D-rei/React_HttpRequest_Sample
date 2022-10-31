import MovieList from './components/MovieList';
import { useCallback, useEffect, useState } from 'react';
import { MovieType } from '@/components/MovieType';
import { SWAPIFilmListType } from '@/api/SWAPITypes';
import AddMovie from '@/components/AddMovie';
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
      // const response = await fetch('https://swapi.dev/api/films/');
      const response = await fetch('https://react-httprequest-sample-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json');
      if (!response.ok) {
        throw new Error('response is not ok');
      }
      console.log(response);
      // const data: SWAPIFilmListType = await response.json();
      // const transformedMoviesData: MovieType[] = data.results.map(
      //   (movieData) => ({
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     releaseDate: movieData.release_date,
      //     openingText: movieData.opening_crawl,
      //   })
      // );
      const data: MovieType[] = await response.json();
      const loadedMovies = () => {
        let moviesArray: MovieType[] = [];
        for (let key in data) {
          moviesArray.push({
            id: key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate,
          })
        }
        return moviesArray;
      }
      setMovies(loadedMovies);
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

  const addMovieHandler = async (movie: MovieType) => {
    const response = await fetch('https://react-httprequest-sample-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Context-Type': 'application/json',
      }
    });
    const data = await response.json();
    console.log(data);
  }

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
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>{moviesContent}</section>
    </>
  );
}

export default App;
