import ParticipantList from "../ParticipantList";
import { useState } from "react";

export default function ParticipantListExample() {
  const [participants, setParticipants] = useState([
    { id: "1", name: "Alice Johnson", prizeId: "p1" },
    { id: "2", name: "Bob Smith", prizeId: null },
    { id: "3", name: "Charlie Davis", prizeId: "p2" },
  ]);

  const prizes = [
    { id: "p1", name: "Ballpen" },
    { id: "p2", name: "Notebook" },
  ];

  const handleAdd = (name: string) => {
    setParticipants([...participants, { 
      id: Date.now().toString(), 
      name, 
      prizeId: null 
    }]);
  };

  const handleRemove = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Participants</h2>
      <ParticipantList
        participants={participants}
        prizes={prizes}
        onAddParticipant={handleAdd}
        onRemoveParticipant={handleRemove}
      />
    </div>
  );
}
