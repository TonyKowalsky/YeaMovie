import type { Collections } from "@/entities/movie";

export interface Tab {
  name: string;
  type: Collections;
  onClick: () => void;
}
