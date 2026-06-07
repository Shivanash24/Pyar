"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";

import { Heart } from "lucide-react";
import { playSound } from "@/utils/audio";

export default function PasscodeScreen() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const { setPage, startAudio, siteConfig } = useAppStore();

  const handlePress = (num: string) => {
    playSound('click');
    if (input.length < siteConfig.passcode.length) {
      const newVal = input + num;
      setInput(newVal);
      if (newVal.length === siteConfig.passcode.length) {
        if (newVal === siteConfig.passcode) {
          startAudio();
          playSound('transition');
          setTimeout(() => setPage(2), 1000);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
            setInput("");
          }, 500);
        }
      }
    }
  };

  const handleDelete = () => {
    playSound('click');
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col md:flex-row items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#4a0000] via-[#8B0000] to-black p-4 md:p-8 overflow-y-auto"
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md">
        <motion.div 
          initial={{ rotate: -5, scale: 0.9 }}
          animate={{ rotate: [-5, 0, -2, 0], scale: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
          className="bg-white p-4 pb-16 rounded-sm shadow-2xl relative w-64 md:w-80"
        >
          <div className="w-full aspect-square bg-zinc-200 overflow-hidden relative">
            <img src="/memories/cover.jpeg" alt="Us" className="object-cover w-full h-full opacity-50" onError={(e) => e.currentTarget.style.display = 'none'} />
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 -z-10">
              <Heart className="w-12 h-12" />
            </div>
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-rose-500/80 skew-x-12 shadow-sm rounded-sm backdrop-blur-sm"></div>
          <p className="absolute bottom-4 left-0 right-0 text-center text-black font-handwriting text-2xl">
            {siteConfig.names.recipient} ❤️
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl md:text-5xl font-serif text-white mb-4 text-center">
          Someone has a surprise waiting for you ❤️
        </h1>
        <p className="text-rose-200 mb-12 font-sans text-lg text-center">Enter the secret passcode</p>

        <motion.div 
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="flex gap-4 mb-12">
            {Array.from({ length: siteConfig.passcode.length }).map((_, i) => (
              <div 
                key={i} 
                className={`w-4 h-4 rounded-full border-2 border-rose-300 transition-all duration-300 ${input.length > i ? 'bg-rose-300 scale-125 shadow-[0_0_10px_rgba(255,182,193,0.8)]' : 'bg-transparent'}`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handlePress(num.toString())}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-rose-300/30 text-2xl text-white font-sans font-light hover:bg-rose-300/20 active:scale-95 transition-all flex items-center justify-center backdrop-blur-sm shadow-xl"
              >
                {num}
              </button>
            ))}
            <div className="w-16 h-16 md:w-20 md:h-20"></div>
            <button
              onClick={() => handlePress("0")}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-rose-300/30 text-2xl text-white font-sans font-light hover:bg-rose-300/20 active:scale-95 transition-all flex items-center justify-center backdrop-blur-sm shadow-xl"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full text-lg text-rose-300 font-sans hover:bg-rose-300/10 active:scale-95 transition-all flex items-center justify-center"
            >
              DEL
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
