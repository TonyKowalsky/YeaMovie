import type { Collections } from "@/entities/movie";

export interface PopularFilter {
  page: number;
  type: Collections;
}
