import React from 'react';
import { Card } from './card';
import { RadioGroupItem } from './radio-group';
import { CreditCard, Clock, Banknote } from 'lucide-react';

interface PaymentMethodCardProps {
  value: 'online' | 'pay-later' | 'cod';
  isSelected: boolean;
  title: string;
  description: string;
}

export function PaymentMethodCard({ value, isSelected, title, description }: PaymentMethodCardProps) {
  const getIcon = () => {
    switch (value) {
      case 'online':
        return <CreditCard className="h-5 w-5 text-muted-foreground" />;
      case 'pay-later':
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      case 'cod':
        return <Banknote className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className={`p-3 cursor-pointer transition-colors ${isSelected ? 'border-primary bg-primary/5' : ''}`}>
      <label className="cursor-pointer">
        <div className="flex items-center gap-3">
          <RadioGroupItem value={value} />
          {getIcon()}
          <div>
            <p>{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </label>
    </Card>
  );
}