import { useAppSelector } from "@/app/providers/store/store";
import { MovieCardMedium, removeFromFavorites } from "@/entities/movie";
import { NavButton } from "@/features/nav-button";
import { Pagination } from "@/features/pagination";
import { useScrollToTop } from "@/shared/lib";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const PAGE_SIZE = 4;

const FavoritesPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page"));
  const setCurrentPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };
  const data = useAppSelector(state => state.favoriteMovies.movies);
  const movies = useMemo(() => Object.values(data), [data]);
  const dispatch = useDispatch();
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayMovies = movies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(movies.length / PAGE_SIZE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setSearchParams({ page: totalPages.toString() });
    }
    if (currentPage === null || isNaN(currentPage) || currentPage <= 0) {
      setSearchParams({ page: "1" });
    }
  }, [currentPage, totalPages, setSearchParams]);

  if (movies.length === 0) {
    return <section>Добавьте фильмы в избранное и они появятся здесь.</section>;
  }

  return (
    <>
      <h2>Избранное</h2>
      <NavButton
        direction="prev"
        text="&lt; Назад"
        onClick={() => navigate(-1)}
      />
      <section>
        {displayMovies.map(movie => (
          <MovieCardMedium
            key={movie.kinopoiskId}
            movie={movie}
            buttonText="Удалить"
            onClick={() => dispatch(removeFromFavorites(movie.kinopoiskId))}
          />
        ))}
      </section>
      {totalPages > 1 && (
        <Pagination
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default FavoritesPage;
