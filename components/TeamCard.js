"use client";

import { motion } from "framer-motion";

export default function TeamCard({ team, index = 0 }) {
  if (!team) return null;

  const { Constructor, position, points, wins } = team;
  const teamName = Constructor.name;

  // Team color mapping
  const teamColors = {
    'Red Bull Racing': { bg: 'from-blue-900 to-blue-700', accent: '#1E40AF' },
    'Mercedes': { bg: 'from-teal-600 to-teal-400', accent: '#14B8A6' },
    'Ferrari': { bg: 'from-red-700 to-red-500', accent: '#DC2626' },
    'McLaren': { bg: 'from-orange-600 to-orange-400', accent: '#EA580C' },
    'Aston Martin': { bg: 'from-green-700 to-green-500', accent: '#15803D' },
    'Alpine': { bg: 'from-blue-500 to-pink-500', accent: '#3B82F6' },
    'Williams': { bg: 'from-blue-600 to-blue-400', accent: '#2563EB' },
    'AlphaTauri': { bg: 'from-blue-800 to-blue-600', accent: '#1E3A8A' },
    'Alfa Romeo': { bg: 'from-red-900 to-red-700', accent: '#991B1B' },
    'Haas': { bg: 'from-gray-600 to-gray-400', accent: '#4B5563' },
  };

  const colors = teamColors[teamName] || { bg: 'from-zinc-700 to-zinc-500', accent: '#71717A' };

  return (
    <motion.div
      className="group relative bg-zinc-900/80 rounded-2xl border border-white/10 overflow-hidden cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -8 }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />

      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 border-2 rounded-2xl"
        style={{ borderColor: colors.accent }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative p-6">
        {/* Position Badge */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 border-2"
            style={{ borderColor: colors.accent }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xl font-black italic">{position}</span>
          </motion.div>

          {wins > 0 && (
            <motion.div
              className="px-3 py-1 rounded-full bg-[#E10600]/20 border border-[#E10600]/50"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <span className="text-[#E10600] text-xs font-bold">
                🏆 {wins} {wins === 1 ? 'Win' : 'Wins'}
              </span>
            </motion.div>
          )}
        </div>

        {/* Team Name */}
        <h3 className="text-2xl font-black italic uppercase leading-tight mb-2 group-hover:text-[#E10600] transition-colors duration-300">
          {teamName}
        </h3>

        {/* Nationality */}
        <p className="text-sm text-zinc-500 uppercase tracking-wider mb-6">
          {Constructor.nationality}
        </p>

        {/* Points Display */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
              Championship Points
            </p>
            <motion.div
              className="text-4xl font-black font-mono group-hover:text-[#E10600] transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              {points}
            </motion.div>
          </div>

          {/* Arrow Indicator */}
          <motion.div
            className="w-8 h-8 rounded-full bg-[#E10600]/10 flex items-center justify-center"
            whileHover={{ x: 5 }}
          >
            <svg
              className="w-4 h-4 text-[#E10600]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: colors.accent }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
