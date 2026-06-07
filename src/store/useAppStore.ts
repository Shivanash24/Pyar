import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SITE_CONFIG as DEFAULT_SITE_CONFIG } from '@/config/site';
import { CONTENT as DEFAULT_CONTENT } from '@/config/content';

interface AppState {
  isUnlocked: boolean;
  unlock: () => void;
  currentPage: number;
  setPage: (page: number) => void;
  audioStarted: boolean;
  startAudio: () => void;
  siteConfig: typeof DEFAULT_SITE_CONFIG;
  updateSiteConfig: (config: typeof DEFAULT_SITE_CONFIG) => void;
  content: typeof DEFAULT_CONTENT;
  updateContent: (content: typeof DEFAULT_CONTENT) => void;
  customMemories: string[];
  setCustomMemories: (memories: string[]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isUnlocked: false,
      unlock: () => set({ isUnlocked: true }),
      currentPage: 1,
      setPage: (page) => set({ currentPage: page }),
      audioStarted: false,
      startAudio: () => set({ audioStarted: true }),
      siteConfig: DEFAULT_SITE_CONFIG,
      updateSiteConfig: (config) => set({ siteConfig: config }),
      content: DEFAULT_CONTENT,
      updateContent: (content) => set({ content: content }),
      customMemories: [],
      setCustomMemories: (memories) => set({ customMemories: memories }),
    }),
    {
      name: 'proposal-storage',
      partialize: (state) => ({ 
        siteConfig: state.siteConfig, 
        content: state.content,
        customMemories: state.customMemories 
      }), // Only save these
    }
  )
);
