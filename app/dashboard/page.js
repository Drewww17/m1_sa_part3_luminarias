"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import DriverCard from "../../components/DriverCard";
import CountdownTimer from "../../components/CountdownTimer";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { getDriverStandings, getNextRace } from "../../lib/api";

// Fallback data for demo
const DEMO_DRIVERS = [
  { position: "1", points: "86", wins: "3", Driver: { code: "VER", givenName: "Max", familyName: "Verstappen", permanentNumber: "1", nationality: "Dutch" }, Constructors: [{ name: "Red Bull Racing" }] },
  { position: "2", points: "71", wins: "2", Driver: { code: "PER", givenName: "Sergio", familyName: "Perez", permanentNumber: "11", nationality: "Mexican" }, Constructors: [{ name: "Red Bull Racing" }] },
  { position: "3", points: "65", wins: "1", Driver: { code: "ALO", givenName: "Fernando", familyName: "Alonso", permanentNumber: "14", nationality: "Spanish" }, Constructors: [{ name: "Aston Martin" }] },
  { position: "4", points: "54", wins: "1", Driver: { code: "HAM", givenName: "Lewis", familyName: "Hamilton", permanentNumber: "44", nationality: "British" }, Constructors: [{ name: "Mercedes" }] },
  { position: "5", points: "48", wins: "0", Driver: { code: "SAI", givenName: "Carlos", familyName: "Sainz", permanentNumber: "55", nationality: "Spanish" }, Constructors: [{ name: "Ferrari" }] },
  { position: "6", points: "42", wins: "0", Driver: { code: "NOR", givenName: "Lando", familyName: "Norris", permanentNumber: "4", nationality: "British" }, Constructors: [{ name: "McLaren" }] },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ drivers: [], nextRace: null });

  useEffect(() => {
    async function loadData() {
      try {
        const [drivers, nextRace] = await Promise.all([
          getDriverStandings(),
          getNextRace()
        ]);

        setData({ drivers, nextRace });
      } catch (error) {
        console.warn("API Error, using demo data:", error);
        setData({
          drivers: DEMO_DRIVERS,
          nextRace: {
            raceName: "Monaco Grand Prix",
            round: "6",
            date: "2025-05-25",
            time: "13:00:00Z",
            Circuit: {
              circuitName: "Circuit de Monaco",
              Location: { country: "Monaco", locality: "Monte Carlo" }
            }
          }
        });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#E10600] selection:text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#E10600] rounded-full blur-[120px] opacity-50"></div>
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
              <div className="lg:col-span-2 group relative bg-zinc-900/80 rounded-3xl border border-white/10 p-8 md:p-10 overflow-hidden hover:border-[#E10600]/50 transition-all duration-500">
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E10600] text-black font-bold text-xs uppercase tracking-wider mb-6"
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
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-[#E10600] to-green-400"
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
                        <p className="text-[#E10600] font-bold">{data.nextRace?.date}</p>
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
                      className="flex-1 bg-gradient-to-br from-[#E10600] to-green-400 rounded-3xl p-8 text-black"
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
                      <div className="w-12 h-12 rounded-full border-4 border-[#E10600] border-t-transparent animate-spin"></div>
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
                <span className="w-3 h-8 bg-[#E10600] rounded-sm"></span>
                Race Countdown
              </h2>
              <CountdownTimer targetDate={`${data.nextRace.date}T${data.nextRace.time || '00:00:00Z'}`} />
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
                <span className="w-3 h-8 bg-[#E10600] rounded-sm"></span>
                Driver Standings
              </h2>
              <a
                href="/drivers"
                className="text-sm text-[#E10600] hover:underline font-bold uppercase tracking-wider"
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
          <div className="fixed bottom-0 w-full bg-[#E10600] text-black py-2 overflow-hidden whitespace-nowrap z-50">
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
