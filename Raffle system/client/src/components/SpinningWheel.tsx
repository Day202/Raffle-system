import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpinningWheelProps {
  items: string[];
  onSpinComplete?: (winner: string) => void;
  isSpinning: boolean;
}

export default function SpinningWheel({ items, onSpinComplete, isSpinning }: SpinningWheelProps) {
  const [y, setY] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [localList, setLocalList] = useState<string[]>([]);
  const reelRef = useRef<HTMLDivElement>(null);

  // Sync localList with items whenever items change
  useEffect(() => {
    if (items.length === 0) {
      setLocalList([]);
    } else if (!isSpinning) {
      // Keep looped list for visual continuity
      const loopedList = Array.from({ length: 8 }).flatMap(() => items);
      setLocalList(loopedList);
      setY(0);
    }
  }, [items, isSpinning]);

  useEffect(() => {
    if (!isSpinning || items.length === 0) return;

    const winnerIndex = Math.floor(Math.random() * items.length);
    const winnerName = items[winnerIndex];

    const repeats = 14;
    const list = Array.from({ length: repeats }).flatMap(() => items);
    setLocalList(list);

    // Find the last occurrence of winner in repeated list
    const occurrences = list
      .map((n, i) => (n === winnerName ? i : -1))
      .filter(i => i !== -1);
    const targetIdx = occurrences[occurrences.length - 1];

    const node = reelRef.current;
    const itemEls = node?.querySelectorAll(".reel-item");
    const itemHeight = itemEls?.[0]?.clientHeight ?? 56;
    const reelHeight = node?.clientHeight ?? 384;
    const highlightOffset = Math.floor(reelHeight / 2 - itemHeight / 2);
    const finalTranslate = -targetIdx * itemHeight + highlightOffset;

    setY(0);
    setTimeout(() => {
      setY(finalTranslate);
      setAnimKey(k => k + 1);
    }, 20);

    const duration = 4200 + Math.floor(Math.random() * 800);
    setTimeout(() => {
      onSpinComplete?.(winnerName);
    }, duration + 80);
  }, [isSpinning, items, onSpinComplete]);

  return (
    <div className="relative w-full h-96 overflow-hidden bg-card rounded-md border border-card-border">
      {/* Highlight Bar */}
      <div
        className="absolute left-0 right-0 h-14 pointer-events-none z-10"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <div className="mx-auto w-11/12 h-full border-2 border-dashed border-primary/30 rounded-md bg-primary/5"></div>
      </div>

      <motion.div
        ref={reelRef}
        key={animKey}
        initial={{ y: 0 }}
        animate={{ y }}
        transition={{ duration: 4.2, ease: [0.215, 0.61, 0.355, 1] }}
        className="absolute left-0 right-0 top-0 will-change-transform"
      >
        {localList.map((name, i) => (
          <div
            key={`${name}-${i}-${localList.length}`} // updated key to avoid disappearing
            className="reel-item flex items-center justify-center h-14 border-b border-border text-lg font-medium"
          >
            {name}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
