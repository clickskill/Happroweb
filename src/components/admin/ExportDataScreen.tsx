import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Download, FileText, Calendar, Users, ShoppingCart, IndianRupee, Clock, CheckCircle2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Checkbox } from '../ui/checkbox';

interface ExportHistory {
  id: string;
  fileName: string;
  dataType: string;
  dateRange: string;
  recordCount: number;
  fileSize: string;
  exportedBy: string;
  exportDate: string;
  status: 'completed' | 'processing' | 'failed';
}

const mockExportHistory: ExportHistory[] = [
  {
    id: 'EXP001',
    fileName: 'bookings_december_2024.csv',
    dataType: 'Bookings',
    dateRange: 'Dec 01 - Dec 31, 2024',
    recordCount: 901,
    fileSize: '245 KB',
    exportedBy: 'admin@happro.com',
    exportDate: 'Dec 28, 2024 10:30 AM',
    status: 'completed'
  },
  {
    id: 'EXP002',
    fileName: 'customers_full_database.csv',
    dataType: 'Customers',
    dateRange: 'All Time',
    recordCount: 12453,
    fileSize: '3.2 MB',
    exportedBy: 'admin@happro.com',
    exportDate: 'Dec 27, 2024 03:45 PM',
    status: 'completed'
  },
  {
    id: 'EXP003',
    fileName: 'transactions_november_2024.xlsx',
    dataType: 'Transactions',
    dateRange: 'Nov 01 - Nov 30, 2024',
    recordCount: 823,
    fileSize: '456 KB',
    exportedBy: 'admin@happro.com',
    exportDate: 'Dec 25, 2024 11:20 AM',
    status: 'completed'
  }
];

const exportTemplates = [
  {
    id: 'bookings',
    name: 'Bookings Export',
    description: 'Export all booking records with customer, service, and payment details',
    icon: ShoppingCart,
    fields: ['Booking ID', 'Customer', 'Service', 'Partner', 'Amount', 'Status', 'Date']
  },
  {
    id: 'customers',
    name: 'Customers Export',
    description: 'Export customer database with contact info and booking history',
    icon: Users,
    fields: ['Customer ID', 'Name', 'Email', 'Phone', 'Location', 'Total Bookings', 'Join Date']
  },
  {
    id: 'transactions',
    name: 'Transactions Export',
    description: 'Export all payment transactions and financial records',
    icon: IndianRupee,
    fields: ['Transaction ID', 'Booking ID', 'Amount', 'Payment Method', 'Status', 'Date']
  },
  {
    id: 'partners',
    name: 'Partners Export',
    description: 'Export partner database with performance metrics',
    icon: Users,
    fields: ['Partner ID', 'Name', 'Type', 'Services', 'Jobs', 'Rating', 'Revenue']
  }
];

export function ExportDataScreen() {
  const [exportHistory] = useState<ExportHistory[]>(mockExportHistory);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Export Data</h2>
          <p className="text-muted-foreground">Export business data in various formats for analysis</p>
        </div>
        <Button className="gap-2" onClick={() => setIsExportDialogOpen(true)}>
          <Download className="h-4 w-4" />
          New Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Exports</CardDescription>
            <CardTitle>{exportHistory.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              All time
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>This Month</CardDescription>
            <CardTitle>{exportHistory.filter(e => e.exportDate.includes('Dec')).length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Exported in December
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Records</CardDescription>
            <CardTitle>
              {exportHistory.reduce((sum, e) => sum + e.recordCount, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Exported records
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Size</CardDescription>
            <CardTitle>3.9 MB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Total file size
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="mb-4">Export Templates</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {exportTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <template.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Included fields:</div>
                  <div className="flex flex-wrap gap-1">
                    {template.fields.slice(0, 4).map((field, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {field}
                      </Badge>
                    ))}
                    {template.fields.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.fields.length - 4} more
                      </Badge>
                    )}
                  </div>
                  <Button 
                    className="w-full mt-3" 
                    variant="outline"
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setIsExportDialogOpen(true);
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export {template.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export History</CardTitle>
          <CardDescription>Previously exported data files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exportHistory.map((export_item) => (
              <div 
                key={export_item.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-primary/10 rounded">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-mono text-sm">{export_item.fileName}</h4>
                      <Badge className={getStatusColor(export_item.status)}>
                        {export_item.status === 'completed' && (
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                        )}
                        {export_item.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {export_item.dataType}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {export_item.dateRange}
                      </div>
                      <div>
                        {export_item.recordCount.toLocaleString()} records
                      </div>
                      <div>
                        {export_item.fileSize}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      Exported on {export_item.exportDate} by {export_item.exportedBy}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Export Data</DialogTitle>
            <DialogDescription>
              Configure your data export settings
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="export-type">Data Type</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger id="export-type">
                  <SelectValue placeholder="Select data type to export" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bookings">Bookings</SelectItem>
                  <SelectItem value="customers">Customers</SelectItem>
                  <SelectItem value="transactions">Transactions</SelectItem>
                  <SelectItem value="partners">Partners</SelectItem>
                  <SelectItem value="tips">Tips Ledger</SelectItem>
                  <SelectItem value="payouts">Partner Payouts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date-from">Date From</Label>
                <input 
                  id="date-from"
                  type="date" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date-to">Date To</Label>
                <input 
                  id="date-to"
                  type="date" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="file-format">File Format</Label>
              <Select defaultValue="csv">
                <SelectTrigger id="file-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV (Comma-separated values)</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Additional Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-headers" defaultChecked />
                  <label
                    htmlFor="include-headers"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include column headers
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="compress-file" />
                  <label
                    htmlFor="compress-file"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Compress file (ZIP)
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="email-notification" defaultChecked />
                  <label
                    htmlFor="email-notification"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Send email notification when ready
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsExportDialogOpen(false)}>
              <Download className="h-4 w-4 mr-2" />
              Start Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
