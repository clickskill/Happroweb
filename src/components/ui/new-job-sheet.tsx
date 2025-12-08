import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './sheet';
import { Button } from './button';
import { Badge } from './badge';
import { Separator } from './separator';
import { MapPin, Clock, IndianRupee, User, CheckCircle, XCircle } from 'lucide-react';

interface NewJobSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
  job?: {
    id: string;
    service: string;
    customer: string;
    address: string;
    pinCode: string;
    datetime: string;
    amount: number;
    distance: string;
  };
}

export function NewJobSheet({ 
  isOpen, 
  onClose, 
  onAccept, 
  onDecline,
  job 
}: NewJobSheetProps) {
  if (!job) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="max-w-sm mx-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>New Job Available</span>
            <Badge variant="default" className="bg-success">Active</Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 py-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
            <p>{job.id}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-1">Service</p>
            <p>{job.service}</p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Customer</p>
                <p className="text-sm">{job.customer}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-sm">{job.address}</p>
                <p className="text-sm text-muted-foreground">PIN: {job.pinCode}</p>
                <p className="text-xs text-muted-foreground mt-1">{job.distance} away</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Schedule</p>
                <p className="text-sm">{job.datetime}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <IndianRupee className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Service Amount</p>
                <p className="text-sm">₹{job.amount}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button variant="outline" onClick={onDecline} className="w-full">
              <XCircle className="h-4 w-4 mr-2" />
              Decline
            </Button>
            <Button onClick={onAccept} className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Accept Job
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}