import React from 'react';

interface LogoProps {
  variant?: 'mark' | 'horizontal' | 'horizontal-tagline';
  className?: string;
}

export function Logo({ variant = 'horizontal', className = '' }: LogoProps) {
  const baseClasses = 'flex items-center';
  
  const renderMark = () => (
    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-xl">H</span>
    </div>
  );

  const renderText = () => (
    <span className="text-2xl font-bold text-foreground ml-3">Happro</span>
  );

  const renderTagline = () => (
    <span className="text-sm text-muted-foreground ml-2">Your trusted home services partner</span>
  );

  switch (variant) {
    case 'mark':
      return (
        <div className={`${baseClasses} ${className}`}>
          {renderMark()}
        </div>
      );
    case 'horizontal':
      return (
        <div className={`${baseClasses} ${className}`}>
          {renderMark()}
          {renderText()}
        </div>
      );
    case 'horizontal-tagline':
      return (
        <div className={`${baseClasses} flex-col items-start ${className}`}>
          <div className="flex items-center">
            {renderMark()}
            {renderText()}
          </div>
          {renderTagline()}
        </div>
      );
    default:
      return (
        <div className={`${baseClasses} ${className}`}>
          {renderMark()}
          {renderText()}
        </div>
      );
  }
}