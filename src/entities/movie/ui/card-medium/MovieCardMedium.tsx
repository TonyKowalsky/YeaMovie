import styles from "./MovieCardMedium.module.css";
import { memo } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../../model/types";
import useMovieInfo from "../../lib/hooks/useMovieInfo";
import { useGetMovieStaffQuery } from "../../api/moviesApi";
import InfoTable from "../infoTable/InfoTable";
import { noPoster } from "@/shared/assets";

interface MovieCardMediumProps {
  movie: Movie;
  buttonText: string;
  onClick: () => void;
}

const MovieCardMedium = ({
  movie,
  buttonText,
  onClick,
}: MovieCardMediumProps) => {
  const { data: staff } = useGetMovieStaffQuery(movie.kinopoiskId);

  const tableProps = useMovieInfo({ movie, staff });

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          loading="lazy"
          className={styles.image}
          src={movie.posterUrl || noPoster}
          alt={`Постер фильма ${movie.nameRu}`}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.header}>
            <h4 className={styles.title}>{movie.nameRu}</h4>
            <div className={styles.rating}>
              <span>Кинопоиск {movie.ratingKinopoisk ?? "-"}/10</span>
              <span>IMDB {movie.ratingImdb ?? "-"}/10</span>
            </div>
          </div>
          {movie.description && (
            <div className={styles.description}>
              <p>{movie.description}</p>
            </div>
          )}
          <div className={styles.tableWrapper}>
            <table className={styles.details}>
              <InfoTable {...tableProps} />
            </table>
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={onClick}>
            {buttonText}
          </button>
          <Link className={styles.button} to={`/movie/${movie.kinopoiskId}`}>
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieCardMedium);
