import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Search, Plus, MoreVertical, Download, Filter, User, Phone, Mail, MapPin, Star, Award, FileText, CheckCircle, Home, Package, Ban, TrendingUp, Calendar } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { StatusChip } from '../ui/status-chip';

interface PartnerIndividual {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  coverageAreas: string[];
  totalJobs: number;
  rating: number;
  earnings: string;
  status: 'active' | 'inactive' | 'suspended';
  verified: boolean;
  joinDate: string;
  availability: 'available' | 'busy' | 'offline';
}

const mockPartnerIndividuals: PartnerIndividual[] = [
  {
    id: 'PI001',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 54321',
    specialization: ['Plumbing', 'Electrical'],
    coverageAreas: ['400001', '400002'],
    totalJobs: 234,
    rating: 4.9,
    earnings: '₹3,45,600',
    status: 'active',
    verified: true,
    joinDate: 'Jan 05, 2024',
    availability: 'available'
  },
  {
    id: 'PI002',
    name: 'Suresh Singh',
    email: 'suresh.singh@email.com',
    phone: '+91 98765 54322',
    specialization: ['AC Repair', 'Refrigerator Repair'],
    coverageAreas: ['110001', '110002', '110003'],
    totalJobs: 189,
    rating: 4.7,
    earnings: '₹2,89,400',
    status: 'active',
    verified: true,
    joinDate: 'Feb 12, 2024',
    availability: 'busy'
  },
  {
    id: 'PI003',
    name: 'Vikas Sharma',
    email: 'vikas.sharma@email.com',
    phone: '+91 98765 54323',
    specialization: ['Carpentry'],
    coverageAreas: ['560001'],
    totalJobs: 145,
    rating: 4.8,
    earnings: '₹2,12,500',
    status: 'active',
    verified: true,
    joinDate: 'Jan 18, 2024',
    availability: 'available'
  },
  {
    id: 'PI004',
    name: 'Anil Verma',
    email: 'anil.verma@email.com',
    phone: '+91 98765 54324',
    specialization: ['Painting', 'Waterproofing'],
    coverageAreas: ['700001', '700002'],
    totalJobs: 98,
    rating: 4.5,
    earnings: '₹1,45,800',
    status: 'inactive',
    verified: false,
    joinDate: 'Mar 25, 2024',
    availability: 'offline'
  },
  {
    id: 'PI005',
    name: 'Mohan Das',
    email: 'mohan.das@email.com',
    phone: '+91 98765 54325',
    specialization: ['Electrical'],
    coverageAreas: ['411001'],
    totalJobs: 56,
    rating: 4.3,
    earnings: '₹89,200',
    status: 'active',
    verified: true,
    joinDate: 'Apr 10, 2024',
    availability: 'available'
  }
];

export function PartnerIndividualsScreen() {
  const [individuals] = useState<PartnerIndividual[]>(mockPartnerIndividuals);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<PartnerIndividual | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isJobsDialogOpen, setIsJobsDialogOpen] = useState(false);
  const [isCoverageDialogOpen, setIsCoverageDialogOpen] = useState(false);
  const [isVerificationDialogOpen, setIsVerificationDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Document upload states
  const [aadharDoc, setAadharDoc] = useState<File | null>(null);
  const [panDoc, setPanDoc] = useState<File | null>(null);
  const [photoDoc, setPhotoDoc] = useState<File | null>(null);
  const [addressProofDoc, setAddressProofDoc] = useState<File | null>(null);
  const [certificationDoc, setCertificationDoc] = useState<File | null>(null);

  const filteredIndividuals = individuals.filter(individual => {
    const matchesSearch = 
      individual.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      individual.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      individual.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      individual.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || individual.status === statusFilter;
    
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

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (partner: PartnerIndividual) => {
    setSelectedPartner(partner);
    setIsDetailsDialogOpen(true);
  };

  const handleViewJobs = (partner: PartnerIndividual) => {
    setSelectedPartner(partner);
    setIsJobsDialogOpen(true);
  };

  const handleManageCoverage = (partner: PartnerIndividual) => {
    setSelectedPartner(partner);
    setIsCoverageDialogOpen(true);
  };

  const handleVerificationToggle = (partner: PartnerIndividual) => {
    setSelectedPartner(partner);
    setIsVerificationDialogOpen(true);
  };

  const handleSuspendToggle = (partner: PartnerIndividual) => {
    setSelectedPartner(partner);
    setIsSuspendDialogOpen(true);
  };

  const mockJobs = [
    { id: 'BK1234', service: 'Plumbing', customer: 'Priya Sharma', date: 'Dec 28, 2024', amount: '₹1,500', status: 'completed' },
    { id: 'BK1235', service: 'Electrical', customer: 'Amit Patel', date: 'Dec 27, 2024', amount: '₹1,200', status: 'completed' },
    { id: 'BK1236', service: 'Plumbing', customer: 'Sunita Roy', date: 'Dec 26, 2024', amount: '₹1,800', status: 'completed' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: File | null) => void) => {
    const file = e.target.files?.[0] || null;
    setter(file);
  };

  const renderAddPartnerForm = () => {
    if (currentStep === 1) {
      return (
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h4 className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h4>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="partner-name">Full Name *</Label>
                  <Input id="partner-name" placeholder="Enter full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="partner-phone">Phone Number *</Label>
                  <Input id="partner-phone" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="partner-email">Email</Label>
                <Input id="partner-email" type="email" placeholder="partner@email.com" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Address Information
            </h4>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="house-address">House/Flat No., Building Name *</Label>
                <Input id="house-address" placeholder="e.g., 101, Krishna Apartments" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="area">Area, Street, Locality</Label>
                <Input id="area" placeholder="e.g., Andheri West" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="landmark">Landmark</Label>
                <Input id="landmark" placeholder="e.g., Near Metro Station" />
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
              Skills & Coverage
            </h4>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="specialization">Specialization/Skills *</Label>
                <Textarea 
                  id="specialization" 
                  placeholder="Enter skills (comma-separated)"
                  rows={2}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="partner-coverage">Coverage Areas (PIN codes) *</Label>
                <Textarea 
                  id="partner-coverage" 
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
                <Label htmlFor="aadhar-doc">Aadhar Card *</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="aadhar-doc" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setAadharDoc)}
                  />
                  {aadharDoc && <CheckCircle className="h-4 w-4 text-green-600" />}
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
                <Label htmlFor="photo-doc">Passport Size Photo *</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="photo-doc" 
                    type="file" 
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setPhotoDoc)}
                  />
                  {photoDoc && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address-proof-doc">Address Proof (Utility Bill/Rent Agreement)</Label>
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

              <div className="grid gap-2">
                <Label htmlFor="certification-doc">Skill Certification/Training Certificate (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="certification-doc" 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, setCertificationDoc)}
                  />
                  {certificationDoc && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Individual Partners</h2>
          <p className="text-muted-foreground">Manage individual service providers and technicians</p>
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
            Add Partner
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Individuals</CardDescription>
            <CardTitle>1,234</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +45 this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Partners</CardDescription>
            <CardTitle>1,089</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              88.2% of total
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Currently Available</CardDescription>
            <CardTitle>456</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Ready for jobs
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg. Earnings</CardDescription>
            <CardTitle>₹2,15,000</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Per partner/month
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
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner ID</TableHead>
                <TableHead>Name & Contact</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIndividuals.map((individual) => (
                <TableRow key={individual.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {individual.verified && (
                        <Award className="h-3 w-3 text-blue-500" />
                      )}
                      <span>{individual.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{individual.name}</span>
                      </div>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {individual.email}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {individual.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {individual.specialization.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1">
                      <MapPin className="h-3 w-3 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm">{individual.coverageAreas.length} areas</div>
                        <div className="text-xs text-muted-foreground">
                          {individual.coverageAreas.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{individual.rating}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {individual.totalJobs} jobs
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {individual.earnings}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getAvailabilityColor(individual.availability)}>
                      {individual.availability}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(individual.status)}>
                      {individual.status}
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
                        <DropdownMenuItem onClick={() => handleViewDetails(individual)}>
                          <User className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewJobs(individual)}>
                          <Package className="h-4 w-4 mr-2" />
                          View Jobs
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleManageCoverage(individual)}>
                          <MapPin className="h-4 w-4 mr-2" />
                          Manage Coverage
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleVerificationToggle(individual)}>
                          <Award className="h-4 w-4 mr-2" />
                          {individual.verified ? 'Revoke' : 'Grant'} Verification
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleSuspendToggle(individual)}
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          {individual.status === 'suspended' ? 'Activate' : 'Suspend'} Partner
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

      {/* Add Partner Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Individual Partner - Step {currentStep} of 2</DialogTitle>
            <DialogDescription>
              {currentStep === 1 
                ? 'Enter personal details, address, and skill information' 
                : 'Upload verification documents for partner approval'}
            </DialogDescription>
          </DialogHeader>
          
          {renderAddPartnerForm()}

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              if (currentStep > 1) {
                setCurrentStep(1);
              } else {
                setIsAddDialogOpen(false);
                setCurrentStep(1);
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
                alert('Partner added successfully! Documents will be verified within 24 hours.');
              }
            }}>
              {currentStep === 1 ? 'Next: Upload Documents' : 'Save Partner'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Partner Details</DialogTitle>
            <DialogDescription>
              Complete information for {selectedPartner?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedPartner && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Partner ID</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      {selectedPartner.verified && <Award className="h-4 w-4 text-blue-500" />}
                      <p>{selectedPartner.id}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getStatusColor(selectedPartner.status)}>
                      {selectedPartner.status}
                    </Badge>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Availability</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={getAvailabilityColor(selectedPartner.availability)}>
                      {selectedPartner.availability}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info">Personal Info</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Full Name</Label>
                        <p className="mt-1">{selectedPartner.name}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Join Date</Label>
                        <p className="mt-1">{selectedPartner.joinDate}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-muted-foreground">Email</Label>
                        <p className="mt-1">{selectedPartner.email}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground">Phone</Label>
                        <p className="mt-1">{selectedPartner.phone}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Specialization</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedPartner.specialization.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Coverage Areas</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedPartner.coverageAreas.map((area, index) => (
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
                          <span>{selectedPartner.totalJobs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Average Rating</span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {selectedPartner.rating}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Earnings</span>
                          <span>{selectedPartner.earnings}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Verified</span>
                          <span>{selectedPartner.verified ? 'Yes' : 'No'}</span>
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
                              <p className="text-sm">8 jobs completed</p>
                              <p className="text-xs text-muted-foreground">Last 7 days</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Calendar className="h-4 w-4 text-blue-600 mt-1" />
                            <div className="flex-1">
                              <p className="text-sm">Available for bookings</p>
                              <p className="text-xs text-muted-foreground">Currently {selectedPartner.availability}</p>
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
                          <p className="text-sm">Aadhar Card</p>
                          <p className="text-xs text-muted-foreground">Uploaded on {selectedPartner.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">Verified</Badge>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">PAN Card</p>
                          <p className="text-xs text-muted-foreground">Uploaded on {selectedPartner.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">Verified</Badge>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">Passport Photo</p>
                          <p className="text-xs text-muted-foreground">Uploaded on {selectedPartner.joinDate}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="partnerNotes">Admin Notes</Label>
                    <Textarea 
                      id="partnerNotes" 
                      placeholder="Add internal notes about this partner..."
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
              if (selectedPartner) {
                handleViewJobs(selectedPartner);
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
            <DialogTitle>Partner Jobs</DialogTitle>
            <DialogDescription>
              All jobs completed by {selectedPartner?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedPartner && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Jobs</CardDescription>
                    <CardTitle>{selectedPartner.totalJobs}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Earnings</CardDescription>
                    <CardTitle>{selectedPartner.earnings}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle>8</CardTitle>
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
              Update service coverage areas for {selectedPartner?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedPartner && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Current Coverage Areas</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedPartner.coverageAreas.map((area, index) => (
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

      {/* Verification Toggle Dialog */}
      <AlertDialog open={isVerificationDialogOpen} onOpenChange={setIsVerificationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedPartner?.verified ? 'Revoke' : 'Grant'} Verification?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPartner?.verified 
                ? `Are you sure you want to revoke verification for ${selectedPartner?.name}? They will lose their verified badge.`
                : `Are you sure you want to grant verification to ${selectedPartner?.name}? This will display a verified badge on their profile.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              alert(`Verification ${selectedPartner?.verified ? 'revoked' : 'granted'} successfully!`);
              setIsVerificationDialogOpen(false);
            }}>
              {selectedPartner?.verified ? 'Revoke' : 'Grant'} Verification
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Suspend/Activate Dialog */}
      <AlertDialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedPartner?.status === 'suspended' ? 'Activate' : 'Suspend'} Partner?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPartner?.status === 'suspended' 
                ? `Are you sure you want to activate ${selectedPartner?.name}? They will be able to accept new jobs.`
                : `Are you sure you want to suspend ${selectedPartner?.name}? They will be unable to accept new jobs.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              alert(`Partner ${selectedPartner?.status === 'suspended' ? 'activated' : 'suspended'} successfully!`);
              setIsSuspendDialogOpen(false);
            }}>
              {selectedPartner?.status === 'suspended' ? 'Activate' : 'Suspend'} Partner
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
