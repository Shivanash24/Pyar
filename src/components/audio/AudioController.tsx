"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";

export default function AudioController() {
  const { audioStarted } = useAppStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioStarted && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e) => console.error("Audio play failed:", e));
    }
  }, [audioStarted]);

  return (
    <audio ref={audioRef} loop src="/audio/background.webm" />
  );
}
