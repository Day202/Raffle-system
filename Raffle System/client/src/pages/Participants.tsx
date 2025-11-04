import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ParticipantList from "@/components/ParticipantList";

interface Participant {
  id: string;
  name: string;
  prizeId: string | null;
}

interface Prize {
  id: string;
  name: string;
}

interface ParticipantsProps {
  participants: Participant[];
  prizes: Prize[];
  onAddParticipant: (name: string) => void;
  onRemoveParticipant: (id: string) => void;
}

export default function Participants({
  participants,
  prizes,
  onAddParticipant,
  onRemoveParticipant,
}: ParticipantsProps) {
  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Manage Participants</CardTitle>
        </CardHeader>
        <CardContent>
          <ParticipantList
            participants={participants}
            prizes={prizes}
            onAddParticipant={onAddParticipant}
            onRemoveParticipant={onRemoveParticipant}
          />
        </CardContent>
      </Card>
    </div>
  );
}
