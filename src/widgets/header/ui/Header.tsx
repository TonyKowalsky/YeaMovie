import { SearchBar } from "@/features/search-bar";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { ThemeButton } from "@/features/theme-button";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h2 className={styles.name}>
          <Link className={styles.resetLink} to="/">
            KINOMONSTER
          </Link>
        </h2>
        <SearchBar />
        <ThemeButton />
      </div>
    </header>
  );
};

export default Header;
