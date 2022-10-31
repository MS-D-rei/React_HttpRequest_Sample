import React, { useRef } from 'react';
import {
  AddMovieFormControlDiv,
  AddMovieFormLabel,
  AddMovieFormInput,
  AddMovieFormTextarea,
} from '@/components/AddMovieStyle';
import { MovieType } from '@/components/MovieType';

interface AddMovieProps {
  onAddMovie: Function;
}

function AddMovie({ onAddMovie }: AddMovieProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const openningTextRef = useRef<HTMLTextAreaElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (titleRef.current && openningTextRef.current && releaseDateRef.current) {
      const movie: MovieType = {
        id: Math.random(),
        title: titleRef.current.value,
        openingText: openningTextRef.current.value,
        releaseDate: releaseDateRef.current.value,
      };
      onAddMovie(movie);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <AddMovieFormControlDiv>
        <AddMovieFormLabel htmlFor="title">Title</AddMovieFormLabel>
        <AddMovieFormInput id="title" type="text" ref={titleRef} />
      </AddMovieFormControlDiv>
      <AddMovieFormControlDiv>
        <AddMovieFormLabel htmlFor="opening-text">Opening Text</AddMovieFormLabel>
        <AddMovieFormTextarea
          id="opening-text"
          rows={5}
          ref={openningTextRef}
        ></AddMovieFormTextarea>
      </AddMovieFormControlDiv>
      <AddMovieFormControlDiv>
        <AddMovieFormLabel htmlFor="release-date">Release Date</AddMovieFormLabel>
        <AddMovieFormInput id="release-date" type="text" ref={releaseDateRef} />
      </AddMovieFormControlDiv>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
