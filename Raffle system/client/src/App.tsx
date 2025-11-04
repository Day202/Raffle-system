import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Dashboard from "@/pages/Dashboard";
import Participants from "@/pages/Participants";
import Prizes from "@/pages/Prizes";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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

function Router() {
  const [participants, setParticipants] = useLocalStorage<Participant[]>('raffle-participants', [
    { id: "1", name: "Alice Johnson", prizeId: null },
    { id: "2", name: "Bob Smith", prizeId: null },
    { id: "3", name: "Charlie Davis", prizeId: null },
    { id: "4", name: "Diana Prince", prizeId: null },
  ]);

  const [prizes, setPrizes] = useLocalStorage<Prize[]>('raffle-prizes', [
    { id: "p1", name: "Premium Ballpen", totalQuantity: 5, wonQuantity: 0 },
    { id: "p2", name: "Notebook Set", totalQuantity: 3, wonQuantity: 0 },
  ]);

  const [winners, setWinners] = useLocalStorage<Winner[]>('raffle-winners', []);

  const handleAddParticipant = (name: string) => {
    const isDuplicate = participants.some(p => p.name.toLowerCase() === name.toLowerCase());
    if (isDuplicate) {
      console.log("Participant already exists");
      return;
    }
    setParticipants([...participants, {
      id: Date.now().toString(),
      name,
      prizeId: null,
    }]);
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const handleAddPrize = () => {
    setPrizes([...prizes, {
      id: `p${Date.now()}`,
      name: `Prize ${prizes.length + 1}`,
      totalQuantity: 1,
      wonQuantity: 0,
    }]);
  };

  const handleRemovePrize = (id: string) => {
    setPrizes(prizes.filter(p => p.id !== id));
  };

  const handleUpdatePrize = (id: string, updates: Partial<Prize>) => {
    setPrizes(prizes.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleWinnerSelected = (participantName: string, prizeId: string, prizeName: string) => {
    const winner: Winner = {
      id: Date.now().toString(),
      participantName,
      prizeName,
      prizeId,
      timestamp: new Date().toISOString(),
    };
    setWinners([winner, ...winners]);
  };

  return (
    <Switch>
      <Route path="/">
        <Dashboard
          participants={participants}
          prizes={prizes}
          winners={winners}
          onWinnerSelected={handleWinnerSelected}
          onRemoveParticipant={handleRemoveParticipant}
          onUpdatePrize={handleUpdatePrize}
        />
      </Route>
      <Route path="/participants">
        <Participants
          participants={participants}
          prizes={prizes}
          onAddParticipant={handleAddParticipant}
          onRemoveParticipant={handleRemoveParticipant}
        />
      </Route>
      <Route path="/prizes">
        <Prizes
          prizes={prizes}
          onAddPrize={handleAddPrize}
          onRemovePrize={handleRemovePrize}
          onUpdatePrize={handleUpdatePrize}
        />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-4 border-b border-border">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
              </header>
              <main className="flex-1 overflow-auto p-6">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
