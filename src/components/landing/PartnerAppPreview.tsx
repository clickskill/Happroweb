import React from 'react';
import { TrendingUp, IndianRupee, Users, Calendar, Star, BarChart3 } from 'lucide-react';
import { Logo } from '../brand/Logo';

export function PartnerAppPreview() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-[#F8FAFC] to-white overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Logo size={24} />
            <span className="font-semibold">Partner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22F458]" />
            <span className="text-xs text-gray-600">Online</span>
          </div>
        </div>
        
        <h2 className="text-xl mb-1">Welcome back, Rajesh!</h2>
        <p className="text-sm text-gray-600">Here's your business overview</p>
      </div>

      {/* KPI Cards */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-[#22F458]/10 to-[#22F458]/5 rounded-xl p-4 border border-[#22F458]/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#22F458] rounded-lg flex items-center justify-center">
                <IndianRupee className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-1">Today's Earnings</p>
            <p className="text-xl">₹4,850</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-50/50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-1">Active Jobs</p>
            <p className="text-xl">12</p>
          </div>
        </div>
      </div>

      {/* New Bookings */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold">New Bookings</h4>
            <span className="text-xs text-[#22F458] bg-[#22F458]/10 px-2 py-1 rounded-full">3 New</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">AC Servicing</p>
                <p className="text-xs text-gray-500">Koramangala • Today 3:00 PM</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#22F458]">₹899</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Plumbing Repair</p>
                <p className="text-xs text-gray-500">Indiranagar • Tomorrow 10:00 AM</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#22F458]">₹1,299</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 pb-6">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5" />
            <h4 className="text-sm font-semibold">This Month</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs opacity-80">Revenue</p>
              <p className="font-semibold">₹98K</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Jobs</p>
              <p className="font-semibold">145</p>
            </div>
            <div>
              <p className="text-xs opacity-80">Rating</p>
              <p className="font-semibold">4.8★</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
