import React from 'react';
import { Button } from './button';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

interface BottomTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function BottomTabs({ tabs, activeTab, onTabChange, className }: BottomTabsProps) {
  return (
    <div className={`flex border-t border-border bg-background ${className}`}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          className={`flex-1 flex-col gap-1 h-16 rounded-none relative ${
            activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          <div className="relative">
            {tab.icon}
            {tab.badge && tab.badge > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center">
                {tab.badge > 99 ? '99+' : tab.badge}
              </span>
            )}
          </div>
          <span className="text-xs">{tab.label}</span>
        </Button>
      ))}
    </div>
  );
}