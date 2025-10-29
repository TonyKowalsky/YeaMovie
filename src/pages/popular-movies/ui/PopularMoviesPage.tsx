import { useGetMoviesByCollectionQuery } from "@/entities/movie/api/moviesApi";
import { MoviesGrid } from "@/features/movies-grid";
import { NavButton } from "@/features/nav-button";
import { Pagination } from "@/features/pagination";
import { useScrollToTop } from "@/shared/lib";
import {
  popularFilterToQueryParams,
  usePopularFilterFromUrl,
} from "@/widgets/popular-section";

import { useNavigate } from "react-router-dom";

const PopularMoviesPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const filter = usePopularFilterFromUrl();
  const { data, isLoading, isError } = useGetMoviesByCollectionQuery({
    ...filter,
  });
  const movies = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    if (page === filter.page) return;
    navigate(
      `/${filter.type}?${popularFilterToQueryParams({ ...filter, page })}`
    );
  };

  if (isLoading) {
    return <section>Загрузка...</section>;
  }

  if (isError) {
    return <section>Ошибка при загрузке фильмов...</section>;
  }

  if (movies.length === 0) return <section>Нет популярных фильмов.</section>;

  return (
    <>
      <h2>Популярные фильмы</h2>
      <NavButton
        direction="prev"
        text="&lt; Назад"
        onClick={() => navigate(-1)}
      />
      <MoviesGrid movies={movies} />
      <Pagination
        onPageChange={handlePageChange}
        currentPage={filter.page}
        totalPages={totalPages}
      />
    </>
  );
};

export default PopularMoviesPage;
