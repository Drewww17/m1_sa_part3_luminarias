"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import DriverCard from "../../components/DriverCard";
import StandingsTable from "../../components/StandingsTable";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import SeasonSelector from "../../components/SeasonSelector";
import { getDriverStandings, getDriversList } from "../../lib/api";
import { allZeroPoints, sortDriversAlphabetically } from "../../lib/utils";

export default function DriversPage() {
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [season, setSeason] = useState('current');
  const [isFallbackData, setIsFallbackData] = useState(false);

  // Load season from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSeason = localStorage.getItem('selectedSeason');
      if (savedSeason) {
        setSeason(savedSeason);
      }
    }
  }, []);

  useEffect(() => {
    async function loadDrivers() {
      setLoading(true);
      try {
        // First, try to get official standings
        const { standings: standingsData, isMock } = await getDriverStandings(season);
        
        // Check if we're using mock data or if standings are empty or all zero points
        if (isMock || standingsData.length === 0 || allZeroPoints(standingsData)) {
          // If mock or empty, try to get drivers list/roster
          if (standingsData.length === 0) {
            const rosterData = await getDriversList(season);
            const driversToDisplay = rosterData.drivers || [];
            
            // Sort alphabetically when all points are zero
            const sortedDrivers = sortDriversAlphabetically(driversToDisplay);
            setDrivers(sortedDrivers);
          } else {
            // Use mock data but sort alphabetically if all zero points
            if (allZeroPoints(standingsData)) {
              const sortedDrivers = sortDriversAlphabetically(standingsData);
              setDrivers(sortedDrivers);
            } else {
              setDrivers(standingsData);
            }
          }
          setIsFallbackData(true);
        } else {
          // Check if all points are zero and sort alphabetically
          if (allZeroPoints(standingsData)) {
            const sortedDrivers = sortDriversAlphabetically(standingsData);
            setDrivers(sortedDrivers);
          } else {
            setDrivers(standingsData);
          }
          setIsFallbackData(false);
        }
      } catch (error) {
        console.error("Failed to load drivers:", error);
        setIsFallbackData(true);
      } finally {
        setLoading(false);
      }
    }
    loadDrivers();
  }, [season]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#00D2BE] selection:text-black">
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
                  Driver Standings
                </h1>
                <p className="text-zinc-500 ml-8">2025 FIA Formula One World Championship</p>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 ml-8 sm:ml-0">
                <motion.button
                  onClick={() => setViewMode('cards')}
                  className={`px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${
                    viewMode === 'cards'
                      ? 'bg-[#00D2BE] text-black'
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
                      ? 'bg-[#00D2BE] text-black'
                      : 'bg-zinc-900 text-zinc-500 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Table
                </motion.button>
              </div>
            </div>

            {/* Season Selector */}
            <div className="mb-6 ml-8">
              <SeasonSelector 
                season={season} 
                onSeasonChange={setSeason}
                seasons={['current', '2026', '2025']}
              />
            </div>

            {/* Fallback Data Banner */}
            {isFallbackData && !loading && (
              <motion.div
                className="mb-6 ml-8 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-yellow-300 text-sm">
                  ⚠️ Official standings for season <span className="font-bold">{season}</span> are not available — showing roster/demo data.
                </p>
              </motion.div>
            )}

            {/* Stats Overview */}
            {!loading && drivers.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-8">
                <motion.div
                  className="bg-zinc-900/50 rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total Drivers</p>
                  <p className="text-3xl font-black">{drivers.length}</p>
                </motion.div>

                <motion.div
                  className="bg-zinc-900/50 rounded-xl border border-white/10 p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Leader</p>
                  <p className="text-xl font-black text-[#00D2BE]">
                    {drivers[0]?.Driver.code}
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
                    {drivers[0]?.points}
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
                    {Math.max(...drivers.map(d => parseInt(d.wins || 0)))}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <LoadingSkeleton type="card" count={9} />
                  </div>
                ) : (
                  <LoadingSkeleton type="table" count={10} />
                )}
              </div>
            ) : (
              <>
                {viewMode === 'cards' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {drivers.map((driver, index) => (
                      <DriverCard key={driver.position} driver={driver} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
                    <StandingsTable data={drivers} type="driver" />
                  </div>
                )}
              </>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
