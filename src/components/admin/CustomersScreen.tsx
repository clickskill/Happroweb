import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Search, Plus, MoreVertical, Download, Filter, Mail, Phone, MapPin, Calendar, Bell, Ban, CheckCircle, User, Home, CreditCard, Clock, Package } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { StatusChip } from '../ui/status-chip';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  pincode: string;
  totalBookings: number;
  totalSpent: string;
  status: 'active' | 'inactive' | 'blocked';
  joinDate: string;
  lastBooking: string;
}

const mockCustomers: Customer[] = [
  {
    id: 'CUST001',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    pincode: '400001',
    totalBookings: 24,
    totalSpent: '₹28,450',
    status: 'active',
    joinDate: 'Jan 15, 2024',
    lastBooking: 'Dec 28, 2024'
  },
  {
    id: 'CUST002',
    name: 'Amit Patel',
    email: 'amit.patel@email.com',
    phone: '+91 98765 43211',
    location: 'Delhi, NCR',
    pincode: '110001',
    totalBookings: 12,
    totalSpent: '₹15,600',
    status: 'active',
    joinDate: 'Feb 20, 2024',
    lastBooking: 'Dec 27, 2024'
  },
  {
    id: 'CUST003',
    name: 'Sunita Roy',
    email: 'sunita.roy@email.com',
    phone: '+91 98765 43212',
    location: 'Kolkata, West Bengal',
    pincode: '700001',
    totalBookings: 8,
    totalSpent: '₹9,200',
    status: 'active',
    joinDate: 'Mar 10, 2024',
    lastBooking: 'Dec 26, 2024'
  },
  {
    id: 'CUST004',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43213',
    location: 'Bangalore, Karnataka',
    pincode: '560001',
    totalBookings: 5,
    totalSpent: '₹6,800',
    status: 'inactive',
    joinDate: 'Apr 05, 2024',
    lastBooking: 'Nov 15, 2024'
  },
  {
    id: 'CUST005',
    name: 'Kavita Singh',
    email: 'kavita.singh@email.com',
    phone: '+91 98765 43214',
    location: 'Pune, Maharashtra',
    pincode: '411001',
    totalBookings: 0,
    totalSpent: '₹0',
    status: 'blocked',
    joinDate: 'May 12, 2024',
    lastBooking: 'Never'
  }
];

export function CustomersScreen() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isBookingsDialogOpen, setIsBookingsDialogOpen] = useState(false);
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [createBookingAfterAdd, setCreateBookingAfterAdd] = useState(false);
  const [contactSource, setContactSource] = useState<'phone' | 'chat' | 'none'>('none');

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsDialogOpen(true);
  };

  const handleViewBookings = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsBookingsDialogOpen(true);
  };

  const handleSendNotification = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsNotificationDialogOpen(true);
  };

  const handleBlockToggle = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsBlockDialogOpen(true);
  };

  const mockBookingHistory = [
    { id: 'BK1234', service: 'AC Repair', date: 'Dec 28, 2024', amount: '₹2,500', status: 'completed' },
    { id: 'BK1235', service: 'Plumbing', date: 'Dec 15, 2024', amount: '₹1,800', status: 'completed' },
    { id: 'BK1236', service: 'Electrician', date: 'Nov 30, 2024', amount: '₹1,200', status: 'completed' },
    { id: 'BK1237', service: 'Refrigerator Service', date: 'Nov 10, 2024', amount: '₹3,500', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Customer Management</h2>
          <p className="text-muted-foreground">Manage all customer accounts and view their activity</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Customers</CardDescription>
            <CardTitle>12,453</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +245 this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Customers</CardDescription>
            <CardTitle>11,234</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              90.2% of total
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>New This Month</CardDescription>
            <CardTitle>245</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +12% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg. Lifetime Value</CardDescription>
            <CardTitle>₹18,750</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Per customer
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
                placeholder="Search by name, email, phone, or ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer ID</TableHead>
                <TableHead>Name & Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{customer.name}</div>
                      <div className="flex flex-col gap-1 mt-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {customer.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <div>
                        <div className="text-sm">{customer.location}</div>
                        <div className="text-xs text-muted-foreground">PIN: {customer.pincode}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{customer.totalBookings}</div>
                      <div className="text-xs text-muted-foreground">
                        Last: {customer.lastBooking}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {customer.joinDate}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(customer)}>
                          <User className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewBookings(customer)}>
                          <Package className="h-4 w-4 mr-2" />
                          View Bookings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendNotification(customer)}>
                          <Bell className="h-4 w-4 mr-2" />
                          Send Notification
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleBlockToggle(customer)}
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          {customer.status === 'blocked' ? 'Unblock' : 'Block'} Customer
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

      {/* Add Customer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Create a new customer account manually (for phone/chat support)
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Contact Source */}
            <div className="grid gap-2">
              <Label>Contact Source</Label>
              <Select value={contactSource} onValueChange={(value: any) => setContactSource(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Walk-in / Self Registration</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="chat">Chat Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Information
              </h4>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="Enter customer name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="customer@email.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h4 className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Address Information
              </h4>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address1">House/Flat No., Building Name *</Label>
                  <Input id="address1" placeholder="e.g., 401, Sunrise Apartments" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address2">Area, Street, Sector, Village</Label>
                  <Input id="address2" placeholder="e.g., Bandra West" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="landmark">Landmark</Label>
                  <Input id="landmark" placeholder="e.g., Near City Mall" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input id="pincode" placeholder="400001" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="Mumbai" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State *</Label>
                    <Select>
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="westbengal">West Bengal</SelectItem>
                        <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Booking Option */}
            <div className="border-t pt-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="createBooking" 
                  checked={createBookingAfterAdd}
                  onCheckedChange={(checked) => setCreateBookingAfterAdd(checked as boolean)}
                />
                <Label 
                  htmlFor="createBooking" 
                  className="text-sm cursor-pointer"
                >
                  Create booking on behalf of this customer after adding
                </Label>
              </div>
              {createBookingAfterAdd && (
                <p className="text-xs text-muted-foreground mt-2 ml-6">
                  You will be redirected to create a booking after saving this customer
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddDialogOpen(false);
              setCreateBookingAfterAdd(false);
              setContactSource('none');
            }}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Handle add customer logic here
              setIsAddDialogOpen(false);
              if (createBookingAfterAdd) {
                // Would redirect to create booking flow
                alert('Customer added! Redirecting to create booking...');
              }
              setCreateBookingAfterAdd(false);
              setContactSource('none');
            }}>
              {createBookingAfterAdd ? 'Add & Create Booking' : 'Add Customer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedCustomer?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Customer ID</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedCustomer.id}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getStatusColor(selectedCustomer.status)}>
                      {selectedCustomer.status}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Full Name</Label>
                        <p className="mt-1">{selectedCustomer.name}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Join Date</Label>
                        <p className="mt-1">{selectedCustomer.joinDate}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <p className="mt-1">{selectedCustomer.email}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Phone</Label>
                        <p className="mt-1">{selectedCustomer.phone}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Location</Label>
                        <p className="mt-1">{selectedCustomer.location}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">PIN Code</Label>
                        <p className="mt-1">{selectedCustomer.pincode}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="activity" className="space-y-4">
                  <div className="grid gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Booking Statistics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Bookings</span>
                          <span>{selectedCustomer.totalBookings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Spent</span>
                          <span>{selectedCustomer.totalSpent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Booking</span>
                          <span>{selectedCustomer.lastBooking}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average Order Value</span>
                          <span>₹{selectedCustomer.totalBookings > 0 
                            ? Math.round(parseInt(selectedCustomer.totalSpent.replace(/[₹,]/g, '')) / selectedCustomer.totalBookings).toLocaleString()
                            : '0'}</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                            <div className="flex-1">
                              <p className="text-sm">Booking completed</p>
                              <p className="text-xs text-muted-foreground">AC Repair - Dec 28, 2024</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                            <div className="flex-1">
                              <p className="text-sm">Payment received</p>
                              <p className="text-xs text-muted-foreground">₹2,500 - Dec 28, 2024</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="notes" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminNotes">Admin Notes</Label>
                    <Textarea 
                      id="adminNotes" 
                      placeholder="Add internal notes about this customer..."
                      rows={6}
                    />
                    <Button size="sm">Save Notes</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsDetailsDialogOpen(false);
              if (selectedCustomer) {
                handleViewBookings(selectedCustomer);
              }
            }}>
              View Bookings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Bookings Dialog */}
      <Dialog open={isBookingsDialogOpen} onOpenChange={setIsBookingsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Booking History</DialogTitle>
            <DialogDescription>
              All bookings for {selectedCustomer?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Bookings</CardDescription>
                    <CardTitle>{selectedCustomer.totalBookings}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Spent</CardDescription>
                    <CardTitle>{selectedCustomer.totalSpent}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Last Booking</CardDescription>
                    <CardTitle className="text-base">{selectedCustomer.lastBooking}</CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBookingHistory.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{booking.service}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell>
                        <StatusChip status={booking.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingsDialogOpen(false)}>
              Close
            </Button>
            <Button>
              Create New Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Notification Dialog */}
      <Dialog open={isNotificationDialogOpen} onOpenChange={setIsNotificationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>
              Send a push notification to {selectedCustomer?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="notifTitle">Notification Title</Label>
              <Input id="notifTitle" placeholder="Enter notification title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notifMessage">Message</Label>
              <Textarea 
                id="notifMessage" 
                placeholder="Enter notification message..."
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notifType">Notification Type</Label>
              <Select defaultValue="general">
                <SelectTrigger id="notifType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                  <SelectItem value="booking">Booking Update</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNotificationDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              // Handle send notification logic
              setIsNotificationDialogOpen(false);
              alert('Notification sent successfully!');
            }}>
              <Bell className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block/Unblock Confirmation Dialog */}
      <AlertDialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedCustomer?.status === 'blocked' ? 'Unblock' : 'Block'} Customer?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedCustomer?.status === 'blocked' 
                ? `Are you sure you want to unblock ${selectedCustomer?.name}? They will be able to create new bookings again.`
                : `Are you sure you want to block ${selectedCustomer?.name}? They will not be able to create new bookings.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              // Handle block/unblock logic
              alert(`Customer ${selectedCustomer?.status === 'blocked' ? 'unblocked' : 'blocked'} successfully!`);
              setIsBlockDialogOpen(false);
            }}>
              {selectedCustomer?.status === 'blocked' ? 'Unblock' : 'Block'} Customer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
