import { createContext, useContext } from "react";
import { useDarkMode } from "../hooks/useDarkMode";

const ThemeContext = createContext<{
  isDark: boolean;
  setIsDark: any;
} | null>(null);

interface ThemeContextProps {
  children: React.ReactNode;
}

export const ThemeModule = ({ children }: ThemeContextProps) => {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useIsDark = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext is not set!");
  }
  return context.isDark;
};

export const useSetDark = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext is not set!");
  }
  return context.setIsDark;
};
