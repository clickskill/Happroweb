import React from 'react';
import { Tabs, TabsList, TabsTrigger } from './tabs';
import { MapPin, Globe } from 'lucide-react';

interface ServiceScopeToggleProps {
  value: 'my-area' | 'all-services';
  onValueChange: (value: 'my-area' | 'all-services') => void;
  className?: string;
}

export function ServiceScopeToggle({ value, onValueChange, className }: ServiceScopeToggleProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className={className}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="my-area" className="gap-2">
          <MapPin className="h-4 w-4" />
          My Area
        </TabsTrigger>
        <TabsTrigger value="all-services" className="gap-2">
          <Globe className="h-4 w-4" />
          All Services
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}