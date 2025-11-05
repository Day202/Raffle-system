import React, { useState } from 'react'
import SpinningWheel from '../components/SpinningWheel'

const SAMPLE = ['Alice','Bob','Charlie','Diana','Eve','Frank','Grace','Hank']

export default function WheelPage(){
  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)

  const handleSpin = () => {
    setWinner(null)
    setIsSpinning(true)
  }

  const onComplete = (w: string) => {
    setWinner(w)
    setIsSpinning(false)
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Spin the Wheel</h1>
      <div className="max-w-md">
        <SpinningWheel items={SAMPLE} isSpinning={isSpinning} onSpinComplete={onComplete} />
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={handleSpin} disabled={isSpinning}>Spin</button>
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={()=>{ setWinner(null) }}>Reset</button>
        </div>
        {winner && <div className="mt-4 p-3 bg-yellow-100 rounded">Winner: <strong>{winner}</strong></div>}
      </div>
    </div>
  )
}
