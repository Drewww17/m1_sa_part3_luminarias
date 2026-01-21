"use client";

import { motion } from "framer-motion";

export default function StandingsTable({ data, type = "driver" }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        No standings data available
      </div>
    );
  }

  const isDriverStandings = type === "driver";

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 text-xs text-zinc-500 uppercase tracking-wider font-bold">
              Pos
            </th>
            <th className="text-left py-4 px-4 text-xs text-zinc-500 uppercase tracking-wider font-bold">
              {isDriverStandings ? 'Driver' : 'Team'}
            </th>
            {isDriverStandings && (
              <th className="text-left py-4 px-4 text-xs text-zinc-500 uppercase tracking-wider font-bold hidden md:table-cell">
                Team
              </th>
            )}
            <th className="text-left py-4 px-4 text-xs text-zinc-500 uppercase tracking-wider font-bold hidden sm:table-cell">
              Nationality
            </th>
            <th className="text-right py-4 px-4 text-xs text-zinc-500 uppercase tracking-wider font-bold">
              Points
            </th>
            <th className="text-right py-4 px-4 text-xs text-zinc-500 uppercase tracking-wider font-bold hidden md:table-cell">
              Wins
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const position = item.position;
            const points = item.points;
            const wins = item.wins || 0;
            
            let name, nationality, teamName;
            
            if (isDriverStandings) {
              name = `${item.Driver.givenName} ${item.Driver.familyName}`;
              nationality = item.Driver.nationality;
              teamName = item.Constructors[0]?.name;
            } else {
              name = item.Constructor.name;
              nationality = item.Constructor.nationality;
            }

            // Position colors
            const positionColor = 
              position === '1' ? 'text-[#00D2BE]' :
              position === '2' ? 'text-zinc-300' :
              position === '3' ? 'text-orange-400' :
              'text-zinc-500';

            return (
              <motion.tr
                key={index}
                className="border-b border-white/5 hover:bg-zinc-900/50 transition-colors cursor-pointer group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
              >
                {/* Position */}
                <td className="py-4 px-4">
                  <motion.div
                    className={`text-2xl font-black italic ${positionColor}`}
                    whileHover={{ scale: 1.2 }}
                  >
                    {position}
                  </motion.div>
                </td>

                {/* Name */}
                <td className="py-4 px-4">
                  <div className="font-bold text-base group-hover:text-[#00D2BE] transition-colors">
                    {name}
                  </div>
                </td>

                {/* Team (Driver standings only) */}
                {isDriverStandings && (
                  <td className="py-4 px-4 hidden md:table-cell">
                    <div className="text-sm text-zinc-500 uppercase tracking-wider">
                      {teamName}
                    </div>
                  </td>
                )}

                {/* Nationality */}
                <td className="py-4 px-4 hidden sm:table-cell">
                  <div className="text-sm text-zinc-400">
                    {nationality}
                  </div>
                </td>

                {/* Points */}
                <td className="py-4 px-4 text-right">
                  <motion.div
                    className="text-xl font-mono font-bold group-hover:text-[#00D2BE] transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    {points}
                  </motion.div>
                </td>

                {/* Wins */}
                <td className="py-4 px-4 text-right hidden md:table-cell">
                  <div className="text-base font-bold text-zinc-500">
                    {wins}
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
