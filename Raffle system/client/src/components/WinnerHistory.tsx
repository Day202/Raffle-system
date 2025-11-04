import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Winner {
  id: string;
  participantName: string;
  prizeName: string;
  timestamp: string;
}

interface WinnerHistoryProps {
  winners: Winner[];
}

export default function WinnerHistory({ winners }: WinnerHistoryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Winner History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          {winners.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No winners yet
            </div>
          ) : (
            <div className="space-y-2">
              {winners.map((winner) => (
                <div
                  key={winner.id}
                  className="flex items-center justify-between p-2 rounded-md hover-elevate"
                  data-testid={`winner-${winner.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{winner.participantName}</div>
                    <div className="text-sm text-muted-foreground truncate">{winner.prizeName}</div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0 ml-2">
                    {new Date(winner.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
