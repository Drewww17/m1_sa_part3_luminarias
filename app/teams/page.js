"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import TeamCard from "../../components/TeamCard";
import StandingsTable from "../../components/StandingsTable";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { getConstructorStandings } from "../../lib/api";

export default function TeamsPage() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [viewMode, setViewMode] = useState('cards');

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await getConstructorStandings();
        setTeams(data);
      } catch (error) {
        console.error("Failed to load teams:", error);
        // Fallback data
        setTeams([
          { position: "1", points: "157", wins: "5", Constructor: { constructorId: "red_bull", name: "Red Bull Racing", nationality: "Austrian" } },
          { position: "2", points: "102", wins: "2", Constructor: { constructorId: "mercedes", name: "Mercedes", nationality: "German" } },
          { position: "3", points: "97", wins: "1", Constructor: { constructorId: "ferrari", name: "Ferrari", nationality: "Italian" } },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadTeams();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ccff00] selection:text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ccff00] rounded-full blur-[120px] opacity-50"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black italic uppercase mb-2 flex items-center gap-4">
                  <span className="w-4 h-12 bg-[#ccff00] rounded-sm"></span>
                  Constructor Standings
                </h1>
                <p className="text-zinc-500 ml-8">2025 FIA Formula One World Championship</p>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 ml-8 sm:ml-0">
                <motion.button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${
                    viewMode === 'cards'
                      ? 'bg-[#ccff00] text-black'
                      : 'bg-zinc-900 text-zinc-500 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cards
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${
                    viewMode === 'table'
                      ? 'bg-[#ccff00] text-black'
                      : 'bg-zinc-900 text-zinc-500 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Table
                </motion.button>
              </div>
            </div>

            {/* Stats Overview */}
            {!loading && teams.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-8">
                <motion.div
                  className="bg-zinc-900/50 rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total Teams</p>
                  <p className="text-3xl font-black">{teams.length}</p>
                </motion.div>

                <motion.div
                  className="bg-zinc-900/50 rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Leader</p>
                  <p className="text-lg font-black text-[#ccff00] truncate">
                    {teams[0]?.Constructor.name}
                  </p>
                </motion.div>

                <motion.div
                  className="bg-zinc-900/50 rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Top Points</p>
                  <p className="text-3xl font-black font-mono">
                    {teams[0]?.points}
                  </p>
                </motion.div>

                <motion.div
                  className="bg-zinc-900/50 rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Most Wins</p>
                  <p className="text-3xl font-black font-mono">
                    {Math.max(...teams.map(t => parseInt(t.wins || 0)))}
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Standings Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {loading ? (
              <div className="space-y-4">
                {viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <LoadingSkeleton type="card" count={6} />
                  </div>
                ) : (
                  <LoadingSkeleton type="table" count={10} />
                )}
              </div>
            ) : (
              <>
                {viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team, index) => (
                      <TeamCard key={team.position} team={team} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
                    <StandingsTable data={teams} type="constructor" />
                  </div>
                )}
              </>
            )}
          </motion.div>

          {/* Additional Info Section */}
          {!loading && teams.length > 0 && (
            <motion.div
              className="mt-12 bg-zinc-900/50 rounded-2xl border border-white/10 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-3 h-8 bg-[#ccff00] rounded-sm"></span>
                Championship Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-400">
                <div>
                  <p className="text-sm mb-2">
                    <span className="font-bold text-white">Point System:</span> 1st: 25pts, 2nd: 18pts, 3rd: 15pts, 4th: 12pts, 5th: 10pts, 6th: 8pts, 7th: 6pts, 8th: 4pts, 9th: 2pts, 10th: 1pt
                  </p>
                  <p className="text-sm">
                    <span className="font-bold text-white">Fastest Lap:</span> +1 point (if finishing in top 10)
                  </p>
                </div>
                <div>
                  <p className="text-sm mb-2">
                    <span className="font-bold text-white">Constructor Points:</span> Sum of both drivers&apos; points per race
                  </p>
                  <p className="text-sm">
                    <span className="font-bold text-white">Season:</span> 2025 FIA Formula One World Championship
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
