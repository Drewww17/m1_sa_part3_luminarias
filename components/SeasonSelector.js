"use client";

import { motion } from "framer-motion";

/**
 * Season selector component for switching between F1 seasons
 * @param {Object} props
 * @param {string} props.selectedSeason - Currently selected season
 * @param {Function} props.onSeasonChange - Callback when season changes
 */
export default function SeasonSelector({ selectedSeason, onSeasonChange }) {
  const seasons = ['2026', '2025'];

  return (
    <div className="flex gap-2">
      {seasons.map((season) => (
        <motion.button
          key={season}
          onClick={() => onSeasonChange(season)}
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
