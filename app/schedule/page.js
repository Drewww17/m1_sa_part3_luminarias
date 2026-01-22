"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import RaceCard from "../../components/RaceCard";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { getRaceSchedule, getNextRace } from "../../lib/api";

export default function SchedulePage() {
  const [loading, setLoading] = useState(true);
  const [races, setRaces] = useState([]);
  const [nextRace, setNextRace] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'completed'

  useEffect(() => {
    async function loadSchedule() {
      try {
        const [raceSchedule, upcomingRace] = await Promise.all([
          getRaceSchedule(),
          getNextRace()
        ]);
        setRaces(raceSchedule);
        setNextRace(upcomingRace);
      } catch (error) {
        console.error("Failed to load schedule:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSchedule();
  }, []);

  const filteredRaces = races.filter(race => {
    if (filter === 'all') return true;
    const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
    const now = new Date();
    if (filter === 'upcoming') return raceDate > now;
    if (filter === 'completed') return raceDate <= now;
    return true;
  });

  const upcomingRaces = races.filter(race => {
    const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
    return raceDate > new Date();
  });

  const completedRaces = races.filter(race => {
    const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
    return raceDate <= new Date();
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#00D2BE] selection:text-black pb-20">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D2BE] rounded-full blur-[120px] opacity-50"></div>
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
                  <span className="w-4 h-12 bg-[#00D2BE] rounded-sm"></span>
                  Race Calendar
                </h1>
                <p className="text-zinc-500 ml-8">2025 FIA Formula One World Championship</p>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 ml-8 sm:ml-0 flex-wrap">
                {['all', 'upcoming', 'completed'].map((filterType) => (
                  <motion.button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
                      filter === filterType
                        ? 'bg-[#00D2BE] text-black'
                        : 'bg-zinc-900 text-zinc-500 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filterType}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Stats Overview */}
            {!loading && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-8">
                <motion.div
                  className="bg-zinc-900/50 rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total Races</p>
                  <p className="text-3xl font-black">{races.length}</p>
                </motion.div>

                <motion.div
                  className="bg-zinc-900/50 rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Completed</p>
                  <p className="text-3xl font-black text-zinc-400">{completedRaces.length}</p>
                </motion.div>

                <motion.div
                  className="bg-zinc-900/50 rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Upcoming</p>
                  <p className="text-3xl font-black text-[#00D2BE]">{upcomingRaces.length}</p>
                </motion.div>

                <motion.div
                  className="bg-zinc-900/50 rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Next Round</p>
                  <p className="text-3xl font-black font-mono text-green-400">
                    {nextRace?.round || '-'}
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Race Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <LoadingSkeleton type="card" count={9} />
              </div>
            ) : filteredRaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRaces.map((race, index) => {
                  const isNext = nextRace && race.round === nextRace.round;
                  return (
                    <RaceCard
                      key={race.round}
                      race={race}
                      index={index}
                      isUpcoming={isNext}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-zinc-500">No races found for this filter</p>
              </div>
            )}
          </motion.div>

          {/* Legend */}
          {!loading && (
            <motion.div
              className="mt-12 bg-zinc-900/50 rounded-2xl border border-white/10 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-3">
                <span className="w-2 h-6 bg-[#00D2BE] rounded-sm"></span>
                Legend
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#00D2BE] animate-pulse"></div>
                  <span className="text-zinc-400">Next Race (Highlighted)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-400"></div>
                  <span className="text-zinc-400">Upcoming Race</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-zinc-600"></div>
                  <span className="text-zinc-400">Completed Race</span>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
