import styles from "./FilterTabs.module.css";
import { useState } from "react";
import { ButtonWithIcon } from "@/shared/ui";
import { useTheme } from "@/shared/lib";
import type { CategoryFilter, FilterTabsProps } from "../model/types";
import { genres, countries } from "@/entities/movie";
import { FilterSelect, type FilterOption } from "./FilterSelect";

const YEARS = Array.from({ length: 71 }, (_, i) => 1955 + i);
const RATINGS = Array.from({ length: 10 }, (_, i) => i + 1);
const ORDER_OPTIONS: FilterOption[] = [
  { value: "RATING", label: "Рейтинг" },
  { value: "NUM_VOTE", label: "Популярность" },
  { value: "YEAR", label: "Дата выхода" },
];

const FilterTabs = ({ initialState, setFilter }: FilterTabsProps) => {
  const { isDark } = useTheme();
  const [localFilter, setLocalFilter] = useState<CategoryFilter>(initialState);

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const stringFields = ["order"];
    const val = stringFields.includes(name) ? value : Number(value);
    setLocalFilter(prev => ({ ...prev, [name]: val }));
  };

  const searchHandler = () => {
    setFilter(localFilter);
  };

  return (
    <div className={`${styles.tabs} ${isDark ? "dark" : ""}`}>
      <FilterSelect
        ariaLabel="Выберите жанр"
        name="genres"
        value={localFilter.genres}
        onChange={changeHandler}
        options={genres.map(g => ({ value: g.id, label: g.genre }))}
        className={styles.customSelect}
      />
      <FilterSelect
        ariaLabel="Выберите страну"
        name="countries"
        value={localFilter.countries}
        onChange={changeHandler}
        options={countries.map(c => ({ value: c.id, label: c.country }))}
        className={styles.customSelect}
      />
      <FilterSelect
        ariaLabel="Выберите год от"
        name="yearFrom"
        value={localFilter.yearFrom}
        onChange={changeHandler}
        options={YEARS.map(y => ({ value: y, label: `от ${y}` }))}
        className={styles.customSelect}
      />
      <FilterSelect
        ariaLabel="Выберите год до"
        name="yearTo"
        value={localFilter.yearTo}
        onChange={changeHandler}
        options={YEARS.map(y => ({ value: y, label: `до ${y}` }))}
        className={styles.customSelect}
      />
      <FilterSelect
        ariaLabel="Выберите рейтинг от"
        name="ratingFrom"
        value={localFilter.ratingFrom}
        onChange={changeHandler}
        options={RATINGS.map(r => ({ value: r, label: `от ${r}` }))}
        className={styles.customSelect}
      />
      <FilterSelect
        ariaLabel="Выберите рейтинг до"
        name="ratingTo"
        value={localFilter.ratingTo}
        onChange={changeHandler}
        options={RATINGS.map(r => ({ value: r, label: `до ${r}` }))}
        className={styles.customSelect}
      />
      <FilterSelect
        ariaLabel="Выберите параметр сортировки"
        name="order"
        value={localFilter.order}
        onChange={changeHandler}
        options={ORDER_OPTIONS}
        className={styles.customSelect}
      />
      <ButtonWithIcon
        onClick={searchHandler}
        className={`${styles.searchButton} ${isDark ? styles.dark : ""}`}
        icon={{ name: "search", size: 17, viewBox: "0 0 16 16" }}
      />
    </div>
  );
};

export default FilterTabs;
