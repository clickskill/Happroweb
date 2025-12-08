import React from 'react';
import { Search, MapPin, Star, Zap, Droplet, Wind, Paintbrush, Wrench, Bug, Trash2 } from 'lucide-react';
import { Logo } from '../brand/Logo';

export function CustomerAppPreview() {
  const services = [
    { icon: <Zap className="w-6 h-6" />, name: 'Electrical', color: '#F59E0B' },
    { icon: <Droplet className="w-6 h-6" />, name: 'Plumbing', color: '#3B82F6' },
    { icon: <Wind className="w-6 h-6" />, name: 'AC Repair', color: '#06B6D4' },
    { icon: <Paintbrush className="w-6 h-6" />, name: 'Painting', color: '#8B5CF6' },
    { icon: <Wrench className="w-6 h-6" />, name: 'Appliance', color: '#EF4444' },
    { icon: <Bug className="w-6 h-6" />, name: 'Pest Control', color: '#10B981' },
    { icon: <Paintbrush className="w-6 h-6" />, name: 'Carpentry', color: '#F97316' },
    { icon: <Trash2 className="w-6 h-6" />, name: 'Cleaning', color: '#22F458' },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#F8FAFC] to-white overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Logo size={24} />
            <span className="font-semibold">Happro</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-[#22F458]" />
          <span>Koramangala, Bangalore</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for services..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl text-sm"
            readOnly
          />
        </div>
      </div>

      {/* Deals Banner */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-[#22F458]/10 to-[#22F458]/5 rounded-xl p-4 border border-[#22F458]/20">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-[#22F458] rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-[#22F458]">SPECIAL OFFER</span>
          </div>
          <p className="text-sm font-medium">Get 20% off on your first booking!</p>
          <p className="text-xs text-gray-600 mt-1">Use code: WELCOME20</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 pb-4">
        <h3 className="font-semibold mb-3">Popular Services</h3>
        <div className="grid grid-cols-4 gap-3">
          {services.map((service, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-sm"
                style={{ backgroundColor: `${service.color}15` }}
              >
                <div style={{ color: service.color }}>
                  {service.icon}
                </div>
              </div>
              <span className="text-xs text-center text-gray-700">{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h4 className="text-sm font-semibold mb-3">Recent Bookings</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Wind className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">AC Servicing</p>
              <p className="text-xs text-gray-500">Completed • ₹899</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-medium">4.8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
