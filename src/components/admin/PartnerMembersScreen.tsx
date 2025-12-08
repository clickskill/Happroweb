import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Search, Plus, MoreVertical, Download, Filter, User, Phone, Mail, Building, Shield, Star, Package, TrendingUp, Calendar, FileText, Ban } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { StatusChip } from '../ui/status-chip';
import { Textarea } from '../ui/textarea';

interface PartnerMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  companyId: string;
  role: 'technician' | 'supervisor' | 'manager';
  specialization: string[];
  totalJobs: number;
  rating: number;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  lastActive: string;
}

const mockPartnerMembers: PartnerMember[] = [
  {
    id: 'PM001',
    name: 'Ravi Kumar',
    email: 'ravi.kumar@abchomeservices.com',
    phone: '+91 98765 11111',
    company: 'ABC Home Services Pvt Ltd',
    companyId: 'PC001',
    role: 'technician',
    specialization: ['Plumbing', 'Electrical'],
    totalJobs: 156,
    rating: 4.8,
    status: 'active',
    joinDate: 'Jan 15, 2024',
    lastActive: '2 hours ago'
  },
  {
    id: 'PM002',
    name: 'Sunil Sharma',
    email: 'sunil.sharma@abchomeservices.com',
    phone: '+91 98765 11112',
    company: 'ABC Home Services Pvt Ltd',
    companyId: 'PC001',
    role: 'supervisor',
    specialization: ['Carpentry'],
    totalJobs: 89,
    rating: 4.9,
    status: 'active',
    joinDate: 'Jan 20, 2024',
    lastActive: '1 hour ago'
  },
  {
    id: 'PM003',
    name: 'Deepak Singh',
    email: 'deepak@quickfix.com',
    phone: '+91 98765 11113',
    company: 'QuickFix Solutions Ltd',
    companyId: 'PC002',
    role: 'technician',
    specialization: ['AC Repair'],
    totalJobs: 124,
    rating: 4.7,
    status: 'active',
    joinDate: 'Feb 18, 2024',
    lastActive: '30 mins ago'
  },
  {
    id: 'PM004',
    name: 'Vikram Patel',
    email: 'vikram@cleanhome.com',
    phone: '+91 98765 11114',
    company: 'CleanHome Services',
    companyId: 'PC003',
    role: 'manager',
    specialization: ['Home Cleaning', 'Deep Cleaning'],
    totalJobs: 45,
    rating: 4.6,
    status: 'active',
    joinDate: 'Feb 25, 2024',
    lastActive: 'Just now'
  },
  {
    id: 'PM005',
    name: 'Ashok Verma',
    email: 'ashok@techcare.in',
    phone: '+91 98765 11115',
    company: 'TechCare India Pvt Ltd',
    companyId: 'PC004',
    role: 'technician',
    specialization: ['Electrical', 'Plumbing'],
    totalJobs: 67,
    rating: 4.5,
    status: 'on-leave',
    joinDate: 'Mar 10, 2024',
    lastActive: '3 days ago'
  }
];

export function PartnerMembersScreen() {
  const [members] = useState<PartnerMember[]>(mockPartnerMembers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<PartnerMember | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isJobsDialogOpen, setIsJobsDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState<'technician' | 'supervisor' | 'manager'>('technician');

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager':
        return 'bg-purple-100 text-purple-800';
      case 'supervisor':
        return 'bg-blue-100 text-blue-800';
      case 'technician':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (member: PartnerMember) => {
    setSelectedMember(member);
    setIsDetailsDialogOpen(true);
  };

  const handleViewJobs = (member: PartnerMember) => {
    setSelectedMember(member);
    setIsJobsDialogOpen(true);
  };

  const handleEditRole = (member: PartnerMember) => {
    setSelectedMember(member);
    setNewRole(member.role);
    setIsEditRoleDialogOpen(true);
  };

  const handleViewCompany = (member: PartnerMember) => {
    setSelectedMember(member);
    setIsCompanyDialogOpen(true);
  };

  const handleDeactivate = (member: PartnerMember) => {
    setSelectedMember(member);
    setIsDeactivateDialogOpen(true);
  };

  const mockJobs = [
    { id: 'BK1234', service: 'Plumbing', customer: 'Priya Sharma', date: 'Dec 28, 2024', amount: '₹1,500', status: 'completed' },
    { id: 'BK1235', service: 'Electrical', customer: 'Amit Patel', date: 'Dec 27, 2024', amount: '₹1,200', status: 'completed' },
    { id: 'BK1236', service: 'Plumbing', customer: 'Sunita Roy', date: 'Dec 26, 2024', amount: '₹1,800', status: 'in-progress' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Partner Members</h2>
          <p className="text-muted-foreground">Manage technicians, supervisors, and managers from partner companies</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Members</CardDescription>
            <CardTitle>1,856</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Across all companies
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Members</CardDescription>
            <CardTitle>1,623</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              87.4% of total
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Technicians</CardDescription>
            <CardTitle>1,534</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              82.7% of members
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg. Rating</CardDescription>
            <CardTitle>4.7</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              From 8,450 reviews
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
                placeholder="Search by name, email, company, or ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[150px]">
                <Shield className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="technician">Technician</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
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
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="on-leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member ID</TableHead>
                <TableHead>Name & Contact</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{member.name}</span>
                      </div>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {member.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1">
                      <Building className="h-3 w-3 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm">{member.company}</div>
                        <div className="text-xs text-muted-foreground">
                          ID: {member.companyId}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(member.role)}>
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {member.specialization.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{member.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {member.totalJobs} jobs
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Active: {member.lastActive}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
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
                        <DropdownMenuItem onClick={() => handleViewDetails(member)}>
                          <User className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewJobs(member)}>
                          <Package className="h-4 w-4 mr-2" />
                          View Jobs
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditRole(member)}>
                          <Shield className="h-4 w-4 mr-2" />
                          Edit Role
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewCompany(member)}>
                          <Building className="h-4 w-4 mr-2" />
                          View Company
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDeactivate(member)}
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          Deactivate Member
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

      {/* Add Member Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Partner Member</DialogTitle>
            <DialogDescription>
              Add a technician, supervisor, or manager to a partner company
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="member-name">Full Name</Label>
                <Input id="member-name" placeholder="Enter full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="member-role">Role</Label>
                <Select>
                  <SelectTrigger id="member-role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technician">Technician</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="member-company">Partner Company</Label>
              <Select>
                <SelectTrigger id="member-company">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PC001">ABC Home Services Pvt Ltd</SelectItem>
                  <SelectItem value="PC002">QuickFix Solutions Ltd</SelectItem>
                  <SelectItem value="PC003">CleanHome Services</SelectItem>
                  <SelectItem value="PC004">TechCare India Pvt Ltd</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="member-email">Email</Label>
                <Input id="member-email" type="email" placeholder="member@company.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="member-phone">Phone Number</Label>
                <Input id="member-phone" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="member-skills">Specialization/Skills</Label>
              <Input id="member-skills" placeholder="e.g., Plumbing, Electrical" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Member ID</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedMember.id}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Role</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getRoleColor(selectedMember.role)}>
                      {selectedMember.role}
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getStatusColor(selectedMember.status)}>
                      {selectedMember.status}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Personal Info</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Full Name</Label>
                        <p className="mt-1">{selectedMember.name}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Join Date</Label>
                        <p className="mt-1">{selectedMember.joinDate}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <p className="mt-1">{selectedMember.email}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Phone</Label>
                        <p className="mt-1">{selectedMember.phone}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Company</Label>
                        <p className="mt-1">{selectedMember.company}</p>
                        <p className="text-xs text-muted-foreground">ID: {selectedMember.companyId}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Last Active</Label>
                        <p className="mt-1">{selectedMember.lastActive}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Specialization</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedMember.specialization.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Performance Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Jobs</span>
                          <span>{selectedMember.totalJobs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average Rating</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {selectedMember.rating}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Role</span>
                          <span className="capitalize">{selectedMember.role}</span>
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
                            <TrendingUp className="h-4 w-4 text-green-600 mt-1" />
                            <div className="flex-1">
                              <p className="text-sm">5 jobs completed</p>
                              <p className="text-xs text-muted-foreground">Last 7 days</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="h-4 w-4 text-blue-600 mt-1" />
                            <div className="flex-1">
                              <p className="text-sm">Last active</p>
                              <p className="text-xs text-muted-foreground">{selectedMember.lastActive}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="memberNotes">Admin Notes</Label>
                    <Textarea 
                      id="memberNotes" 
                      placeholder="Add internal notes about this member..."
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
              if (selectedMember) {
                handleViewJobs(selectedMember);
              }
            }}>
              View Jobs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Jobs Dialog */}
      <Dialog open={isJobsDialogOpen} onOpenChange={setIsJobsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Member Jobs</DialogTitle>
            <DialogDescription>
              All jobs completed by {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Jobs</CardDescription>
                    <CardTitle>{selectedMember.totalJobs}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Rating</CardDescription>
                    <CardTitle className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {selectedMember.rating}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle>5</CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.id}</TableCell>
                      <TableCell>{job.service}</TableCell>
                      <TableCell>{job.customer}</TableCell>
                      <TableCell>{job.date}</TableCell>
                      <TableCell>{job.amount}</TableCell>
                      <TableCell>
                        <StatusChip status={job.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsJobsDialogOpen(false)}>
              Close
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Jobs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member Role</DialogTitle>
            <DialogDescription>
              Change the role for {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Current Role</Label>
              <p className="text-sm text-muted-foreground capitalize">{selectedMember?.role}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-role">New Role</Label>
              <Select value={newRole} onValueChange={(value: any) => setNewRole(value)}>
                <SelectTrigger id="new-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technician">Technician</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-sm text-muted-foreground">
                Changing the role will update the member's permissions and responsibilities within the company.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsEditRoleDialogOpen(false);
              alert(`Role updated to ${newRole} successfully!`);
            }}>
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Company Dialog */}
      <Dialog open={isCompanyDialogOpen} onOpenChange={setIsCompanyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Company Details</DialogTitle>
            <DialogDescription>
              Information about {selectedMember?.company}
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    {selectedMember.company}
                  </CardTitle>
                  <CardDescription>Company ID: {selectedMember.companyId}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Total Technicians</Label>
                      <p className="mt-1">25</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Status</Label>
                      <Badge className="mt-1 bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Total Jobs</Label>
                      <p className="mt-1">456</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Rating</Label>
                      <p className="mt-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        4.8
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Services Offered</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">Plumbing</Badge>
                      <Badge variant="secondary">Electrical</Badge>
                      <Badge variant="secondary">Carpentry</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCompanyDialogOpen(false)}>
              Close
            </Button>
            <Button>
              View Full Company Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate Member Dialog */}
      <AlertDialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deactivate Member?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate {selectedMember?.name}? They will be unable to accept new jobs and their access will be revoked.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              alert('Member deactivated successfully!');
              setIsDeactivateDialogOpen(false);
            }}>
              Deactivate Member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
