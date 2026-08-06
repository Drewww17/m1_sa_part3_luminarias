"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import DriverCard from "../../components/DriverCard";
import CountdownTimer from "../../components/CountdownTimer";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import TelemetryHUD from "../../components/TelemetryHUD";
import { getDriverStandings, getNextRace, getLastRaceResults, getLiveTrackWeather } from "../../lib/api";
import { getDriverImage } from "../../lib/images";

export default function DashboardPage() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ drivers: [], nextRace: null, lastRace: null, weather: null });

  useEffect(() => {
    async function loadData() {
      try {
        const [drivers, nextRace, lastRace, weather] = await Promise.all([
          getDriverStandings(),
          getNextRace(),
          getLastRaceResults(),
          getLiveTrackWeather()
        ]);

        setData({ drivers, nextRace, lastRace, weather });
      } catch (error) {
        console.error("API Error fetching dashboard live data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);


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
          {/* Hero Section - Next Race */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Next Race Info */}
              <div className="lg:col-span-2 group relative bg-zinc-900/80 rounded-3xl border border-white/10 p-8 md:p-10 overflow-hidden hover:border-[#00D2BE]/50 transition-all duration-500">
                {/* Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
                <div
                  className="absolute right-0 top-0 h-full w-2/3 bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-[2s]"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1532172839c2c5e7a8e8e8e8')",
                    backgroundColor: '#1a1a1a'
                  }}
                ></div>

                {loading ? (
                  <LoadingSkeleton type="hero" />
                ) : (
                  <div className="relative z-20">
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D2BE] text-black font-bold text-xs uppercase tracking-wider mb-6"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                      Next Race
                    </motion.div>
                    
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase leading-tight mb-6">
                      {data.nextRace?.raceName?.split(' ').map((word, i) => (
                        <span
                          key={i}
                          className={
                            i % 2 !== 0
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00D2BE] to-green-400"
                              : "text-white"
                          }
                        >
                          {word}{' '}
                        </span>
                      ))}
                    </h1>

                    <div className="flex flex-wrap gap-6 font-mono text-zinc-400">
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-1">Location</p>
                        <p className="text-white font-bold">
                          {data.nextRace?.Circuit?.Location?.locality}, {data.nextRace?.Circuit?.Location?.country}
                        </p>
                      </div>
                      <div className="w-px bg-white/20"></div>
                      <div>
                        <p className="text-xs uppercase tracking-widest mb-1">Date</p>
                        <p className="text-[#00D2BE] font-bold">{data.nextRace?.date}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Championship Leader Card */}
              <div className="flex flex-col gap-6">
                {loading ? (
                  <LoadingSkeleton count={1} />
                ) : (
                  <>
                    <motion.div
                      className="flex-1 bg-gradient-to-br from-[#00D2BE] to-green-400 rounded-3xl p-8 text-black"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="font-bold uppercase tracking-widest text-xs border-b-2 border-black/20 pb-2 mb-3">
                        Championship Leader
                      </p>
                      <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-1">
                        {data.drivers[0]?.Driver.familyName}
                      </h2>
                      <p className="text-base font-medium opacity-80 mb-4">
                        {data.drivers[0]?.Constructors[0]?.name}
                      </p>
                      <div className="text-right">
                        <span className="text-6xl md:text-7xl font-black tracking-tighter">
                          {data.drivers[0]?.points}
                        </span>
                        <span className="block font-bold text-sm uppercase mt-1">Points</span>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-zinc-900 rounded-3xl border border-white/10 flex items-center justify-between p-6 hover:bg-zinc-800 transition-colors"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div>
                        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">
                          Current Season
                        </p>
                        <p className="text-2xl font-bold">2025</p>
                      </div>
                      <div className="w-12 h-12 rounded-full border-4 border-[#00D2BE] border-t-transparent animate-spin"></div>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.section>

          {/* Countdown Timer */}
          {!loading && data.nextRace && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-3 h-8 bg-[#00D2BE] rounded-sm"></span>
                Race Countdown
              </h2>
              <CountdownTimer targetDate={`${data.nextRace.date}T${data.nextRace.time || '00:00:00Z'}`} />
            </motion.section>
          )}

          {/* Telemetry HUD Section */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <TelemetryHUD />
          </motion.section>

          {/* Last Race Results */}

          {data.lastRace?.race && data.lastRace?.results?.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-3 h-8 bg-[#00D2BE] rounded-sm"></span>
                Last Race - {data.lastRace.race.raceName}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Race Winner Card */}
                {data.lastRace.results[0] && (
                  <motion.div
                    className="bg-gradient-to-br from-[#00D2BE] to-green-400 rounded-2xl p-6 text-black"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest mb-2 border-b-2 border-black/20 pb-2">
                      Race Winner
                    </p>
                    <div className="flex items-center gap-4 mb-3">
                      {getDriverImage(data.lastRace.results[0].Driver?.driverId) && (
                        <Image
                          src={getDriverImage(data.lastRace.results[0].Driver?.driverId)}
                          alt={data.lastRace.results[0].Driver?.familyName || 'Driver'}
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="text-2xl font-black italic uppercase">
                          {data.lastRace.results[0].Driver?.givenName} {data.lastRace.results[0].Driver?.familyName}
                        </h3>
                        <p className="text-sm font-bold opacity-80">
                          {data.lastRace.results[0].Constructor?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black font-mono">
                        {data.lastRace.results[0].Time?.time || `${data.lastRace.results[0].laps} Laps`}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Pole Position / Grid Leader */}
                {data.lastRace.results[0] && (
                  <motion.div
                    className="bg-zinc-900 border border-white/10 rounded-2xl p-6"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
                      Grid Position 1
                    </p>
                    <h3 className="text-xl font-black italic uppercase text-[#00D2BE] mb-1">
                      {data.lastRace.results[0].Driver?.familyName}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3">P1 Start</p>
                    <div className="text-right">
                      <span className="text-2xl font-black font-mono text-white">
                        {data.lastRace.results[0].points} PTS
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Fastest Lap */}
                {data.lastRace.results.find(r => r.FastestLap) ? (
                  (() => {
                    const fl = data.lastRace.results.find(r => r.FastestLap);
                    return (
                      <motion.div
                        className="bg-zinc-900 border border-white/10 rounded-2xl p-6"
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
                          Fastest Lap
                        </p>
                        <h3 className="text-xl font-black italic uppercase text-purple-400 mb-1">
                          {fl.Driver?.familyName}
                        </h3>
                        <p className="text-sm text-zinc-400 mb-3">Lap {fl.FastestLap?.lap}</p>
                        <div className="text-right">
                          <span className="text-2xl font-black font-mono text-white">
                            {fl.FastestLap?.Time?.time}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })()
                ) : (
                  <motion.div
                    className="bg-zinc-900 border border-white/10 rounded-2xl p-6"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
                      Round Status
                    </p>
                    <h3 className="text-xl font-black italic uppercase text-purple-400 mb-1">
                      Completed
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3">Official Standings Updated</p>
                  </motion.div>
                )}
              </div>

              {/* Top 10 Results */}
              <div className="mt-6 bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">Race Finishers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.lastRace.results.slice(0, 10).map((result, index) => (
                    <motion.div
                      key={result.position || index}
                      className="flex items-center gap-3 bg-zinc-900 rounded-lg p-3 border border-white/5 hover:border-[#00D2BE]/30 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className={`text-2xl font-black italic ${
                        result.position === '1' ? 'text-[#00D2BE]' :
                        result.position === '2' ? 'text-zinc-300' :
                        result.position === '3' ? 'text-orange-400' :
                        'text-zinc-500'
                      }`}>
                        {result.position}
                      </div>
                      {getDriverImage(result.Driver?.driverId) && (
                        <Image
                          src={getDriverImage(result.Driver?.driverId)}
                          alt={result.Driver?.familyName || 'Driver'}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-sm">{result.Driver?.givenName} {result.Driver?.familyName}</p>
                        <p className="text-xs text-zinc-500">{result.Constructor?.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm font-bold">{result.Time?.time || result.status}</p>
                        <p className="text-xs text-[#00D2BE]">{result.points} pts</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          )}


          {/* Driver Standings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-3 h-8 bg-[#00D2BE] rounded-sm"></span>
                Driver Standings
              </h2>
              <a
                href="/drivers"
                className="text-sm text-[#00D2BE] hover:underline font-bold uppercase tracking-wider"
              >
                View All →
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <LoadingSkeleton type="card" count={6} />
              ) : (
                data.drivers.slice(0, 6).map((driver, index) => (
                  <DriverCard key={driver.position} driver={driver} index={index} />
                ))
              )}
            </div>
          </motion.section>
        </main>

        {/* Footer Ticker */}
        {!loading && (
          <div className="fixed bottom-0 w-full bg-[#00D2BE] text-black py-2 overflow-hidden whitespace-nowrap z-50">
            <motion.div
              className="inline-block font-bold font-mono text-sm uppercase tracking-widest"
              animate={{ x: [1000, -1000] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              BREAKING NEWS: {data.drivers[0]?.Driver.familyName} LEADS CHAMPIONSHIP ++ NEXT STOP:{' '}
              {data.nextRace?.Circuit?.Location?.country?.toUpperCase()} ++ LIVE TELEMETRY ACTIVE ++
              WEATHER CONDITIONS: DRY ++ TRACK TEMP: 32°C ++{' '}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
