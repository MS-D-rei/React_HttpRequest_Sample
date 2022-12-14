import { MovieType } from '@/components/MovieType';
import { useCallback, useState } from 'react';

interface FirebaseRequestConfig {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: string;
}

export const useFirebase = (firebaseRequest: FirebaseRequestConfig) => {
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

  const sendGetRequest = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      // const response = await fetch('https://swapi.dev/api/films/');
      const response = await fetch(firebaseRequest.url, {
        method: firebaseRequest.method ? firebaseRequest.method : 'Get',
        headers: firebaseRequest.headers ? firebaseRequest.headers : {},
        body: firebaseRequest.body
          ? JSON.stringify(firebaseRequest.body)
          : null,
      });
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
          });
        }
        return moviesArray;
      };
      setIsLoading(false);
      return loadedMovies();
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        setError(err.message);
        setIsLoading(false);
      } else {
        console.log(`Unexpected Error: ${err}`);
        setIsLoading(false);
      }
    }
  }, [firebaseRequest]);

  const sendPostRequest = async (movie: MovieType) => {
    try {
      const response = await fetch(firebaseRequest.url, {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Context-Type': 'application/json',
        },
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
      } else {
        console.log(`Unexpected Error: ${err}`);
      }
    }
  };

  return {
    isLoading,
    error,
    sendGetRequest,
    sendPostRequest,
  };
};
