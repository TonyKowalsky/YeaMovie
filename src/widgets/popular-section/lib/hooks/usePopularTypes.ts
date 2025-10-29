import type { Collections } from "@/entities/movie";
import { useState } from "react";

const usePopularTypes = () => {
  const [type, setType] = useState<Collections>("TOP_POPULAR_MOVIES");
  
  const setMovies = () => {setType("TOP_POPULAR_MOVIES")};
  const setSeries = () => {setType("POPULAR_SERIES")};

  return {
    type,
    setMovies,
    setSeries,
  };

};
export default usePopularTypes;
