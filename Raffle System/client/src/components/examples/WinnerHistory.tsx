import WinnerHistory from "../WinnerHistory";

export default function WinnerHistoryExample() {
  const winners = [
    {
      id: "1",
      participantName: "Alice Johnson",
      prizeName: "Premium Notebook",
      timestamp: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: "2",
      participantName: "Bob Smith",
      prizeName: "Ballpen Set",
      timestamp: new Date(Date.now() - 600000).toISOString(),
    },
    {
      id: "3",
      participantName: "Charlie Davis",
      prizeName: "USB Drive",
      timestamp: new Date(Date.now() - 900000).toISOString(),
    },
  ];

  return (
    <div className="p-6 max-w-md">
      <WinnerHistory winners={winners} />
    </div>
  );
}
