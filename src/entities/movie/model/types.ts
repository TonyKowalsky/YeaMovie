type MovieType = "FILM" | "TV_SERIES" | "ALL";

export type Order = "RATING" | "NUM_VOTE" | "YEAR";
export type Collections = "TOP_POPULAR_MOVIES" | "POPULAR_SERIES";

export interface Movie {
  kinopoiskId: number;
  filmId?: number;
  imdbId: string;
  nameRu: string;
  nameEn: string;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingKinopoisk: number;
  ratingImdb: number;
  year: number;
  description: string;
  shortDescription: string;
  type: MovieType;
  genres: { genre: string }[];
  countries: { country: string }[];
}

export interface Staff {
  staffId: number;
  nameRu: string;
  nameEn: string;
  description: string;
  posterUrl: string;
  professionText: string;
  professionKey: "DIRECTOR" | "ACTOR";
}

export interface Still {
  imageUrl: string;
  previewUrl: string;
}

export interface MovieStillsResponse {
  total: number;
  totalPages: number;
  items: Still[];
}

export interface MoviesResponse {
  total: number;
  totalPages: number;
  items: Movie[];
}

export interface SearchMoviesParams {
  countries?: number;
  genres?: number;
  order?: Order;
  type?: MovieType;
  ratingFrom?: number;
  ratingTo?: number;
  yearFrom?: number;
  yearTo?: number;
  keyword?: string;
  page?: number;
}

export interface SearchCollectionsParams {
  type: Collections;
  page?: number;
}
