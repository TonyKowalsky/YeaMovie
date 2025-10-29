import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "./types";
import { loadFavoritesFromStorage } from "../lib/utils/helpers";

interface MoviesState {
  movies: Record<number, Movie>;
}

const initialState: MoviesState = {
  movies: loadFavoritesFromStorage(),
};

const favoriteMoviesSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      state.movies[action.payload.kinopoiskId ?? action.payload.filmId] =
        action.payload;
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      delete state.movies[action.payload];
    },
    clearFavorites: state => {
      state.movies = {};
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoriteMoviesSlice.actions;

export default favoriteMoviesSlice.reducer;
