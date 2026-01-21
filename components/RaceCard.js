"use client";

import { motion } from "framer-motion";

export default function RaceCard({ race, index = 0, isUpcoming = false }) {
  if (!race) return null;

  const { raceName, date, time, Circuit } = race;
  const raceDate = new Date(`${date}T${time || '00:00:00Z'}`);
  const formattedDate = raceDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = time ? time.replace('Z', ' UTC') : 'TBD';

  // Calculate days until race
  const now = new Date();
  const daysUntil = Math.ceil((raceDate - now) / (1000 * 60 * 60 * 24));
  const isPast = daysUntil < 0;

  return (
    <motion.div
      className={`group relative rounded-xl border overflow-hidden cursor-pointer ${
        isUpcoming
          ? 'bg-gradient-to-br from-[#ccff00]/20 to-green-500/20 border-[#ccff00]/50'
          : 'bg-zinc-900/50 border-white/10'
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id={`grid-${index}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill={`url(#grid-${index})`} />
        </svg>
      </div>

      {/* Glow Effect for Upcoming Race */}
      {isUpcoming && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ccff00]/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
      )}

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            {isUpcoming && (
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                Next Race
              </motion.div>
            )}
            <h3 className="text-xl font-bold leading-tight group-hover:text-[#ccff00] transition-colors">
              {raceName}
            </h3>
          </div>

          {/* Round Badge */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-zinc-800 border border-[#ccff00]/30 flex items-center justify-center">
            <span className="text-sm font-bold text-[#ccff00]">
              {race.round}
            </span>
          </div>
        </div>

        {/* Circuit Info */}
        <div className="mb-4">
          <p className="text-sm text-zinc-400 mb-1">
            📍 {Circuit.circuitName}
          </p>
          <p className="text-xs text-zinc-500 uppercase tracking-wider">
            {Circuit.Location.locality}, {Circuit.Location.country}
          </p>
        </div>

        {/* Date and Time */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">
              Date
            </p>
            <p className="text-sm font-mono font-bold">
              {formattedDate}
            </p>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">
              Time
            </p>
            <p className="text-sm font-mono font-bold text-[#ccff00]">
              {formattedTime}
            </p>
          </div>
          {!isPast && daysUntil >= 0 && (
            <>
              <div className="w-px h-8 bg-white/10"></div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">
                  In
                </p>
                <p className="text-sm font-mono font-bold text-green-400">
                  {daysUntil} {daysUntil === 1 ? 'day' : 'days'}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Accent */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 h-1 ${
          isUpcoming ? 'bg-[#ccff00]' : 'bg-zinc-700'
        }`}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
