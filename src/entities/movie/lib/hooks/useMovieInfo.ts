import { useMemo } from "react";
import { getActors, getDirectors } from "../utils/helpers";
import type { Movie, Staff } from "../../model/types";

interface MovieInfoProps {
  movie: Movie | undefined;
  staff: Staff[] | undefined;
}

const useMovieInfo = ({ movie, staff }: MovieInfoProps) => {
  const movieInfo = useMemo(() => {
    const directors = getDirectors(staff);
    const actors = getActors(staff);
    const genres = movie?.genres?.map(g => g.genre).join(", ") ?? "";
    const countries = movie?.countries?.map(c => c.country).join(", ") ?? "";
    const year = movie?.year;

    return { directors, actors, genres, countries, year };
  }, [movie, staff]);

  return movieInfo;
};

export default useMovieInfo;
