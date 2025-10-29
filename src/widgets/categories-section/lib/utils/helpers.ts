import type { CategoryFilter } from "@/features/filter-tabs";

export const categoryFilterToQueryParams = (filter: CategoryFilter): string => {
  const params = new URLSearchParams();
  params.set("genres", filter.genres.toString());
  params.set("countries", filter.countries.toString());
  params.set("yearFrom", filter.yearFrom.toString());
  params.set("yearTo", filter.yearTo.toString());
  params.set("ratingFrom", filter.ratingFrom.toString());
  params.set("ratingTo", filter.ratingTo.toString());
  params.set("page", filter.page.toString());
  params.set("order", filter.order);
  return params.toString();
};
