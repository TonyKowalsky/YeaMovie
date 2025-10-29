import type { CategoryFilter } from "@/features/filter-tabs";
import { useSearchParams } from "react-router-dom";

export const DEFAULT_CATEGORY_FILTER: CategoryFilter = {
  genres: 1,
  countries: 1,
  yearFrom: 2019,
  yearTo: 2025,
  ratingFrom: 7,
  ratingTo: 10,
  page: 1,
  order: "RATING",
};

const parseNumberParam = (value: string | null, fallback: number): number => {
  if (value === null) return fallback;
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

export const useCategoryFilterFromUrl = (): CategoryFilter => {
  const [searchParams] = useSearchParams();
  const genres = parseNumberParam(
    searchParams.get("genres"),
    DEFAULT_CATEGORY_FILTER.genres
  );
  const countries = parseNumberParam(
    searchParams.get("countries"),
    DEFAULT_CATEGORY_FILTER.countries
  );
  const yearFrom = parseNumberParam(
    searchParams.get("yearFrom"),
    DEFAULT_CATEGORY_FILTER.yearFrom
  );
  const yearTo = parseNumberParam(
    searchParams.get("yearTo"),
    DEFAULT_CATEGORY_FILTER.yearTo
  );
  const ratingFrom = parseNumberParam(
    searchParams.get("ratingFrom"),
    DEFAULT_CATEGORY_FILTER.ratingFrom
  );
  const ratingTo = parseNumberParam(
    searchParams.get("ratingTo"),
    DEFAULT_CATEGORY_FILTER.ratingTo
  );

  const page = parseNumberParam(
    searchParams.get("page"),
    DEFAULT_CATEGORY_FILTER.page
  );

  const orderRaw = searchParams.get("order");
  const order =
    orderRaw === "RATING" || orderRaw === "NUM_VOTE" || orderRaw === "YEAR"
      ? orderRaw
      : DEFAULT_CATEGORY_FILTER.order;

  return {
    genres,
    countries,
    yearFrom,
    yearTo,
    ratingFrom,
    ratingTo,
    page,
    order,
  };
};
