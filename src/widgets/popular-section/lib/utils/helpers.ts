import type { PopularFilter } from "../model/types";

export const popularFilterToQueryParams = (filter: PopularFilter): string => {
  const { page, type } = filter;
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("type", type);
  return params.toString();
};
