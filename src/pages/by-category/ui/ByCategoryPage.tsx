import { useGetMoviesByParamsQuery } from "@/entities/movie/api/moviesApi";
import { MoviesGrid } from "@/features/movies-grid";
import { NavButton } from "@/features/nav-button";
import { Pagination } from "@/features/pagination";
import { useScrollToTop } from "@/shared/lib";
import {
  categoryFilterToQueryParams,
  useCategoryFilterFromUrl,
} from "@/widgets/categories-section";
import { useNavigate } from "react-router-dom";

const ByCategoryPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const filter = useCategoryFilterFromUrl();
  const { data, isLoading, isError } = useGetMoviesByParamsQuery({ ...filter });
  const movies = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    if (page === filter.page) return;
    navigate(
      `/by_category?${categoryFilterToQueryParams({ ...filter, page })}`
    );
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <div>Ошибка загрузки фильмов.</div>;
  }

  if (movies.length === 0) {
    return <div>Нет фильмов по этим параметрам.</div>;
  }
  return (
    <>
      <h2>Фильмы по категориям</h2>
      <NavButton direction="prev" text="&lt; Назад" onClick={handleBack} />
      <MoviesGrid movies={movies} />
      {totalPages > 1 && (
        <Pagination
          currentPage={filter.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default ByCategoryPage;
