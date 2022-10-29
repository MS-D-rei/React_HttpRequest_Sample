import { MovieLI } from "@/components/MovieStyle";

interface MovieProps {
  title: string;
  releaseDate: string;
  openingText: string;
}

function Movie({title, releaseDate, openingText}: MovieProps) {
  return (
    <MovieLI>
      <h2>{title}</h2>
      <h3>{releaseDate}</h3>
      <p>{openingText}</p>
    </MovieLI>
  )
}

export default Movie;