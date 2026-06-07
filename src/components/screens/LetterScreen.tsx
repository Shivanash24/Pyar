"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { playSound } from "@/utils/audio";


export default function LetterScreen() {
  const { setPage, content, siteConfig } = useAppStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
      className="w-full h-full bg-[#fdfbf7] text-zinc-900 flex overflow-y-auto md:overflow-hidden"
    >
      <div className="flex flex-col md:flex-row w-full min-h-full md:h-full max-w-7xl mx-auto">
        {/* Left Side: Letter */}
        <div className="flex-1 p-8 md:p-16 md:overflow-y-auto flex flex-col justify-center min-h-[50vh]">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="max-w-xl mx-auto"
          >
            <div className="font-handwriting text-3xl md:text-5xl text-red-900 mb-8 whitespace-pre-wrap leading-relaxed">
              {content.letterText.replace("[Your Name]", siteConfig.names.sender)}
            </div>
            
            <button
              onClick={() => {
                playSound('transition');
                setPage(6);
              }}
              className="mt-12 px-8 py-3 bg-red-900 hover:bg-red-800 text-[#fdfbf7] rounded-sm font-sans tracking-widest transition-colors shadow-lg cursor-pointer"
            >
              See Our Memories →
            </button>
          </motion.div>
        </div>

        {/* Right Side: Photo Gallery (Polaroid style) */}
        <div className="flex md:flex-1 relative bg-zinc-800 items-center justify-center overflow-hidden min-h-[80vh] md:min-h-0">
          <motion.div
            initial={{ rotate: -5, x: 50, opacity: 0 }}
            animate={{ rotate: -5, x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-1/4 left-1/4 bg-white p-4 pb-16 shadow-xl"
          >
            <div className="w-48 h-48 bg-zinc-200">
               <img src="/memories/photo1.jpg" alt="Memory" className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=400'} />
            </div>
          </motion.div>

          <motion.div
            initial={{ rotate: 10, x: -50, opacity: 0 }}
            animate={{ rotate: 10, x: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="absolute bottom-1/4 right-1/4 bg-white p-4 pb-16 shadow-xl z-10"
          >
            <div className="w-56 h-56 bg-zinc-200">
              <img src="/memories/photo2.jpg" alt="Memory" className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=400'} />
            </div>
          </motion.div>

          <motion.div
            initial={{ rotate: -2, y: 50, opacity: 0 }}
            animate={{ rotate: -2, y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 pb-16 shadow-2xl z-20"
          >
            <div className="w-64 h-64 bg-zinc-200">
              <img src="/memories/us-letter.jpeg" alt="Memory" className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=400'} />
            </div>
            <p className="text-center mt-4 font-handwriting text-2xl text-black">Us ❤️</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
