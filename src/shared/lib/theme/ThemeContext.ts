import { createContext } from "react";

interface ThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContext | undefined>(undefined);

export default ThemeContext;
