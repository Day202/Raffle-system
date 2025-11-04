import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface WinnerModalProps {
  isOpen: boolean;
  winnerName: string;
  prizeName: string;
  onClose: () => void;
}

export default function WinnerModal({ isOpen, winnerName, prizeName, onClose }: WinnerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-card rounded-lg p-8 w-96 text-center border border-card-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-2">Congratulations!</h3>
            <p className="text-xl font-semibold text-primary mb-2">{winnerName}</p>
            <p className="text-base text-muted-foreground mb-6">
              Won: <span className="font-medium text-foreground">{prizeName}</span>
            </p>
            <Button
              onClick={onClose}
              className="w-full"
              size="lg"
              data-testid="button-modal-close"
            >
              OK
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
