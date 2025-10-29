import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Movie,
  MoviesResponse,
  SearchMoviesParams,
  SearchCollectionsParams,
  Staff,
  MovieStillsResponse,
} from "../model/types";
import { API_CONFIG } from "@/shared/config/api";

const { baseUrl, apiKey } = API_CONFIG;

const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: headers => {
      headers.set("Accept", "application/json");
      headers.set("X-API-KEY", apiKey);
    },
  }),
  keepUnusedDataFor: 12000,
  endpoints: builder => ({
    getMovieDetails: builder.query<Movie, number>({
      query: id => ({
        url: `/api/v2.2/films/${id}`,
      }),
    }),
    getMovieStaff: builder.query<Staff[], number>({
      query: id => ({
        url: `api/v1/staff?filmId=${id}`,
      }),
    }),
    getMovieStills: builder.query<MovieStillsResponse, number>({
      query: id => ({
        url: `api/v2.2/films/${id}/images?type=STILL`,
      }),
    }),
    getSimilarMovies: builder.query<MoviesResponse, number>({
      query: id => ({
        url: `api/v2.2/films/${id}/similars`,
      }),
    }),
    getMoviesByParams: builder.query<MoviesResponse, SearchMoviesParams>({
      query: params => ({
        url: "/api/v2.2/films",
        params,
      }),
    }),
    getMoviesByCollection: builder.query<
      MoviesResponse,
      SearchCollectionsParams
    >({
      query: params => ({
        url: `/api/v2.2/films/collections`,
        params,
      }),
    }),
  }),
});

export const {
  useGetMovieDetailsQuery,
  useGetMovieStaffQuery,
  useGetMoviesByParamsQuery,
  useGetMoviesByCollectionQuery,
  useGetMovieStillsQuery,
  useGetSimilarMoviesQuery,
} = moviesApi;

export default moviesApi;
