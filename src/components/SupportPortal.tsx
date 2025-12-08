import React, { useState } from 'react';
import { WebHeader } from './ui/web-header';
import { KPICard } from './ui/kpi-card';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { StatusChip } from './ui/status-chip';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from './ui/sidebar';
import { 
  Headphones, 
  Search, 
  Calendar,
  AlertTriangle,
  Clock,
  TrendingUp,
  IndianRupee,
  FileText,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  XCircle,
  Shield,
  Users,
  RefreshCw,
  Plus
} from 'lucide-react';

interface SupportPortalProps {
  onBack: () => void;
}

type SupportScreen = 
  | 'dashboard' 
  | 'search-bookings'
  | 'tickets'
  | 'raise-complaint'
  | 'manual-booking'
  | 'escalations'
  | 'refunds'
  | 'coverage-exceptions'
  | 'knowledge-base'
  | 'reports';

export function SupportPortal({ onBack }: SupportPortalProps) {
  const [currentScreen, setCurrentScreen] = useState<SupportScreen>('dashboard');

  const sidebarItems = [
    {
      title: "Customer Support",
      items: [
        { title: "Search Bookings", icon: Search, id: "search-bookings" },
        { title: "Tickets & Complaints", icon: Headphones, id: "tickets" },
        { title: "Raise Complaint", icon: Plus, id: "raise-complaint" },
        { title: "Manual Booking", icon: Calendar, id: "manual-booking" },
      ]
    },
    {
      title: "Operations",
      items: [
        { title: "Escalation Tracker", icon: AlertTriangle, id: "escalations" },
        { title: "Cancellations & Refunds", icon: RefreshCw, id: "refunds" },
        { title: "Coverage Exceptions", icon: Shield, id: "coverage-exceptions" },
      ]
    },
    {
      title: "Resources",
      items: [
        { title: "Knowledge Base", icon: FileText, id: "knowledge-base" },
        { title: "Reports & Analytics", icon: TrendingUp, id: "reports" },
      ]
    }
  ];

  const kpiData = [
    {
      title: "Open Tickets",
      value: "23",
      change: { value: 8, type: 'decrease' as const, period: 'yesterday' },
      icon: <Headphones className="h-4 w-4" />,
      onClick: () => setCurrentScreen('tickets')
    },
    {
      title: "Bookings Today",
      value: "1,247",
      change: { value: 12, type: 'increase' as const, period: 'yesterday' },
      icon: <Calendar className="h-4 w-4" />,
      onClick: () => setCurrentScreen('search-bookings')
    },
    {
      title: "Refunds Pending",
      value: "₹12,450",
      change: { value: 5, type: 'decrease' as const, period: 'yesterday' },
      icon: <IndianRupee className="h-4 w-4" />,
      onClick: () => setCurrentScreen('refunds')
    },
    {
      title: "Avg Resolution Time",
      value: "2.3 hrs",
      change: { value: 15, type: 'decrease' as const, period: 'last week' },
      icon: <Clock className="h-4 w-4" />,
      onClick: () => {}
    }
  ];

  const tickets = [
    {
      id: "T12001",
      customer: "Priya Sharma",
      booking: "HP12349",
      subject: "Service quality issue",
      priority: "high",
      status: "open" as const,
      assignee: "Support Agent 1",
      created: "2 hours ago",
      sla: "4 hours remaining"
    },
    {
      id: "T12002",
      customer: "Amit Patel",
      booking: "HP12350",
      subject: "Payment not processed",
      priority: "medium",
      status: "in-progress" as const,
      assignee: "Support Agent 2",
      created: "5 hours ago",
      sla: "1 hour remaining"
    },
    {
      id: "T12003",
      customer: "Sunita Roy",
      booking: "HP12351",
      subject: "Technician arrived late",
      priority: "low",
      status: "pending" as const,
      assignee: "Unassigned",
      created: "1 day ago",
      sla: "SLA breached"
    }
  ];

  const coverageExceptions = [
    {
      id: "CE001",
      requester: "Rajesh Kumar (Partner - Individual)",
      service: "AC Repair",
      requestedArea: "400050",
      currentCoverage: "400001-400010",
      reason: "Customer urgent request",
      status: "pending" as const,
      requestDate: "Dec 28, 2024",
      validityRequested: "7 days"
    },
    {
      id: "CE002",
      requester: "ABC Home Services (Partner - Company / Member: Amit Singh)",
      service: "Plumbing",
      requestedArea: "400075",
      currentCoverage: "400020-400030",
      reason: "Expand service area",
      status: "pending" as const,
      requestDate: "Dec 27, 2024",
      validityRequested: "30 days"
    }
  ];

  const knowledgeBaseArticles = [
    {
      id: "KB001",
      title: "Explaining tips (100% to technician)",
      category: "Payments",
      content: "When customers ask about tips, explain that 100% of tips go directly to the technician. Happro takes no commission from tips.",
      lastUpdated: "Dec 25, 2024"
    },
    {
      id: "KB002",
      title: "Handling outside-area requests",
      category: "Coverage",
      content: "For services outside coverage area, guide customers to use 'Change location' or explain coverage exceptions process.",
      lastUpdated: "Dec 20, 2024"
    },
    {
      id: "KB003",
      title: "Refund processing guidelines",
      category: "Refunds",
      content: "Step-by-step process for handling refund requests including documentation requirements.",
      lastUpdated: "Dec 18, 2024"
    }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support Dashboard</h1>
        <p className="text-muted-foreground">Customer support and operations overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Recent Tickets</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.slice(0, 3).map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">#{ticket.id}</p>
                    <p className="text-sm text-muted-foreground">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground">{ticket.customer}</p>
                  </div>
                  <div className="text-right">
                    <StatusChip status={ticket.status} />
                    <p className="text-xs text-muted-foreground mt-1">{ticket.created}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="font-semibold">Quick Actions</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setCurrentScreen('search-bookings')}
              >
                <Search className="h-4 w-4 mr-2" />
                Search Bookings
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setCurrentScreen('raise-complaint')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Raise New Complaint
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setCurrentScreen('manual-booking')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Manual Booking Entry
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => setCurrentScreen('coverage-exceptions')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Coverage Exceptions ({coverageExceptions.length})
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tickets & Complaints</h1>
          <p className="text-muted-foreground">Manage customer support tickets</p>
        </div>
        <Button onClick={() => setCurrentScreen('raise-complaint')}>
          <Plus className="h-4 w-4 mr-2" />
          New Complaint
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tickets..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Open (23)</Button>
              <Button variant="outline" size="sm">In Progress (8)</Button>
              <Button variant="outline" size="sm">Resolved (145)</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Booking</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>SLA</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">#{ticket.id}</TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>#{ticket.booking}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs ${
                      ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                      ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {ticket.priority}
                    </span>
                  </TableCell>
                  <TableCell><StatusChip status={ticket.status} /></TableCell>
                  <TableCell>{ticket.assignee}</TableCell>
                  <TableCell>
                    <span className={ticket.sla.includes('breached') ? 'text-red-600' : 'text-muted-foreground'}>
                      {ticket.sla}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderCoverageExceptions = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coverage Exceptions</h1>
          <p className="text-muted-foreground">Approve or deny out-of-area service requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Pending Requests"
          value={coverageExceptions.length.toString()}
          icon={<Clock className="h-4 w-4" />}
        />
        <KPICard
          title="Approved Today"
          value="5"
          change={{ value: 25, type: 'increase', period: 'yesterday' }}
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <KPICard
          title="Average Response"
          value="1.8 hrs"
          change={{ value: 12, type: 'decrease', period: 'last week' }}
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Exception Requests Queue</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Requested Area</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coverageExceptions.map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell className="font-medium">{exception.id}</TableCell>
                  <TableCell>{exception.requester}</TableCell>
                  <TableCell>{exception.service}</TableCell>
                  <TableCell>{exception.requestedArea}</TableCell>
                  <TableCell>{exception.reason}</TableCell>
                  <TableCell>{exception.validityRequested}</TableCell>
                  <TableCell>{exception.requestDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-success hover:bg-success/90">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Deny
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderRaiseComplaint = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Raise New Complaint</h1>
        <p className="text-muted-foreground">Create a new support ticket</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <h3 className="font-semibold">Complaint Details</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Customer Phone</label>
              <Input placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Booking ID (Optional)</label>
              <Input placeholder="HP12345" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <Input placeholder="Brief description of the issue" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select className="w-full p-2 border border-border rounded-md">
              <option>Service Quality</option>
              <option>Payment Issues</option>
              <option>Technician Behavior</option>
              <option>Scheduling Issues</option>
              <option>Billing Disputes</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <select className="w-full p-2 border border-border rounded-md">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea 
              placeholder="Detailed description of the complaint..."
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <Button className="flex-1">Create Complaint</Button>
            <Button variant="outline" onClick={() => setCurrentScreen('dashboard')}>Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderKnowledgeBase = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Knowledge Base & Scripts</h1>
        <p className="text-muted-foreground">Support resources and standard responses</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {knowledgeBaseArticles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{article.title}</h4>
                  <p className="text-sm text-muted-foreground">{article.category}</p>
                </div>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{article.content}</p>
              <p className="text-xs text-muted-foreground">Updated: {article.lastUpdated}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <h3 className="font-semibold">Quick Scripts</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Tips Explanation Script</h4>
              <p className="text-sm text-muted-foreground">
                "I understand your question about tips. At Happro, 100% of any tip you provide goes directly to your technician. 
                We don't take any commission from tips - it's our way of ensuring your appreciation reaches the person who provided the service."
              </p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">Coverage Area Script</h4>
              <p className="text-sm text-muted-foreground">
                "I see you're looking for service in an area we don't currently cover. Let me check if any of our technicians can make an exception for your location. 
                Alternatively, you can change your location in the app to see services available in nearby areas."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return renderDashboard();
      case 'tickets':
        return renderTickets();
      case 'coverage-exceptions':
        return renderCoverageExceptions();
      case 'raise-complaint':
        return renderRaiseComplaint();
      case 'knowledge-base':
        return renderKnowledgeBase();
      default:
        return renderDashboard();
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            {sidebarItems.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          onClick={() => setCurrentScreen(item.id as SupportScreen)}
                          isActive={currentScreen === item.id}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <WebHeader title="Support Portal" />
          <main className="flex-1 overflow-y-auto p-6">
            {renderScreen()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}