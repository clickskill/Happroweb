import React, { useState, Suspense, lazy } from 'react';
import { AppSelector } from './components/AppSelector';

const LandingPage = lazy(() => import('./components/LandingPage').then(m => ({ default: m.LandingPage })));
const HapproWebsite = lazy(() => import('./components/HapproWebsite').then(m => ({ default: m.HapproWebsite })));
const CustomerApp = lazy(() => import('./components/CustomerApp').then(m => ({ default: m.CustomerApp })));
const PartnerApp = lazy(() => import('./components/PartnerApp').then(m => ({ default: m.PartnerApp })));
const AdminPortal = lazy(() => import('./components/AdminPortal').then(m => ({ default: m.AdminPortal })));
const SupportPortal = lazy(() => import('./components/SupportPortal').then(m => ({ default: m.SupportPortal })));

export type AppView = 'landing' | 'website' | 'selector' | 'customer' | 'partner' | 'admin' | 'support';

function LoadingFallback() {
  return (
    <div className="size-full flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-muted-foreground">Loading application...</p>
      </div>
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="size-full flex items-center justify-center bg-background p-4">
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-xl text-destructive">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('website');

  const renderView = () => {
    switch (currentView) {
      case 'website':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <HapproWebsite whatsappNumber="919876543210" />
          </Suspense>
        );
      case 'landing':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <LandingPage onNavigateToApps={() => setCurrentView('selector')} />
          </Suspense>
        );
      case 'customer':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <CustomerApp onBack={() => setCurrentView('selector')} />
          </Suspense>
        );
      case 'partner':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <PartnerApp onBack={() => setCurrentView('selector')} />
          </Suspense>
        );
      case 'admin':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <AdminPortal onBack={() => setCurrentView('selector')} />
          </Suspense>
        );
      case 'support':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <SupportPortal onBack={() => setCurrentView('selector')} />
          </Suspense>
        );
      default:
        return <AppSelector onSelectApp={setCurrentView} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="size-full">
        {renderView()}
      </div>
    </ErrorBoundary>
  );
}