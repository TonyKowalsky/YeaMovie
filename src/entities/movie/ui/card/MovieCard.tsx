import styles from "./MovieCard.module.css";
import { memo } from "react";
import { useTheme } from "@/shared/lib";
import { noPoster } from "@/shared/assets";
import type { Movie } from "../../model/types";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const { isDark } = useTheme();

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <div
    title={`Просмотр фильма ${movie.nameRu || "без названия"}`}
      role="button"
      aria-label={`Карточка фильма ${movie.nameRu || "без названия"}`}
      tabIndex={0}
      onKeyDown={keyDownHandler}
      onClick={onClick}
      className={`${styles.card} ${isDark ? styles.dark : ""}`}
    >
      <img
        loading="lazy"
        className={styles.poster}
        src={movie.posterUrl || noPoster}
        alt={`Постер фильма ${movie.nameRu || "без названия"}`}
      />
      <div className={styles.info}>
        <h4 className={styles.title}>{movie.nameRu}</h4>
        <div className={styles.meta}>
          {movie.year && (
            <>
              <span>{movie.year}</span>
              <span className={styles.rating}>
                {movie.ratingKinopoisk ?? "-"}/10
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(MovieCard);
