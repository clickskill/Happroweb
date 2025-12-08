import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Download, TrendingUp, TrendingDown, Star } from 'lucide-react';

export function AnalyticsScreen() {
  const [timeRange, setTimeRange] = useState<string>('12months');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Analytics & Insights</h2>
          <p className="text-muted-foreground">Comprehensive business metrics and performance insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="flex items-center gap-2">
              ₹48.9L
              <span className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-3 w-3" />
                12.5%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              vs. previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Bookings</CardDescription>
            <CardTitle className="flex items-center gap-2">
              8,534
              <span className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-3 w-3" />
                8.3%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              vs. previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg. Booking Value</CardDescription>
            <CardTitle className="flex items-center gap-2">
              ₹1,245
              <span className="flex items-center gap-1 text-sm text-red-600">
                <TrendingDown className="h-3 w-3" />
                2.1%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              vs. previous period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Customer Satisfaction</CardDescription>
            <CardTitle className="flex items-center gap-2">
              4.7
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              From 12,450 reviews
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Monthly performance over the last year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Jan - Mar</span>
                <span>₹8.55L</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Apr - Jun</span>
                <span>₹9.77L</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Jul - Sep</span>
                <span>₹11.37L</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Oct - Dec</span>
                <span className="text-green-600">₹13.46L</span>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span>Total (2024)</span>
                  <span className="text-xl">₹43.15L</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Services by Revenue</CardTitle>
            <CardDescription>Most profitable service categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Home Cleaning</span>
                    <span className="text-sm">₹45.67L</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">AC Repair</span>
                    <span className="text-sm">₹38.76L</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '85%' }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Plumbing</span>
                    <span className="text-sm">₹32.34L</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '70%' }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Electrical</span>
                    <span className="text-sm">₹29.87L</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">Carpentry</span>
                    <span className="text-sm">₹23.45L</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '50%' }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
            <CardDescription>Customer distribution by engagement level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm">New Customers</span>
                </div>
                <span>35%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm">Returning Customers</span>
                </div>
                <span>45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-sm">Loyal (5+ bookings)</span>
                </div>
                <span>20%</span>
              </div>
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Loyal customers generate 3x more revenue per booking than new customers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Partner Performance</CardTitle>
            <CardDescription>Rating and completion rates by tier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Top 10%</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm">4.8⭐</span>
                  <span className="text-sm text-green-600">98% completion</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Top 25%</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm">4.6⭐</span>
                  <span className="text-sm text-green-600">95% completion</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Top 50%</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm">4.4⭐</span>
                  <span className="text-sm">92% completion</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Below 50%</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm">4.1⭐</span>
                  <span className="text-sm text-orange-600">87% completion</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Customer Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Customers</span>
              <span>12,453</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active (Last 30d)</span>
              <span>8,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Retention Rate</span>
              <span className="text-green-600">68.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Lifetime Value</span>
              <span>₹18,750</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Partner Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Partners</span>
              <span>1,468</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Partners</span>
              <span>1,287</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Rating</span>
              <span className="text-green-600">4.7 ⭐</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Jobs/Partner</span>
              <span>156/month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Booking Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Completion Rate</span>
              <span className="text-green-600">94.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Cancellation Rate</span>
              <span className="text-red-600">3.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg. Response Time</span>
              <span>12 mins</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tips Given</span>
              <span>₹2,45,670</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
