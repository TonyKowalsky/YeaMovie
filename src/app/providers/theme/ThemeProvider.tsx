import { ThemeContext } from "@/shared/lib";
import { useState, type ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const savedTheme = Boolean(localStorage.getItem("isDark"));
  const [isDark, setDark] = useState(savedTheme || false);

  const toggleTheme = () => {
    localStorage.setItem("isDark", isDark ? "" : "true");
    setDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
