import {
  addToFavorites,
  MovieCardLarge,
  useGetMovieDetailsQuery,
} from "@/entities/movie";
import { NavButton } from "@/features/nav-button";
import { StillsGrid } from "@/features/stills-grid";
import { useScrollToTop } from "@/shared/lib";
import { Recommendations } from "@/widgets/recommendations";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const MoviePage = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { kinopoiskId } = useParams();
  const id = kinopoiskId ? parseInt(kinopoiskId, 10) : NaN;
  const dispatch = useDispatch();
  const { data: movie, isLoading, isError } = useGetMovieDetailsQuery(id);

  if (isLoading) {
    return <section>Загрузка...</section>;
  }

  if (isError) {
    return <section>Ошибка при загрузке фильма...</section>;
  }

  if(!movie) return <section>Фильм не найден...</section>;

  return (
    <section>
      <NavButton
        text="&lt; Назад"
        onClick={() => navigate(-1)}
        direction="prev"
      />
      <MovieCardLarge
        id={id}
        buttonText="В избранное"
        onClick={() => dispatch(addToFavorites(movie))}
      />
      <StillsGrid id={id} />
      <Recommendations id={id} />
    </section>
  );
};

export default MoviePage;
