import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { KPICard } from '../ui/kpi-card';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { StatusChip } from '../ui/status-chip';
import { tipsData } from './mockData';
import { IndianRupee, TrendingUp, Users, Download } from 'lucide-react';

export function TipsLedgerScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Tips Ledger</h1>
          <p className="text-muted-foreground">100% of tips go to technicians - Happro takes no cut</p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Total Tips Today"
          value="₹2,450"
          change={{ value: 18, type: 'increase', period: 'yesterday' }}
          icon={<IndianRupee className="h-4 w-4" />}
        />
        <KPICard
          title="Tips This Month"
          value="₹45,670"
          change={{ value: 25, type: 'increase', period: 'last month' }}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KPICard
          title="Technicians Tipped"
          value="89"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <h3>Recent Tips</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Service Fee</TableHead>
                <TableHead>Tip Amount</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tipsData.map((tip) => (
                <TableRow key={tip.bookingId}>
                  <TableCell>{tip.bookingId}</TableCell>
                  <TableCell>{tip.customer}</TableCell>
                  <TableCell>{tip.technician}</TableCell>
                  <TableCell>{tip.serviceFee}</TableCell>
                  <TableCell className="text-primary">{tip.tipAmount}</TableCell>
                  <TableCell>{tip.totalAmount}</TableCell>
                  <TableCell>{tip.date}</TableCell>
                  <TableCell><StatusChip status={tip.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}