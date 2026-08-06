"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { playEngineRev } from "../lib/audio";

export const THEMES = {
  mercedes: {
    id: "mercedes",
    name: "Mercedes AMG",
    color: "#00D2BE",
    secondary: "#C0C0C0",
    badge: "🩵",
    glow: "rgba(0, 210, 190, 0.5)",
    bgAccent: "from-[#00D2BE]/20 to-zinc-900"
  },
  mclaren: {
    id: "mclaren",
    name: "McLaren F1",
    color: "#FF8000",
    secondary: "#47C7FC",
    badge: "🟠",
    glow: "rgba(255, 128, 0, 0.5)",
    bgAccent: "from-[#FF8000]/20 to-zinc-900"
  },
  ferrari: {
    id: "ferrari",
    name: "Scuderia Ferrari",
    color: "#E8002D",
    secondary: "#FFF200",
    badge: "🔴",
    glow: "rgba(232, 0, 45, 0.5)",
    bgAccent: "from-[#E8002D]/20 to-zinc-900"
  },
  aston: {
    id: "aston",
    name: "Aston Martin",
    color: "#229971",
    secondary: "#CEDC00",
    badge: "🟢",
    glow: "rgba(34, 153, 113, 0.5)",
    bgAccent: "from-[#229971]/20 to-zinc-900"
  },
  redbull: {
    id: "redbull",
    name: "Red Bull Racing",
    color: "#3671C6",
    secondary: "#FCD700",
    badge: "🔵",
    glow: "rgba(54, 113, 198, 0.5)",
    bgAccent: "from-[#3671C6]/20 to-zinc-900"
  }
};

const ThemeContext = createContext({
  theme: THEMES.mercedes,
  setTeamTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(THEMES.mercedes);

  useEffect(() => {
    const saved = localStorage.getItem("f1_team_theme");
    if (saved && THEMES[saved]) {
      setCurrentTheme(THEMES[saved]);
    }
  }, []);

  const setTeamTheme = (themeId) => {
    if (THEMES[themeId]) {
      setCurrentTheme(THEMES[themeId]);
      localStorage.setItem("f1_team_theme", themeId);
      playEngineRev();
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, setTeamTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
