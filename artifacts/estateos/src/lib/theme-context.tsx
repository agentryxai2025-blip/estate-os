import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "night" | "daylight" | "terra";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "night",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      return (localStorage.getItem("estateos-theme") as Theme) || "night";
    } catch {
      return "night";
    }
  });

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("estateos-theme", t);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Remove dark class — only night theme should feel dark to components that check `.dark`
    if (theme === "night") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
