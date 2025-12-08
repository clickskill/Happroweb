import React from 'react';
import { Card } from './card';
import { Badge } from './badge';
import { Clock, Percent } from 'lucide-react';
import { Button } from './button';

interface PromoCardProps {
  title: string;
  description: string;
  discount: string;
  validTill: string;
  code?: string;
  onApply?: () => void;
  className?: string;
}

export function PromoCard({ 
  title, 
  description, 
  discount, 
  validTill, 
  code, 
  onApply, 
  className 
}: PromoCardProps) {
  return (
    <Card className={`p-4 ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Percent className="h-4 w-4 text-primary" />
          </div>
          <Badge variant="outline">{discount}</Badge>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          Valid till {validTill}
        </div>
        
        {code && onApply && (
          <Button size="sm" variant="outline" onClick={onApply}>
            Apply {code}
          </Button>
        )}
      </div>
    </Card>
  );
}