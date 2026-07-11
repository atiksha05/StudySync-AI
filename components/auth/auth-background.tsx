"use client";

import { motion } from "framer-motion";

export function AuthBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#050816]">
      <motion.div
        className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-[#3B82F6]/18 blur-[120px]"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#8B5CF6]/16 blur-[110px]"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-1/4 h-[380px] w-[380px] rounded-full bg-[#EC4899]/14 blur-[110px]"
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_30%,rgba(59,130,246,0.14),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(139,92,246,0.1),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_40%,rgba(236,72,153,0.12),transparent_50%)]" />
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/40"
          style={{ left: `${8 + i * 11}%`, top: `${12 + (i % 4) * 18}%` }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + i * 0.2, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
