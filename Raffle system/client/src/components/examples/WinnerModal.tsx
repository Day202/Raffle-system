import WinnerModal from "../WinnerModal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function WinnerModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Show Winner Modal</Button>
      <WinnerModal
        isOpen={isOpen}
        winnerName="Alice Johnson"
        prizeName="Premium Notebook"
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
