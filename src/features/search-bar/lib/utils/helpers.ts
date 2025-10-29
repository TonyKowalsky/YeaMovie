import type { SearchFilter } from "../../model/types";

export const searchFilterToQueryParams = (filter: SearchFilter): string => {
  const params = new URLSearchParams();
  params.set("page", filter.page.toString());
  params.set("keyword", filter.keyword.trim());
  return params.toString();
};

export const parseNumberParam = (value: string | null, fallback: number): number => {
  if (value === null) return fallback;
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};