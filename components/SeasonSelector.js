"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function SeasonSelector({ season, onSeasonChange, seasons = ['current', '2026', '2025'] }) {
  const [isClient, setIsClient] = useState(false);

  // Ensure component is only rendered on client to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSeasonChange = (newSeason) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedSeason', newSeason);
    }
    onSeasonChange(newSeason);
  };

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-zinc-500 uppercase tracking-wider mr-2">Season:</span>
      <div className="flex gap-2">
        {seasons.map((seasonOption) => (
          <motion.button
            key={seasonOption}
            onClick={() => handleSeasonChange(seasonOption)}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
              season === seasonOption
                ? 'bg-[#00D2BE] text-black'
                : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {seasonOption}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
