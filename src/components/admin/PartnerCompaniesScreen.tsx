import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Search, Plus, MoreVertical, Download, Filter, Building, Phone, Mail, MapPin, Users, Star, FileText, Upload, Home, Package, Ban, CheckCircle, ClipboardList, TrendingUp, Calendar } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { StatusChip } from '../ui/status-chip';

interface PartnerCompany {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  services: string[];
  coverageAreas: string[];
  totalTechnicians: number;
  totalJobs: number;
  rating: number;
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  revenue: string;
}

const mockPartnerCompanies: PartnerCompany[] = [
  {
    id: 'PC001',
    name: 'ABC Home Services Pvt Ltd',
    contactPerson: 'Ramesh Gupta',
    email: 'contact@abchomeservices.com',
    phone: '+91 98765 12345',
    services: ['Plumbing', 'Electrical', 'Carpentry'],
    coverageAreas: ['400001', '400002', '400003'],
    totalTechnicians: 25,
    totalJobs: 456,
    rating: 4.8,
    status: 'active',
    joinDate: 'Jan 10, 2024',
    revenue: '₹12,45,000'
  },
  {
    id: 'PC002',
    name: 'QuickFix Solutions Ltd',
    contactPerson: 'Priya Mehta',
    email: 'info@quickfix.com',
    phone: '+91 98765 12346',
    services: ['AC Repair', 'Refrigerator Repair'],
    coverageAreas: ['110001', '110002'],
    totalTechnicians: 15,
    totalJobs: 289,
    rating: 4.6,
    status: 'active',
    joinDate: 'Feb 15, 2024',
    revenue: '₹8,90,000'
  },
  {
    id: 'PC003',
    name: 'CleanHome Services',
    contactPerson: 'Suresh Patel',
    email: 'contact@cleanhome.com',
    phone: '+91 98765 12347',
    services: ['Home Cleaning', 'Deep Cleaning'],
    coverageAreas: ['560001', '560002', '560003', '560004'],
    totalTechnicians: 40,
    totalJobs: 678,
    rating: 4.9,
    status: 'active',
    joinDate: 'Jan 20, 2024',
    revenue: '₹15,60,000'
  },
  {
    id: 'PC004',
    name: 'TechCare India Pvt Ltd',
    contactPerson: 'Amit Sharma',
    email: 'support@techcare.in',
    phone: '+91 98765 12348',
    services: ['Electrical', 'AC Repair', 'Plumbing'],
    coverageAreas: ['700001'],
    totalTechnicians: 8,
    totalJobs: 145,
    rating: 4.3,
    status: 'inactive',
    joinDate: 'Mar 05, 2024',
    revenue: '₹4,20,000'
  }
];

export function PartnerCompaniesScreen() {
  const [companies] = useState<PartnerCompany[]>(mockPartnerCompanies);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<PartnerCompany | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isTechniciansDialogOpen, setIsTechniciansDialogOpen] = useState(false);
  const [isJobsDialogOpen, setIsJobsDialogOpen] = useState(false);
  const [isCoverageDialogOpen, setIsCoverageDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [addTechniciansAfter, setAddTechniciansAfter] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Document upload states
  const [gstDoc, setGstDoc] = useState<File | null>(null);
  const [panDoc, setPanDoc] = useState<File | null>(null);
  const [registrationDoc, setRegistrationDoc] = useState<File | null>(null);
  const [addressProofDoc, setAddressProofDoc] = useState<File | null>(null);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (company: PartnerCompany) => {
    setSelectedCompany(company);
    setIsDetailsDialogOpen(true);
  };

  const handleViewTechnicians = (company: PartnerCompany) => {
    setSelectedCompany(company);
    setIsTechniciansDialogOpen(true);
  };

  const handleViewJobs = (company: PartnerCompany) => {
    setSelectedCompany(company);
    setIsJobsDialogOpen(true);
  };

  const handleManageCoverage = (company: PartnerCompany) => {
    setSelectedCompany(company);
    setIsCoverageDialogOpen(true);
  };

  const handleSuspendToggle = (company: PartnerCompany) => {
    setSelectedCompany(company);
    setIsSuspendDialogOpen(true);
  };

  const mockTechnicians = [
    { id: 'PM001', name: 'Ravi Kumar', role: 'technician', rating: 4.8, jobs: 156, status: 'active' },
    { id: 'PM002', name: 'Sunil Sharma', role: 'supervisor', rating: 4.9, jobs: 89, status: 'active' },
    { id: 'PM006', name: 'Rajesh Singh', role: 'technician', rating: 4.7, jobs: 134, status: 'active' },
  ];

  const mockJobs = [
    { id: 'BK1234', service: 'AC Repair', customer: 'Priya Sharma', date: 'Dec 28, 2024', amount: '₹2,500', status: 'completed' },
    { id: 'BK1235', service: 'Plumbing', customer: 'Amit Patel', date: 'Dec 27, 2024', amount: '₹1,800', status: 'completed' },
    { id: 'BK1236', service: 'Electrical', customer: 'Sunita Roy', date: 'Dec 26, 2024', amount: '₹1,200', status: 'in-progress' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
    const file = e.target.files?.[0] || null;
    setter(file);
  };

  const renderAddCompanyForm = () => {
    if (currentStep === 1) {
      return (
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h4 className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company-name">Company Name *</Label>
                <Input id="company-name" placeholder="Enter company name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-person">Contact Person *</Label>
                <Input id="contact-person" placeholder="Contact person name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company-email">Email *</Label>
                <Input id="company-email" type="email" placeholder="company@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-phone">Phone Number *</Label>
                <Input id="company-phone" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Business Address
            </h4>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="office-address">Office Address *</Label>
                <Input id="office-address" placeholder="Office No., Building Name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="area">Area, Street, Locality</Label>
                <Input id="area" placeholder="e.g., Bandra West" />
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

          <div className="space-y-4">
            <h4 className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Services & Coverage
            </h4>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="services">Services Offered *</Label>
                <Textarea 
                  id="services" 
                  placeholder="Enter services (comma-separated)"
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="coverage">Coverage Areas (PIN codes) *</Label>
                <Textarea 
                  id="coverage" 
                  placeholder="Enter PIN codes (comma-separated)"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h4 className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Verification Documents
            </h4>
            <p className="text-sm text-muted-foreground">
              Upload the following documents for verification. Accepted formats: PDF, JPG, PNG (Max 5MB each)
            </p>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="gst-doc">GST Certificate *</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="gst-doc" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setGstDoc)}
                  />
                  {gstDoc && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pan-doc">PAN Card *</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="pan-doc" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setPanDoc)}
                  />
                  {panDoc && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="registration-doc">Business Registration Certificate *</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="registration-doc" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setRegistrationDoc)}
                  />
                  {registrationDoc && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address-proof-doc">Address Proof (Utility Bill/Lease Agreement)</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="address-proof-doc" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setAddressProofDoc)}
                  />
                  {addressProofDoc && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="addTechs" 
                checked={addTechniciansAfter}
                onCheckedChange={(checked) => setAddTechniciansAfter(checked as boolean)}
              />
              <Label 
                htmlFor="addTechs" 
                className="text-sm cursor-pointer"
              >
                Add technicians for this company after registration
              </Label>
            </div>
            {addTechniciansAfter && (
              <p className="text-xs text-muted-foreground mt-2 ml-6">
                You will be redirected to add technicians/members after saving this company
              </p>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Partner Companies</h2>
          <p className="text-muted-foreground">Manage registered partner companies and their operations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => {
            setIsAddDialogOpen(true);
            setCurrentStep(1);
          }}>
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Companies</CardDescription>
            <CardTitle>234</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +12 this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Companies</CardDescription>
            <CardTitle>198</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              84.6% of total
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Technicians</CardDescription>
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
            <CardDescription>Avg. Rating</CardDescription>
            <CardTitle>4.7</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              From 12,450 reviews
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
                placeholder="Search by company name, email, or ID..."
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
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company ID</TableHead>
                <TableHead>Company Details</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Technicians</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{company.name}</span>
                      </div>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {company.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {company.phone}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Contact: {company.contactPerson}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {company.services.slice(0, 2).map((service, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {company.services.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{company.services.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1">
                      <MapPin className="h-3 w-3 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm">{company.coverageAreas.length} areas</div>
                        <div className="text-xs text-muted-foreground">
                          {company.coverageAreas.slice(0, 2).join(', ')}
                          {company.coverageAreas.length > 2 && '...'}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{company.totalTechnicians}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{company.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {company.totalJobs} jobs
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {company.revenue}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(company.status)}>
                      {company.status}
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
                        <DropdownMenuItem onClick={() => handleViewDetails(company)}>
                          <Building className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewTechnicians(company)}>
                          <Users className="h-4 w-4 mr-2" />
                          View Technicians
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewJobs(company)}>
                          <ClipboardList className="h-4 w-4 mr-2" />
                          View Jobs
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleManageCoverage(company)}>
                          <MapPin className="h-4 w-4 mr-2" />
                          Manage Coverage
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleSuspendToggle(company)}
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          {company.status === 'suspended' ? 'Activate' : 'Suspend'} Company
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

      {/* Add Company Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Partner Company - Step {currentStep} of 2</DialogTitle>
            <DialogDescription>
              {currentStep === 1 
                ? 'Enter company details, address, and service information' 
                : 'Upload verification documents and manage technician setup'}
            </DialogDescription>
          </DialogHeader>
          
          {renderAddCompanyForm()}

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              if (currentStep > 1) {
                setCurrentStep(1);
              } else {
                setIsAddDialogOpen(false);
                setCurrentStep(1);
                setAddTechniciansAfter(false);
              }
            }}>
              {currentStep > 1 ? 'Back' : 'Cancel'}
            </Button>
            <Button onClick={() => {
              if (currentStep === 1) {
                setCurrentStep(2);
              } else {
                setIsAddDialogOpen(false);
                setCurrentStep(1);
                if (addTechniciansAfter) {
                  alert('Company added! Redirecting to add technicians...');
                }
                setAddTechniciansAfter(false);
              }
            }}>
              {currentStep === 1 ? 'Next: Upload Documents' : addTechniciansAfter ? 'Save & Add Technicians' : 'Save Company'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Company Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedCompany?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Company ID</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedCompany.id}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getStatusColor(selectedCompany.status)}>
                      {selectedCompany.status}
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Join Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedCompany.joinDate}</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info">Company Info</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Company Name</Label>
                        <p className="mt-1">{selectedCompany.name}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Contact Person</Label>
                        <p className="mt-1">{selectedCompany.contactPerson}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <p className="mt-1">{selectedCompany.email}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Phone</Label>
                        <p className="mt-1">{selectedCompany.phone}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Services Offered</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedCompany.services.map((service, index) => (
                          <Badge key={index} variant="secondary">{service}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Coverage Areas</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedCompany.coverageAreas.map((area, index) => (
                          <Badge key={index} variant="outline">{area}</Badge>
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
                          <span>{selectedCompany.totalJobs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Technicians</span>
                          <span>{selectedCompany.totalTechnicians}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average Rating</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {selectedCompany.rating}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Revenue</span>
                          <span>{selectedCompany.revenue}</span>
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
                              <p className="text-sm">12 jobs completed</p>
                              <p className="text-xs text-muted-foreground">Last 7 days</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Users className="h-4 w-4 text-blue-600 mt-1" />
                            <div className="flex-1">
                              <p className="text-sm">2 new technicians added</p>
                              <p className="text-xs text-muted-foreground">Last month</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">GST Certificate</p>
                          <p className="text-xs text-muted-foreground">Uploaded on Jan 10, 2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">PAN Card</p>
                          <p className="text-xs text-muted-foreground">Uploaded on Jan 10, 2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">Business Registration</p>
                          <p className="text-xs text-muted-foreground">Uploaded on Jan 10, 2024</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyNotes">Admin Notes</Label>
                    <Textarea 
                      id="companyNotes" 
                      placeholder="Add internal notes about this company..."
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
              if (selectedCompany) {
                handleViewTechnicians(selectedCompany);
              }
            }}>
              View Technicians
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Technicians Dialog */}
      <Dialog open={isTechniciansDialogOpen} onOpenChange={setIsTechniciansDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Company Technicians</DialogTitle>
            <DialogDescription>
              All technicians and staff for {selectedCompany?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Members</CardDescription>
                    <CardTitle>{selectedCompany.totalTechnicians}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Active</CardDescription>
                    <CardTitle>{selectedCompany.totalTechnicians - 1}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Avg. Rating</CardDescription>
                    <CardTitle className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {selectedCompany.rating}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Jobs</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTechnicians.map((tech) => (
                    <TableRow key={tech.id}>
                      <TableCell>{tech.id}</TableCell>
                      <TableCell>{tech.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{tech.role}</Badge>
                      </TableCell>
                      <TableCell>{tech.jobs}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {tech.rating}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{tech.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTechniciansDialogOpen(false)}>
              Close
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Technician
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Jobs Dialog */}
      <Dialog open={isJobsDialogOpen} onOpenChange={setIsJobsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Company Jobs</DialogTitle>
            <DialogDescription>
              All jobs handled by {selectedCompany?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Jobs</CardDescription>
                    <CardTitle>{selectedCompany.totalJobs}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Revenue</CardDescription>
                    <CardTitle>{selectedCompany.revenue}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle>23</CardTitle>
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

      {/* Manage Coverage Dialog */}
      <Dialog open={isCoverageDialogOpen} onOpenChange={setIsCoverageDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage Coverage Areas</DialogTitle>
            <DialogDescription>
              Update service coverage areas for {selectedCompany?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCompany && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Current Coverage Areas</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedCompany.coverageAreas.map((area, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {area}
                      <button className="ml-1 hover:text-destructive">×</button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newCoverage">Add New Coverage Areas</Label>
                <Textarea 
                  id="newCoverage" 
                  placeholder="Enter PIN codes (comma-separated)"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Enter multiple PIN codes separated by commas
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCoverageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setIsCoverageDialogOpen(false);
              alert('Coverage areas updated successfully!');
            }}>
              Update Coverage
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend/Activate Dialog */}
      <AlertDialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedCompany?.status === 'suspended' ? 'Activate' : 'Suspend'} Company?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedCompany?.status === 'suspended' 
                ? `Are you sure you want to activate ${selectedCompany?.name}? They will be able to accept new jobs.`
                : `Are you sure you want to suspend ${selectedCompany?.name}? All their technicians will be unable to accept new jobs.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              alert(`Company ${selectedCompany?.status === 'suspended' ? 'activated' : 'suspended'} successfully!`);
              setIsSuspendDialogOpen(false);
            }}>
              {selectedCompany?.status === 'suspended' ? 'Activate' : 'Suspend'} Company
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
