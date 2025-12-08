import React from 'react';

interface MobileAppMockupProps {
  screenshot: React.ReactNode;
  theme?: 'light' | 'dark';
}

export function MobileAppMockup({ screenshot, theme = 'light' }: MobileAppMockupProps) {
  return (
    <div className="relative mx-auto" style={{ width: '280px' }}>
      {/* Phone Frame */}
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-3xl z-10" />
        
        {/* Screen */}
        <div className="relative bg-white rounded-[2.5rem] overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-white z-10 flex items-center justify-between px-8 pt-2">
            <span className="text-xs">9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-3" viewBox="0 0 16 12" fill="currentColor">
                <path d="M0 4h2v4H0V4zm3 2h2v2H3V6zm3-2h2v4H6V4zm3 1h2v3H9V5zm3-1h2v4h-2V4z"/>
              </svg>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.5 1A3.5 3.5 0 0 0 8 4.5V6H4v8h10V6h-1.5V4.5A3.5 3.5 0 0 0 11.5 1zm0 1.5c1.1 0 2 .9 2 2V6h-4V4.5c0-1.1.9-2 2-2z"/>
              </svg>
              <svg className="w-5 h-4" viewBox="0 0 20 16" fill="currentColor">
                <path d="M2 2h16v12H2V2zm1 1v10h14V3H3z"/>
                <path d="M16 5h2v6h-2V5z" fill="currentColor" opacity="0.4"/>
              </svg>
            </div>
          </div>
          
          {/* App Content */}
          <div className="absolute inset-0">
            {screenshot}
          </div>
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full" />
      </div>
    </div>
  );
}
