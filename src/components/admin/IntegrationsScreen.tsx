import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { CreditCard, Mail, MessageSquare, Bell, Map, Database, Key, CheckCircle2, Settings as SettingsIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'payment' | 'communication' | 'maps' | 'analytics';
  icon: React.ElementType;
  isConnected: boolean;
  hasConfig: boolean;
}

const integrations: Integration[] = [
  {
    id: 'razorpay',
    name: 'Razorpay',
    description: 'Payment gateway for online transactions',
    category: 'payment',
    icon: CreditCard,
    isConnected: true,
    hasConfig: true
  },
  {
    id: 'paytm',
    name: 'Paytm',
    description: 'Alternative payment gateway and wallet',
    category: 'payment',
    icon: CreditCard,
    isConnected: false,
    hasConfig: false
  },
  {
    id: 'sendgrid',
    name: 'SendGrid',
    description: 'Email delivery service for transactional emails',
    category: 'communication',
    icon: Mail,
    isConnected: true,
    hasConfig: true
  },
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'SMS and WhatsApp messaging service',
    category: 'communication',
    icon: MessageSquare,
    isConnected: true,
    hasConfig: true
  },
  {
    id: 'firebase',
    name: 'Firebase',
    description: 'Push notifications and real-time database',
    category: 'communication',
    icon: Bell,
    isConnected: true,
    hasConfig: true
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    description: 'Location services and geocoding',
    category: 'maps',
    icon: Map,
    isConnected: true,
    hasConfig: true
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Web and app analytics tracking',
    category: 'analytics',
    icon: Database,
    isConnected: false,
    hasConfig: false
  }
];

export function IntegrationsScreen() {
  const [integrationList, setIntegrationList] = useState<Integration[]>(integrations);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);

  const toggleIntegration = (id: string) => {
    setIntegrationList(integrationList.map(int => 
      int.id === id ? { ...int, isConnected: !int.isConnected } : int
    ));
  };

  const openConfig = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsConfigDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'communication':
        return 'bg-blue-100 text-blue-800';
      case 'maps':
        return 'bg-purple-100 text-purple-800';
      case 'analytics':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Integrations</h2>
          <p className="text-muted-foreground">Connect third-party services and APIs</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Integrations</CardDescription>
            <CardTitle>{integrationList.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Available services
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Connected</CardDescription>
            <CardTitle className="text-green-600">
              {integrationList.filter(i => i.isConnected).length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Active integrations
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Payment Gateways</CardDescription>
            <CardTitle>
              {integrationList.filter(i => i.category === 'payment' && i.isConnected).length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Connected
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Communication</CardDescription>
            <CardTitle>
              {integrationList.filter(i => i.category === 'communication' && i.isConnected).length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Active channels
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {['payment', 'communication', 'maps', 'analytics'].map((category) => {
          const categoryIntegrations = integrationList.filter(i => i.category === category);
          if (categoryIntegrations.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="mb-3 capitalize">{category} Services</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {categoryIntegrations.map((integration) => (
                  <Card key={integration.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg ${integration.isConnected ? 'bg-primary/10' : 'bg-muted'}`}>
                            <integration.icon className={`h-6 w-6 ${integration.isConnected ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-base">{integration.name}</CardTitle>
                              {integration.isConnected && (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              )}
                            </div>
                            <CardDescription>{integration.description}</CardDescription>
                          </div>
                        </div>
                        <Badge className={getCategoryColor(integration.category)}>
                          {integration.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={integration.isConnected}
                            onCheckedChange={() => toggleIntegration(integration.id)}
                          />
                          <span className="text-sm">
                            {integration.isConnected ? 'Connected' : 'Disconnected'}
                          </span>
                        </div>
                        {integration.hasConfig && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="gap-2"
                            onClick={() => openConfig(integration)}
                          >
                            <SettingsIcon className="h-3 w-3" />
                            Configure
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Keys & Webhooks</CardTitle>
          <CardDescription>Manage your API credentials and webhook endpoints</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="api-key">Platform API Key</Label>
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              <Input 
                id="api-key" 
                type="password"
                defaultValue="hpro_sk_live_1234567890abcdef"
                readOnly
              />
              <Button variant="outline" size="sm">
                Regenerate
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Use this key for API authentication
            </p>
          </div>

          <Separator />

          <div className="grid gap-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input 
              id="webhook-url" 
              defaultValue="https://api.happro.com/webhooks"
              placeholder="https://your-domain.com/webhook"
            />
            <p className="text-xs text-muted-foreground">
              Receive real-time events from integrated services
            </p>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
            <div>
              <Label>Webhook Status</Label>
              <p className="text-sm text-muted-foreground">
                Last webhook received 5 minutes ago
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Set up API credentials and configuration settings
            </DialogDescription>
          </DialogHeader>
          {selectedIntegration && (
            <div className="grid gap-4 py-4">
              {selectedIntegration.id === 'razorpay' && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="razorpay-key-id">Key ID</Label>
                    <Input 
                      id="razorpay-key-id" 
                      placeholder="rzp_live_xxxxxxxxxxxxxx"
                      defaultValue="rzp_live_1234567890"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="razorpay-key-secret">Key Secret</Label>
                    <Input 
                      id="razorpay-key-secret" 
                      type="password"
                      placeholder="Enter your secret key"
                      defaultValue="••••••••••••••••"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="test-mode">Test Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use test credentials for development
                      </p>
                    </div>
                    <Switch id="test-mode" />
                  </div>
                </>
              )}
              {selectedIntegration.id === 'sendgrid' && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="sendgrid-api-key">API Key</Label>
                    <Input 
                      id="sendgrid-api-key" 
                      type="password"
                      placeholder="SG.xxxxxxxxxxxxxx"
                      defaultValue="SG.••••••••••••••"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sender-email">Sender Email</Label>
                    <Input 
                      id="sender-email" 
                      type="email"
                      defaultValue="noreply@happro.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sender-name">Sender Name</Label>
                    <Input 
                      id="sender-name" 
                      defaultValue="Happro Team"
                    />
                  </div>
                </>
              )}
              {selectedIntegration.id === 'twilio' && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="twilio-account-sid">Account SID</Label>
                    <Input 
                      id="twilio-account-sid" 
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      defaultValue="AC••••••••••••••••••••••••••••••"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="twilio-auth-token">Auth Token</Label>
                    <Input 
                      id="twilio-auth-token" 
                      type="password"
                      placeholder="Enter auth token"
                      defaultValue="••••••••••••••••"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="twilio-phone">Twilio Phone Number</Label>
                    <Input 
                      id="twilio-phone" 
                      defaultValue="+1234567890"
                    />
                  </div>
                </>
              )}
              {selectedIntegration.id === 'google-maps' && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="google-maps-key">API Key</Label>
                    <Input 
                      id="google-maps-key" 
                      type="password"
                      placeholder="AIzaxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      defaultValue="AIza••••••••••••••••••••••••••••"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="geocoding">Enable Geocoding</Label>
                      <p className="text-sm text-muted-foreground">
                        Convert addresses to coordinates
                      </p>
                    </div>
                    <Switch id="geocoding" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="places">Enable Places API</Label>
                      <p className="text-sm text-muted-foreground">
                        Location search and autocomplete
                      </p>
                    </div>
                    <Switch id="places" defaultChecked />
                  </div>
                </>
              )}
              {selectedIntegration.id === 'firebase' && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="firebase-project-id">Project ID</Label>
                    <Input 
                      id="firebase-project-id" 
                      defaultValue="happro-production"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="firebase-server-key">Server Key</Label>
                    <Input 
                      id="firebase-server-key" 
                      type="password"
                      placeholder="Enter server key"
                      defaultValue="••••••••••••••••"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Send mobile push notifications
                      </p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                </>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsConfigDialogOpen(false)}>
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
