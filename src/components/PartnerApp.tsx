import React, { useState } from 'react';
import { MobileHeader } from './ui/mobile-header';
import { BottomTabs } from './ui/bottom-tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader } from './ui/card';
import { KPICard } from './ui/kpi-card';
import { PromoCard } from './ui/promo-card';
import { DealsBanner } from './ui/deals-banner';
import { ServiceScopeToggle } from './ui/service-scope-toggle';
import { StatusChip } from './ui/status-chip';
import { Switch } from './ui/switch';
import { Calendar } from './ui/calendar';
import { deals, technicians, services, bookings, jobs, notifications } from './partner/mockData';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  User,
  Phone,
  Building,
  Building2,
  UserCheck,
  IndianRupee,
  TrendingUp,
  Plus,
  Search,
  Lock,
  ShoppingCart,
  Bell,
  CheckCircle,
  MapPin,
  Clock,
  Navigation,
  PlayCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Briefcase,
  Settings,
  Star,
  MessageSquare,
  BarChart3,
  Download,
  ArrowUp,
  ArrowDown,
  BellRing,
  DollarSign
} from 'lucide-react';

interface PartnerAppProps {
  onBack: () => void;
}

type PartnerType = 'company' | 'individual' | null;
type PartnerRole = 'admin' | 'technician';

type PartnerScreen = 
  | 'phone-otp' 
  | 'choose-type'
  | 'org-setup' 
  | 'kyc-individual'
  | 'invite-staff'
  | 'skills-zip-hours'
  | 'dashboard' 
  | 'bookings'
  | 'booking-detail'
  | 'technicians' 
  | 'add-technician'
  | 'jobs'
  | 'job-detail'
  | 'earnings'
  | 'catalog'
  | 'notifications'
  | 'profile'
  | 'analytics';

export function PartnerApp({ onBack }: PartnerAppProps) {
  const [currentScreen, setCurrentScreen] = useState<PartnerScreen>('phone-otp');
  const [partnerType, setPartnerType] = useState<PartnerType>(null);
  const [partnerRole, setPartnerRole] = useState<PartnerRole>('admin'); // or 'technician' for staff
  const [activeTab, setActiveTab] = useState('dashboard');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [serviceScope, setServiceScope] = useState<'my-area' | 'all-services'>('my-area');
  const [isOnline, setIsOnline] = useState(true);
  const [selectedJobStatus, setSelectedJobStatus] = useState<'new' | 'today' | 'completed'>('new');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [jobStage, setJobStage] = useState<'pending' | 'accepted' | 'otw' | 'started' | 'completed'>('pending');
  const [notificationCount, setNotificationCount] = useState(3);
  const [hasNewJobNotification, setHasNewJobNotification] = useState(true);

  // Admin tabs (company or individual doing admin work)
  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'bookings', label: 'Bookings', icon: <CalendarDays className="h-5 w-5" />, badge: 3 },
    { id: 'technicians', label: partnerType === 'company' ? 'Team' : 'Profile', icon: partnerType === 'company' ? <Users className="h-5 w-5" /> : <User className="h-5 w-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> }
  ];

  // Technician/Staff tabs
  const technicianTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'jobs', label: 'Jobs', icon: <Briefcase className="h-5 w-5" />, badge: 5 },
    { id: 'earnings', label: 'Earnings', icon: <IndianRupee className="h-5 w-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> }
  ];

  const currentTabs = partnerRole === 'admin' ? adminTabs : technicianTabs;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    switch (tabId) {
      case 'dashboard':
        setCurrentScreen('dashboard');
        break;
      case 'bookings':
        setCurrentScreen('bookings');
        break;
      case 'technicians':
        setCurrentScreen('technicians');
        break;
      case 'jobs':
        setCurrentScreen('jobs');
        break;
      case 'earnings':
        setCurrentScreen('earnings');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
    }
  };

  // PART-01: Phone OTP
  const renderPhoneOTP = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader title="Partner Login" showLanguage={true} />
      <div className="flex-1 flex flex-col justify-center p-4 space-y-6">
        <div className="text-center space-y-2">
          <Building className="h-12 w-12 text-primary mx-auto" />
          <h2>Welcome to Happro Partner</h2>
          <p className="text-muted-foreground">
            Grow your home services business with us
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {phoneNumber && (
            <div>
              <label className="block text-sm font-medium mb-2">OTP</label>
              <Input
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
              />
              <p className="text-xs text-muted-foreground mt-1">
                OTP sent to {phoneNumber}
              </p>
            </div>
          )}

          <Button 
            className="w-full"
            onClick={() => phoneNumber && otp ? setCurrentScreen('choose-type') : null}
            disabled={!phoneNumber || !otp}
          >
            {phoneNumber && !otp ? 'Send OTP' : 'Verify & Continue'}
          </Button>
        </div>
      </div>
    </div>
  );

  // PART-02: Choose Partner Type
  const renderChooseType = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Choose Partner Type"
        showBack={true}
        onBack={() => setCurrentScreen('phone-otp')}
      />
      <div className="flex-1 flex flex-col justify-center p-4 space-y-6">
        <div className="text-center space-y-2">
          <h2>How do you want to partner?</h2>
          <p className="text-muted-foreground">
            Select the option that best describes your business
          </p>
        </div>

        <div className="space-y-4">
          <Card 
            className="p-6 cursor-pointer hover:border-primary transition-all"
            onClick={() => {
              setPartnerType('company');
              setPartnerRole('admin');
              setCurrentScreen('org-setup');
            }}
          >
            <div className="flex items-start gap-4">
              <Building2 className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <h3 className="font-medium mb-1">Company / Organization</h3>
                <p className="text-sm text-muted-foreground">
                  Manage a team of technicians and staff. Perfect for service providers with multiple employees.
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:border-primary transition-all"
            onClick={() => {
              setPartnerType('individual');
              setPartnerRole('admin');
              setCurrentScreen('kyc-individual');
            }}
          >
            <div className="flex items-start gap-4">
              <UserCheck className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <h3 className="font-medium mb-1">Individual / Solo</h3>
                <p className="text-sm text-muted-foreground">
                  Work independently as a solo technician. Handle your own bookings and earnings.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  // PART-03: Org Setup (Company)
  const renderOrgSetup = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Organization Setup"
        showBack={true}
        onBack={() => setCurrentScreen('choose-type')}
      />
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="text-center space-y-2">
          <h2>Tell us about your business</h2>
          <p className="text-muted-foreground">
            This information helps customers trust your services
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Business Name</label>
            <Input placeholder="ABC Home Services Pvt Ltd" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">GST Number (Optional)</label>
            <Input placeholder="22AAAAA0000A1Z5" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Business Address</label>
            <Input placeholder="Complete registered business address" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Service Areas (PIN Codes)</label>
            <Input placeholder="400001, 400002, 400003" />
            <p className="text-xs text-muted-foreground mt-1">
              Comma-separated PIN codes where your team provides services
            </p>
          </div>

          <Button 
            className="w-full"
            onClick={() => setCurrentScreen('invite-staff')}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );

  // PART-03b: KYC (Individual)
  const renderKYCIndividual = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Personal Details"
        showBack={true}
        onBack={() => setCurrentScreen('choose-type')}
      />
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="text-center space-y-2">
          <h2>Complete Your Profile</h2>
          <p className="text-muted-foreground">
            Help customers know more about you
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input placeholder="Rajesh Kumar" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email (Optional)</label>
            <Input placeholder="rajesh@example.com" type="email" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Aadhaar Number</label>
            <Input placeholder="XXXX XXXX XXXX" />
            <p className="text-xs text-muted-foreground mt-1">
              Required for KYC verification
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Address</label>
            <Input placeholder="Complete residential address" />
          </div>

          <Button 
            className="w-full"
            onClick={() => setCurrentScreen('skills-zip-hours')}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );

  // PART-04: Invite Staff/Technicians (Company)
  const renderInviteStaff = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Add Your Team"
        showBack={true}
        onBack={() => setCurrentScreen('org-setup')}
      />
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="text-center space-y-2">
          <h2>Invite Staff & Technicians</h2>
          <p className="text-muted-foreground">
            You can skip this and add team members later
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Technician Name</label>
            <Input placeholder="Full name" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <Input placeholder="+91 98765 43210" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Skills</label>
            <Input placeholder="e.g., Plumbing, Electrical" />
            <p className="text-xs text-muted-foreground mt-1">
              Comma-separated list of skills
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Service Areas (PIN Codes)</label>
            <Input placeholder="400001, 400002" />
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Technician
          </Button>

          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => setCurrentScreen('dashboard')}
            >
              Skip for Now
            </Button>
            <Button 
              className="flex-1"
              onClick={() => setCurrentScreen('dashboard')}
            >
              Send Invites
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  // PART-04b: Skills + ZIP Coverage & Hours (Individual)
  const renderSkillsZipHours = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Service Details"
        showBack={true}
        onBack={() => setCurrentScreen('kyc-individual')}
      />
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="text-center space-y-2">
          <h2>Your Skills & Availability</h2>
          <p className="text-muted-foreground">
            Tell us what services you offer and where
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Skills</label>
            <div className="flex flex-wrap gap-2 mb-2">
              <Button size="sm" variant="outline">Plumbing</Button>
              <Button size="sm" variant="outline">Electrical</Button>
              <Button size="sm" variant="outline">Cleaning</Button>
              <Button size="sm" variant="outline">Carpentry</Button>
            </div>
            <Input placeholder="Add custom skill" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Service Areas (PIN Codes)</label>
            <Input placeholder="400001, 400002, 400003" />
            <p className="text-xs text-muted-foreground mt-1">
              PIN codes where you can provide services
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Working Hours</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">From</label>
                <Input type="time" defaultValue="09:00" />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">To</label>
                <Input type="time" defaultValue="18:00" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Working Days</label>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">Mon</Button>
              <Button size="sm" variant="outline">Tue</Button>
              <Button size="sm" variant="outline">Wed</Button>
              <Button size="sm" variant="outline">Thu</Button>
              <Button size="sm" variant="outline">Fri</Button>
              <Button size="sm" variant="outline">Sat</Button>
              <Button size="sm" variant="outline">Sun</Button>
            </div>
          </div>

          <Button 
            className="w-full"
            onClick={() => setCurrentScreen('dashboard')}
          >
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  );

  // PART-05: Dashboard
  const renderDashboard = () => {
    if (partnerRole === 'technician') {
      return (
        <div className="flex-1 flex flex-col">
          <MobileHeader title="Dashboard" showNotifications={true} />
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-6">
              {/* New Job Notification Alert */}
              {hasNewJobNotification && notifications.some(n => n.type === 'new-job' && !n.read) && (
                <Card className="p-4 bg-primary/10 border-primary animate-pulse cursor-pointer" onClick={() => setCurrentScreen('notifications')}>
                  <div className="flex items-center gap-3">
                    <BellRing className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">New Job Available!</p>
                      <p className="text-xs text-muted-foreground">
                        Tap to view job details
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
                </Card>
              )}

              {/* Online Toggle */}
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Availability Status</h3>
                    <p className="text-sm text-muted-foreground">
                      {isOnline ? 'You are accepting jobs' : 'You are offline'}
                    </p>
                  </div>
                  <Switch checked={isOnline} onCheckedChange={setIsOnline} />
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <KPICard
                  title="Today's Jobs"
                  value="5"
                  icon={<Briefcase className="h-4 w-4" />}
                />
                <KPICard
                  title="Today's Earnings"
                  value="₹3,200"
                  icon={<IndianRupee className="h-4 w-4" />}
                />
              </div>

              <DealsBanner deals={deals} />

              <div>
                <h3 className="mb-4">Active Jobs</h3>
                <div className="space-y-3">
                  {jobs.filter(j => j.status === 'today').map((job) => (
                    <Card key={job.id} className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{job.service}</p>
                          <p className="text-xs text-muted-foreground">{job.customer}</p>
                        </div>
                        <StatusChip status="in-progress" />
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {job.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.distance} away
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <BottomTabs 
            tabs={currentTabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </div>
      );
    }

    // Admin Dashboard
    return (
      <div className="flex-1 flex flex-col">
        <MobileHeader title="Dashboard" showNotifications={true} />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <KPICard
                title="Today's Bookings"
                value="12"
                change={{ value: 25, type: 'increase', period: 'yesterday' }}
                icon={<CalendarDays className="h-4 w-4" />}
              />
              <KPICard
                title="This Month"
                value="₹45,600"
                change={{ value: 12, type: 'increase', period: 'last month' }}
                icon={<IndianRupee className="h-4 w-4" />}
              />
              {partnerType === 'company' && (
                <>
                  <KPICard
                    title="Active Team"
                    value="8"
                    icon={<Users className="h-4 w-4" />}
                  />
                  <KPICard
                    title="Avg Rating"
                    value="4.8"
                    change={{ value: 5, type: 'increase', period: 'last month' }}
                    icon={<TrendingUp className="h-4 w-4" />}
                  />
                </>
              )}
            </div>

            <DealsBanner deals={deals} />

            {/* Analytics Quick Link */}
            <Card 
              className="p-4 cursor-pointer hover:border-primary transition-all bg-gradient-to-r from-primary/10 to-primary/5"
              onClick={() => setCurrentScreen('analytics')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4>View Analytics</h4>
                    <p className="text-xs text-muted-foreground">Performance insights & reports</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>

            <div>
              <h3 className="mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <Card className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">New booking received</p>
                      <p className="text-xs text-muted-foreground">Home Cleaning - ₹1060</p>
                    </div>
                    <StatusChip status="pending" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <BottomTabs 
          tabs={currentTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    );
  };

  // PART-06: Bookings (Admin Only)
  const renderBookings = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader title="Bookings" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <Button variant="default" size="sm">All</Button>
            <Button variant="outline" size="sm">Today</Button>
            <Button variant="outline" size="sm">Pending</Button>
          </div>

          <div className="space-y-3">
            {bookings.map((booking) => (
              <Card 
                key={booking.id} 
                className="p-4 cursor-pointer hover:border-primary"
                onClick={() => {
                  setSelectedBooking(booking);
                  setCurrentScreen('booking-detail');
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{booking.service}</h4>
                    <p className="text-sm text-muted-foreground">#{booking.id}</p>
                  </div>
                  <StatusChip status={booking.status} />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Customer</span>
                    <span>{booking.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date & Time</span>
                    <span>{booking.date} at {booking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <span className="font-medium">{booking.amount}</span>
                  </div>
                  {booking.technician && (
                    <div className="flex justify-between">
                      <span>Technician</span>
                      <span>{booking.technician}</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomTabs 
        tabs={currentTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );

  // PART-07: Booking Detail (Admin Only)
  const renderBookingDetail = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Booking Details"
        showBack={true}
        onBack={() => setCurrentScreen('bookings')}
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          <Card className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{selectedBooking?.service}</h3>
                <p className="text-sm text-muted-foreground">#{selectedBooking?.id}</p>
              </div>
              <StatusChip status={selectedBooking?.status} />
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Customer</p>
                <p className="font-medium">{selectedBooking?.customer}</p>
                <p className="text-muted-foreground">{selectedBooking?.customerPhone}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Date & Time</p>
                <p className="font-medium">{selectedBooking?.date} at {selectedBooking?.time}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Address</p>
                <p className="font-medium">{selectedBooking?.address}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Amount</p>
                <p className="font-medium">{selectedBooking?.amount}</p>
              </div>

              {selectedBooking?.tip && selectedBooking.tip !== '₹0' && (
                <div>
                  <p className="text-muted-foreground">Tip (100% to technician)</p>
                  <p className="font-medium text-primary">{selectedBooking.tip}</p>
                </div>
              )}

              {selectedBooking?.technician && (
                <div>
                  <p className="text-muted-foreground">Assigned Technician</p>
                  <p className="font-medium">{selectedBooking.technician}</p>
                </div>
              )}
            </div>
          </Card>

          {selectedBooking?.status === 'pending' && partnerType === 'company' && (
            <div className="space-y-3">
              <Button className="w-full">
                Assign Technician
              </Button>
            </div>
          )}

          {selectedBooking?.technician && (
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Reassign Technician
              </Button>
              <Button variant="outline" className="w-full">
                Notify Customer
              </Button>
            </div>
          )}

          <Button variant="destructive" className="w-full">
            Cancel & Refund
          </Button>
        </div>
      </div>
    </div>
  );

  // PART-08: Technicians (Admin Only)
  const renderTechnicians = () => {
    if (partnerType === 'individual') {
      // Individual partners see their own profile here
      return renderProfile();
    }

    return (
      <div className="flex-1 flex flex-col">
        <MobileHeader 
          title="Team Members"
          rightContent={
            <Button size="sm" onClick={() => setCurrentScreen('add-technician')}>
              <Plus className="h-4 w-4" />
            </Button>
          }
        />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <Button variant="default" size="sm">Active (2)</Button>
              <Button variant="outline" size="sm">Invited (1)</Button>
            </div>

            <div className="space-y-3">
              {technicians.map((tech) => (
                <Card key={tech.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{tech.name}</h4>
                      <p className="text-sm text-muted-foreground">{tech.phone}</p>
                    </div>
                    <StatusChip 
                      status={
                        tech.status === 'Active' ? 'completed' :
                        tech.status === 'Invited' ? 'pending' :
                        'cancelled'
                      } 
                    />
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Skills</span>
                      <span>{tech.skills.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating</span>
                      <span>{tech.rating} ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed Jobs</span>
                      <span>{tech.completedJobs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ZIP Codes</span>
                      <span>{tech.zipCodes.join(', ')}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <BottomTabs 
          tabs={currentTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    );
  };

  // PART-09: Add Technician (Admin Only)
  const renderAddTechnician = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Add Team Member"
        showBack={true}
        onBack={() => setCurrentScreen('technicians')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Technician Name</label>
            <Input placeholder="Full name" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <Input placeholder="+91 98765 43210" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Skills</label>
            <Input placeholder="e.g., Plumbing, Electrical" />
            <p className="text-xs text-muted-foreground mt-1">
              Comma-separated list of skills
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Service Areas (PIN Codes)</label>
            <Input placeholder="400001, 400002" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select className="w-full p-2 border border-border rounded-md bg-input-background">
              <option>Technician</option>
              <option>Admin</option>
            </select>
          </div>

          <Button 
            className="w-full"
            onClick={() => setCurrentScreen('technicians')}
          >
            Send Invite
          </Button>
        </div>
      </div>
    </div>
  );

  // PART-10: Jobs (Technician Only)
  const renderJobs = () => {
    const filteredJobs = selectedJobStatus === 'new' 
      ? jobs.filter(j => j.status === 'new')
      : selectedJobStatus === 'today'
      ? jobs.filter(j => j.status === 'today')
      : jobs.filter(j => j.status === 'completed');

    return (
      <div className="flex-1 flex flex-col">
        <MobileHeader title="Jobs" />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <Button 
                variant={selectedJobStatus === 'new' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedJobStatus('new')}
              >
                New (3)
              </Button>
              <Button 
                variant={selectedJobStatus === 'today' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedJobStatus('today')}
              >
                Today (2)
              </Button>
              <Button 
                variant={selectedJobStatus === 'completed' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedJobStatus('completed')}
              >
                Completed
              </Button>
            </div>

            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <Card 
                  key={job.id} 
                  className="p-4 cursor-pointer hover:border-primary"
                  onClick={() => {
                    setSelectedJob(job);
                    setJobStage(
                      job.status === 'new' ? 'pending' : 
                      job.status === 'completed' ? 'completed' : 
                      'accepted'
                    );
                    setCurrentScreen('job-detail');
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{job.service}</h4>
                      <p className="text-sm text-muted-foreground">{job.customer}</p>
                    </div>
                    <span className="text-sm font-medium text-primary">{job.amount}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{job.date} at {job.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{job.distance} away</span>
                    </div>
                  </div>

                  {/* Show rating for completed jobs */}
                  {job.status === 'completed' && (job as any).rating && (
                    <div className="mt-2 pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= ((job as any).rating || 0)
                                  ? 'fill-warning text-warning'
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {(job as any).rating}/5 rating
                        </span>
                      </div>
                    </div>
                  )}

                  {job.tip && job.tip !== '₹0' && (
                    <div className={`mt-2 ${job.status === 'completed' && (job as any).rating ? '' : 'pt-2 border-t border-border'}`}>
                      <p className="text-xs text-muted-foreground">
                        Tip: <span className="text-primary font-medium">{job.tip}</span> (100% to you)
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>

        <BottomTabs 
          tabs={currentTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    );
  };

  // PART-11: Job Detail (Technician Only)
  const renderJobDetail = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Job Details"
        showBack={true}
        onBack={() => setCurrentScreen('jobs')}
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Job Status Indicator */}
          <Card className="p-4 bg-primary/10">
            <div className="flex items-center justify-center gap-2">
              {jobStage === 'pending' && (
                <>
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">New Job Request</span>
                </>
              )}
              {jobStage === 'accepted' && (
                <>
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">Job Accepted</span>
                </>
              )}
              {jobStage === 'otw' && (
                <>
                  <Navigation className="h-5 w-5 text-info" />
                  <span className="font-medium">On The Way</span>
                </>
              )}
              {jobStage === 'started' && (
                <>
                  <PlayCircle className="h-5 w-5 text-warning" />
                  <span className="font-medium">Job In Progress</span>
                </>
              )}
              {jobStage === 'completed' && (
                <>
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">Job Completed</span>
                </>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-4">{selectedJob?.service}</h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Customer</p>
                <p className="font-medium">{selectedJob?.customer}</p>
                <p className="text-muted-foreground">{selectedJob?.customerPhone}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Date & Time</p>
                <p className="font-medium">{selectedJob?.date} at {selectedJob?.time}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Address</p>
                <p className="font-medium">{selectedJob?.address}</p>
                <p className="text-muted-foreground">{selectedJob?.distance} away</p>
              </div>

              <div>
                <p className="text-muted-foreground">Service Amount</p>
                <p className="font-medium">{selectedJob?.amount}</p>
              </div>

              {selectedJob?.tip && selectedJob.tip !== '₹0' && (
                <div>
                  <p className="text-muted-foreground">Customer Tip (100% to you)</p>
                  <p className="font-medium text-primary">{selectedJob.tip}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Action Buttons based on stage */}
          <div className="space-y-3">
            {jobStage === 'pending' && (
              <>
                <Button 
                  className="w-full"
                  onClick={() => setJobStage('accepted')}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept Job
                </Button>
                <Button variant="destructive" className="w-full">
                  <XCircle className="h-4 w-4 mr-2" />
                  Decline
                </Button>
              </>
            )}

            {jobStage === 'accepted' && (
              <Button 
                className="w-full"
                onClick={() => setJobStage('otw')}
              >
                <Navigation className="h-4 w-4 mr-2" />
                On The Way
              </Button>
            )}

            {jobStage === 'otw' && (
              <Button 
                className="w-full"
                onClick={() => setJobStage('started')}
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                Start Job
              </Button>
            )}

            {jobStage === 'started' && (
              <Button 
                className="w-full"
                onClick={() => setJobStage('completed')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Job
              </Button>
            )}

            {jobStage === 'completed' && selectedJob?.status === 'completed' && (
              <>
                {/* Customer Rating & Feedback */}
                {selectedJob.rating && (
                  <Card className="p-4 bg-warning/10 border-warning/20">
                    <div className="text-center mb-4">
                      <Star className="h-12 w-12 text-warning mx-auto mb-2" />
                      <h4 className="font-medium mb-1">Customer Rating</h4>
                      <div className="flex justify-center gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= (selectedJob.rating || 0)
                                ? 'fill-warning text-warning'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="font-medium text-lg">
                        {selectedJob.rating} out of 5 stars
                      </p>
                    </div>

                    {selectedJob.feedback && (
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-start gap-2 mb-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <h5 className="font-medium text-sm">Customer Feedback</h5>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          "{selectedJob.feedback}"
                        </p>
                      </div>
                    )}
                  </Card>
                )}

                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
                  <p className="font-medium">Job Completed Successfully!</p>
                  <p className="text-sm text-muted-foreground">
                    Payment has been processed
                  </p>
                  <Button 
                    className="w-full mt-4"
                    onClick={() => setCurrentScreen('jobs')}
                  >
                    Back to Jobs
                  </Button>
                </div>
              </>
            )}

            {jobStage === 'completed' && selectedJob?.status !== 'completed' && (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
                <p className="font-medium">Job Completed Successfully!</p>
                <p className="text-sm text-muted-foreground">
                  Waiting for customer rating...
                </p>
                <Button 
                  className="w-full mt-4"
                  onClick={() => setCurrentScreen('jobs')}
                >
                  Back to Jobs
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // PART-12: Earnings
  const renderEarnings = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader title="Earnings" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <KPICard
              title="Today"
              value="₹3,200"
              change={{ value: 15, type: 'increase', period: 'yesterday' }}
              icon={<IndianRupee className="h-4 w-4" />}
            />
            <KPICard
              title="This Month"
              value={partnerRole === 'admin' ? '₹45,600' : '₹28,400'}
              change={{ value: 22, type: 'increase', period: 'last month' }}
              icon={<IndianRupee className="h-4 w-4" />}
            />
          </div>

          <Card className="p-4">
            <h3 className="font-medium mb-4">Earnings Breakdown</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Base Earnings</span>
                <span className="font-medium">₹{partnerRole === 'admin' ? '38,500' : '25,200'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tips Received</span>
                <span className="font-medium text-primary">₹{partnerRole === 'admin' ? '7,100' : '3,200'}</span>
              </div>
              <div className="pt-2 border-t border-border flex justify-between">
                <span className="font-medium">Total Earnings</span>
                <span className="font-medium">₹{partnerRole === 'admin' ? '45,600' : '28,400'}</span>
              </div>
            </div>
          </Card>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Recent Transactions</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="space-y-3">
              <Card className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Home Cleaning</p>
                    <p className="text-xs text-muted-foreground">Dec 28, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹1,060</p>
                    <p className="text-xs text-primary">+₹100 tip</p>
                  </div>
                </div>
              </Card>

              <Card className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Plumbing</p>
                    <p className="text-xs text-muted-foreground">Dec 27, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹760</p>
                    <p className="text-xs text-primary">+₹50 tip</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <BottomTabs 
        tabs={currentTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );

  // PART-13: Catalog
  const renderCatalog = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Service Catalog"
        showBack={true}
        onBack={() => setCurrentScreen('dashboard')}
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <ServiceScopeToggle 
            value={serviceScope}
            onValueChange={setServiceScope}
          />

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search services..."
              className="pl-10"
            />
          </div>

          <div className="space-y-3">
            {services.map((service) => {
              const isOutOfArea = serviceScope === 'all-services' && !service.inMyArea;
              
              return (
                <Card 
                  key={service.id} 
                  className={`p-4 ${isOutOfArea ? 'opacity-50 bg-muted/30' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{service.name}</h4>
                        {isOutOfArea && <Lock className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                      <p className="font-medium">{service.price}</p>
                      
                      {isOutOfArea && (
                        <div className="mt-2">
                          <Button variant="outline" size="sm" className="text-xs">
                            Request exception to Support
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  // PART-14: Notifications (Enhanced with Real-time Job Notifications)
  const renderNotifications = () => {
    const getNotificationIcon = (type: string) => {
      switch (type) {
        case 'new-job':
          return <BellRing className="h-5 w-5 text-primary mt-0.5 animate-pulse" />;
        case 'job-reminder':
          return <Clock className="h-5 w-5 text-warning mt-0.5" />;
        case 'payment':
          return <DollarSign className="h-5 w-5 text-success mt-0.5" />;
        case 'rating':
          return <Star className="h-5 w-5 text-warning mt-0.5" />;
        default:
          return <Bell className="h-5 w-5 text-primary mt-0.5" />;
      }
    };

    return (
      <div className="flex-1 flex flex-col">
        <MobileHeader 
          title="Notifications"
          showBack={true}
          onBack={() => {
            setNotificationCount(0);
            setCurrentScreen('dashboard');
          }}
        />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {/* Unread Notifications Header */}
            {notifications.filter(n => !n.read).length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Unread ({notifications.filter(n => !n.read).length})
                </h3>
              </div>
            )}

            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`p-4 cursor-pointer transition-all ${
                  !notification.read ? 'bg-primary/5 border-primary/20' : ''
                } ${notification.type === 'new-job' ? 'border-primary' : ''}`}
                onClick={() => {
                  if (notification.jobId) {
                    const job = jobs.find(j => j.id === notification.jobId);
                    if (job) {
                      setSelectedJob(job);
                      setJobStage(job.status === 'completed' ? 'completed' : 'pending');
                      setCurrentScreen('job-detail');
                    }
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    
                    {/* Quick Actions for Job Notifications */}
                    {notification.type === 'new-job' && !notification.read && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1">
                          View Job
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Later
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {/* Read Notifications Header */}
            {notifications.filter(n => n.read).length > 0 && (
              <div className="mt-6 mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Earlier
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // PART-15: Profile & Settings
  const renderProfile = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader title="Profile" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          <Card className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">
                  {partnerType === 'company' ? 'ABC Home Services' : 'Rajesh Kumar'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {partnerType === 'company' ? 'Company Partner' : 'Individual Partner'}
                </p>
                <p className="text-xs text-muted-foreground">{phoneNumber}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Rating</span>
                <span>4.8 ⭐</span>
              </div>
              <div className="flex justify-between">
                <span>Jobs Completed</span>
                <span>156</span>
              </div>
              <div className="flex justify-between">
                <span>Member Since</span>
                <span>Jan 2024</span>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setCurrentScreen('catalog')}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Service Catalog
            </Button>

            {partnerRole === 'admin' && (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setCurrentScreen('analytics')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics & Reports
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setCurrentScreen('earnings')}
                >
                  <IndianRupee className="h-4 w-4 mr-2" />
                  Earnings & Payouts
                </Button>
              </>
            )}

            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings & Preferences
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start text-destructive hover:bg-destructive/10"
              onClick={onBack}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <BottomTabs 
        tabs={currentTabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );

  // PART-16: Analytics & Reports (Admin Only)
  const renderAnalytics = () => {
    const revenueData = [
      { month: 'Aug', revenue: 28000, bookings: 45 },
      { month: 'Sep', revenue: 32000, bookings: 52 },
      { month: 'Oct', revenue: 35000, bookings: 58 },
      { month: 'Nov', revenue: 38000, bookings: 62 },
      { month: 'Dec', revenue: 45600, bookings: 75 }
    ];

    const topServices = [
      { name: 'Home Cleaning', bookings: 35, revenue: '₹18,900' },
      { name: 'Plumbing', bookings: 22, revenue: '₹13,200' },
      { name: 'Electrical Work', bookings: 18, revenue: '₹13,500' }
    ];

    return (
      <div className="flex-1 flex flex-col">
        <MobileHeader 
          title="Analytics & Reports"
          showBack={true}
          onBack={() => setCurrentScreen('dashboard')}
        />
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Performance Summary */}
            <div>
              <h3 className="font-medium mb-4">Performance Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <KPICard
                  title="Total Revenue"
                  value="₹45,600"
                  change={{ value: 20, type: 'increase', period: 'last month' }}
                  icon={<IndianRupee className="h-4 w-4" />}
                />
                <KPICard
                  title="Total Bookings"
                  value="75"
                  change={{ value: 21, type: 'increase', period: 'last month' }}
                  icon={<CalendarDays className="h-4 w-4" />}
                />
                <KPICard
                  title="Avg Rating"
                  value="4.8"
                  change={{ value: 4, type: 'increase', period: 'last month' }}
                  icon={<Star className="h-4 w-4" />}
                />
                <KPICard
                  title="Completion Rate"
                  value="96%"
                  change={{ value: 2, type: 'increase', period: 'last month' }}
                  icon={<CheckCircle className="h-4 w-4" />}
                />
              </div>
            </div>

            {/* Revenue Trend */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Revenue Trend</h4>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="space-y-3">
                {revenueData.map((item) => (
                  <div key={item.month} className="flex items-center gap-3">
                    <span className="text-sm font-medium w-12">{item.month}</span>
                    <div className="flex-1">
                      <div className="h-8 bg-primary/10 rounded-md relative overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-md transition-all"
                          style={{ width: `${(item.revenue / 50000) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium w-20 text-right">
                      ₹{(item.revenue / 1000).toFixed(0)}k
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Services */}
            <Card className="p-4">
              <h4 className="font-medium mb-4">Top Services (This Month)</h4>
              <div className="space-y-3">
                {topServices.map((service, index) => (
                  <div key={service.name} className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                      <span className="text-sm font-medium text-primary">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.bookings} bookings</p>
                    </div>
                    <span className="text-sm font-medium">{service.revenue}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Customer Satisfaction */}
            <Card className="p-4">
              <h4 className="font-medium mb-4">Customer Satisfaction</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">5 Stars</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success" style={{ width: '65%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">4 Stars</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '25%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">3 Stars</span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-warning" style={{ width: '8%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">2 Stars or below</span>
                    <span className="text-sm font-medium">2%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-destructive" style={{ width: '2%' }} />
                  </div>
                </div>
              </div>
            </Card>

            {partnerType === 'company' && (
              <Card className="p-4">
                <h4 className="font-medium mb-4">Team Performance</h4>
                <div className="space-y-3">
                  {technicians.slice(0, 2).map((tech) => (
                    <div key={tech.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{tech.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {tech.completedJobs} jobs • {tech.rating} ⭐
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-success">
                        <ArrowUp className="h-4 w-4" />
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Full Report
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'phone-otp':
        return renderPhoneOTP();
      case 'choose-type':
        return renderChooseType();
      case 'org-setup':
        return renderOrgSetup();
      case 'kyc-individual':
        return renderKYCIndividual();
      case 'invite-staff':
        return renderInviteStaff();
      case 'skills-zip-hours':
        return renderSkillsZipHours();
      case 'dashboard':
        return renderDashboard();
      case 'bookings':
        return renderBookings();
      case 'booking-detail':
        return renderBookingDetail();
      case 'technicians':
        return renderTechnicians();
      case 'add-technician':
        return renderAddTechnician();
      case 'jobs':
        return renderJobs();
      case 'job-detail':
        return renderJobDetail();
      case 'earnings':
        return renderEarnings();
      case 'catalog':
        return renderCatalog();
      case 'notifications':
        return renderNotifications();
      case 'profile':
        return renderProfile();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderPhoneOTP();
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-sm mx-auto border-x border-border">
      {renderScreen()}
    </div>
  );
}