"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { getDriverStandings, compareDrivers, getSeasonsList } from "../../lib/api";
import { getDriverImage } from "../../lib/images";

export default function DriverComparePage() {
  const [loading, setLoading] = useState(true);
  const [driversList, setDriversList] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("current");
  const [driver1Id, setDriver1Id] = useState("");
  const [driver2Id, setDriver2Id] = useState("");
  const [comparison, setComparison] = useState(null);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    async function initSeasons() {
      try {
        const sList = await getSeasonsList();
        setSeasons(sList);
      } catch (err) {
        console.error("Failed to load seasons list:", err);
      }
    }
    initSeasons();
  }, []);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const standings = await getDriverStandings(selectedSeason);
        setDriversList(standings);
        
        if (standings.length >= 2) {
          const d1 = standings[0]?.Driver?.driverId;
          const d2 = standings[1]?.Driver?.driverId;
          setDriver1Id(d1);
          setDriver2Id(d2);
          const comp = await compareDrivers(d1, d2, selectedSeason);
          setComparison(comp);
        }
      } catch (error) {
        console.error("Comparison load error:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedSeason]);

  useEffect(() => {
    async function updateComp() {
      if (!driver1Id || !driver2Id) return;
      try {
        const comp = await compareDrivers(driver1Id, driver2Id, selectedSeason);
        setComparison(comp);
      } catch (err) {
        console.error("Failed to compare drivers:", err);
      }
    }
    updateComp();
  }, [driver1Id, driver2Id, selectedSeason]);

  const d1 = comparison?.driver1;
  const d2 = comparison?.driver2;

  const p1 = parseInt(d1?.points || "0", 10);
  const p2 = parseInt(d2?.points || "0", 10);
  const w1 = parseInt(d1?.wins || "0", 10);
  const w2 = parseInt(d2?.wins || "0", 10);
  const pos1 = parseInt(d1?.position || "99", 10);
  const pos2 = parseInt(d2?.position || "99", 10);

  const maxPoints = Math.max(p1, p2, 1);
  const maxWins = Math.max(w1, w2, 1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#00D2BE] selection:text-black">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-900 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#00D2BE] rounded-full blur-[140px]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-black italic uppercase flex items-center gap-4">
                  <span className="w-4 h-12 bg-[#00D2BE] rounded-sm"></span>
                  Head-to-Head Driver Comparison
                </h1>
                <p className="text-zinc-500 ml-8 mt-1">Compare F1 drivers side-by-side using live API data</p>
              </div>

              {/* Season Selector Dropdown */}
              <div className="flex items-center gap-3 ml-8 md:ml-0">
                <label className="text-xs uppercase font-bold text-zinc-400 tracking-wider">Season:</label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="bg-zinc-900 border border-white/20 text-white text-sm rounded-xl px-4 py-2 font-mono focus:border-[#00D2BE] focus:outline-none cursor-pointer"
                >
                  <option value="current">Current Season (2025)</option>
                  {seasons.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Driver 1 Selector */}
            <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6">
              <label className="block text-xs uppercase tracking-widest text-[#00D2BE] font-bold mb-2">
                Driver 1
              </label>
              <select
                value={driver1Id}
                onChange={(e) => setDriver1Id(e.target.value)}
                className="w-full bg-black border border-white/20 text-white font-bold rounded-xl px-4 py-3 focus:border-[#00D2BE] focus:outline-none cursor-pointer"
              >
                {driversList.map((d) => (
                  <option key={d.Driver.driverId} value={d.Driver.driverId}>
                    P{d.position} - {d.Driver.givenName} {d.Driver.familyName} ({d.Constructors?.[0]?.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Driver 2 Selector */}
            <div className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6">
              <label className="block text-xs uppercase tracking-widest text-purple-400 font-bold mb-2">
                Driver 2
              </label>
              <select
                value={driver2Id}
                onChange={(e) => setDriver2Id(e.target.value)}
                className="w-full bg-black border border-white/20 text-white font-bold rounded-xl px-4 py-3 focus:border-purple-400 focus:outline-none cursor-pointer"
              >
                {driversList.map((d) => (
                  <option key={d.Driver.driverId} value={d.Driver.driverId}>
                    P{d.position} - {d.Driver.givenName} {d.Driver.familyName} ({d.Constructors?.[0]?.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <LoadingSkeleton type="hero" />
          ) : d1 && d2 ? (
            <div className="space-y-8">
              {/* Battle Spotlight Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Driver 1 Card */}
                <motion.div
                  className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border-2 border-[#00D2BE]/50 rounded-3xl p-8 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-6 mb-6">
                    {getDriverImage(d1.Driver.driverId) && (
                      <Image
                        src={getDriverImage(d1.Driver.driverId)}
                        alt={d1.Driver.familyName}
                        width={96}
                        height={96}
                        className="rounded-2xl object-cover border-2 border-[#00D2BE]"
                      />
                    )}
                    <div>
                      <span className="px-3 py-1 bg-[#00D2BE] text-black font-bold text-xs uppercase rounded-full tracking-wider">
                        P{d1.position} Standing
                      </span>
                      <h2 className="text-3xl font-black italic uppercase mt-2">
                        {d1.Driver.givenName} {d1.Driver.familyName}
                      </h2>
                      <p className="text-zinc-400 font-medium">{d1.Constructors?.[0]?.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-mono">
                    <div className="bg-black/60 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-zinc-500 uppercase">Points</p>
                      <p className="text-4xl font-black text-[#00D2BE]">{d1.points}</p>
                    </div>
                    <div className="bg-black/60 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-zinc-500 uppercase">Race Wins</p>
                      <p className="text-4xl font-black text-white">{d1.wins}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Driver 2 Card */}
                <motion.div
                  className="bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950 border-2 border-purple-500/50 rounded-3xl p-8 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-6 mb-6">
                    {getDriverImage(d2.Driver.driverId) && (
                      <Image
                        src={getDriverImage(d2.Driver.driverId)}
                        alt={d2.Driver.familyName}
                        width={96}
                        height={96}
                        className="rounded-2xl object-cover border-2 border-purple-400"
                      />
                    )}
                    <div>
                      <span className="px-3 py-1 bg-purple-500 text-white font-bold text-xs uppercase rounded-full tracking-wider">
                        P{d2.position} Standing
                      </span>
                      <h2 className="text-3xl font-black italic uppercase mt-2">
                        {d2.Driver.givenName} {d2.Driver.familyName}
                      </h2>
                      <p className="text-zinc-400 font-medium">{d2.Constructors?.[0]?.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-mono">
                    <div className="bg-black/60 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-zinc-500 uppercase">Points</p>
                      <p className="text-4xl font-black text-purple-400">{d2.points}</p>
                    </div>
                    <div className="bg-black/60 rounded-xl p-4 border border-white/5">
                      <p className="text-xs text-zinc-500 uppercase">Race Wins</p>
                      <p className="text-4xl font-black text-white">{d2.wins}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Head to Head Analytics Section */}
              <div className="bg-zinc-900/60 border border-white/10 rounded-3xl p-8">
                <div className="text-center mb-8">
                  <span className="px-4 py-2 bg-gradient-to-r from-[#00D2BE] to-purple-500 text-black font-black text-xs uppercase tracking-widest rounded-full">
                    Head to Head Result
                  </span>
                  <h3 className="text-2xl font-black uppercase italic mt-3">
                    {p1 === p2
                      ? "TIED IN CHAMPIONSHIP"
                      : `${p1 > p2 ? d1.Driver.familyName : d2.Driver.familyName} LEADS BY ${Math.abs(p1 - p2)} POINTS`}
                  </h3>
                </div>

                {/* Progress Comparison Bars */}
                <div className="space-y-6 max-w-4xl mx-auto">
                  {/* Points Bar */}
                  <div>
                    <div className="flex justify-between text-sm font-bold uppercase mb-2">
                      <span className="text-[#00D2BE]">{d1.Driver.code}: {p1} PTS</span>
                      <span className="text-zinc-400">Total Points</span>
                      <span className="text-purple-400">{d2.Driver.code}: {p2} PTS</span>
                    </div>
                    <div className="h-4 bg-zinc-800 rounded-full overflow-hidden flex">
                      <div
                        className="bg-[#00D2BE] h-full transition-all duration-700"
                        style={{ width: `${(p1 / maxPoints) * 100}%` }}
                      ></div>
                      <div
                        className="bg-purple-500 h-full transition-all duration-700 ml-auto"
                        style={{ width: `${(p2 / maxPoints) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Wins Bar */}
                  <div>
                    <div className="flex justify-between text-sm font-bold uppercase mb-2">
                      <span className="text-[#00D2BE]">{d1.Driver.code}: {w1} WINS</span>
                      <span className="text-zinc-400">Grand Prix Wins</span>
                      <span className="text-purple-400">{d2.Driver.code}: {w2} WINS</span>
                    </div>
                    <div className="h-4 bg-zinc-800 rounded-full overflow-hidden flex">
                      <div
                        className="bg-[#00D2BE] h-full transition-all duration-700"
                        style={{ width: `${(w1 / maxWins) * 100}%` }}
                      ></div>
                      <div
                        className="bg-purple-500 h-full transition-all duration-700 ml-auto"
                        style={{ width: `${(w2 / maxWins) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Standing Rank Bar (Lower position is better) */}
                  <div>
                    <div className="flex justify-between text-sm font-bold uppercase mb-2">
                      <span className="text-[#00D2BE]">{d1.Driver.code}: P{pos1}</span>
                      <span className="text-zinc-400">Championship Rank</span>
                      <span className="text-purple-400">{d2.Driver.code}: P{pos2}</span>
                    </div>
                    <div className="h-4 bg-zinc-800 rounded-full overflow-hidden flex">
                      <div
                        className="bg-[#00D2BE] h-full transition-all duration-700"
                        style={{ width: `${Math.max(10, 100 - pos1 * 4)}%` }}
                      ></div>
                      <div
                        className="bg-purple-500 h-full transition-all duration-700 ml-auto"
                        style={{ width: `${Math.max(10, 100 - pos2 * 4)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500">Select drivers to compare</div>
          )}
        </main>
      </div>
    </div>
  );
}
