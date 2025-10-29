import type { Movie, Staff } from "../../model/types";

const MAX_ACTORS_DISPLAY = 12;

export const getActors = (staff: Staff[] | undefined) => {
  if (!staff) return "";
  return staff
    .filter(s => s.professionKey === "ACTOR" && s.nameRu)
    .map(s => s.nameRu)
    .slice(0, MAX_ACTORS_DISPLAY)
    .join(", ");
};

export const getDirectors = (staff: Staff[] | undefined) => {
  if (!staff) return "";
  return staff
    .filter(s => s.professionKey === "DIRECTOR" && s.nameRu)
    .map(s => s.nameRu)
    .join(", ");
};

export const saveFavoritesToStorage = (movies: Record<number, Movie>) => {
  try {
    const serializedData = JSON.stringify(movies);
    localStorage.setItem("favoriteMovies", serializedData);
  } catch (e) {
    console.warn("Failed to save favorites to localStorage", e);
  }
};

export const loadFavoritesFromStorage = (): Record<number, Movie> => {
  try {
    const data = localStorage.getItem("favoriteMovies");
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.warn("Failed to load favorites from localStorage", e);
    return {};
  }
};
