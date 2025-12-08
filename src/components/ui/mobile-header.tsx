import React from 'react';
import { ArrowLeft, Menu, Bell } from 'lucide-react';
import { Button } from './button';
import { Logo } from '../brand/Logo';
import { LanguageDropdown } from './language-dropdown';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showMenu?: boolean;
  onMenu?: () => void;
  showNotifications?: boolean;
  onNotifications?: () => void;
  showLanguage?: boolean;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}

export function MobileHeader({
  title,
  showBack = false,
  onBack,
  showMenu = false,
  onMenu,
  showNotifications = false,
  onNotifications,
  showLanguage = true,
  leftContent,
  rightContent,
  className = ''
}: MobileHeaderProps) {
  return (
    <header className={`flex items-center justify-between p-4 bg-background border-b border-border ${className}`}>
      <div className="flex items-center gap-3">
        {showBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        {showMenu && (
          <Button variant="ghost" size="sm" onClick={onMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {!showBack && !showMenu && !leftContent && (
          <Logo variant="horizontal" />
        )}
        {leftContent}
        {title && (
          <h1 className="font-medium">{title}</h1>
        )}
      </div>

      <div className="flex items-center gap-2">
        {rightContent}
        {showNotifications && (
          <Button variant="ghost" size="sm" onClick={onNotifications}>
            <Bell className="h-5 w-5" />
          </Button>
        )}
        {showLanguage && <LanguageDropdown />}
      </div>
    </header>
  );
}