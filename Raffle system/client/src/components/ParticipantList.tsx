import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, UserPlus } from "lucide-react";
import { useState } from "react";

interface Participant {
  id: string;
  name: string;
  prizeId: string | null;
}

interface Prize {
  id: string;
  name: string;
}

interface ParticipantListProps {
  participants: Participant[];
  prizes: Prize[];
  onAddParticipant: (name: string) => void;
  onRemoveParticipant: (id: string) => void;
}

export default function ParticipantList({ 
  participants, 
  prizes,
  onAddParticipant, 
  onRemoveParticipant 
}: ParticipantListProps) {
  const [newParticipant, setNewParticipant] = useState("");

  const handleAdd = () => {
    const name = newParticipant.trim();
    if (!name) return;
    onAddParticipant(name);
    setNewParticipant("");
  };

  const getPrizeName = (prizeId: string | null) => {
    if (!prizeId) return null;
    return prizes.find(p => p.id === prizeId)?.name;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Participant name"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-1"
          data-testid="input-participant-name"
        />
        <Button 
          onClick={handleAdd}
          size="icon"
          data-testid="button-add-participant"
        >
          <UserPlus className="w-4 h-4" />
        </Button>
      </div>

      <div className="border border-border rounded-md">
        <div className="max-h-[500px] overflow-auto">
          {participants.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No participants yet. Add some above!
            </div>
          ) : (
            <div className="divide-y divide-border">
              {participants.map((participant) => {
                const prizeName = getPrizeName(participant.prizeId);
                return (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 hover-elevate"
                    data-testid={`participant-${participant.id}`}
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-medium truncate">{participant.name}</span>
                      {prizeName && (
                        <Badge variant="secondary" className="shrink-0">
                          {prizeName}
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveParticipant(participant.id)}
                      data-testid={`button-remove-participant-${participant.id}`}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
