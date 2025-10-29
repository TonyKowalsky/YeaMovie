import { MovieCardMedium, removeFromFavorites } from "@/entities/movie";
import { NavButton } from "@/features/nav-button";
import { Pagination } from "@/features/pagination";
import { useScrollToTop } from "@/shared/lib";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFavoriteMovies } from "../lib/useFavoriteMovies";

const PAGE_SIZE = 4;

const FavoritesPage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page"));
  const setCurrentPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };
  const { displayedMovies, totalPages } = useFavoriteMovies({
    currentPage,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setSearchParams({ page: totalPages.toString() });
    }
    if (currentPage === null || isNaN(currentPage) || currentPage <= 0) {
      setSearchParams({ page: "1" });
    }
  }, [currentPage, totalPages, setSearchParams]);

  if (displayedMovies.length === 0) {
    return <section>Добавьте фильмы в избранное и они появятся здесь.</section>;
  }

  return (
    <>
      <h2>Избранное</h2>
      <NavButton
        direction="prev"
        text="&lt; На главную"
        onClick={() => navigate("/")}
      />
      <section>
        {displayedMovies.map(movie => (
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
