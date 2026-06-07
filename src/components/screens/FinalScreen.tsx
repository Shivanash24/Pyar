"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { Heart } from "lucide-react";
import { playSound } from "@/utils/audio";

function FinalBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} className="absolute inset-0 z-0 bg-[#050014]">
      <ambientLight intensity={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={300} scale={12} size={3} speed={0.5} opacity={0.8} color="#ff3366" />
    </Canvas>
  );
}

export default function FinalScreen() {
  const [msgIndex, setMsgIndex] = useState(-1);
  const [showButtons, setShowButtons] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [accepted, setAccepted] = useState(false);

  const { content } = useAppStore();

  useEffect(() => {
    if (accepted) return;

    const messages = content.finalSceneMessages;
    
    let currentIdx = 0;
    const interval = setInterval(() => {
      setMsgIndex(currentIdx);
      currentIdx++;
      
      if (currentIdx > messages.length) {
        clearInterval(interval);
        setTimeout(() => setShowButtons(true), 1000);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [accepted]);

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 300;
    setNoPos({ x: newX, y: newY });
  };

  const handleYes = () => {
    playSound('celebration');
    setAccepted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full relative overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FinalBackground />
      </div>

      <div className="relative z-10 w-full h-full overflow-y-auto custom-scrollbar flex items-center justify-center">
        <div className="w-full max-w-4xl px-4 py-12 flex flex-col items-center min-h-full justify-center">
        <motion.div
          animate={accepted ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { scale: [1, 1.1, 1] }}
          transition={{ duration: accepted ? 0.5 : 2, repeat: accepted ? 5 : Infinity }}
          className="mb-12 text-rose-500 drop-shadow-[0_0_30px_rgba(225,29,72,0.8)]"
        >
          <Heart size={120} fill="currentColor" />
        </motion.div>

        <AnimatePresence mode="wait">
          {!accepted && msgIndex >= 0 && msgIndex < content.finalSceneMessages.length && (
            <motion.h2
              key={msgIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
              className="text-3xl md:text-6xl font-serif text-center drop-shadow-xl"
            >
              {content.finalSceneMessages[msgIndex]}
            </motion.h2>
          )}

          {accepted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-7xl font-handwriting text-rose-400 mb-8 drop-shadow-[0_0_20px_rgba(255,182,193,0.8)]">
                You Just Made Me The Happiest Person ❤️
              </h1>
              
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                  <motion.div
                    key={`petal-${i}`}
                    className="absolute bg-rose-500 w-4 h-4 rounded-full opacity-60"
                    style={{ borderRadius: "0 50% 50% 50%" }}
                    initial={{
                      x: Math.random() * window.innerWidth,
                      y: -20,
                      rotate: Math.random() * 360,
                      scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                      y: window.innerHeight + 20,
                      rotate: Math.random() * 720,
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButtons && !accepted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 flex gap-8 relative items-center justify-center w-full"
            >
              <button
                onClick={handleYes}
                className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-sans font-bold text-xl tracking-widest shadow-[0_0_20px_rgba(225,29,72,0.6)] cursor-pointer hover:scale-110 transition-transform z-20"
              >
                YES ❤️
              </button>

              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={handleNoHover}
                onClick={handleNoHover}
                className="px-8 py-4 bg-zinc-800 text-zinc-300 rounded-full font-sans font-bold text-xl tracking-widest absolute right-[10%] whitespace-nowrap cursor-pointer z-10"
              >
                NO 😅
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
