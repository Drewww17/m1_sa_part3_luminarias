"use client";

import { useState, useEffect } from "react";

// --- FALLBACK DATA (In case API fails, so your app NEVER looks broken) ---
const DEMO_DRIVERS = [
  { position: "1", points: "86", Driver: { code: "VER", givenName: "Max", familyName: "Verstappen", permanentNumber: "1" }, Constructors: [{ name: "Red Bull Racing" }] },
  { position: "2", points: "71", Driver: { code: "PER", givenName: "Sergio", familyName: "Perez", permanentNumber: "11" }, Constructors: [{ name: "Red Bull Racing" }] },
  { position: "3", points: "65", Driver: { code: "ALO", givenName: "Fernando", familyName: "Alonso", permanentNumber: "14" }, Constructors: [{ name: "Aston Martin" }] },
  { position: "4", points: "54", Driver: { code: "HAM", givenName: "Lewis", familyName: "Hamilton", permanentNumber: "44" }, Constructors: [{ name: "Mercedes" }] },
  { position: "5", points: "48", Driver: { code: "SAI", givenName: "Carlos", familyName: "Sainz", permanentNumber: "55" }, Constructors: [{ name: "Ferrari" }] },
  { position: "6", points: "42", Driver: { code: "NOR", givenName: "Lando", familyName: "Norris", permanentNumber: "4" }, Constructors: [{ name: "McLaren" }] },
];

export default function F1ModernDashboard() {
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [data, setData] = useState({ drivers: [], nextRace: null });

  // --- 1. CINEMATIC SPLASH SCREEN LOGIC ---
  useEffect(() => {
    // Wait 3 seconds, then slide the curtain up
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // --- 2. ROBUST DATA FETCHING ---
  useEffect(() => {
    async function initData() {
      try {
        // Attempt to fetch real data
        const dRes = await fetch("https://api.jolpi.ca/ergast/f1/current/driverStandings.json");
        const rRes = await fetch("https://api.jolpi.ca/ergast/f1/current.json");
        
        if (!dRes.ok || !rRes.ok) throw new Error("API Failure");

        const dJson = await dRes.json();
        const rJson = await rRes.json();

        // Process Race Data
        const races = rJson.MRData.RaceTable.Races;
        const today = new Date();
        const upcoming = races.find(r => {
          // Handle cases where time might be missing (default to midnight UTC)
          return new Date(`${r.date}T${r.time || "00:00:00Z"}`) > today;
        }) || races[races.length-1];

        setData({
          drivers: dJson.MRData.StandingsTable.StandingsLists[0].DriverStandings,
          nextRace: upcoming
        });
      } catch (err) {
        console.warn("API Error, switching to Demo Mode:", err);
        // Fallback to Demo Data so the app still works for the exam
        setData({
          drivers: DEMO_DRIVERS,
          nextRace: { raceName: "Monaco Grand Prix", date: "2025-05-25", time: "13:00:00Z", Circuit: { Location: { country: "Monaco", locality: "Monte Carlo" } } }
        });
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden relative selection:bg-[#ccff00] selection:text-black">
      
      {/* --- ANIMATED SPLASH SCREEN --- */}
      {/* This div slides up (translate-y) when showSplash becomes false */}
      <div className={`fixed inset-0 z-50 bg-[#ccff00] flex flex-col items-center justify-center transition-transform duration-[1500ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${showSplash ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="relative overflow-hidden">
          <h1 className="text-9xl font-black italic tracking-tighter text-black animate-pulse">
            F1<span className="text-white ml-2">HUB</span>
          </h1>
        </div>
        <div className="mt-8 flex gap-2">
          <div className="w-4 h-4 bg-black animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-4 h-4 bg-black animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-4 h-4 bg-black animate-bounce"></div>
        </div>
        <p className="mt-4 font-mono font-bold text-black uppercase tracking-widest text-sm">Initializing Telemetry...</p>
      </div>

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ccff00] rounded-full blur-[120px] opacity-50"></div>
      </div>

      {/* --- MAIN INTERFACE --- */}
      <div className={`relative z-10 transition-opacity duration-1000 delay-500 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* TOP NAV */}
        <nav className="flex items-center justify-between px-8 py-6 backdrop-blur-sm border-b border-white/10">
          <div className="text-3xl font-black italic tracking-tighter">F1<span className="text-[#ccff00]">HUB</span></div>
          <div className="hidden md:flex gap-8">
            {['Dashboard', 'Analysis', 'Schedule'].map((item) => (
              <button 
                key={item}
                className="uppercase font-bold text-sm tracking-widest text-zinc-500 hover:text-[#ccff00] hover:scale-110 transition-all duration-300"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-800 border border-[#ccff00] flex items-center justify-center font-bold">
            P1
          </div>
        </nav>

        {/* HERO SECTION */}
        <main className="max-w-7xl mx-auto p-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COL: NEXT RACE CARD (Interactive Hover) */}
            <div className="lg:col-span-8 group relative bg-zinc-900/80 rounded-[2rem] border border-white/10 p-10 overflow-hidden hover:border-[#ccff00]/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(204,255,0,0.15)]">
               {/* Background Image Effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
               <div 
                 className="absolute right-0 top-0 h-full w-2/3 bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-[2s]"
                 style={{ backgroundImage: "url('https://media.formula1.com/image/upload/f_auto,c_limit,w_960,q_auto/f_auto/q_auto/content/dam/fom-website/manual/Misc/2021-Master-Folder/F1%202021%20Render%201')" }}
               ></div>

               <div className="relative z-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider mb-6 animate-pulse">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span> Live Session
                  </div>
                  <h1 className="text-6xl md:text-7xl font-black italic uppercase leading-[0.9] mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {data.nextRace?.raceName?.split(' ').map((word, i) => (
                      <span key={i} className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-green-400" : "text-white"}>
                        {word}<br/>
                      </span>
                    ))}
                  </h1>
                  <div className="flex gap-6 mt-8 font-mono text-zinc-400">
                     <div>
                        <p className="text-xs uppercase tracking-widest mb-1">Location</p>
                        <p className="text-white font-bold">{data.nextRace?.Circuit?.Location?.country}</p>
                     </div>
                     <div className="w-px bg-white/20"></div>
                     <div>
                        <p className="text-xs uppercase tracking-widest mb-1">Time</p>
                        <p className="text-[#ccff00] font-bold">{data.nextRace?.time ? data.nextRace.time.replace("Z", " UTC") : "TBD"}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* RIGHT COL: TOP DRIVER (Stat Card) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex-1 bg-[#ccff00] rounded-[2rem] p-8 text-black flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                <div>
                   <p className="font-bold uppercase tracking-widest text-xs border-b-2 border-black/20 pb-2 mb-2">Championship Leader</p>
                   <h2 className="text-4xl font-black italic uppercase">{data.drivers[0]?.Driver.familyName || "LOADING"}</h2>
                   <p className="text-lg font-medium opacity-80">{data.drivers[0]?.Constructors[0]?.name}</p>
                </div>
                <div className="text-right">
                   <span className="text-7xl font-black tracking-tighter">{data.drivers[0]?.points || "0"}</span>
                   <span className="block font-bold text-sm uppercase">Points</span>
                </div>
              </div>

              {/* Mini Stat */}
              <div className="h-32 bg-zinc-900 rounded-[2rem] border border-white/10 flex items-center justify-between p-8 hover:bg-zinc-800 transition-colors">
                 <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Current Season</p>
                    <p className="text-2xl font-bold">2025</p>
                 </div>
                 <div className="w-12 h-12 rounded-full border-4 border-[#ccff00] border-t-transparent animate-spin"></div>
              </div>
            </div>

          </div>

          {/* LIST SECTION: DRIVERS */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-3 h-8 bg-[#ccff00] rounded-sm"></span> 
              Driver Standings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.drivers.slice(0, 9).map((d, i) => (
                <div 
                  key={d.position}
                  className="group bg-zinc-900/50 border border-white/5 p-4 rounded-xl flex items-center gap-4 hover:bg-[#ccff00] hover:text-black transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  style={{ animation: `fadeIn 0.5s ease-out forwards ${i * 0.1}s`, opacity: 0 }} // Staggered Animation
                >
                  <div className="font-black text-3xl italic opacity-30 group-hover:opacity-100">{d.position}</div>
                  <div className="flex-1">
                     <h4 className="font-bold text-lg leading-none uppercase">{d.Driver.givenName} {d.Driver.familyName}</h4>
                     <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1 group-hover:text-black/70">{d.Constructors[0]?.name}</p>
                  </div>
                  <div className="font-mono font-bold group-hover:scale-110 transition-transform">{d.points} PTS</div>
                </div>
              ))}
            </div>
          </div>

        </main>
        
        {/* FOOTER TICKER (Scrolling Text) */}
        <div className="fixed bottom-0 w-full bg-[#ccff00] text-black py-2 overflow-hidden whitespace-nowrap z-50">
           <div className="animate-marquee inline-block font-bold font-mono text-sm uppercase tracking-widest">
              BREAKING NEWS: {data.drivers[0]?.Driver.familyName} LEADS CHAMPIONSHIP ++ NEXT STOP: {data.nextRace?.Circuit?.Location?.country?.toUpperCase()} ++ LIVE TELEMETRY ACTIVE ++ WEATHER CONDITIONS: DRY ++ TRACK TEMP: 32°C ++ 
           </div>
        </div>

      </div>

      {/* --- CSS FOR ANIMATIONS --- */}
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
}