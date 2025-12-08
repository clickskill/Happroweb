import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { KPICard } from '../ui/kpi-card';
import { StatusChip } from '../ui/status-chip';
import { recentBookings } from './mockData';
import { Calendar, IndianRupee, Wrench, Headphones } from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (screen: string) => void;
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const kpiData = [
    {
      title: "Total Bookings",
      value: "1,247",
      change: { value: 12, type: 'increase' as const, period: 'today' },
      icon: <Calendar className="h-4 w-4" />,
      onClick: () => onNavigate('bookings-all')
    },
    {
      title: "Total Revenue",
      value: "₹8,45,600",
      change: { value: 18, type: 'increase' as const, period: 'today' },
      icon: <IndianRupee className="h-4 w-4" />,
      onClick: () => onNavigate('payments-transactions')
    },
    {
      title: "Active Partners",
      value: "156",
      change: { value: 5, type: 'increase' as const, period: 'today' },
      icon: <Wrench className="h-4 w-4" />,
      onClick: () => onNavigate('users-partner-members')
    },
    {
      title: "Open Tickets",
      value: "23",
      change: { value: 8, type: 'decrease' as const, period: 'today' },
      icon: <Headphones className="h-4 w-4" />,
      onClick: () => {}
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Overview of your home services platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3>Recent Bookings</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p>#{booking.id}</p>
                    <p className="text-sm text-muted-foreground">{booking.customer} • {booking.service}</p>
                  </div>
                  <div className="text-right">
                    <StatusChip status={booking.status} />
                    <p className="text-sm mt-1">{booking.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3>Platform Metrics</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Tips processed today</span>
                <span>₹2,450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Average rating</span>
                <span>4.8 ⭐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Coverage exceptions</span>
                <span>3 pending</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active promotions</span>
                <span>5 campaigns</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}