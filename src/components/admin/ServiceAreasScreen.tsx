import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Search, Plus, MoreVertical, Download, Filter, MapPin, Edit, Trash2, Users, CheckCircle2, XCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';

interface ServiceArea {
  id: string;
  pincode: string;
  city: string;
  state: string;
  locality: string;
  services: string[];
  partnersAvailable: number;
  isActive: boolean;
  totalBookings: number;
  lastUpdated: string;
  coverage: 'full' | 'partial' | 'limited';
}

const mockServiceAreas: ServiceArea[] = [
  {
    id: 'SA001',
    pincode: '400001',
    city: 'Mumbai',
    state: 'Maharashtra',
    locality: 'Fort, South Mumbai',
    services: ['Plumbing', 'Electrical', 'AC Repair', 'Home Cleaning'],
    partnersAvailable: 45,
    isActive: true,
    totalBookings: 1234,
    lastUpdated: 'Dec 25, 2024',
    coverage: 'full'
  },
  {
    id: 'SA002',
    pincode: '400002',
    city: 'Mumbai',
    state: 'Maharashtra',
    locality: 'Kalbadevi, South Mumbai',
    services: ['Plumbing', 'Electrical', 'Carpentry'],
    partnersAvailable: 32,
    isActive: true,
    totalBookings: 987,
    lastUpdated: 'Dec 24, 2024',
    coverage: 'full'
  },
  {
    id: 'SA003',
    pincode: '110001',
    city: 'Delhi',
    state: 'NCR',
    locality: 'Connaught Place',
    services: ['Plumbing', 'Electrical', 'AC Repair'],
    partnersAvailable: 28,
    isActive: true,
    totalBookings: 756,
    lastUpdated: 'Dec 22, 2024',
    coverage: 'partial'
  },
  {
    id: 'SA004',
    pincode: '560001',
    city: 'Bangalore',
    state: 'Karnataka',
    locality: 'MG Road, Central',
    services: ['All Services'],
    partnersAvailable: 67,
    isActive: true,
    totalBookings: 1456,
    lastUpdated: 'Dec 26, 2024',
    coverage: 'full'
  },
  {
    id: 'SA005',
    pincode: '700001',
    city: 'Kolkata',
    state: 'West Bengal',
    locality: 'BBD Bagh',
    services: ['Plumbing', 'Electrical'],
    partnersAvailable: 18,
    isActive: true,
    totalBookings: 445,
    lastUpdated: 'Dec 20, 2024',
    coverage: 'limited'
  },
  {
    id: 'SA006',
    pincode: '411001',
    city: 'Pune',
    state: 'Maharashtra',
    locality: 'Shivajinagar',
    services: ['Plumbing'],
    partnersAvailable: 12,
    isActive: false,
    totalBookings: 234,
    lastUpdated: 'Dec 15, 2024',
    coverage: 'limited'
  }
];

const states = [
  'Maharashtra',
  'Delhi NCR',
  'Karnataka',
  'West Bengal',
  'Tamil Nadu',
  'Gujarat',
  'Rajasthan',
  'Uttar Pradesh'
];

const allServices = [
  'Plumbing',
  'Electrical',
  'AC Repair',
  'Refrigerator Repair',
  'Home Cleaning',
  'Deep Cleaning',
  'Carpentry',
  'Painting',
  'Pest Control'
];

export function ServiceAreasScreen() {
  const [areas, setAreas] = useState<ServiceArea[]>(mockServiceAreas);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [coverageFilter, setCoverageFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);

  const filteredAreas = areas.filter(area => {
    const matchesSearch = 
      area.pincode.includes(searchQuery) ||
      area.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      area.locality.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = stateFilter === 'all' || area.state === stateFilter;
    const matchesCoverage = coverageFilter === 'all' || area.coverage === coverageFilter;
    
    return matchesSearch && matchesState && matchesCoverage;
  });

  const handleToggleActive = (areaId: string) => {
    setAreas(areas.map(area => 
      area.id === areaId ? { ...area, isActive: !area.isActive } : area
    ));
  };

  const handleEdit = (area: ServiceArea) => {
    setSelectedArea(area);
    setIsEditDialogOpen(true);
  };

  const getCoverageColor = (coverage: string) => {
    switch (coverage) {
      case 'full':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'limited':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Service Areas</h2>
          <p className="text-muted-foreground">Manage PIN codes and service coverage areas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Area
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Service Areas</CardDescription>
            <CardTitle>{areas.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Across {states.length} states
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Areas</CardDescription>
            <CardTitle>{areas.filter(a => a.isActive).length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Currently serving
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Partners</CardDescription>
            <CardTitle>202</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Across all areas
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Full Coverage</CardDescription>
            <CardTitle>{areas.filter(a => a.coverage === 'full').length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              All services available
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
                placeholder="Search by PIN code, city, or locality..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={coverageFilter} onValueChange={setCoverageFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Coverage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Coverage</SelectItem>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="limited">Limited</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PIN Code</TableHead>
                <TableHead>Location Details</TableHead>
                <TableHead>Services Available</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Partners</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAreas.map((area) => (
                <TableRow key={area.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{area.pincode}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{area.locality}</div>
                      <div className="text-xs text-muted-foreground">
                        {area.city}, {area.state}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {area.services.includes('All Services') ? (
                        <Badge variant="secondary" className="text-xs">
                          All Services
                        </Badge>
                      ) : (
                        <>
                          {area.services.slice(0, 2).map((service, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {area.services.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{area.services.length - 2}
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCoverageColor(area.coverage)}>
                      {area.coverage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{area.partnersAvailable}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{area.totalBookings}</div>
                    <div className="text-xs text-muted-foreground">
                      Updated: {area.lastUpdated}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {area.isActive ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-400" />
                      )}
                      <Switch 
                        checked={area.isActive}
                        onCheckedChange={() => handleToggleActive(area.id)}
                      />
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
                        <DropdownMenuItem onClick={() => handleEdit(area)}>
                          <Edit className="h-3 w-3 mr-2" />
                          Edit Area
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Partners
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Bookings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Manage Services
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-3 w-3 mr-2" />
                          Remove Area
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
            <DialogTitle>Add New Service Area</DialogTitle>
            <DialogDescription>
              Add a new PIN code area to the service coverage
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input id="pincode" placeholder="e.g., 400001" maxLength={6} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="e.g., Mumbai" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Select>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="coverage-level">Coverage Level</Label>
                <Select>
                  <SelectTrigger id="coverage-level">
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Coverage</SelectItem>
                    <SelectItem value="partial">Partial Coverage</SelectItem>
                    <SelectItem value="limited">Limited Coverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="locality">Locality/Area Name</Label>
              <Input id="locality" placeholder="e.g., Fort, South Mumbai" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="available-services">Available Services</Label>
              <Textarea 
                id="available-services" 
                placeholder="Enter services (comma-separated) or 'All Services'"
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="area-active" defaultChecked />
              <Label htmlFor="area-active">Activate area immediately</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Add Area
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Service Area</DialogTitle>
            <DialogDescription>
              Update service area details
            </DialogDescription>
          </DialogHeader>
          {selectedArea && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-pincode">PIN Code</Label>
                  <Input 
                    id="edit-pincode" 
                    defaultValue={selectedArea.pincode}
                    maxLength={6}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-city">City</Label>
                  <Input 
                    id="edit-city" 
                    defaultValue={selectedArea.city}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-state">State</Label>
                  <Select defaultValue={selectedArea.state}>
                    <SelectTrigger id="edit-state">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-coverage-level">Coverage Level</Label>
                  <Select defaultValue={selectedArea.coverage}>
                    <SelectTrigger id="edit-coverage-level">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Coverage</SelectItem>
                      <SelectItem value="partial">Partial Coverage</SelectItem>
                      <SelectItem value="limited">Limited Coverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-locality">Locality/Area Name</Label>
                <Input 
                  id="edit-locality" 
                  defaultValue={selectedArea.locality}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-available-services">Available Services</Label>
                <Textarea 
                  id="edit-available-services" 
                  defaultValue={selectedArea.services.join(', ')}
                  rows={3}
                />
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
