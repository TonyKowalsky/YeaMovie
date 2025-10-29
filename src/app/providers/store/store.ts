import {
  favoriteMoviesReducer,
  moviesApi,
  saveFavoritesToStorage,
} from "@/entities/movie";
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    favoriteMovies: favoriteMoviesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  saveFavoritesToStorage(state.favoriteMovies.movies);
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
