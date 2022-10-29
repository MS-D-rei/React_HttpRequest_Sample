import Movie from '@/components/Movie';
import { MovieType } from '@/components/MovieType';
import { MovieListUL } from '@/components/MovieListStyle';

interface MovieListProps {
  movies: MovieType[];
}

function MovieList({ movies }: MovieListProps) {
  const eachMovie = movies.map((movie) => (
    <Movie
      key={movie.id}
      title={movie.title}
      releaseDate={movie.releaseDate}
      openingText={movie.openingText}
    />
  ));
  return <MovieListUL>{eachMovie}</MovieListUL>;
}

export default MovieList;
