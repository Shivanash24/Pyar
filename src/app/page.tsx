"use client";

import { useAppStore } from "@/store/useAppStore";
import { AnimatePresence } from "framer-motion";
import PasscodeScreen from "@/components/screens/PasscodeScreen";
import LoadingScreen from "@/components/screens/LoadingScreen";
import EnvelopeScreen from "@/components/screens/EnvelopeScreen";
import ProposalScreen from "@/components/screens/ProposalScreen";
import LetterScreen from "@/components/screens/LetterScreen";
import MemoryScreen from "@/components/screens/MemoryScreen";
import FinalScreen from "@/components/screens/FinalScreen";
import AudioController from "@/components/audio/AudioController";

export default function Home() {
  const { currentPage } = useAppStore();

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black text-white">
      <AudioController />
      
      <AnimatePresence mode="wait">
        {currentPage === 1 && <PasscodeScreen key="page1" />}
        {currentPage === 2 && <LoadingScreen key="page2" />}
        {currentPage === 3 && <EnvelopeScreen key="page3" />}
        {currentPage === 4 && <ProposalScreen key="page4" />}
        {currentPage === 5 && <LetterScreen key="page5" />}
        {currentPage === 6 && <MemoryScreen key="page6" />}
        {currentPage === 7 && <FinalScreen key="page7" />}
      </AnimatePresence>
    </main>
  );
}
