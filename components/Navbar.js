"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { playHoverTick, toggleAudio, isAudioEnabled } from "../lib/audio";



export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isAudioEnabled());
  const { theme, setTeamTheme, themes } = useTheme();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Drivers', href: '/drivers' },
    { name: 'Teams', href: '/teams' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Compare', href: '/compare' },
  ];

  const handleSoundToggle = () => {
    const newState = toggleAudio();
    setSoundOn(newState);
    if (newState) playHoverTick();
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-black/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={playHoverTick}>
            <motion.div
              className="text-2xl md:text-3xl font-black italic tracking-tighter cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              F1<span style={{ color: theme.color }}>HUB</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link key={item.name} href={item.href} onClick={playHoverTick}>
                <motion.span
                  className="uppercase font-bold text-sm tracking-widest text-zinc-400 hover:text-white cursor-pointer relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: theme.color }}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right Controls: Team Theme Switcher & Sound FX Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Team Theme Dropdown */}
            <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-full px-3 py-1.5 text-xs font-bold">
              <span className="text-zinc-500 uppercase text-[10px]">THEME:</span>
              <select
                value={theme.id}
                onChange={(e) => setTeamTheme(e.target.value)}
                className="bg-transparent text-white font-bold cursor-pointer focus:outline-none"
              >
                {Object.values(themes).map((t) => (
                  <option key={t.id} value={t.id} className="bg-zinc-900 text-white">
                    {t.badge} {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sound FX Toggle */}
            <motion.button
              onClick={handleSoundToggle}
              className="p-2 rounded-full bg-zinc-900 border border-white/10 text-xs font-bold text-zinc-300 hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Toggle Audio FX"
            >
              {soundOn ? "🔊 FX ON" : "🔇 FX OFF"}
            </motion.button>

            {/* User Avatar */}
            <motion.div
              className="w-9 h-9 rounded-full bg-zinc-800 border-2 flex items-center justify-center font-bold text-xs cursor-pointer text-white"
              style={{ borderColor: theme.color }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              P1
            </motion.div>
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-zinc-900/95">
          {navItems.map((item, index) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                className="block px-3 py-2 rounded-md text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer uppercase tracking-wider"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}
