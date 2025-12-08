import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Search, Plus, MoreVertical, Download, Filter, Mail, MessageSquare, Bell, Users, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'in-app';
  targetAudience: string;
  subject: string;
  message: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  scheduledDate?: string;
  sentCount: number;
  openRate: string;
  clickRate: string;
  createdDate: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: 'CAMP001',
    name: 'New Year Special Offer',
    type: 'email',
    targetAudience: 'All Active Customers',
    subject: '🎉 New Year Sale - Up to 50% Off!',
    message: 'Welcome the new year with amazing discounts on all services...',
    status: 'completed',
    scheduledDate: 'Jan 01, 2025',
    sentCount: 12453,
    openRate: '45.2%',
    clickRate: '12.3%',
    createdDate: 'Dec 20, 2024'
  },
  {
    id: 'CAMP002',
    name: 'Weekend Cleaning Reminder',
    type: 'push',
    targetAudience: 'Cleaning Service Users',
    subject: '',
    message: 'Weekend approaching! Book your cleaning service now and get ₹100 off',
    status: 'active',
    scheduledDate: 'Every Friday',
    sentCount: 3456,
    openRate: '62.8%',
    clickRate: '28.5%',
    createdDate: 'Dec 15, 2024'
  },
  {
    id: 'CAMP003',
    name: 'Inactive User Reactivation',
    type: 'sms',
    targetAudience: 'Inactive for 30+ days',
    subject: '',
    message: 'We miss you! Come back and get 25% off your next service booking.',
    status: 'scheduled',
    scheduledDate: 'Jan 05, 2025',
    sentCount: 0,
    openRate: '0%',
    clickRate: '0%',
    createdDate: 'Dec 28, 2024'
  },
  {
    id: 'CAMP004',
    name: 'AC Service Reminder',
    type: 'email',
    targetAudience: 'AC Service Users',
    subject: 'Time for AC Maintenance?',
    message: 'Summer is coming! Book your AC servicing now at special rates',
    status: 'draft',
    sentCount: 0,
    openRate: '0%',
    clickRate: '0%',
    createdDate: 'Dec 25, 2024'
  },
  {
    id: 'CAMP005',
    name: 'Festival Wishes',
    type: 'in-app',
    targetAudience: 'All Users',
    subject: '',
    message: 'Happy Diwali! Enjoy special festive discounts on all services',
    status: 'paused',
    scheduledDate: 'Oct 24, 2024',
    sentCount: 8456,
    openRate: '78.5%',
    clickRate: '34.2%',
    createdDate: 'Oct 20, 2024'
  }
];

export function CampaignsScreen() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = 
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.targetAudience.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || campaign.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-3 w-3" />;
      case 'sms':
        return <MessageSquare className="h-3 w-3" />;
      case 'push':
        return <Bell className="h-3 w-3" />;
      case 'in-app':
        return <TrendingUp className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Marketing Campaigns</h2>
          <p className="text-muted-foreground">Create and manage email, SMS, and push notification campaigns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Campaigns</CardDescription>
            <CardTitle>{campaigns.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {campaigns.filter(c => c.status === 'active').length} active
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Sent</CardDescription>
            <CardTitle>
              {campaigns.reduce((sum, c) => sum + c.sentCount, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              All campaigns
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg. Open Rate</CardDescription>
            <CardTitle>
              {(campaigns
                .filter(c => c.sentCount > 0)
                .reduce((sum, c) => sum + parseFloat(c.openRate), 0) / 
                campaigns.filter(c => c.sentCount > 0).length).toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Across all channels
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg. Click Rate</CardDescription>
            <CardTitle>
              {(campaigns
                .filter(c => c.sentCount > 0)
                .reduce((sum, c) => sum + parseFloat(c.clickRate), 0) / 
                campaigns.filter(c => c.sentCount > 0).length).toFixed(1)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Engagement metric
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns by name, audience, or message..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <Mail className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="push">Push</SelectItem>
                <SelectItem value="in-app">In-App</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Target Audience</TableHead>
                <TableHead>Message Preview</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <div>{campaign.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {campaign.id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                      {getTypeIcon(campaign.type)}
                      {campaign.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{campaign.targetAudience}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {campaign.subject && (
                        <div className="text-sm mb-1">{campaign.subject}</div>
                      )}
                      <div className="text-xs text-muted-foreground truncate">
                        {campaign.message}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {campaign.sentCount > 0 ? (
                      <div className="space-y-1">
                        <div className="text-sm">Sent: {campaign.sentCount.toLocaleString()}</div>
                        <div className="flex gap-2 text-xs">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {campaign.openRate}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {campaign.clickRate}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not sent yet</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {campaign.scheduledDate ? (
                      <div className="text-sm">{campaign.scheduledDate}</div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Not scheduled</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-3 w-3 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-3 w-3 mr-2" />
                          Edit Campaign
                        </DropdownMenuItem>
                        {campaign.status === 'paused' && (
                          <DropdownMenuItem>
                            Resume Campaign
                          </DropdownMenuItem>
                        )}
                        {campaign.status === 'active' && (
                          <DropdownMenuItem>
                            Pause Campaign
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-3 w-3 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>
              Set up a new marketing campaign for your customers
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="campaign-name">Campaign Name</Label>
              <Input id="campaign-name" placeholder="e.g., New Year Special Offer" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="campaign-type">Campaign Type</Label>
                <Select>
                  <SelectTrigger id="campaign-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="in-app">In-App Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Select>
                  <SelectTrigger id="target-audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="active">Active Customers</SelectItem>
                    <SelectItem value="inactive">Inactive Customers</SelectItem>
                    <SelectItem value="new">New Users (Last 30 days)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject Line (For Email)</Label>
              <Input id="subject" placeholder="Enter subject line" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Enter your campaign message..."
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="schedule-date">Schedule Date (Optional)</Label>
              <Input id="schedule-date" type="datetime-local" />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="send-now" />
              <Label htmlFor="send-now">Send immediately</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Save as Draft
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
