import React from 'react';
import { Logo } from '../brand/Logo';
import { Button } from './button';
import { Bell, Settings, LogOut } from 'lucide-react';

interface WebHeaderProps {
  title?: string;
  userEmail?: string;
  onNotifications?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
  className?: string;
}

export function WebHeader({
  title,
  userEmail = 'admin@happro.com',
  onNotifications,
  onSettings,
  onLogout,
  className = ''
}: WebHeaderProps) {
  return (
    <header className={`flex items-center justify-between p-4 bg-background border-b border-border ${className}`}>
      <div className="flex items-center gap-4">
        <Logo variant="horizontal" />
        {title && (
          <div className="border-l border-border pl-4">
            <h1 className="text-xl font-medium">{title}</h1>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onNotifications}>
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={onSettings}>
          <Settings className="h-5 w-5" />
        </Button>
        <div className="border-l border-border pl-3 ml-3">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{userEmail}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}