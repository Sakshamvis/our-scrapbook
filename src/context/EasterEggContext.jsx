/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const EasterEggContext = createContext(null);

const COMPLIMENTS = [
  "Your smile makes my coldest days warm. 🌸",
  "I love the quiet way you care for everyone around you.",
  "You are my favorite place to be when my mind is busy.",
  "You have the most beautiful soul I have ever known.",
  "Every little thing you do brings joy to my life. ❤️"
];

const MEMORIES = [
  "Remember when we laughed until our stomachs hurt over nothing? 🦋",
  "That rainy day when we shared one small umbrella...",
  "Our late-night walk, talking about everything under the stars.",
  "The quiet comfort of just sitting in silence together.",
  "When you held my hand for the first time. My heart skipped a beat."
];

export function EasterEggProvider({ children }) {
  const [isNightMode, setIsNightMode] = useState(false);
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);
  const [activeNotification, setActiveNotification] = useState(null);
  const [vinylClicks, setVinylClicks] = useState(0);
  const [starSequence, setStarSequence] = useState([]);
  const [isPolaroidUnlocked, setIsPolaroidUnlocked] = useState(false);

  // Auto-clear notification after 4.5 seconds
  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  const showNotification = (message, title = "A Secret Note...") => {
    setActiveNotification({ message, title });
  };

  const triggerCompliment = () => {
    const idx = Math.floor(Math.random() * COMPLIMENTS.length);
    showNotification(COMPLIMENTS[idx], "For You 🌸");
  };

  const triggerMemory = () => {
    const idx = Math.floor(Math.random() * MEMORIES.length);
    showNotification(MEMORIES[idx], "Sweet Memory 🦋");
  };

  const triggerTeddy = () => {
    showNotification("I miss you more than words can say... ❤️", "Teddy Bear 🧸");
  };

  const toggleNightMode = () => {
    setIsNightMode(prev => {
      const next = !prev;
      showNotification(
        next ? "A starry night falls over our memories... 🌙" : "The warm morning light returns... ☀️",
        "Moon Toggle"
      );
      return next;
    });
  };

  const triggerDateCounter = () => {
    const startDate = new Date('2024-12-15');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    showNotification(
      `We have spent ${diffDays} beautiful days together since our journey began! 📅`,
      "Our Days"
    );
  };

  const triggerWaxMessage = () => {
    showNotification("This seal binds my promise to love you forever. ❤️", "Wax Seal Message");
  };

  const clickVinyl = () => {
    setVinylClicks(prev => {
      const next = prev + 1;
      if (next >= 5) {
        showNotification("Our song will always remind me of you. 🎵", "Melody of Us");
        return 0; // reset
      }
      return next;
    });
  };

  const triggerPolaroidDouble = () => {
    setIsPolaroidUnlocked(true);
    showNotification("A hidden photo slot has appeared! Double-click again to close it. 📷", "Secret Polaroid Slot");
  };

  const togglePolaroidUnlock = () => {
    setIsPolaroidUnlocked(prev => !prev);
  };

  const clickStar = (starId) => {
    setStarSequence(prev => {
      // Correct sequence order: Star 1 -> 2 -> 3 -> 4 -> 5
      const next = [...prev, starId];
      
      const expectedId = next.length;
      if (starId !== expectedId) {
        return [starId];
      }

      if (next.length === 5) {
        setIsSecretUnlocked(true);
        showNotification("You unlocked the Secret Page! Turn to the very back of the book... ⭐", "Secret Memories Unlocked");
        return [];
      }

      return next;
    });
  };

  const value = {
    isNightMode,
    isSecretUnlocked,
    activeNotification,
    isPolaroidUnlocked,
    vinylClicks,
    starSequence,
    triggerCompliment,
    triggerMemory,
    triggerTeddy,
    toggleNightMode,
    triggerDateCounter,
    triggerWaxMessage,
    clickVinyl,
    clickStar,
    triggerPolaroidDouble,
    togglePolaroidUnlock,
    showNotification,
    setActiveNotification
  };

  return (
    <EasterEggContext.Provider value={value}>
      {children}
    </EasterEggContext.Provider>
  );
}

export function useEasterEggs() {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error('useEasterEggs must be used inside an EasterEggProvider');
  }
  return context;
}
