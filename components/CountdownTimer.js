"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();
      
      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };

    // Update immediately and then every second
    const updateTime = () => {
      setTimeLeft(calculateTimeLeft());
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="text-center p-8 bg-zinc-900/50 rounded-2xl border border-white/10">
        <p className="text-2xl font-bold text-[#ccff00]">🏁 Race is Live!</p>
      </div>
    );
  }

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="relative bg-zinc-900/80 rounded-2xl border border-white/10 p-6 text-center overflow-hidden group hover:border-[#ccff00]/50 transition-all"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ccff00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Value */}
          <motion.div
            key={unit.value}
            className="relative text-5xl md:text-6xl font-black font-mono tracking-tighter mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {String(unit.value).padStart(2, '0')}
          </motion.div>

          {/* Label */}
          <div className="relative text-xs text-zinc-500 uppercase tracking-widest font-bold">
            {unit.label}
          </div>

          {/* Animated Border */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-[#ccff00]"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
}
