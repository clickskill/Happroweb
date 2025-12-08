import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './dialog';
import { Button } from './button';
import { Input } from './input';
import { IndianRupee, CheckCircle } from 'lucide-react';

interface CODCollectedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  expectedAmount: number;
  bookingId: string;
}

export function CODCollectedModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  expectedAmount,
  bookingId 
}: CODCollectedModalProps) {
  const [collectedAmount, setCollectedAmount] = useState(expectedAmount.toString());

  const handleConfirm = () => {
    const amount = parseFloat(collectedAmount);
    if (!isNaN(amount) && amount > 0) {
      onConfirm(amount);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Confirm Cash Collected
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-sm text-muted-foreground">
            Booking ID: <span className="font-medium text-foreground">{bookingId}</span>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm">Amount Collected</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={collectedAmount}
                onChange={(e) => setCollectedAmount(e.target.value)}
                className="pl-10"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Expected amount: ₹{expectedAmount}
            </p>
          </div>

          <div className="bg-info/10 border border-info/20 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Note:</strong> You're collecting on behalf of Happro. 
              Amount will appear in COD reconciliation.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Confirm Collection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}