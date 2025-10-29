import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ButtonWithIcon } from "@/shared/ui";
import { searchFilterToQueryParams } from "../lib/utils/helpers";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      const queryString = searchFilterToQueryParams({
        page: 1,
        keyword: searchValue,
      });
      navigate(`/search?${queryString}`);
      setSearchValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.search}>
      <input
        aria-label="Поиск фильмов"
        name="search"
        type="text"
        placeholder="Поиск..."
        className={styles.input}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <ButtonWithIcon
        disabled={!searchValue.trim()}
        onClick={handleSearch}
        className={styles.button}
        icon={{ name: "search", size: 17, viewBox: "0 0 16 16" }}
      />
    </div>
  );
};

export default SearchBar;
