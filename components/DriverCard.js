"use client";

import { motion } from "framer-motion";

export default function DriverCard({ driver, index = 0 }) {
  if (!driver) return null;

  const { Driver, Constructors, position, points, wins } = driver;
  const teamName = Constructors[0]?.name || 'Unknown Team';
  const driverName = `${Driver.givenName} ${Driver.familyName}`;

  // Team color mapping
  const teamColors = {
    'Red Bull Racing': 'from-blue-900 to-blue-700',
    'Mercedes': 'from-teal-600 to-teal-400',
    'Ferrari': 'from-red-700 to-red-500',
    'McLaren': 'from-orange-600 to-orange-400',
    'Aston Martin': 'from-green-700 to-green-500',
    'Alpine': 'from-blue-500 to-pink-500',
    'Williams': 'from-blue-600 to-blue-400',
    'AlphaTauri': 'from-blue-800 to-blue-600',
    'Alfa Romeo': 'from-red-900 to-red-700',
    'Haas': 'from-gray-600 to-gray-400',
  };

  const gradientClass = teamColors[teamName] || 'from-zinc-700 to-zinc-500';

  return (
    <motion.div
      className="group relative bg-zinc-900/50 border border-white/5 rounded-xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
      
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E10600]/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative p-5 flex items-center gap-4">
        {/* Position Number */}
        <div className="flex-shrink-0">
          <motion.div
            className="text-4xl font-black italic text-zinc-700 group-hover:text-[#E10600] transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 5 }}
          >
            {position}
          </motion.div>
        </div>

        {/* Driver Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg leading-tight truncate group-hover:text-[#E10600] transition-colors">
            {driverName}
          </h3>
          <p className="text-xs text-zinc-500 uppercase tracking-wider mt-0.5 truncate">
            {teamName}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-800 text-[#E10600] text-xs font-mono font-bold">
              {Driver.code}
            </span>
            {wins > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E10600]/10 text-[#E10600] text-xs font-bold">
                {wins} {wins === 1 ? 'win' : 'wins'}
              </span>
            )}
          </div>
        </div>

        {/* Points */}
        <div className="flex-shrink-0 text-right">
          <motion.div
            className="text-2xl font-mono font-bold group-hover:text-[#E10600] transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            {points}
          </motion.div>
          <div className="text-xs text-zinc-500 uppercase">PTS</div>
        </div>
      </div>

      {/* Bottom Border Animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E10600] to-green-400"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
