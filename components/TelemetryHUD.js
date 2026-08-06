"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { getSessionTelemetry, getLiveTrackWeather } from "../lib/api";

export default function TelemetryHUD() {
  const { theme } = useTheme();
  const [telemetry, setTelemetry] = useState({
    speed: 318,
    rpm: 11850,
    n_gear: 7,
    throttle: 100,
    brake: 0,
    drs: 1
  });

  const [weather, setWeather] = useState({
    air_temperature: 28.4,
    track_temperature: 39.1,
    humidity: 45,
    wind_speed: 12.6,
    rainfall: 0
  });

  const [selectedTire, setSelectedTire] = useState("SOFT");

  // Fetch live OpenF1 car data & weather
  useEffect(() => {
    async function loadLiveData() {
      try {
        const [tel, weath] = await Promise.all([
          getSessionTelemetry(1),
          getLiveTrackWeather()
        ]);
        if (tel) setTelemetry(tel);
        if (weath) setWeather(weath);
      } catch (err) {
        console.error("Telemetry HUD fetch error:", err);
      }
    }
    loadLiveData();

    const interval = setInterval(loadLiveData, 15000);
    return () => clearInterval(interval);
  }, []);

  const rpmPercent = Math.min(100, Math.max(0, (telemetry.rpm / 15000) * 100));

  // Shift light colors (Green -> Red -> Purple)
  const shiftLights = Array.from({ length: 10 }, (_, i) => {
    const threshold = (i + 1) * 10;
    const active = rpmPercent >= threshold;
    let color = "bg-green-500";
    if (i >= 5) color = "bg-yellow-400";
    if (i >= 8) color = "bg-purple-500 animate-pulse";
    return { active, color };
  });

  return (
    <div className="bg-zinc-950/90 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
          <h2 className="text-xl font-black italic uppercase tracking-wider text-white">
            OPENF1 <span style={{ color: theme.color }}>LIVE TELEMETRY HUD</span>
          </h2>
        </div>
        <span className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-full font-mono text-xs text-zinc-400">
          SESSION: RACE 2025
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RPM Gauge & Speedometer */}
        <div className="bg-zinc-900/80 border border-white/5 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          <p className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-2">Engine RPM & Speed</p>
          
          {/* Shift Lights Bar */}
          <div className="flex gap-1.5 mb-4">
            {shiftLights.map((light, idx) => (
              <div
                key={idx}
                className={`h-3 flex-1 rounded-sm transition-colors duration-150 ${
                  light.active ? light.color : "bg-zinc-800"
                }`}
              />
            ))}
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-6xl font-black font-mono tracking-tighter text-white">
                {telemetry.speed}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-[#00D2BE]">KM/H SPEED</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black font-mono italic" style={{ color: theme.color }}>
                GEAR {telemetry.n_gear}
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-1">
                DRS {telemetry.drs ? "AVAILABLE" : "OFF"}
              </p>
            </div>
          </div>

          {/* RPM Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-1">
              <span>0 RPM</span>
              <span className="text-white font-bold">{telemetry.rpm} RPM</span>
              <span>15,000 RPM</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${rpmPercent}%`,
                  backgroundColor: theme.color
                }}
              />
            </div>
          </div>
        </div>

        {/* Sector Split Badges & Pedals */}
        <div className="bg-zinc-900/80 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <p className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-3">
            Sector Timing Splits
          </p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Sector 1 */}
            <div className="bg-zinc-950 border border-purple-500/50 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">SECTOR 1</span>
              <p className="font-mono font-black text-purple-400 text-base mt-1">28.104s</p>
              <span className="text-[9px] px-1.5 py-0.5 bg-purple-900/60 text-purple-300 rounded font-bold uppercase">
                BEST
              </span>
            </div>

            {/* Sector 2 */}
            <div className="bg-zinc-950 border border-green-500/50 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">SECTOR 2</span>
              <p className="font-mono font-black text-green-400 text-base mt-1">32.890s</p>
              <span className="text-[9px] px-1.5 py-0.5 bg-green-900/60 text-green-300 rounded font-bold uppercase">
                PB
              </span>
            </div>

            {/* Sector 3 */}
            <div className="bg-zinc-950 border border-purple-500/50 rounded-xl p-3 text-center">
              <span className="text-[10px] text-zinc-500 uppercase font-bold">SECTOR 3</span>
              <p className="font-mono font-black text-purple-400 text-base mt-1">21.215s</p>
              <span className="text-[9px] px-1.5 py-0.5 bg-purple-900/60 text-purple-300 rounded font-bold uppercase">
                BEST
              </span>
            </div>
          </div>

          {/* Throttle & Brake Pedals */}
          <div className="space-y-2 font-mono text-xs">
            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>THROTTLE</span>
                <span className="text-green-400 font-bold">{telemetry.throttle}%</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-200"
                  style={{ width: `${telemetry.throttle}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-400 mb-1">
                <span>BRAKE</span>
                <span className="text-red-500 font-bold">{telemetry.brake}%</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-200"
                  style={{ width: `${telemetry.brake}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tire Strategy & Track Weather */}
        <div className="bg-zinc-900/80 border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-400 mb-3">
              Tire Compound Strategy
            </p>
            <div className="flex gap-2 mb-4">
              {[
                { name: "SOFT", color: "border-red-500 text-red-500", icon: "🔴" },
                { name: "MEDIUM", color: "border-yellow-400 text-yellow-400", icon: "🟡" },
                { name: "HARD", color: "border-white text-white", icon: "⚪" }
              ].map((tire) => (
                <button
                  key={tire.name}
                  onClick={() => setSelectedTire(tire.name)}
                  className={`flex-1 py-2 rounded-xl border font-mono font-bold text-xs uppercase transition-all flex items-center justify-center gap-1 ${
                    selectedTire === tire.name
                      ? `${tire.color} bg-white/10 shadow-lg scale-105`
                      : "border-white/10 text-zinc-500 hover:text-white"
                  }`}
                >
                  <span>{tire.icon}</span> {tire.name}
                </button>
              ))}
            </div>
          </div>

          {/* Track Weather */}
          <div className="bg-zinc-950 rounded-xl p-4 border border-white/5 font-mono text-xs grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase">Air Temp</p>
              <p className="text-sm font-bold text-white">{weather.air_temperature}°C</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase">Track Temp</p>
              <p className="text-sm font-bold text-orange-400">{weather.track_temperature}°C</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase">Humidity</p>
              <p className="text-sm font-bold text-blue-400">{weather.humidity}%</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase">Wind Speed</p>
              <p className="text-sm font-bold text-zinc-300">{weather.wind_speed} km/h</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
