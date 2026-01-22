"use client";

import { motion } from "framer-motion";

/**
 * SeasonSelector Component
 * Allows users to switch between different F1 seasons
 * Persists selection to localStorage
 */
export default function SeasonSelector({ selectedSeason, onSeasonChange }) {
  const seasons = ['2026', '2025'];

  const handleSeasonChange = (season) => {
    onSeasonChange(season);
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedSeason', season);
    }
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
          {season}
        </motion.button>
      ))}
    </div>
  );
}
