"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { Canvas } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { playSound } from "@/utils/audio";

function Background3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} className="absolute inset-0 z-0">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#FFB6C1" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {Array.from({ length: 30 }).map((_, i) => (
        <Float
          key={i}
          speed={1.5}
          rotationIntensity={2}
          floatIntensity={2}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5 - 2,
          ]}
        >
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#FFB6C1" emissive="#FFB6C1" emissiveIntensity={0.5} />
          </mesh>
        </Float>
      ))}
    </Canvas>
  );
}

export default function EnvelopeScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const { setPage } = useAppStore();

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    playSound('envelope');
    setTimeout(() => {
      setPage(4);
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full h-full relative bg-gradient-to-b from-[#1a0000] to-black overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0 opacity-50">
         <Background3D />
      </div>
      
      <div className="z-10 flex flex-col items-center">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative cursor-pointer perspective-1000"
          onClick={handleOpen}
        >
          <div className="w-64 md:w-96 h-48 md:h-64 bg-red-900 rounded-sm relative shadow-2xl border border-red-800/50">
            <motion.div
              className="absolute top-0 left-0 w-full h-full origin-top z-30 pointer-events-none"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpen ? 180 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ backfaceVisibility: "hidden" }}
            >
              <div 
                className="w-0 h-0 border-l-[128px] md:border-l-[192px] border-r-[128px] md:border-r-[192px] border-t-[100px] md:border-t-[140px] border-l-transparent border-r-transparent border-t-red-800 drop-shadow-md"
              />
            </motion.div>
            
            <motion.div
              className="absolute top-4 left-4 right-4 bg-[#fdfbf7] border border-[#e8e4d9] rounded-sm shadow-inner z-20 flex items-center justify-center p-4"
              initial={{ y: 0, opacity: 0 }}
              animate={isOpen ? { y: -80, opacity: 1 } : { y: 0, opacity: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              style={{ height: '80%' }}
            >
              <p className="font-handwriting text-red-900 text-3xl md:text-4xl text-center">Open My Heart ❤️</p>
            </motion.div>

            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[128px] md:border-l-[192px] border-r-[128px] md:border-r-[192px] border-b-[100px] md:border-b-[140px] border-l-transparent border-r-transparent border-b-red-950 z-40 pointer-events-none drop-shadow-2xl" />
          </div>
        </motion.div>

        {!isOpen && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-rose-200 font-serif text-xl tracking-widest text-center"
          >
            Click to open
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
