import { useEffect } from "react";
import { useSafeLocalStorage } from "./useSafeLocalStorage";

export const useDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const [isEnabled, setIsEnabled] = useSafeLocalStorage(
    "dark-theme",
    undefined
  );

  const enabled: boolean =
    isEnabled === undefined ? prefersDarkMode : isEnabled;

  useEffect(() => {
    if (window === undefined) return;
    const root = window.document.documentElement;
    if (enabled) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [enabled]);

  return [enabled, setIsEnabled];
};
