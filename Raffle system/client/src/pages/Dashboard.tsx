import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SpinningWheel from "@/components/SpinningWheel";
import WinnerModal from "@/components/WinnerModal";
import WinnerHistory from "@/components/WinnerHistory";

interface Participant {
  id: string;
  name: string;
  prizeId: string | null;
}

interface Prize {
  id: string;
  name: string;
  totalQuantity: number;
  wonQuantity: number;
}

interface Winner {
  id: string;
  participantName: string;
  prizeName: string;
  prizeId: string;
  timestamp: string;
}

interface DashboardProps {
  participants: Participant[];
  prizes: Prize[];
  winners: Winner[];
  onWinnerSelected: (participantName: string, prizeId: string, prizeName: string) => void;
  onRemoveParticipant: (id: string) => void;
  onUpdatePrize: (id: string, updates: Partial<Prize>) => void;
}

export default function Dashboard({
  participants,
  prizes,
  winners,
  onWinnerSelected,
  onRemoveParticipant,
  onUpdatePrize,
}: DashboardProps) {
  const [selectedPrizeId, setSelectedPrizeId] = useState<string>("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [currentWinner, setCurrentWinner] = useState<{ name: string; prize: string } | null>(null);

  const availablePrizes = prizes.filter(p => p.wonQuantity < p.totalQuantity);
  const eligibleParticipants = participants.filter(p => !p.prizeId);

  const handleSpin = () => {
    if (!selectedPrizeId || eligibleParticipants.length === 0) return;
    setIsSpinning(true);
  };

  const handleSpinComplete = (winnerName: string) => {
    const prize = prizes.find(p => p.id === selectedPrizeId);
    if (!prize) return;

    setCurrentWinner({ name: winnerName, prize: prize.name });
    setIsSpinning(false);
    setShowWinnerModal(true);

    onWinnerSelected(winnerName, selectedPrizeId, prize.name);
    
    const participant = participants.find(p => p.name === winnerName);
    if (participant) {
      onRemoveParticipant(participant.id);
    }
    
    onUpdatePrize(selectedPrizeId, { wonQuantity: prize.wonQuantity + 1 });
  };

  const canSpin = selectedPrizeId && eligibleParticipants.length > 0 && !isSpinning;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Prize</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedPrizeId} onValueChange={setSelectedPrizeId}>
              <SelectTrigger data-testid="select-prize">
                <SelectValue placeholder="Choose a prize" />
              </SelectTrigger>
              <SelectContent>
                {availablePrizes.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground">No prizes available</div>
                ) : (
                  availablePrizes.map((prize) => (
                    <SelectItem key={prize.id} value={prize.id}>
                      {prize.name} ({prize.wonQuantity}/{prize.totalQuantity})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            <Button
              onClick={handleSpin}
              disabled={!canSpin}
              size="lg"
              className="w-full text-xl h-16"
              data-testid="button-spin"
            >
              {isSpinning ? "Spinning..." : "SPIN THE WHEEL"}
            </Button>

            <div className="text-sm text-muted-foreground text-center">
              {eligibleParticipants.length} participant(s) eligible
            </div>
          </CardContent>
        </Card>

        <WinnerHistory winners={winners} />
      </div>

      <div className="flex items-center justify-center">
        {eligibleParticipants.length === 0 ? (
          <Card className="w-full">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                No participants available. Add participants in the Participants tab.
              </p>
            </CardContent>
          </Card>
        ) : (
          <SpinningWheel
            items={eligibleParticipants.map(p => p.name)}
            onSpinComplete={handleSpinComplete}
            isSpinning={isSpinning}
          />
        )}
      </div>

      {currentWinner && (
        <WinnerModal
          isOpen={showWinnerModal}
          winnerName={currentWinner.name}
          prizeName={currentWinner.prize}
          onClose={() => setShowWinnerModal(false)}
        />
      )}
    </div>
  );
}
