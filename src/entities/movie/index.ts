import moviesApi from "./api/moviesApi";
import favoriteMoviesReducer, {
  removeFromFavorites,
  addToFavorites,
  clearFavorites,
} from "./model/favoriteMoviesSlice";
import {
  getActors,
  getDirectors,
  saveFavoritesToStorage,
} from "./lib/utils/helpers";
import MovieCard from "./ui/card/MovieCard";
import MovieCardLarge from "./ui/card-large/MovieCardLarge";
import MovieCardMedium from "./ui/card-medium/MovieCardMedium";
import { countries, genres } from "./lib/constants/data";
import type { Collections, Movie, Still } from "./model/types";
import {
  useGetMovieStillsQuery,
  useGetMoviesByParamsQuery,
  useGetMovieDetailsQuery,
  useGetMoviesByCollectionQuery,
  useGetSimilarMoviesQuery,
} from "./api/moviesApi";

export {
  moviesApi,
  favoriteMoviesReducer,
  saveFavoritesToStorage,
  getActors,
  getDirectors,
  MovieCard,
  MovieCardLarge,
  MovieCardMedium,
  countries,
  genres,
  useGetMovieStillsQuery,
  useGetMoviesByParamsQuery,
  useGetMovieDetailsQuery,
  useGetMoviesByCollectionQuery,
  useGetSimilarMoviesQuery,
  removeFromFavorites,
  addToFavorites,
  clearFavorites,
  type Collections,
  type Movie,
  type Still,
};
