import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  items: string[]
  onSpinComplete?: (winner: string) => void
  isSpinning: boolean
}

export default function SpinningWheel({ items, onSpinComplete, isSpinning }: Props){
  const [localList, setLocalList] = useState<string[]>(items)
  const [y, setY] = useState(0)
  const reelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setLocalList(items)
  }, [items])

  useEffect(() => {
    if (!isSpinning) return
    // Create repeated list for smooth scrolling
    const repeats = 20
    const list = Array.from({length: repeats}).flatMap(()=>items)
    setLocalList(list)

    // pick winner among original items
    const winnerIndex = Math.floor(Math.random() * items.length)
    // choose an index in the repeated list that aligns to winner near the middle
    const middleOffset = Math.floor(list.length/2) - (list.length % items.length)
    const targetIndex = middleOffset + winnerIndex

    const itemHeight = 56 // matches CSS h-14 (14*4=56px tailwind)
    const targetY = -targetIndex * itemHeight

    // animate using requestAnimationFrame (ease out)
    const duration = 4200
    const start = performance.now()
    const startY = 0
    function easeOutCubic(t:number){ return 1 - Math.pow(1 - t, 3) }
    let raf = 0
    function step(now:number){
      const elapsed = now - start
      const t = Math.min(1, elapsed / duration)
      const eased = easeOutCubic(t)
      const current = startY + (targetY - startY) * eased
      setY(current)
      if (t < 1){
        raf = requestAnimationFrame(step)
      } else {
        // finish
        const winner = items[winnerIndex]
        onSpinComplete?.(winner)
        // Stop the wheel where it is — do NOT reset list here
        setTimeout(() => {
        onSpinComplete?.(winner)
        }, 100)
      }
    }
    raf = requestAnimationFrame(step)
    return ()=> cancelAnimationFrame(raf)
  }, [isSpinning]) // eslint-disable-line

  return (
    <div className="relative w-full">
      <div className="overflow-hidden h-56 border rounded bg-white">
        <motion.div
          ref={reelRef}
          style={{ transform: `translateY(${y}px)` }}
          className="will-change-transform"
        >
          {localList.map((name, i)=>(
            <div key={`${name}-${i}`} className="flex items-center justify-center h-14 border-b text-lg font-medium">
              {name}
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute inset-x-0 top-0 h-14 pointer-events-none flex items-center justify-center">
        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-red-600"></div>
      </div>
    </div>
  )
}
