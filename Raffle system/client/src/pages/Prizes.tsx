import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PrizeList from "@/components/PrizeList";

interface Prize {
  id: string;
  name: string;
  totalQuantity: number;
  wonQuantity: number;
}

interface PrizesProps {
  prizes: Prize[];
  onAddPrize: () => void;
  onRemovePrize: (id: string) => void;
  onUpdatePrize: (id: string, updates: Partial<Prize>) => void;
}

export default function Prizes({
  prizes,
  onAddPrize,
  onRemovePrize,
  onUpdatePrize,
}: PrizesProps) {
  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Manage Prizes</CardTitle>
        </CardHeader>
        <CardContent>
          <PrizeList
            prizes={prizes}
            onAddPrize={onAddPrize}
            onRemovePrize={onRemovePrize}
            onUpdatePrize={onUpdatePrize}
          />
        </CardContent>
      </Card>
    </div>
  );
}
