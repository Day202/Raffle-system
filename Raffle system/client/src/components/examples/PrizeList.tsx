import PrizeList from "../PrizeList";
import { useState } from "react";

export default function PrizeListExample() {
  const [prizes, setPrizes] = useState([
    { id: "1", name: "Ballpen", totalQuantity: 5, wonQuantity: 2 },
    { id: "2", name: "Notebook", totalQuantity: 3, wonQuantity: 3 },
    { id: "3", name: "USB Drive", totalQuantity: 10, wonQuantity: 0 },
  ]);

  const handleAdd = () => {
    setPrizes([...prizes, {
      id: Date.now().toString(),
      name: `Prize ${prizes.length + 1}`,
      totalQuantity: 1,
      wonQuantity: 0,
    }]);
  };

  const handleRemove = (id: string) => {
    setPrizes(prizes.filter(p => p.id !== id));
  };

  const handleUpdate = (id: string, updates: any) => {
    setPrizes(prizes.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Prizes</h2>
      <PrizeList
        prizes={prizes}
        onAddPrize={handleAdd}
        onRemovePrize={handleRemove}
        onUpdatePrize={handleUpdate}
      />
    </div>
  );
}
