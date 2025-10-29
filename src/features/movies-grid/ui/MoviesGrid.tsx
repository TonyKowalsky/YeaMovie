import styles from "./MoviesGrid.module.css";
import { MovieCard, type Movie } from "@/entities/movie";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useTheme } from "@/shared/lib";

interface MoviesGridProps {
  moviesCount?: number;
  movies: Movie[];
}

const MoviesGrid = ({ moviesCount, movies }: MoviesGridProps) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const displayedMovies = useMemo(() => {
    return movies.slice(0, moviesCount ?? movies.length);
  }, [movies, moviesCount]);

  const handleMovieClick = (id: number) => () => {
    navigate(`/movie/${id}`);
  };

  return (
    <ul className={`${styles.movies} ${isDark ? "dark" : ""}`}>
      {displayedMovies.map(movie => (
        <li key={movie.kinopoiskId ?? movie.filmId}>
          <MovieCard
            movie={movie}
            onClick={handleMovieClick(movie.kinopoiskId ?? movie.filmId)}
          />
        </li>
      ))}
    </ul>
  );
};

export default MoviesGrid;
