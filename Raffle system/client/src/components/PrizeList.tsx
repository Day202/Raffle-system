import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Prize {
  id: string;
  name: string;
  totalQuantity: number;
  wonQuantity: number;
}

interface PrizeListProps {
  prizes: Prize[];
  onAddPrize: () => void;
  onRemovePrize: (id: string) => void;
  onUpdatePrize: (id: string, updates: Partial<Prize>) => void;
}

export default function PrizeList({ 
  prizes, 
  onAddPrize, 
  onRemovePrize,
  onUpdatePrize 
}: PrizeListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleNameChange = (id: string, name: string) => {
    onUpdatePrize(id, { name });
  };

  const handleQuantityChange = (id: string, totalQuantity: number) => {
    if (totalQuantity >= 1) {
      onUpdatePrize(id, { totalQuantity });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Button 
        onClick={onAddPrize}
        className="w-full"
        data-testid="button-add-prize"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Prize
      </Button>

      <div className="space-y-3">
        {prizes.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground border border-border rounded-md">
            No prizes yet. Add one above!
          </div>
        ) : (
          prizes.map((prize) => (
            <Card key={prize.id} data-testid={`prize-${prize.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <Input
                      type="text"
                      value={prize.name}
                      onChange={(e) => handleNameChange(prize.id, e.target.value)}
                      onFocus={() => setEditingId(prize.id)}
                      onBlur={() => setEditingId(null)}
                      className="text-lg font-medium"
                      data-testid={`input-prize-name-${prize.id}`}
                    />
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Quantity:</label>
                        <Input
                          type="number"
                          min="1"
                          value={prize.totalQuantity}
                          onChange={(e) => handleQuantityChange(prize.id, parseInt(e.target.value) || 1)}
                          className="w-20 text-center"
                          data-testid={`input-prize-quantity-${prize.id}`}
                        />
                      </div>
                      
                      <div className="text-sm font-mono">
                        Won: <span className="font-semibold">{prize.wonQuantity}</span> out of <span className="font-semibold">{prize.totalQuantity}</span>
                      </div>
                    </div>

                    {prize.wonQuantity >= prize.totalQuantity && (
                      <div className="text-sm text-destructive font-medium">
                        All prizes claimed!
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemovePrize(prize.id)}
                    data-testid={`button-remove-prize-${prize.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
