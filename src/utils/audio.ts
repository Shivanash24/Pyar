export const playSound = (sound: 'transition' | 'envelope' | 'click' | 'celebration') => {
  if (typeof window !== 'undefined') {
    try {
      const audio = new Audio(`/audio/${sound}.mp3`);
      audio.volume = 0.6;
      audio.play().catch(() => {
        // Silently fail if file doesn't exist
      });
    } catch (e) {
      // Ignore
    }
  }
};
