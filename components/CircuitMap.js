"use client";

import { motion } from "framer-motion";

// Circuit metadata database for track details and lap records
const CIRCUIT_DATA = {
  monaco: {
    lengthKm: "3.337 km",
    turns: 19,
    drsZones: 1,
    record: { time: "1:12.909", driver: "Lewis Hamilton", year: "2021" },
    pathSvg: "M 30,80 C 40,20 120,20 150,50 C 180,80 240,60 270,100 C 290,140 220,180 180,160 C 140,140 100,180 60,160 Z"
  },
  silverstone: {
    lengthKm: "5.891 km",
    turns: 18,
    drsZones: 2,
    record: { time: "1:27.097", driver: "Max Verstappen", year: "2020" },
    pathSvg: "M 40,40 L 260,40 C 290,80 280,140 220,160 L 120,160 C 60,160 20,120 40,40 Z"
  },
  monza: {
    lengthKm: "5.793 km",
    turns: 11,
    drsZones: 2,
    record: { time: "1:21.046", driver: "Rubens Barrichello", year: "2004" },
    pathSvg: "M 30,30 L 270,30 L 270,160 L 180,160 L 150,110 L 110,160 L 30,160 Z"
  },
  spa: {
    lengthKm: "7.004 km",
    turns: 19,
    drsZones: 2,
    record: { time: "1:46.286", driver: "Valtteri Bottas", year: "2018" },
    pathSvg: "M 20,150 L 80,30 L 260,40 C 290,100 240,160 160,170 Z"
  },
  americas: {
    lengthKm: "5.513 km",
    turns: 20,
    drsZones: 2,
    record: { time: "1:36.169", driver: "Charles Leclerc", year: "2019" },
    pathSvg: "M 40,160 L 80,30 L 160,40 L 260,100 L 200,170 Z"
  },
  interlagos: {
    lengthKm: "4.309 km",
    turns: 15,
    drsZones: 2,
    record: { time: "1:10.540", driver: "Valtteri Bottas", year: "2018" },
    pathSvg: "M 50,50 L 230,50 C 260,100 220,160 140,150 L 50,120 Z"
  },
  default: {
    lengthKm: "5.280 km",
    turns: 16,
    drsZones: 2,
    record: { time: "1:24.125", driver: "Official Lap Record", year: "2024" },
    pathSvg: "M 40,50 C 100,10 200,10 260,60 C 300,110 220,180 140,170 C 80,160 20,110 40,50 Z"
  }
};

export default function CircuitMap({ circuitId, circuitName }) {
  const meta = CIRCUIT_DATA[circuitId?.toLowerCase()] || CIRCUIT_DATA.default;

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
      {/* SVG Map Layout */}
      <div className="relative h-40 w-full bg-zinc-900/50 rounded-xl flex items-center justify-center p-2 border border-white/5 overflow-hidden group">
        <svg viewBox="0 0 300 200" className="w-full h-full stroke-[#00D2BE] fill-none stroke-[4]">
          <motion.path
            d={meta.pathSvg}
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Dynamic Glowing Car Dot Animation */}
        <motion.div
          className="absolute w-3 h-3 bg-red-500 rounded-full shadow-[0_0_12px_#ff0000]"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <span className="absolute top-2 left-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          {circuitName || "Grand Prix Circuit"}
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 text-center font-mono">
        <div className="bg-zinc-900/80 rounded-lg p-2 border border-white/5">
          <p className="text-[10px] text-zinc-500 uppercase">Length</p>
          <p className="text-xs font-bold text-white">{meta.lengthKm}</p>
        </div>
        <div className="bg-zinc-900/80 rounded-lg p-2 border border-white/5">
          <p className="text-[10px] text-zinc-500 uppercase">Turns</p>
          <p className="text-xs font-bold text-[#00D2BE]">{meta.turns}</p>
        </div>
        <div className="bg-zinc-900/80 rounded-lg p-2 border border-white/5">
          <p className="text-[10px] text-zinc-500 uppercase">DRS Zones</p>
          <p className="text-xs font-bold text-purple-400">{meta.drsZones}</p>
        </div>
      </div>

      {/* Lap Record Badge */}
      <div className="bg-zinc-900/80 rounded-xl p-3 border border-white/10 flex items-center justify-between text-xs">
        <div>
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Lap Record</p>
          <p className="font-bold text-white">{meta.record.driver} ({meta.record.year})</p>
        </div>
        <span className="font-mono font-black text-[#00D2BE] text-sm bg-black/50 px-2 py-1 rounded border border-[#00D2BE]/30">
          {meta.record.time}
        </span>
      </div>
    </div>
  );
}
