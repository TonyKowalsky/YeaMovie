import { useGetMoviesByParamsQuery } from "@/entities/movie";
import { NavButton } from "@/features/nav-button";
import { Pagination } from "@/features/pagination";
import {
  searchFilterToQueryParams,
  useSearchFilterFromUrl,
} from "@/features/search-bar";
import { useScrollToTop } from "@/shared/lib";
import { SearchResultSection } from "@/widgets/search-result-section";
import { useNavigate } from "react-router-dom";

const SearchMoviesPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const filter = useSearchFilterFromUrl();
  const { data, isLoading, isError } = useGetMoviesByParamsQuery(filter);
  const movies = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;
  const handlePageChange = (page: number) => {
    if (page === filter.page) return;
    navigate(`/search?${searchFilterToQueryParams({ ...filter, page })}`);
  };

  if (isLoading) return <section>Загрузка фильмов...</section>;
  if (isError) return <section>Ошибка при поиске фильмов...</section>;
  if (movies.length === 0)
    return <section>Нет фильмов по заданным параметрам.</section>;

  return (
    <>
      <h2>Результаты поиска</h2>
      <NavButton
        text="&lt; Назад"
        onClick={() => navigate(-1)}
        direction="prev"
      />
      <section>
        <SearchResultSection movies={movies} />
        <Pagination
          currentPage={filter.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
};

export default SearchMoviesPage;
