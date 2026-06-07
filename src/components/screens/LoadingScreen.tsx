"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { Heart } from "lucide-react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const { setPage } = useAppStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setPage(3), 500);
          return 100;
        }
        return p + Math.floor(Math.random() * 10) + 5;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [setPage]);

  const hearts = Array.from({ length: 20 });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
      className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden"
    >
      {isClient && hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-500/40"
          initial={{
            y: "110vh",
            x: Math.random() * window.innerWidth,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: "-10vh",
            x: Math.random() * window.innerWidth,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          <Heart fill="currentColor" />
        </motion.div>
      ))}

      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl font-serif text-white mb-12 text-center drop-shadow-[0_0_15px_rgba(255,182,193,0.5)] z-10 px-4"
      >
        I have something special for you ❤️
      </motion.h2>

      <div className="w-64 md:w-96 h-2 bg-zinc-800 rounded-full overflow-hidden shadow-[0_0_10px_rgba(255,182,193,0.3)] z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-rose-500 to-pink-300"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.3 }}
        />
      </div>
      <p className="text-rose-300 mt-4 font-sans tracking-widest text-sm z-10">
        {Math.min(progress, 100)}%
      </p>
    </motion.div>
  );
}
