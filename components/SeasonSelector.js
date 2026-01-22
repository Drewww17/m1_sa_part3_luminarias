"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/**
 * SeasonSelector component for switching F1 seasons
 * Persists selection to localStorage
 */
export default function SeasonSelector({ onSeasonChange, defaultSeason = "current" }) {
  const [selectedSeason, setSelectedSeason] = useState(defaultSeason);
  const seasons = ["current", "2026", "2025"];

  // Load season from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSeason = localStorage.getItem('selectedSeason');
      if (savedSeason && seasons.includes(savedSeason)) {
        setSelectedSeason(savedSeason);
        onSeasonChange?.(savedSeason);
      }
    }
  }, []);

  const handleSeasonChange = (season) => {
    setSelectedSeason(season);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedSeason', season);
    }
    onSeasonChange?.(season);
  };

  return (
    <div className="flex gap-2">
      {seasons.map((season) => (
        <motion.button
          key={season}
          onClick={() => handleSeasonChange(season)}
          className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${
            selectedSeason === season
              ? 'bg-[#00D2BE] text-black'
              : 'bg-zinc-900 text-zinc-500 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {season === "current" ? "Current" : season}
        </motion.button>
      ))}
    </div>
  );
}
