import { noPoster } from "@/shared/assets";
import {
  useGetMovieDetailsQuery,
  useGetMovieStaffQuery,
} from "../../api/moviesApi";
import styles from "./MovieCardLarge.module.css";
import useMovieInfo from "../../lib/hooks/useMovieInfo";
import InfoTable from "../infoTable/InfoTable";

interface MovieCardLargeProps {
  id: number;
  buttonText: string;
  onClick: () => void;
}

const MovieCardLarge = ({ id, buttonText, onClick }: MovieCardLargeProps) => {
  const {
    data: movie,
    isLoading: movieLoading,
    isError,
  } = useGetMovieDetailsQuery(id);

  const { data: staff } = useGetMovieStaffQuery(id);

  const tableProps = useMovieInfo({ movie, staff });

  if (movieLoading) return <article>Загрузка фильма...</article>;
  if (isError) return <article>Ошибка при загрузке фильма.</article>;
  if (!movie) return <article>Фильм не найден.</article>;

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
        <div className={styles.header}>
          <h2 className={styles.title}>{movie.nameRu}</h2>
          <div className={styles.rating}>
            <span>Кинопоиск {movie.ratingKinopoisk ?? "-"}/10</span>
            <span>IMDB {movie.ratingImdb ?? "-"}/10</span>
            <button className={styles.button} onClick={onClick}>
              {buttonText}
            </button>
          </div>
        </div>
        <div className={styles.description}>
          <p>{movie.description}</p>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.details}>
            <caption>О фильме</caption>
            <InfoTable {...tableProps} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovieCardLarge;
