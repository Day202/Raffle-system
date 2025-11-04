import SpinningWheel from "../SpinningWheel";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SpinningWheelExample() {
  const [isSpinning, setIsSpinning] = useState(false);
  const items = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"];

  const handleSpin = () => {
    setIsSpinning(true);
  };

  const handleSpinComplete = (winner: string) => {
    console.log("Winner:", winner);
    setIsSpinning(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <SpinningWheel 
        items={items} 
        onSpinComplete={handleSpinComplete}
        isSpinning={isSpinning}
      />
      <Button 
        onClick={handleSpin} 
        disabled={isSpinning}
        size="lg"
        className="w-full"
        data-testid="button-spin"
      >
        {isSpinning ? "Spinning..." : "SPIN"}
      </Button>
    </div>
  );
}
