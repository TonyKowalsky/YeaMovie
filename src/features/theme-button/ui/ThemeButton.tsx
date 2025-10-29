import { useTheme } from "@/shared/lib";
import styles from "./ThemeButton.module.css";
import { ButtonWithIcon } from "@/shared/ui";

const ThemeButton = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <ButtonWithIcon
      onClick={toggleTheme}
      className={styles.button}
      icon={{
        name: isDark ? "light" : "dark",
        size: 24,
        viewBox: "0 0 24 24",
      }}
    />
  );
};

export default ThemeButton;
