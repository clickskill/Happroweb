import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Search, Download, Filter, IndianRupee, Calendar, CreditCard, User, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Transaction {
  id: string;
  bookingId: string;
  customer: string;
  service: string;
  amount: string;
  paymentMethod: 'online' | 'cod' | 'wallet';
  status: 'success' | 'pending' | 'failed' | 'refunded';
  transactionDate: string;
  gateway: string;
  gatewayTxnId: string;
}

const mockTransactions: Transaction[] = [
  {
    id: 'TXN001',
    bookingId: 'HP12349',
    customer: 'Priya Sharma',
    service: 'Home Cleaning',
    amount: '₹1,060',
    paymentMethod: 'online',
    status: 'success',
    transactionDate: 'Dec 28, 2024 10:30 AM',
    gateway: 'Razorpay',
    gatewayTxnId: 'pay_NdQvHmXYZ123'
  },
  {
    id: 'TXN002',
    bookingId: 'HP12350',
    customer: 'Amit Patel',
    service: 'Plumbing',
    amount: '₹760',
    paymentMethod: 'cod',
    status: 'success',
    transactionDate: 'Dec 28, 2024 11:15 AM',
    gateway: 'Cash',
    gatewayTxnId: 'N/A'
  },
  {
    id: 'TXN003',
    bookingId: 'HP12351',
    customer: 'Sunita Roy',
    service: 'Electrical',
    amount: '₹1,200',
    paymentMethod: 'online',
    status: 'pending',
    transactionDate: 'Dec 28, 2024 12:00 PM',
    gateway: 'Razorpay',
    gatewayTxnId: 'pay_NdQvHmXYZ124'
  },
  {
    id: 'TXN004',
    bookingId: 'HP12345',
    customer: 'Rajesh Kumar',
    service: 'AC Repair',
    amount: '₹2,500',
    paymentMethod: 'online',
    status: 'failed',
    transactionDate: 'Dec 27, 2024 03:45 PM',
    gateway: 'Razorpay',
    gatewayTxnId: 'pay_NdQvHmXYZ125'
  },
  {
    id: 'TXN005',
    bookingId: 'HP12340',
    customer: 'Kavita Singh',
    service: 'Carpentry',
    amount: '₹1,800',
    paymentMethod: 'online',
    status: 'refunded',
    transactionDate: 'Dec 27, 2024 01:20 PM',
    gateway: 'Razorpay',
    gatewayTxnId: 'pay_NdQvHmXYZ126'
  }
];

export function TransactionsScreen() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = 
      txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.gatewayTxnId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || txn.paymentMethod === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'online':
        return 'bg-purple-100 text-purple-800';
      case 'cod':
        return 'bg-orange-100 text-orange-800';
      case 'wallet':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = transactions
    .filter(t => t.status === 'success')
    .reduce((sum, t) => sum + parseFloat(t.amount.replace('₹', '').replace(',', '')), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Transactions</h2>
          <p className="text-muted-foreground">View and manage all payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Transactions</CardDescription>
            <CardTitle>{transactions.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              All time
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Successful</CardDescription>
            <CardTitle>₹{totalAmount.toLocaleString('en-IN')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {transactions.filter(t => t.status === 'success').length} transactions
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pending</CardDescription>
            <CardTitle>{transactions.filter(t => t.status === 'pending').length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Awaiting confirmation
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Failed/Refunded</CardDescription>
            <CardTitle>{transactions.filter(t => t.status === 'failed' || t.status === 'refunded').length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Requires attention
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
                placeholder="Search by transaction ID, booking ID, customer..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-[150px]">
                <CreditCard className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="cod">COD</SelectItem>
                <SelectItem value="wallet">Wallet</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Booking Details</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Gateway</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date & Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3 w-3 text-muted-foreground" />
                      <span className="font-mono text-sm">{txn.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{txn.bookingId}</div>
                      <div className="text-xs text-muted-foreground">{txn.service}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span>{txn.customer}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-3 w-3 text-muted-foreground" />
                      <span>{txn.amount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getMethodColor(txn.paymentMethod)}>
                      {txn.paymentMethod.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{txn.gateway}</div>
                      <div className="text-xs text-muted-foreground font-mono">
                        {txn.gatewayTxnId}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(txn.status)}>
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {txn.transactionDate}
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
}
