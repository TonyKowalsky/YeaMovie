import { useSearchParams } from "react-router-dom";
import type { PopularFilter } from "../model/types";

export const DEFAULT_POPULAR_FILTER: PopularFilter = {
  page: 1,
  type: "TOP_POPULAR_MOVIES",
};

const parseNumberParam = (value: string | null, fallback: number): number => {
  if (value === null) return fallback;
  const num = Number(value);
  return isNaN(num) || num < 1 ? fallback : Math.floor(num);
};

export const usePopularFilterFromUrl = (): PopularFilter => {
  const [searchParams] = useSearchParams();

  const page = parseNumberParam(
    searchParams.get("page"),
    DEFAULT_POPULAR_FILTER.page
  );

  const typeRaw = searchParams.get("type");
  const type =
    typeRaw === "TOP_POPULAR_MOVIES" || typeRaw === "POPULAR_SERIES"
      ? typeRaw
      : DEFAULT_POPULAR_FILTER.type;

  return {
    page,
    type,
  };
};
