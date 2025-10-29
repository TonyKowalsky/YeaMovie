import type { Dispatch, SetStateAction } from "react";

export interface CategoryFilter {
  genres: number;
  countries: number;
  yearFrom: number;
  yearTo: number;
  ratingFrom: number;
  ratingTo: number;
  page: number;
  order: "RATING" | "NUM_VOTE" | "YEAR";
}

export interface FilterTabsProps {
  initialState: CategoryFilter;
  setFilter: Dispatch<SetStateAction<CategoryFilter>>;
}
