import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Search, Plus, MoreVertical, Download, Filter, Tag, Calendar, Users, IndianRupee, Edit, Trash2, Copy } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

interface Promotion {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: string;
  minOrderValue: string;
  maxDiscount?: string;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validTill: string;
  isActive: boolean;
  applicableServices: string[];
}

const mockPromotions: Promotion[] = [
  {
    id: 'PROMO001',
    code: 'WELCOME50',
    title: 'Welcome Offer',
    description: 'First time users get 50% off',
    discountType: 'percentage',
    discountValue: '50%',
    minOrderValue: '₹500',
    maxDiscount: '₹250',
    usageLimit: 1000,
    usedCount: 456,
    validFrom: 'Jan 01, 2024',
    validTill: 'Dec 31, 2024',
    isActive: true,
    applicableServices: ['All Services']
  },
  {
    id: 'PROMO002',
    code: 'CLEAN200',
    title: 'Cleaning Special',
    description: 'Flat ₹200 off on cleaning services',
    discountType: 'flat',
    discountValue: '₹200',
    minOrderValue: '₹1,000',
    usageLimit: 500,
    usedCount: 234,
    validFrom: 'Dec 01, 2024',
    validTill: 'Jan 31, 2025',
    isActive: true,
    applicableServices: ['Home Cleaning', 'Deep Cleaning']
  },
  {
    id: 'PROMO003',
    code: 'FESTIVE25',
    title: 'Festival Dhamaka',
    description: '25% off on all services',
    discountType: 'percentage',
    discountValue: '25%',
    minOrderValue: '₹800',
    maxDiscount: '₹500',
    usageLimit: 2000,
    usedCount: 1567,
    validFrom: 'Dec 15, 2024',
    validTill: 'Jan 15, 2025',
    isActive: true,
    applicableServices: ['All Services']
  },
  {
    id: 'PROMO004',
    code: 'REPAIR100',
    title: 'Repair Discount',
    description: 'Flat ₹100 off on repairs',
    discountType: 'flat',
    discountValue: '₹100',
    minOrderValue: '₹500',
    usageLimit: 300,
    usedCount: 145,
    validFrom: 'Nov 01, 2024',
    validTill: 'Nov 30, 2024',
    isActive: false,
    applicableServices: ['AC Repair', 'Refrigerator Repair']
  }
];

export function PromotionsScreen() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = 
      promo.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && promo.isActive) ||
      (statusFilter === 'inactive' && !promo.isActive);
    
    return matchesSearch && matchesStatus;
  });

  const handleToggleActive = (promoId: string) => {
    setPromotions(promotions.map(promo => 
      promo.id === promoId ? { ...promo, isActive: !promo.isActive } : promo
    ));
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Promotions</h2>
          <p className="text-muted-foreground">Manage promotional codes and discount offers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Create Promotion
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Promotions</CardDescription>
            <CardTitle>{promotions.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {promotions.filter(p => p.isActive).length} active
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Usage</CardDescription>
            <CardTitle>
              {promotions.reduce((sum, p) => sum + p.usedCount, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              All time
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Campaigns</CardDescription>
            <CardTitle>{promotions.filter(p => p.isActive).length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Currently running
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg. Redemption</CardDescription>
            <CardTitle>
              {Math.round(promotions.reduce((sum, p) => sum + getUsagePercentage(p.usedCount, p.usageLimit), 0) / promotions.length)}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Of total limit
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
                placeholder="Search by code, title, or description..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Promo Code</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Applicable On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="font-mono">{promo.code}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{promo.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {promo.description}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Min order: {promo.minOrderValue}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1">
                        {promo.discountType === 'percentage' ? (
                          <Badge variant="secondary">{promo.discountValue} OFF</Badge>
                        ) : (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <IndianRupee className="h-3 w-3" />
                            {promo.discountValue} OFF
                          </Badge>
                        )}
                      </div>
                      {promo.maxDiscount && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Max: {promo.maxDiscount}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span>{promo.usedCount} / {promo.usageLimit}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getUsagePercentage(promo.usedCount, promo.usageLimit)}% used
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1">
                      <Calendar className="h-3 w-3 mt-0.5 text-muted-foreground" />
                      <div className="text-xs">
                        <div>From: {promo.validFrom}</div>
                        <div>Till: {promo.validTill}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {promo.applicableServices.slice(0, 2).map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {promo.applicableServices.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{promo.applicableServices.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={promo.isActive}
                        onCheckedChange={() => handleToggleActive(promo.id)}
                      />
                      <span className="text-sm">
                        {promo.isActive ? 'Active' : 'Inactive'}
                      </span>
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
                        <DropdownMenuItem>
                          <Edit className="h-3 w-3 mr-2" />
                          Edit Promotion
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-3 w-3 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Usage Report
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
            <DialogTitle>Create New Promotion</DialogTitle>
            <DialogDescription>
              Set up a new promotional offer for customers
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="promo-code">Promo Code</Label>
                <Input id="promo-code" placeholder="e.g., WELCOME50" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="promo-title">Title</Label>
                <Input id="promo-title" placeholder="e.g., Welcome Offer" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="promo-description">Description</Label>
              <Textarea 
                id="promo-description" 
                placeholder="Describe the offer..."
                rows={2}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="discount-type">Discount Type</Label>
                <Select>
                  <SelectTrigger id="discount-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="flat">Flat Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="discount-value">Discount Value</Label>
                <Input id="discount-value" placeholder="50 or 200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max-discount">Max Discount (₹)</Label>
                <Input id="max-discount" placeholder="Optional" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="min-order">Min Order Value (₹)</Label>
                <Input id="min-order" placeholder="500" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="usage-limit">Usage Limit</Label>
                <Input id="usage-limit" type="number" placeholder="1000" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="valid-from">Valid From</Label>
                <Input id="valid-from" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="valid-till">Valid Till</Label>
                <Input id="valid-till" type="date" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="services">Applicable Services</Label>
              <Textarea 
                id="services" 
                placeholder="Enter services (comma-separated) or 'All Services'"
                rows={2}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch id="promo-active" defaultChecked />
              <Label htmlFor="promo-active">Activate promotion immediately</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Create Promotion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
