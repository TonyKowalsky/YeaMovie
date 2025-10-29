import { ButtonWithIcon } from "@/shared/ui";
import styles from "./Recommendations.module.css";
import { MoviesGrid } from "@/features/movies-grid";
import { useState } from "react";
import { useTheme } from "@/shared/lib";
import { useGetSimilarMoviesQuery } from "@/entities/movie";

interface RecommendationsProps {
  id: number;
  maxPreviews?: number;
}

const Recommendations = ({ id, maxPreviews = 5 }: RecommendationsProps) => {
  const { isDark } = useTheme();
  const { data, isLoading, isError } = useGetSimilarMoviesQuery(id);
  const [currentPage, setcurrentPage] = useState(1);
  const movies = data?.items ?? [];
  const startIndex = (currentPage - 1) * maxPreviews;
  const endIndex = startIndex + maxPreviews;
  const displayedMovies = movies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(movies.length / maxPreviews);

  if (isError) {
    return (
      <section className={`${styles.recommendations} ${styles.error}`}>
        Не удалось загрузить рекомендации.
      </section>
    );
  }
  if (isLoading) {
    return (
      <section className={`${styles.recommendations} ${styles.error}`}>
        Загрузка рекомендаций...
      </section>
    );
  }

  if (movies.length === 0) {
    return (
      <section className={`${styles.recommendations} ${styles.error}`}>
        Нет рекомендаций.
      </section>
    );
  }

  return (
    <section className={styles.recommendations}>
      <h4 className={styles.name}>Возможно, вам понравится</h4>
      <div className={styles.movies}>
        <div className={styles.buttons}>
          <ButtonWithIcon
            disabled={currentPage <= 1}
            className={`${styles.button} ${styles.prev} ${
              isDark ? styles.dark : ""
            }`}
            icon={{
              name: "prev",
              size: 24,
              viewBox: "0 0 24 24",
            }}
            onClick={() => setcurrentPage(currentPage - 1)}
          />
          <ButtonWithIcon
            disabled={currentPage >= totalPages}
            className={`${styles.button} ${styles.next} ${
              isDark ? styles.dark : ""
            }`}
            icon={{
              name: "next",
              size: 24,
              viewBox: "0 0 24 24",
            }}
            onClick={() => setcurrentPage(currentPage + 1)}
          />
        </div>
        <MoviesGrid moviesCount={maxPreviews} movies={displayedMovies} />
      </div>
    </section>
  );
};

export default Recommendations;
