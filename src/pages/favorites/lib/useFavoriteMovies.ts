import { useAppSelector } from "@/app/providers/store/store";
import { useMemo } from "react";

interface useFavoriteMoviesProps {
  currentPage: number;
  pageSize: number;
}

export const useFavoriteMovies = ({
  currentPage,
  pageSize,
}: useFavoriteMoviesProps) => {
  const data = useAppSelector(state => state.favoriteMovies.movies);
  const movies = useMemo(() => Object.values(data), [data]);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedMovies = movies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(movies.length / pageSize);

  return { displayedMovies, totalPages };
};
