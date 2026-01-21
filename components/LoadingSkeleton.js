"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton({ type = "card", count = 1 }) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  if (type === "card") {
    return (
      <>
        {skeletons.map((i) => (
          <motion.div
            key={i}
            className="bg-zinc-900/50 border border-white/5 rounded-xl p-5 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-zinc-800 rounded w-1/2" />
              </div>
              <div className="w-16 h-8 bg-zinc-800 rounded" />
            </div>
          </motion.div>
        ))}
      </>
    );
  }

  if (type === "table") {
    return (
      <div className="space-y-3">
        {skeletons.map((i) => (
          <motion.div
            key={i}
            className="flex items-center gap-4 p-4 bg-zinc-900/50 rounded-xl animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="w-8 h-8 bg-zinc-800 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-zinc-800 rounded w-1/3" />
              <div className="h-3 bg-zinc-800 rounded w-1/4" />
            </div>
            <div className="w-20 h-6 bg-zinc-800 rounded" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "hero") {
    return (
      <motion.div
        className="bg-zinc-900/80 rounded-3xl p-10 animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="space-y-6">
          <div className="w-32 h-6 bg-zinc-800 rounded" />
          <div className="space-y-3">
            <div className="h-12 bg-zinc-800 rounded w-3/4" />
            <div className="h-12 bg-zinc-800 rounded w-2/3" />
          </div>
          <div className="flex gap-6 mt-8">
            <div className="space-y-2">
              <div className="w-20 h-3 bg-zinc-800 rounded" />
              <div className="w-32 h-6 bg-zinc-800 rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-20 h-3 bg-zinc-800 rounded" />
              <div className="w-32 h-6 bg-zinc-800 rounded" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default: simple box
  return (
    <>
      {skeletons.map((i) => (
        <div
          key={i}
          className="h-32 bg-zinc-900/50 rounded-xl animate-pulse"
        />
      ))}
    </>
  );
}
