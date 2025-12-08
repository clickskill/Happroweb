import React from 'react';
import { Users, ShoppingCart, IndianRupee, Headphones } from 'lucide-react';

// Mock data for Admin Portal
export const kpiData = [
  {
    title: "Total Customers",
    value: "12,453",
    change: { value: 15, type: 'increase' as const, period: 'this month' },
    icon: <Users className="h-4 w-4" />,
    onClick: () => {}
  },
  {
    title: "Active Bookings",
    value: "347",
    change: { value: 8, type: 'increase' as const, period: 'today' },
    icon: <ShoppingCart className="h-4 w-4" />,
    onClick: () => {}
  },
  {
    title: "Revenue (Today)",
    value: "₹2,45,670",
    change: { value: 12, type: 'increase' as const, period: 'yesterday' },
    icon: <IndianRupee className="h-4 w-4" />,
    onClick: () => {}
  },
  {
    title: "Open Tickets",
    value: "23",
    change: { value: 8, type: 'decrease' as const, period: 'today' },
    icon: <Headphones className="h-4 w-4" />,
    onClick: () => {}
  }
];

export const recentBookings = [
  {
    id: "HP12349",
    customer: "Priya Sharma",
    service: "Home Cleaning",
    technician: "Rajesh Kumar",
    amount: "₹1,060",
    tip: "₹100",
    status: "completed" as const,
    date: "Dec 28, 2024"
  },
  {
    id: "HP12350",
    customer: "Amit Patel",
    service: "Plumbing",
    technician: "Suresh Singh",
    amount: "₹760",
    tip: "₹50",
    status: "in-progress" as const,
    date: "Dec 28, 2024"
  },
  {
    id: "HP12351",
    customer: "Sunita Roy",
    service: "Electrical",
    technician: "Pending Assignment",
    amount: "₹1,200",
    tip: "₹0",
    status: "pending" as const,
    date: "Dec 28, 2024"
  }
];

export const tipsData = [
  {
    bookingId: "HP12349",
    customer: "Priya Sharma",
    technician: "Rajesh Kumar",
    tipAmount: "₹100",
    serviceFee: "₹160",
    totalAmount: "₹1,060",
    date: "Dec 28, 2024",
    status: "paid" as const
  },
  {
    bookingId: "HP12350",
    customer: "Amit Patel",
    technician: "Suresh Singh",
    tipAmount: "₹50",
    serviceFee: "₹114",
    totalAmount: "₹760",
    date: "Dec 28, 2024",
    status: "paid" as const
  }
];

export const coverageExceptions = [
  {
    id: "CE001",
    requester: "Rajesh Kumar (Partner - Individual)",
    service: "AC Repair",
    requestedArea: "400050",
    currentCoverage: "400001-400010",
    reason: "Customer urgent request",
    status: "pending" as const,
    requestDate: "Dec 28, 2024",
    validityRequested: "7 days"
  },
  {
    id: "CE002",
    requester: "ABC Home Services (Partner - Company)",
    service: "Plumbing",
    requestedArea: "400075",
    currentCoverage: "400020-400030",
    reason: "Expand service area",
    status: "approved" as const,
    requestDate: "Dec 27, 2024",
    validityRequested: "30 days"
  }
];