import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Search, Plus, MoreVertical, Download, Filter, Wrench, Edit, Trash2, Eye, IndianRupee } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: string;
  duration: string;
  isActive: boolean;
  totalBookings: number;
  revenue: string;
  rating: number;
  lastUpdated: string;
}

const mockServices: Service[] = [
  {
    id: 'SV001',
    name: 'Basic Plumbing Service',
    category: 'Plumbing',
    description: 'Tap repair, leak fixing, pipe installation',
    basePrice: '₹500',
    duration: '1-2 hours',
    isActive: true,
    totalBookings: 1234,
    revenue: '₹6,17,000',
    rating: 4.7,
    lastUpdated: 'Dec 20, 2024'
  },
  {
    id: 'SV002',
    name: 'AC Service & Repair',
    category: 'AC Repair',
    description: 'AC cleaning, gas refilling, general maintenance',
    basePrice: '₹800',
    duration: '2-3 hours',
    isActive: true,
    totalBookings: 987,
    revenue: '₹7,89,600',
    rating: 4.8,
    lastUpdated: 'Dec 22, 2024'
  },
  {
    id: 'SV003',
    name: 'Home Deep Cleaning',
    category: 'Home Cleaning',
    description: 'Complete house cleaning including kitchen, bathroom, floors',
    basePrice: '₹2,500',
    duration: '4-6 hours',
    isActive: true,
    totalBookings: 756,
    revenue: '₹18,90,000',
    rating: 4.9,
    lastUpdated: 'Dec 25, 2024'
  },
  {
    id: 'SV004',
    name: 'Electrical Wiring & Installation',
    category: 'Electrical',
    description: 'New wiring, switchboard installation, electrical fixtures',
    basePrice: '₹1,200',
    duration: '3-4 hours',
    isActive: true,
    totalBookings: 567,
    revenue: '₹6,80,400',
    rating: 4.6,
    lastUpdated: 'Dec 18, 2024'
  },
  {
    id: 'SV005',
    name: 'Carpentry & Furniture Repair',
    category: 'Carpentry',
    description: 'Furniture assembly, repairs, and custom carpentry',
    basePrice: '₹900',
    duration: '2-4 hours',
    isActive: true,
    totalBookings: 445,
    revenue: '₹4,00,500',
    rating: 4.5,
    lastUpdated: 'Dec 15, 2024'
  },
  {
    id: 'SV006',
    name: 'Painting Service',
    category: 'Painting',
    description: 'Interior and exterior painting services',
    basePrice: '₹3,000',
    duration: '1-2 days',
    isActive: false,
    totalBookings: 234,
    revenue: '₹7,02,000',
    rating: 4.4,
    lastUpdated: 'Nov 30, 2024'
  }
];

const categories = [
  'Plumbing',
  'Electrical',
  'AC Repair',
  'Refrigerator Repair',
  'Washing Machine Repair',
  'Home Cleaning',
  'Deep Cleaning',
  'Carpentry',
  'Painting',
  'Pest Control',
  'Appliance Repair'
];

export function ServiceCatalogScreen() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleToggleActive = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId ? { ...service, isActive: !service.isActive } : service
    ));
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Service Catalog</h2>
          <p className="text-muted-foreground">Manage all services offered on the platform</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Services</CardDescription>
            <CardTitle>{services.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {categories.length} categories
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Services</CardDescription>
            <CardTitle>{services.filter(s => s.isActive).length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Currently available
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Bookings</CardDescription>
            <CardTitle>4,223</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              All time
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle>₹50,79,500</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              From all services
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
                placeholder="Search services by name, description, or ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service ID</TableHead>
                <TableHead>Service Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                        <span>{service.name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {service.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{service.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="h-3 w-3 text-muted-foreground" />
                        <span>{service.basePrice}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {service.duration}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{service.totalBookings} bookings</div>
                      <div className="text-xs text-muted-foreground">
                        Revenue: {service.revenue}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Rating: {service.rating}★
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={service.isActive}
                        onCheckedChange={() => handleToggleActive(service.id)}
                      />
                      <span className="text-sm">
                        {service.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground">
                      {service.lastUpdated}
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
                        <DropdownMenuItem onClick={() => handleEdit(service)}>
                          <Edit className="h-3 w-3 mr-2" />
                          Edit Service
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-3 w-3 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Bookings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-3 w-3 mr-2" />
                          Delete Service
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
            <DialogTitle>Add New Service</DialogTitle>
            <DialogDescription>
              Create a new service in the catalog
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="service-name">Service Name</Label>
                <Input id="service-name" placeholder="e.g., Basic Plumbing Service" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="service-category">Category</Label>
                <Select>
                  <SelectTrigger id="service-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="service-description">Description</Label>
              <Textarea 
                id="service-description" 
                placeholder="Describe what this service includes..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="base-price">Base Price (₹)</Label>
                <Input id="base-price" type="number" placeholder="500" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" placeholder="e.g., 1-2 hours" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="is-active" defaultChecked />
              <Label htmlFor="is-active">Make service active immediately</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update service details
            </DialogDescription>
          </DialogHeader>
          {selectedService && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-service-name">Service Name</Label>
                  <Input 
                    id="edit-service-name" 
                    defaultValue={selectedService.name}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-service-category">Category</Label>
                  <Select defaultValue={selectedService.category}>
                    <SelectTrigger id="edit-service-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-service-description">Description</Label>
                <Textarea 
                  id="edit-service-description" 
                  defaultValue={selectedService.description}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-base-price">Base Price (₹)</Label>
                  <Input 
                    id="edit-base-price" 
                    type="number" 
                    defaultValue={selectedService.basePrice.replace('₹', '')}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-duration">Duration</Label>
                  <Input 
                    id="edit-duration" 
                    defaultValue={selectedService.duration}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
