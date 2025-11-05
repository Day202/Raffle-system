import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import tickSound from "@/assets/sounds/tick.mp3";
import winSound from "@/assets/sounds/win.mp3";

interface Props {
  items: string[];
  onSpinComplete?: (winner: string) => void;
  isSpinning: boolean;
}

export default function SpinningWheel({ items, onSpinComplete, isSpinning }: Props) {
  const [localList, setLocalList] = useState<string[]>(items);
  const [y, setY] = useState(0);
  const audioTick = useRef<HTMLAudioElement | null>(null);
  const audioWin = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setLocalList(items);
  }, [items]);

  useEffect(() => {
    if (!audioTick.current) audioTick.current = new Audio(tickSound);
    if (!audioWin.current) audioWin.current = new Audio(winSound);
  }, []);

  useEffect(() => {
    if (!isSpinning) return;
    const repeats = 20;
    const list = Array.from({ length: repeats }).flatMap(() => items);
    setLocalList(list);

    const winnerIndex = Math.floor(Math.random() * items.length);
    const middleOffset = Math.floor(list.length / 2) - (list.length % items.length);
    const targetIndex = middleOffset + winnerIndex;

    const itemHeight = 56;
    const targetY = -targetIndex * itemHeight;

    const duration = 4200;
    const start = performance.now();
    const startY = 0;

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    let raf = 0;
    function step(now: number) {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = startY + (targetY - startY) * eased;
      setY(current);

      if (t < 1) {
        raf = requestAnimationFrame(step);

        // Tick sound playback
        if (audioTick.current && audioTick.current.paused) {
          audioTick.current.currentTime = 0;
          audioTick.current.play();
        }
      } else {
        const winner = items[winnerIndex];

        // Winner sound
        if (audioWin.current) audioWin.current.play();

        setTimeout(() => {
          onSpinComplete?.(winner);
        }, 300);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isSpinning]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden h-56 border rounded bg-white">
        <motion.div style={{ transform: `translateY(${y}px)` }} className="will-change-transform">
          {localList.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center justify-center h-14 border-b text-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pointer Arrow */}
      <div className="absolute inset-x-0 top-0 h-14 pointer-events-none flex items-center justify-center">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-purple-600"></div>
      </div>
    </div>
  );
}
