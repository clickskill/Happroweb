import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { KPICard } from '../ui/kpi-card';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { StatusChip } from '../ui/status-chip';
import { coverageExceptions } from './mockData';
import { Clock, CheckCircle } from 'lucide-react';

export function CoverageExceptionsScreen() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Coverage Exceptions</h1>
          <p className="text-muted-foreground">Manage out-of-area service requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPICard
          title="Pending Requests"
          value="3"
          icon={<Clock className="h-4 w-4" />}
        />
        <KPICard
          title="Approved This Month"
          value="24"
          change={{ value: 12, type: 'increase', period: 'last month' }}
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <KPICard
          title="Average Response Time"
          value="2.3 hrs"
          change={{ value: 15, type: 'decrease', period: 'last month' }}
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      <Card>
        <CardHeader>
          <h3>Exception Requests</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Requested Area</TableHead>
                <TableHead>Current Coverage</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coverageExceptions.map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell>{exception.id}</TableCell>
                  <TableCell>{exception.requester}</TableCell>
                  <TableCell>{exception.service}</TableCell>
                  <TableCell>{exception.requestedArea}</TableCell>
                  <TableCell>{exception.currentCoverage}</TableCell>
                  <TableCell>{exception.validityRequested}</TableCell>
                  <TableCell><StatusChip status={exception.status} /></TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {exception.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline">Approve</Button>
                          <Button size="sm" variant="destructive">Deny</Button>
                        </>
                      )}
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