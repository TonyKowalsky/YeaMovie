import { useSearchParams } from "react-router-dom";
import { parseNumberParam } from "../utils/helpers";
import type { SearchFilter } from "../../model/types";

const DEFAULT_SEARCH_FILTER: SearchFilter = {
  page: 1,
  keyword: "alien",
};

export const useSearchFilterFromUrl = (): SearchFilter => {
  const [searchParams] = useSearchParams();

  const page = parseNumberParam(
    searchParams.get("page"),
    DEFAULT_SEARCH_FILTER.page
  );

  const keywordRaw = searchParams.get("keyword");
  const keyword =
    typeof keywordRaw === "string" ? keywordRaw : DEFAULT_SEARCH_FILTER.keyword;

  return {
    page,
    keyword,
  };
};
