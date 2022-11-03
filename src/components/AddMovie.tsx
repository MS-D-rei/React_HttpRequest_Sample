import React, { useRef } from 'react';
import {
  AddMovieFormControlDiv,
  AddMovieFormLabel,
  AddMovieFormInput,
  AddMovieFormTextarea,
} from '@/components/AddMovieStyle';
import { MovieType } from '@/components/MovieType';
import { useFirebase } from '@/api/use-firebase';

// interface AddMovieProps {
//   onAddMovie: Function;
// }

function AddMovie() {
  const titleRef = useRef<HTMLInputElement>(null);
  const openningTextRef = useRef<HTMLTextAreaElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);

  const firebasePostConfig = {
    url: 'https://react-httprequest-sample-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
  };
  const { sendPostRequest } = useFirebase(firebasePostConfig);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (titleRef.current && openningTextRef.current && releaseDateRef.current) {
      const movie = {
        // id: Math.random(), /* id will be added by firebase automatically */
        title: titleRef.current.value,
        openingText: openningTextRef.current.value,
        releaseDate: releaseDateRef.current.value,
      };
      // onAddMovie(movie);
      sendPostRequest(movie);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <AddMovieFormControlDiv>
        <AddMovieFormLabel htmlFor="title">Title</AddMovieFormLabel>
        <AddMovieFormInput id="title" type="text" ref={titleRef} />
      </AddMovieFormControlDiv>
      <AddMovieFormControlDiv>
        <AddMovieFormLabel htmlFor="opening-text">
          Opening Text
        </AddMovieFormLabel>
        <AddMovieFormTextarea
          id="opening-text"
          rows={5}
          ref={openningTextRef}
        ></AddMovieFormTextarea>
      </AddMovieFormControlDiv>
      <AddMovieFormControlDiv>
        <AddMovieFormLabel htmlFor="release-date">
          Release Date
        </AddMovieFormLabel>
        <AddMovieFormInput id="release-date" type="text" ref={releaseDateRef} />
      </AddMovieFormControlDiv>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
