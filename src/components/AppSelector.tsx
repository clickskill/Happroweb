import React from 'react';
import { Logo } from './brand/Logo';
import { LanguageDropdown } from './ui/language-dropdown';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  User, 
  Building2, 
  Wrench, 
  UserCheck, 
  Shield, 
  HeadphonesIcon,
  Home,
  Globe
} from 'lucide-react';
import type { AppView } from '../App';

interface AppSelectorProps {
  onSelectApp: (app: AppView) => void;
}

const apps = [
  {
    id: 'website' as AppView,
    title: 'New Website',
    description: 'One-page marketing site',
    icon: <Globe className="h-8 w-8" />,
    color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
  },
  {
    id: 'landing' as AppView,
    title: 'Original Landing',
    description: 'Previous homepage design',
    icon: <Home className="h-8 w-8" />,
    color: 'bg-primary/10 hover:bg-primary/20 border-primary/30'
  },
  {
    id: 'customer' as AppView,
    title: 'Customer',
    description: 'Book home services',
    icon: <User className="h-8 w-8" />,
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
  },
  {
    id: 'partner' as AppView,
    title: 'Partner',
    description: 'Grow your business',
    icon: <Building2 className="h-8 w-8" />,
    color: 'bg-green-50 hover:bg-green-100 border-green-200'
  },
  {
    id: 'admin' as AppView,
    title: 'Admin',
    description: 'Platform management',
    icon: <Shield className="h-8 w-8" />,
    color: 'bg-red-50 hover:bg-red-100 border-red-200'
  },
  {
    id: 'support' as AppView,
    title: 'Support',
    description: 'Customer assistance',
    icon: <HeadphonesIcon className="h-8 w-8" />,
    color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200'
  }
];

export function AppSelector({ onSelectApp }: AppSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary">
      <header className="flex items-center justify-between p-6 border-b border-border bg-background/80 backdrop-blur-sm">
        <Logo variant="horizontal-tagline" />
        <LanguageDropdown />
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Happro
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your application to get started with India's trusted home services platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {apps.map((app) => (
            <Card 
              key={app.id}
              className={`p-6 cursor-pointer transition-all duration-200 ${app.color}`}
              onClick={() => onSelectApp(app.id)}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-white shadow-sm">
                  {app.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {app.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {app.description}
                  </p>
                </div>
                <Button className="w-full">
                  Launch App
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Need help? Contact our support team at support@happro.com
          </p>
        </div>
      </main>
    </div>
  );
}