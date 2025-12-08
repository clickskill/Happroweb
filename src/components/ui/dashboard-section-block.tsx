import React from 'react';
import { Card } from './card';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { Button } from './button';

interface DashboardSectionBlockProps {
  id: string;
  title: string;
  type: 'banner' | 'deals' | 'categories' | 'collection' | 'kpi' | 'jobs' | 'earnings';
  isVisible: boolean;
  onToggleVisibility: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  children?: React.ReactNode;
}

export function DashboardSectionBlock({ 
  id,
  title, 
  type,
  isVisible, 
  onToggleVisibility,
  onDragStart,
  children 
}: DashboardSectionBlockProps) {
  return (
    <Card 
      className={`p-4 ${!isVisible ? 'opacity-50' : ''}`}
      draggable
      onDragStart={onDragStart}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
          <div>
            <p className="text-sm">{title}</p>
            <p className="text-xs text-muted-foreground capitalize">{type} section</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleVisibility}
        >
          {isVisible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {children && isVisible && (
        <div className="mt-3 pt-3 border-t">
          {children}
        </div>
      )}
    </Card>
  );
}