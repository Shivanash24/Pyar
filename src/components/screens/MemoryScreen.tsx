"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { X } from "lucide-react";
import { playSound } from "@/utils/audio";

const memoryImages = [
  "/memories/memory1.jpeg",
  "/memories/memory2.jpeg",
  "/memories/memory3.jpeg",
  "/memories/memory4.jpeg",
  "/memories/cover.jpeg",
  "/memories/us-letter.jpeg",
];

const defaultImages = [
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=600",
];

export default function MemoryScreen() {
  const { setPage, customMemories } = useAppStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const displayImages = customMemories.length > 0 ? customMemories : memoryImages;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full overflow-y-auto bg-zinc-950 text-white p-8 md:p-16 relative custom-scrollbar"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl md:text-6xl font-serif text-rose-200">Our Memories</h2>
          <button 
            onClick={() => {
              playSound('transition');
              setPage(7);
            }}
            className="px-6 py-2 bg-rose-600 hover:bg-rose-500 rounded-full font-sans transition-colors cursor-pointer"
          >
            Final Surprise →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {displayImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="cursor-zoom-in overflow-hidden rounded-lg group aspect-[3/4] bg-zinc-800 shadow-xl border border-zinc-700/50"
              onClick={() => setSelectedImg(src)}
            >
              <img 
                src={src} 
                alt="Memory" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                onError={(e) => {
                  e.currentTarget.src = defaultImages[idx];
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-8 right-8 text-white hover:text-rose-400 transition-colors">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImg}
              className="max-w-full max-h-[90vh] object-contain rounded-sm"
              onError={(e) => {
                 const idx = displayImages.indexOf(selectedImg);
                 e.currentTarget.src = defaultImages[idx >= 0 ? idx : 0];
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
