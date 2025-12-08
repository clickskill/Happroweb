import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Card } from './card';
import { Info } from 'lucide-react';

interface TipsWidgetProps {
  onTipChange?: (amount: number) => void;
  className?: string;
}

const predefinedTips = [0, 50, 100, 200];

export function TipsWidget({ onTipChange, className }: TipsWidgetProps) {
  const [selectedTip, setSelectedTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const handleTipSelect = (amount: number) => {
    setSelectedTip(amount);
    setShowCustom(false);
    setCustomTip('');
    onTipChange?.(amount);
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    const amount = parseInt(value) || 0;
    setSelectedTip(amount);
    onTipChange?.(amount);
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Add Tip (Optional)</h4>
          <div className="flex flex-wrap gap-2">
            {predefinedTips.map((amount) => (
              <Button
                key={amount}
                variant={selectedTip === amount && !showCustom ? "default" : "outline"}
                size="sm"
                onClick={() => handleTipSelect(amount)}
                className="min-w-16"
              >
                ₹{amount}
              </Button>
            ))}
            <Button
              variant={showCustom ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setShowCustom(true);
                setSelectedTip(0);
              }}
            >
              Custom
            </Button>
          </div>
        </div>

        {showCustom && (
          <div>
            <Input
              type="number"
              placeholder="Enter amount"
              value={customTip}
              onChange={(e) => handleCustomTipChange(e.target.value)}
              className="w-full"
            />
          </div>
        )}

        <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
          <Info className="h-4 w-4 text-info mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            100% of your tip goes to the technician. Happro takes no cut.
          </p>
        </div>
      </div>
    </Card>
  );
}