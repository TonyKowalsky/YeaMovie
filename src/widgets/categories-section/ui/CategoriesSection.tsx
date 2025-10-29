import styles from "./CategoriesSection.module.css";
import { FilterTabs, type CategoryFilter } from "@/features/filter-tabs";
import { MoviesGrid } from "@/features/movies-grid";
import { NavButton } from "@/features/nav-button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/shared/lib";
import { DEFAULT_CATEGORY_FILTER } from "../lib/hooks/useCategoryFilterFromUrl";
import { categoryFilterToQueryParams } from "../lib/utils/helpers";
import { useGetMoviesByParamsQuery } from "@/entities/movie";

const CategoriesSection = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<CategoryFilter>(DEFAULT_CATEGORY_FILTER);
  const { data, isLoading, isError } = useGetMoviesByParamsQuery({ ...filter });
  const movies = data?.items ?? [];

  if (isLoading) {
    return <section className={styles.categories}>Загрузка фильмов...</section>;
  }

  if (isError) {
    return (
      <section className={styles.categories}>
        Ошибка при загрузке фильмов...
      </section>
    );
  }

  const handleViewAll = () => {
    const queryString = categoryFilterToQueryParams(filter);
    navigate(`/by_category?${queryString}`);
  };

  return (
    <section className={styles.categories}>
      <div className={`${styles.title} ${isDark ? "dark" : ""}`}>
        <div className={styles.button}>Фильмы по категориям</div>
      </div>
      <FilterTabs
        initialState={DEFAULT_CATEGORY_FILTER}
        setFilter={setFilter}
      />
      <NavButton
        direction="next"
        text="Смотреть все &gt;"
        onClick={handleViewAll}
      />
      {movies.length === 0 ? (
        <div>Нет фильмов по выбранным категориям.</div>
      ) : (
        <MoviesGrid moviesCount={5} movies={movies} />
      )}
    </section>
  );
};

export default CategoriesSection;
