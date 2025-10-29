import styles from "./PopularSection.module.css";
import { MoviesGrid } from "@/features/movies-grid";
import { NavButton } from "@/features/nav-button";
import { PopularTabs, type Tab } from "@/features/popular-tabs";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/shared/lib";
import { popularFilterToQueryParams } from "../lib/utils/helpers";
import { useGetMoviesByCollectionQuery } from "@/entities/movie";
import usePopularTypes from "../lib/hooks/usePopularTypes";
import type { PopularFilter } from "../lib/model/types";

const PopularSection = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { type, setMovies, setSeries } = usePopularTypes();
  const tabs: Tab[] = [
    {
      name: "Популярные фильмы",
      type: "TOP_POPULAR_MOVIES",
      onClick: setMovies,
    },
    { name: "Популярные сериалы", type: "POPULAR_SERIES", onClick: setSeries },
  ];
  const params: PopularFilter = { type, page: 1 };
  const { data, isLoading, isError } = useGetMoviesByCollectionQuery(params);
  const movies = data?.items ?? [];

  const handleViewAll = () => {
    const queryString = popularFilterToQueryParams(params);
    navigate(`/${type}?${queryString}`);
  };

  if (isLoading) {
    return <section className={styles.popular}>Загрузка...</section>;
  }

  if (movies.length === 0) {
    return (
      <section className={styles.popular}>
        Нет популярных фильмов или сериалов.
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.popular}>
        Ошибка при загрузке фильмов...
      </section>
    );
  }

  return (
    <section className={`${styles.popular} ${isDark ? "dark" : ""}`}>
      <PopularTabs tabs={tabs} activeTab={type} />
      <NavButton
        direction="next"
        text="Смотреть все &gt;"
        onClick={handleViewAll}
      />
      <MoviesGrid moviesCount={10} movies={movies} />
    </section>
  );
};

export default PopularSection;
