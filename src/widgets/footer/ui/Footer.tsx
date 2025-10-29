import { Link, NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <h2 className={styles.name}>
          <Link className={styles.resetLink} to="/">
            KINOMONSTER
          </Link>
        </h2>
        <nav>
          <ul className={styles.list}>
            <li>
              <NavLink className={styles.item} to="/">
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.item}
                to="/TOP_POPULAR_MOVIES?page=1&type=TOP_POPULAR_MOVIES"
              >
                Популярные фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className={styles.item}
                to="/POPULAR_SERIES?page=1&type=POPULAR_SERIES"
              >
                Популярные сериалы
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.item} to="/favorites">
                Избранное
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
export default Footer;
