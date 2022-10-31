import styled from 'styled-components';

export const AddMovieFormControlDiv = styled.div`
  margin: 1rem 0;
`;

export const AddMovieFormLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-align: left;
`;

export const AddMovieFormInput = styled.input`
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.2rem;
  border-radius: 12px;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
    border-color: #230052;
  }
`;

export const AddMovieFormTextarea = styled.textarea`
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.2rem;
  border-radius: 12px;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
    border-color: #230052;
  }
`;
