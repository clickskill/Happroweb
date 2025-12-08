import React from 'react';
import { Badge } from './badge';
import { Clock, CheckCircle, Truck, Wrench, XCircle, RefreshCw, DollarSign } from 'lucide-react';

export type StatusType = 
  | 'pending' 
  | 'accepted' 
  | 'on-the-way' 
  | 'in-progress' 
  | 'completed' 
  | 'cancelled' 
  | 'refunded' 
  | 'paid'
  | 'open'
  | 'resolved'
  | 'approved'
  | 'rejected';

interface StatusChipProps {
  status?: StatusType | string | null;
  className?: string;
}

const statusConfig: Record<string, { 
  label: string; 
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  icon: React.ReactNode;
  color: string;
}> = {
  'pending': {
    label: 'Pending',
    variant: 'outline',
    icon: <Clock className="h-3 w-3" />,
    color: 'text-warning'
  },
  'accepted': {
    label: 'Accepted',
    variant: 'secondary',
    icon: <CheckCircle className="h-3 w-3" />,
    color: 'text-info'
  },
  'on-the-way': {
    label: 'On the Way',
    variant: 'secondary',
    icon: <Truck className="h-3 w-3" />,
    color: 'text-info'
  },
  'in-progress': {
    label: 'In Progress',
    variant: 'default',
    icon: <Wrench className="h-3 w-3" />,
    color: 'text-primary'
  },
  'completed': {
    label: 'Completed',
    variant: 'default',
    icon: <CheckCircle className="h-3 w-3" />,
    color: 'text-success'
  },
  'cancelled': {
    label: 'Cancelled',
    variant: 'destructive',
    icon: <XCircle className="h-3 w-3" />,
    color: 'text-danger'
  },
  'refunded': {
    label: 'Refunded',
    variant: 'outline',
    icon: <RefreshCw className="h-3 w-3" />,
    color: 'text-warning'
  },
  'paid': {
    label: 'Paid',
    variant: 'default',
    icon: <DollarSign className="h-3 w-3" />,
    color: 'text-success'
  },
  'open': {
    label: 'Open',
    variant: 'outline',
    icon: <Clock className="h-3 w-3" />,
    color: 'text-warning'
  },
  'resolved': {
    label: 'Resolved',
    variant: 'default',
    icon: <CheckCircle className="h-3 w-3" />,
    color: 'text-success'
  },
  'approved': {
    label: 'Approved',
    variant: 'default',
    icon: <CheckCircle className="h-3 w-3" />,
    color: 'text-success'
  },
  'rejected': {
    label: 'Rejected',
    variant: 'destructive',
    icon: <XCircle className="h-3 w-3" />,
    color: 'text-danger'
  }
};

export function StatusChip({ status, className = '' }: StatusChipProps) {
  // Return fallback for null, undefined, or empty status
  if (!status) {
    return (
      <Badge variant="outline" className={`gap-1 ${className}`}>
        <span className="text-muted-foreground">
          <Clock className="h-3 w-3" />
        </span>
        Unknown
      </Badge>
    );
  }

  // Get the config safely
  const statusKey = String(status);
  const config = statusConfig[statusKey];
  
  // Return fallback if config not found
  if (!config) {
    return (
      <Badge variant="outline" className={`gap-1 ${className}`}>
        <span className="text-muted-foreground">
          <Clock className="h-3 w-3" />
        </span>
        {statusKey}
      </Badge>
    );
  }
  
  // Render the status chip
  return (
    <Badge variant={config.variant} className={`gap-1 ${className}`}>
      <span className={config.color}>{config.icon}</span>
      {config.label}
    </Badge>
  );
}