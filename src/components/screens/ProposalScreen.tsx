"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

import { Canvas } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import { playSound } from "@/utils/audio";

function NightSky() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} className="absolute inset-0 z-0 bg-black">
      <ambientLight intensity={0.2} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
      <Sparkles count={200} scale={10} size={2} speed={0.4} opacity={0.5} color="#FFB6C1" />
    </Canvas>
  );
}

export default function ProposalScreen() {
  const [step, setStep] = useState(0);
  const { setPage, content } = useAppStore();

  useEffect(() => {
    const timeline = [
      { step: 1, delay: 3000 },
      { step: 2, delay: 3000 },
      { step: 3, delay: 3000 },
      { step: 4, delay: 1000 },
      { step: 5, delay: 1000 },
      { step: 6, delay: 1000 },
    ];

    let currentTimeout: NodeJS.Timeout;
    
    const runTimeline = (index: number) => {
      if (index >= timeline.length) return;
      currentTimeout = setTimeout(() => {
        setStep(timeline[index].step);
        runTimeline(index + 1);
      }, timeline[index].delay);
    };

    runTimeline(0);

    return () => clearTimeout(currentTimeout);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="w-full h-full relative overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <NightSky />
      </div>
      
      <div className="z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full w-full">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.h1
              key="s0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 2 }}
              className="text-5xl md:text-8xl font-handwriting text-rose-500 drop-shadow-[0_0_20px_rgba(225,29,72,0.8)]"
            >
              {content.proposalHeading}
            </motion.h1>
          )}

          {step === 1 && (
            <motion.h2
              key="s1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5 }}
              className="text-2xl md:text-4xl font-serif text-white tracking-wide leading-relaxed"
            >
              {content.proposalSub}
            </motion.h2>
          )}

          {step === 2 && (
            <motion.p
              key="s2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="text-xl md:text-3xl font-sans text-rose-200 tracking-widest uppercase"
            >
              I have something to tell you...
            </motion.p>
          )}

          {step === 3 && <Countdown key="s3" num="3" />}
          {step === 4 && <Countdown key="s4" num="2" />}
          {step === 5 && <Countdown key="s5" num="1" />}

          {step === 6 && (
            <motion.div
              key="s6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, type: "spring", bounce: 0.4 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-12 drop-shadow-[0_0_25px_rgba(255,182,193,0.8)] leading-tight">
                {content.proposalReveal}
              </h1>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playSound('transition');
                  setPage(5);
                }}
                className="px-8 py-4 bg-rose-600/80 hover:bg-rose-500 text-white rounded-full font-sans text-lg tracking-widest backdrop-blur-md border border-rose-400/50 shadow-[0_0_20px_rgba(225,29,72,0.5)] transition-all cursor-pointer"
              >
                Read My Letter
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Countdown({ num }: { num: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.8 }}
      className="text-8xl md:text-[150px] font-serif text-rose-500 font-bold drop-shadow-2xl"
    >
      {num}
    </motion.div>
  );
}
