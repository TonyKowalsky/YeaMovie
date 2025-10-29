import { addToFavorites, MovieCardMedium, type Movie } from "@/entities/movie";
import { useDispatch } from "react-redux";

interface SearchResultSectionProps {
  movies: Movie[];
}

const SearchResultSection = ({ movies }: SearchResultSectionProps) => {
  const dispatch = useDispatch();

  return (
    <section>
      {movies.map((movie, i) => (
        <MovieCardMedium
          key={movie.kinopoiskId ?? i}
          movie={movie}
          buttonText="В избранное"
          onClick={() => dispatch(addToFavorites(movie))}
        />
      ))}
    </section>
  );
};

export default SearchResultSection;
