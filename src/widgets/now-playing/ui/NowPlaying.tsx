import styles from "./NowPlaying.module.css";
import {
  useGetMovieDetailsQuery,
  useGetMoviesByCollectionQuery,
  type Collections,
} from "@/entities/movie";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const NowPlaying = () => {
  const navigate = useNavigate();
  const type: Collections = "TOP_POPULAR_MOVIES";
  const { data, isLoading: moviesLoading } = useGetMoviesByCollectionQuery({
    type,
  });

  const displayedMovie = useMemo(() => {
    const movies = data?.items ?? [];
    if (movies.length === 0) return null;
    return movies[Math.floor(Math.random() * movies.length)];
  }, [data]);

  const movieId = displayedMovie?.kinopoiskId;
  const {
    data: movieInfo,
    isLoading: movieInfoLoading,
    isError,
  } = useGetMovieDetailsQuery(movieId!, {
    skip: !movieId,
  });

  if (isError)
    return (
      <section className={styles.nowPlaying}>
        <div className={styles.error}>Ошибка при загрузке фильма...</div>
      </section>
    );

  if (moviesLoading || !displayedMovie) {
    return <section className={styles.nowPlaying}>Загрузка...</section>;
  }

  if (movieInfoLoading) {
    return (
      <section className={styles.nowPlaying}>
        Загрузка информации о фильме...
      </section>
    );
  }

  return (
    <section className={styles.nowPlaying}>
      <div className={styles.content}>
        <h2 className={styles.inCinema}>УЖЕ В КИНО</h2>
        <div className={styles.description}>
          <h3 className={styles.title}>
            {displayedMovie.nameRu || "Без названия"}
          </h3>
          <p className={styles.about}>
            {movieInfo?.description || "Описание не доступно"}
          </p>
          <button
            className={styles.button}
            onClick={() => navigate(`/movie/${displayedMovie.kinopoiskId}`)}
          >
            Подробнее
          </button>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <img
          loading="lazy"
          className={styles.image}
          src={displayedMovie.posterUrl}
          alt={`Постер фильма ${displayedMovie.nameRu}`}
        />
      </div>
    </section>
  );
};

export default NowPlaying;
