import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Search, Download, Filter, IndianRupee, Calendar, Building, User, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

interface Payout {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerType: 'company' | 'individual';
  amount: string;
  jobsCompleted: number;
  commission: string;
  netPayout: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  payoutDate: string;
  bankAccount: string;
  utrNumber?: string;
}

const mockPayouts: Payout[] = [
  {
    id: 'PO001',
    partnerId: 'PC001',
    partnerName: 'ABC Home Services Pvt Ltd',
    partnerType: 'company',
    amount: '₹45,000',
    jobsCompleted: 45,
    commission: '₹6,750',
    netPayout: '₹38,250',
    status: 'completed',
    payoutDate: 'Dec 25, 2024',
    bankAccount: 'HDFC **** 4567',
    utrNumber: 'UTR123456789012'
  },
  {
    id: 'PO002',
    partnerId: 'PI001',
    partnerName: 'Rajesh Kumar',
    partnerType: 'individual',
    amount: '₹28,500',
    jobsCompleted: 28,
    commission: '₹4,275',
    netPayout: '₹24,225',
    status: 'completed',
    payoutDate: 'Dec 25, 2024',
    bankAccount: 'SBI **** 8901',
    utrNumber: 'UTR123456789013'
  },
  {
    id: 'PO003',
    partnerId: 'PC002',
    partnerName: 'QuickFix Solutions Ltd',
    partnerType: 'company',
    amount: '₹32,000',
    jobsCompleted: 32,
    commission: '₹4,800',
    netPayout: '₹27,200',
    status: 'processing',
    payoutDate: 'Dec 28, 2024',
    bankAccount: 'ICICI **** 2345'
  },
  {
    id: 'PO004',
    partnerId: 'PI002',
    partnerName: 'Suresh Singh',
    partnerType: 'individual',
    amount: '₹22,800',
    jobsCompleted: 22,
    commission: '₹3,420',
    netPayout: '₹19,380',
    status: 'pending',
    payoutDate: 'Dec 30, 2024',
    bankAccount: 'Axis **** 6789'
  },
  {
    id: 'PO005',
    partnerId: 'PC003',
    partnerName: 'CleanHome Services',
    partnerType: 'company',
    amount: '₹56,000',
    jobsCompleted: 56,
    commission: '₹8,400',
    netPayout: '₹47,600',
    status: 'pending',
    payoutDate: 'Dec 30, 2024',
    bankAccount: 'HDFC **** 1234'
  },
  {
    id: 'PO006',
    partnerId: 'PI003',
    partnerName: 'Vikas Sharma',
    partnerType: 'individual',
    amount: '₹18,500',
    jobsCompleted: 18,
    commission: '₹2,775',
    netPayout: '₹15,725',
    status: 'failed',
    payoutDate: 'Dec 27, 2024',
    bankAccount: 'SBI **** 3456'
  }
];

export function PartnerPayoutsScreen() {
  const [payouts] = useState<Payout[]>(mockPayouts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isProcessDialogOpen, setIsProcessDialogOpen] = useState(false);

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = 
      payout.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.partnerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payout.partnerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payout.status === statusFilter;
    const matchesType = typeFilter === 'all' || payout.partnerType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-3 w-3" />;
      case 'processing':
        return <Clock className="h-3 w-3" />;
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'failed':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const totalPending = payouts
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + parseFloat(p.netPayout.replace('₹', '').replace(',', '')), 0);

  const totalCompleted = payouts
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + parseFloat(p.netPayout.replace('₹', '').replace(',', '')), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Partner Payouts</h2>
          <p className="text-muted-foreground">Manage partner earnings and payout schedules</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2" onClick={() => setIsProcessDialogOpen(true)}>
            Process Pending Payouts
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending Payouts</CardDescription>
            <CardTitle>₹{totalPending.toLocaleString('en-IN')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {payouts.filter(p => p.status === 'pending').length} partners
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed (This Month)</CardDescription>
            <CardTitle>₹{totalCompleted.toLocaleString('en-IN')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {payouts.filter(p => p.status === 'completed').length} payouts
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Processing</CardDescription>
            <CardTitle>{payouts.filter(p => p.status === 'processing').length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              In progress
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Failed</CardDescription>
            <CardTitle>{payouts.filter(p => p.status === 'failed').length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Needs retry
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
                placeholder="Search by payout ID, partner name, or ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <Building className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payout ID</TableHead>
                <TableHead>Partner Details</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Amount Breakdown</TableHead>
                <TableHead>Bank Account</TableHead>
                <TableHead>Payout Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>UTR Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell className="font-mono">{payout.id}</TableCell>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      {payout.partnerType === 'company' ? (
                        <Building className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      ) : (
                        <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      )}
                      <div>
                        <div>{payout.partnerName}</div>
                        <div className="text-xs text-muted-foreground">
                          {payout.partnerId} • {payout.partnerType}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{payout.jobsCompleted}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <IndianRupee className="h-3 w-3 text-muted-foreground" />
                        <span>Gross: {payout.amount}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Commission: {payout.commission}
                      </div>
                      <div className="text-sm">
                        Net: {payout.netPayout}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{payout.bankAccount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {payout.payoutDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(payout.status)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(payout.status)}
                      {payout.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {payout.utrNumber ? (
                      <span className="font-mono text-xs">{payout.utrNumber}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Pending</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isProcessDialogOpen} onOpenChange={setIsProcessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Pending Payouts</DialogTitle>
            <DialogDescription>
              This will initiate payout processing for all pending partner payments
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <div>
                  <p className="text-sm">Total Pending Payouts</p>
                  <p className="text-xs text-muted-foreground">
                    {payouts.filter(p => p.status === 'pending').length} partners
                  </p>
                </div>
                <p className="text-xl">₹{totalPending.toLocaleString('en-IN')}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Once processed, payouts will be initiated through the configured payment gateway. 
                This action cannot be undone.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsProcessDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsProcessDialogOpen(false)}>
              Confirm & Process
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
