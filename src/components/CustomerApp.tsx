import React, { useState } from 'react';
import { MobileHeader } from './ui/mobile-header';
import { BottomTabs } from './ui/bottom-tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader } from './ui/card';
import { DealsBanner } from './ui/deals-banner';
import { TipsWidget } from './ui/tips-widget';
import { StatusChip } from './ui/status-chip';
import { Stepper } from './ui/stepper';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Home, 
  CalendarDays, 
  User, 
  MapPin, 
  Search,
  Star,
  Clock,
  IndianRupee,
  CheckCircle,
  Headphones,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  Wallet,
  MapPinIcon,
  Settings,
  ChevronRight,
  Bell,
  Heart,
  Gift,
  Shield,
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  CalendarIcon,
  Edit,
  Trash2,
  Plus,
  CreditCard,
  Banknote,
  AlertTriangle,
  X
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import exampleImage from 'figma:asset/e5e1d2a290476b0d7fae8ca231e38bd688cb5f37.png';

interface CustomerAppProps {
  onBack: () => void;
}

type CustomerScreen = 
  | 'location' 
  | 'home' 
  | 'home-preview'
  | 'service-detail' 
  | 'booking-slot' 
  | 'booking-address' 
  | 'booking-verify' 
  | 'booking-payment'
  | 'payment-due'
  | 'order-confirmation'
  | 'orders'
  | 'order-detail'
  | 'cancel-booking'
  | 'reschedule-booking'
  | 'notifications'
  | 'profile'
  | 'support'
  | 'support-chat'
  | 'support-faq'
  | 'report-issue'
  | 'report-issue-submitted'
  | 'wallet'
  | 'manage-cards'
  | 'add-card'
  | 'addresses'
  | 'add-address'
  | 'settings';

export function CustomerApp({ onBack }: CustomerAppProps) {
  const [currentScreen, setCurrentScreen] = useState<CustomerScreen>('location');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTip, setSelectedTip] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [cancelOtherReason, setCancelOtherReason] = useState('');
  const [showRescheduleCalendar, setShowRescheduleCalendar] = useState(false);
  const [rescheduleSelectedDate, setRescheduleSelectedDate] = useState('');
  const [rescheduleSelectedTime, setRescheduleSelectedTime] = useState('');
  
  // Report issue state
  const [issueCategory, setIssueCategory] = useState('');
  const [issueRelatedBooking, setIssueRelatedBooking] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  
  // Card management state
  const [savedCards, setSavedCards] = useState([
    { id: '1', type: 'visa', last4: '4242', expiry: '12/25', isDefault: true },
    { id: '2', type: 'mastercard', last4: '5555', expiry: '06/26', isDefault: false }
  ]);
  
  // Booking details state (for tracking updated bookings)
  const [currentBooking, setCurrentBooking] = useState({
    id: '#HP12345',
    service: 'Home Cleaning Service',
    date: 'Dec 28, 2024',
    time: '10:00 AM',
    status: 'accepted'
  });

  const deals = [
    {
      id: '1',
      title: 'AC Service Special',
      description: 'Complete AC cleaning and maintenance',
      discount: '25% OFF',
      validTill: '31 Dec 2024',
      image: 'https://images.unsplash.com/photo-1686178827149-6d55c72d81df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwY2xlYW5pbmclMjBzZXJ2aWNlfGVufDF8fHx8MTc1OTA4NTc5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      featured: true
    },
    {
      id: '2',
      title: 'Plumbing Emergency',
      description: '24/7 plumbing repair service',
      discount: '₹200 OFF',
      validTill: '15 Jan 2025',
      image: 'https://images.unsplash.com/photo-1578611709914-0dda0b55f9b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHJlcGFpciUyMHNlcnZpY2V8ZW58MXx8fHwxNzU5MTAyNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const services = [
    {
      id: '1',
      name: 'Home Cleaning',
      description: 'Professional deep cleaning',
      price: '₹899',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1686178827149-6d55c72d81df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwY2xlYW5pbmclMjBzZXJ2aWNlfGVufDF8fHx8MTc1OTA4NTc5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      available: true
    },
    {
      id: '2',
      name: 'Plumbing',
      description: 'Repair and installation',
      price: '₹599',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1578611709914-0dda0b55f9b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHJlcGFpciUyMHNlcnZpY2V8ZW58MXx8fHwxNzU5MTAyNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      available: true
    },
    {
      id: '3',
      name: 'Electrical',
      description: 'Wiring and repairs',
      price: '₹799',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1744302570616-a450cd2191e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwcmVwYWlyJTIwc2VydmljZXxlbnwxfHx8fDE3NTkxMDI1MjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      available: false
    }
  ];

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { id: 'bookings', label: 'Bookings', icon: <CalendarDays className="h-5 w-5" />, badge: 2 },
    { id: 'support', label: 'Support', icon: <Headphones className="h-5 w-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> }
  ];

  const savedAddresses = [
    {
      id: '1',
      name: 'Home',
      address: '123 Main Street, Bandra West',
      pinCode: '400050',
      city: 'Mumbai',
      isDefault: true
    },
    {
      id: '2',
      name: 'Office',
      address: '456 Business Park, Andheri East',
      pinCode: '400069',
      city: 'Mumbai',
      isDefault: false
    }
  ];

  const cancelReasons = [
    'Plans changed',
    'Booked by mistake',
    'Found another slot',
    'Price issue',
    'Other'
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    switch (tabId) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'bookings':
        setCurrentScreen('orders');
        break;
      case 'support':
        setCurrentScreen('support');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
    }
  };

  const renderLocationScreen = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader title="Select Location" showLanguage={true} />
      <div className="flex-1 p-4 space-y-6">
        <div className="text-center space-y-2">
          <MapPin className="h-12 w-12 text-primary mx-auto" />
          <h2>Choose your location</h2>
          <p className="text-muted-foreground">
            We'll show you services available in your area
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full gap-2" 
            onClick={() => setSelectedLocation('Auto-detected')}
          >
            <MapPin className="h-4 w-4" />
            Use Current Location
          </Button>

          <div className="relative">
            <Input
              placeholder="Enter PIN code or area"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>

          {selectedLocation && (
            <Button 
              className="w-full"
              onClick={() => setCurrentScreen('home')}
            >
              Continue
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderHomeScreen = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        leftContent={
          <Button variant="ghost" size="sm" className="gap-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Mumbai, 400001</span>
          </Button>
        }
        showNotifications={true}
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for services..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DealsBanner deals={deals} />

          <div>
            <h3 className="mb-4">Popular Services</h3>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`cursor-pointer transition-all ${!service.available ? 'opacity-50' : 'hover:shadow-md'}`}
                  onClick={() => service.available && setCurrentScreen('service-detail')}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.name}
                      className="w-full h-24 object-cover rounded-t-lg"
                    />
                    {!service.available && (
                      <div className="absolute inset-0 bg-black/50 rounded-t-lg flex items-center justify-center">
                        <span className="text-white text-xs">Unavailable</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h4 className="text-sm">{service.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{service.price}</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{service.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <BottomTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );

  const renderServiceDetail = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Home Cleaning"
        showBack={true}
        onBack={() => setCurrentScreen('home')}
      />
      
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1686178827149-6d55c72d81df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwY2xlYW5pbmclMjBzZXJ2aWNlfGVufDF8fHx8MTc1OTA4NTc5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Home Cleaning"
            className="w-full h-48 object-cover"
          />
          
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h1>Professional Home Cleaning</h1>
              <div className="text-green-600 text-sm font-medium">
                Available in 400001
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>4.8 (124 reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">2-3 hours</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3>What's included:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Deep cleaning of all rooms</li>
                <li>• Kitchen and bathroom sanitization</li>
                <li>• Floor mopping and vacuuming</li>
                <li>• Window cleaning (interior)</li>
              </ul>
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-2xl font-bold">₹899</p>
                </div>
                <Button 
                  size="lg"
                  onClick={() => setCurrentScreen('booking-slot')}
                >
                  Book Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookingSlot = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Select Date & Time"
        showBack={true}
        onBack={() => setCurrentScreen('service-detail')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Stepper 
          steps={['Slot', 'Address', 'Verify', 'Payment']}
          currentStep={0}
        />

        <div>
          <h3 className="font-medium mb-4">Select Date</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {(() => {
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const dayAfter = new Date(today);
                dayAfter.setDate(today.getDate() + 2);
                
                const quickDates = [
                  { label: 'Today', date: today.toLocaleDateString('en-GB'), value: 'Today' },
                  { label: 'Tomorrow', date: tomorrow.toLocaleDateString('en-GB'), value: 'Tomorrow' },
                  { label: dayAfter.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), date: dayAfter.toLocaleDateString('en-GB'), value: dayAfter.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) }
                ];
                
                return quickDates.map((dateOption) => (
                  <Button 
                    key={dateOption.value}
                    variant={selectedDate === dateOption.value ? 'default' : 'outline'}
                    className="h-16 flex flex-col"
                    onClick={() => setSelectedDate(dateOption.value)}
                  >
                    <span className="text-sm">{dateOption.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {dateOption.date}
                    </span>
                  </Button>
                ));
              })()}
            </div>
            
            <Button 
              variant={showCalendar ? 'default' : 'outline'}
              className="w-full gap-2"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <CalendarIcon className="h-4 w-4" />
              {selectedDate && !['Today', 'Tomorrow'].includes(selectedDate) && !selectedDate.includes('Dec') ? 
                `Selected: ${selectedDate}` : 'Choose Other Date'
              }
            </Button>
            
            {showCalendar && (
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {(() => {
                      const today = new Date();
                      const currentMonth = today.getMonth();
                      const currentYear = today.getFullYear();
                      const firstDay = new Date(currentYear, currentMonth, 1);
                      const lastDay = new Date(currentYear, currentMonth + 1, 0);
                      const daysInMonth = lastDay.getDate();
                      const startingDayOfWeek = firstDay.getDay();
                      
                      const dates = [];
                      
                      // Empty cells for days before month starts
                      for (let i = 0; i < startingDayOfWeek; i++) {
                        dates.push(<div key={`empty-${i}`} className="p-2"></div>);
                      }
                      
                      // Days of the month
                      for (let day = 1; day <= daysInMonth; day++) {
                        const date = new Date(currentYear, currentMonth, day);
                        const dateString = date.toLocaleDateString('en-GB');
                        const isToday = day === today.getDate();
                        const isPast = date < today && !isToday;
                        const isSelected = selectedDate === dateString;
                        
                        dates.push(
                          <Button
                            key={day}
                            variant={isSelected ? 'default' : 'ghost'}
                            size="sm"
                            className={`h-8 w-8 p-0 ${isPast ? 'opacity-50 cursor-not-allowed' : ''} ${isToday ? 'border border-primary' : ''}`}
                            disabled={isPast}
                            onClick={() => {
                              setSelectedDate(dateString);
                              setShowCalendar(false);
                            }}
                          >
                            {day}
                          </Button>
                        );
                      }
                      
                      return dates;
                    })()}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const nextMonth = new Date();
                        nextMonth.setMonth(nextMonth.getMonth() + 1);
                        // Add logic to show next month if needed
                      }}
                    >
                      Next Month
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowCalendar(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Available Time Slots</h3>
          <div className="grid grid-cols-2 gap-3">
            {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
              <Button 
                key={time}
                variant={selectedTime === time ? 'default' : 'outline'}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Service Duration</p>
              <p className="text-xs text-blue-700">Estimated 2-3 hours for completion</p>
            </div>
          </div>
        </Card>

        <Button 
          className="w-full"
          disabled={!selectedDate || !selectedTime}
          onClick={() => setCurrentScreen('booking-address')}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderBookingAddress = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Where should we provide the service?"
        showBack={true}
        onBack={() => setCurrentScreen('booking-slot')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Stepper 
          steps={['Slot', 'Address', 'Verify', 'Payment']}
          currentStep={1}
        />

        <div>
          <h4 className="font-medium mb-4">Select Address:</h4>
          
          {/* Use current location pill */}
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-4 gap-2"
            onClick={() => setSelectedAddressId('current-location')}
          >
            <MapPin className="h-4 w-4" />
            Use current location
          </Button>

          {savedAddresses.length === 0 ? (
            <div className="text-center py-8">
              <MapPinIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">No saved addresses yet. Add one to continue.</p>
            </div>
          ) : (
            <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId}>
              <div className="space-y-3">
                {savedAddresses.map((address) => (
                  <Card key={address.id} className={`p-4 cursor-pointer transition-colors ${selectedAddressId === address.id ? 'border-primary bg-primary/5' : ''}`}>
                    <label className="cursor-pointer">
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value={address.id} className="mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{address.name}</h4>
                            {address.isDefault && (
                              <Badge variant="secondary" className="text-xs">Default</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {address.address}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.city} {address.pinCode}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </label>
                  </Card>
                ))}
              </div>
            </RadioGroup>
          )}

          {/* Add new address card */}
          <Card 
            className="p-4 border-dashed border-2 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setCurrentScreen('add-address')}
          >
            <div className="flex items-center gap-3 text-muted-foreground">
              <Plus className="h-5 w-5" />
              <span>Add new address</span>
            </div>
          </Card>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Special Instructions (Optional)
          </label>
          <Textarea
            placeholder="Any specific requirements or instructions for the technician..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            className="min-h-20"
          />
        </div>

        {!selectedAddressId && (
          <Alert className="border-destructive/20 bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              Please select an address to continue.
            </AlertDescription>
          </Alert>
        )}

        <Button 
          className="w-full"
          disabled={!selectedAddressId}
          onClick={() => setCurrentScreen('booking-verify')}
        >
          Continue
        </Button>
      </div>
    </div>
  );

  const renderBookingVerify = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Verify Details"
        showBack={true}
        onBack={() => setCurrentScreen('booking-address')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Stepper 
          steps={['Slot', 'Address', 'Verify', 'Payment']}
          currentStep={2}
        />

        <Card className="p-4">
          <h3 className="font-medium mb-4">Service Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span>Home Cleaning</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date & Time</span>
              <span>{selectedDate} at {selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span>2-3 hours</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-4">Service Address</h3>
          <div className="flex items-start gap-3">
            <MapPinIcon className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              {(() => {
                if (selectedAddressId === 'current-location') {
                  return (
                    <>
                      <p className="font-medium">Current Location</p>
                      <p className="text-sm text-muted-foreground">
                        Auto-detected location will be used
                      </p>
                    </>
                  );
                }
                
                const selectedAddr = savedAddresses.find(addr => addr.id === selectedAddressId);
                if (selectedAddr) {
                  return (
                    <>
                      <p className="font-medium">{selectedAddr.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedAddr.address}, {selectedAddr.city} {selectedAddr.pinCode}
                      </p>
                    </>
                  );
                }
                
                return (
                  <>
                    <p className="font-medium">Address Selected</p>
                    <p className="text-sm text-muted-foreground">
                      Address details will be confirmed
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
          {specialInstructions && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-sm font-medium text-muted-foreground mb-1">Special Instructions:</p>
              <p className="text-sm">{specialInstructions}</p>
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-4">Price Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Service Charge</span>
              <span>₹899</span>
            </div>
            <div className="flex justify-between">
              <span>Service Tax (18%)</span>
              <span>₹161</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total Amount</span>
              <span>₹1,060</span>
            </div>
          </div>
        </Card>

        <Button 
          className="w-full"
          onClick={() => setCurrentScreen('booking-payment')}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );

  const renderBookingPayment = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Payment"
        showBack={true}
        onBack={() => setCurrentScreen('booking-verify')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Stepper 
          steps={['Slot', 'Address', 'Verify', 'Payment']}
          currentStep={3}
        />

        <Card className="p-4">
          <h3 className="font-medium mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Home Cleaning Service</span>
              <span>₹899</span>
            </div>
            <div className="flex justify-between">
              <span>Service Tax (18%)</span>
              <span>₹161</span>
            </div>
            {promoCode && (
              <div className="flex justify-between text-success">
                <span>Discount Applied</span>
                <span>-₹50</span>
              </div>
            )}
            {selectedTip > 0 && (
              <div className="flex justify-between text-primary">
                <span>Tip for Technician</span>
                <span>₹{selectedTip}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{1060 + selectedTip - (promoCode ? 50 : 0)}</span>
            </div>
          </div>
        </Card>

        {/* Promo Code */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Promo Code</h3>
          <div className="flex gap-2">
            <Input 
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">Apply</Button>
          </div>
        </Card>

        {/* Tips Widget */}
        <Card className="p-4">
          <TipsWidget onTipChange={setSelectedTip} />
          <p className="text-xs text-muted-foreground mt-2">
            100% of your tip goes to the technician. Happro takes no cut.
          </p>
        </Card>

        {/* Payment Method */}
        <Card className="p-4">
          <h3 className="font-medium mb-4">Payment Method</h3>
          <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
            <div className="space-y-3">
              <Card className={`p-3 cursor-pointer transition-colors ${selectedPaymentMethod === 'online' ? 'border-primary bg-primary/5' : ''}`}>
                <label className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="online" />
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Pay Online</p>
                      <p className="text-sm text-muted-foreground">Secure UPI/Card payment</p>
                    </div>
                  </div>
                </label>
              </Card>
              
              <Card className={`p-3 cursor-pointer transition-colors ${selectedPaymentMethod === 'pay-later' ? 'border-primary bg-primary/5' : ''}`}>
                <label className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="pay-later" />
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Pay Later</p>
                      <p className="text-sm text-muted-foreground">We'll remind you to pay online after your service is completed.</p>
                    </div>
                  </div>
                </label>
              </Card>
              
              <Card className={`p-3 cursor-pointer transition-colors ${selectedPaymentMethod === 'cod' ? 'border-primary bg-primary/5' : ''}`}>
                <label className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="cod" />
                    <Banknote className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Pay Cash (COD)</p>
                      <p className="text-sm text-muted-foreground">Pay the technician at the time of service.</p>
                    </div>
                  </div>
                </label>
              </Card>
            </div>
          </RadioGroup>
        </Card>

        {/* Policy Checkbox */}
        <Card className="p-4 border-warning/20 bg-warning/5">
          <div className="flex items-start gap-3">
            <Checkbox 
              id="policy-checkbox"
              checked={policyAccepted}
              onCheckedChange={(checked) => setPolicyAccepted(!!checked)}
              className="mt-1"
            />
            <label htmlFor="policy-checkbox" className="text-sm cursor-pointer">
              <p>A minimum service fee may be charged if you cancel within 3 hours of the appointment or if the technician cannot reach you (no one at home).</p>
            </label>
          </div>
        </Card>

        <Button 
          className="w-full"
          disabled={!selectedPaymentMethod || !policyAccepted}
          onClick={() => setCurrentScreen('order-confirmation')}
        >
          <IndianRupee className="h-4 w-4 mr-2" />
          {selectedPaymentMethod === 'online' ? 'Pay Now' : 'Confirm Booking'} ₹{1060 + selectedTip - (promoCode ? 50 : 0)}
        </Button>
      </div>
    </div>
  );

  const renderOrderConfirmation = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader title="Order Confirmed" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6">
        <div className="text-center space-y-4">
          <CheckCircle className="h-16 w-16 text-success mx-auto" />
          <h2>Booking Confirmed!</h2>
          <p className="text-muted-foreground">
            Your home cleaning service has been booked successfully
          </p>
        </div>

        <Card className="w-full p-4">
          <h3 className="font-medium mb-3">Payment Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Service</span>
              <span>₹899</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹161</span>
            </div>
            {promoCode && (
              <div className="flex justify-between text-success">
                <span>Discount</span>
                <span>-₹50</span>
              </div>
            )}
            {selectedTip > 0 && (
              <div className="flex justify-between text-primary">
                <span>Tip (100% to technician)</span>
                <span>₹{selectedTip}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{1060 + selectedTip - (promoCode ? 50 : 0)}</span>
            </div>
            {selectedPaymentMethod === 'cash' && (
              <Badge variant="outline" className="mt-2">
                Payable at service
              </Badge>
            )}
          </div>
          
          <Separator className="my-3" />
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Booking ID</span>
              <span className="font-medium">#HP12345</span>
            </div>
            <div className="flex justify-between">
              <span>Service Date</span>
              <span>Dec 28, 2024 at 10:00 AM</span>
            </div>
          </div>
        </Card>

        <div className="w-full space-y-3">
          <Button 
            className="w-full"
            onClick={() => setCurrentScreen('orders')}
          >
            View Order Details
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setCurrentScreen('home')}
          >
            Book Another Service
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPaymentDue = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Payment Due"
        showBack={true}
        onBack={() => setCurrentScreen('orders')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Your payment is due for booking #HP12345
          </AlertDescription>
        </Alert>

        <Card className="p-4">
          <h3 className="font-medium mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Home Cleaning Service</span>
              <span>₹899</span>
            </div>
            <div className="flex justify-between">
              <span>Service Tax (18%)</span>
              <span>₹161</span>
            </div>
            {promoCode && (
              <div className="flex justify-between text-success">
                <span>Discount Applied</span>
                <span>-₹50</span>
              </div>
            )}
            {selectedTip > 0 && (
              <div className="flex justify-between text-primary">
                <span>Tip for Technician</span>
                <span>₹{selectedTip}</span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total Due</span>
              <span>₹{1060 + selectedTip - (promoCode ? 50 : 0)}</span>
            </div>
          </div>
        </Card>

        {/* Optional: Add Tip */}
        <Card className="p-4">
          <h3 className="font-medium mb-3">Add a Tip (Optional)</h3>
          <TipsWidget onTipChange={setSelectedTip} />
          <p className="text-xs text-muted-foreground mt-2">
            100% of your tip goes to the technician. Happro takes no cut.
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-4">Payment Method</h3>
          <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
            <div className="space-y-3">
              <Card className={`p-3 cursor-pointer transition-colors ${selectedPaymentMethod === 'online' ? 'border-primary bg-primary/5' : ''}`}>
                <label className="cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="online" />
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Pay Online</p>
                      <p className="text-sm text-muted-foreground">Secure UPI/Card payment</p>
                    </div>
                  </div>
                </label>
              </Card>
            </div>
          </RadioGroup>
        </Card>

        <Button 
          className="w-full"
          disabled={!selectedPaymentMethod}
          onClick={() => {
            // Simulate payment success
            setCurrentScreen('order-detail');
          }}
        >
          <IndianRupee className="h-4 w-4 mr-2" />
          Pay Now ₹{1060 + selectedTip - (promoCode ? 50 : 0)}
        </Button>
      </div>
    </div>
  );

  const renderCancelBooking = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Cancel Booking"
        showBack={true}
        onBack={() => setCurrentScreen('order-detail')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="p-4">
          <h3 className="font-medium mb-2">Booking {currentBooking.id}</h3>
          <p className="text-sm text-muted-foreground">{currentBooking.service}</p>
          <p className="text-sm text-muted-foreground">{currentBooking.date} at {currentBooking.time}</p>
        </Card>

        <div>
          <h3 className="font-medium mb-4">Why are you cancelling?</h3>
          <RadioGroup value={cancelReason} onValueChange={setCancelReason}>
            <div className="space-y-3">
              {cancelReasons.map((reason) => (
                <Card key={reason} className={`p-3 cursor-pointer transition-colors ${cancelReason === reason ? 'border-primary bg-primary/5' : ''}`}>
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={reason} />
                      <span>{reason}</span>
                    </div>
                  </label>
                </Card>
              ))}
            </div>
          </RadioGroup>

          {cancelReason === 'Other' && (
            <div className="mt-3">
              <Textarea
                placeholder="Please specify your reason..."
                value={cancelOtherReason}
                onChange={(e) => setCancelOtherReason(e.target.value)}
                className="min-h-20"
              />
            </div>
          )}
        </div>

        <Alert className="border-warning/20 bg-warning/5">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertDescription>
            <p className="font-medium text-warning mb-1">Cancellation Policy</p>
            <p className="text-sm">Cancellations within 3 hours of the appointment may incur a minimum service fee.</p>
          </AlertDescription>
        </Alert>

        {/* Fee preview - only show if within 3 hours */}
        {(() => {
          // Calculate if booking is within 3 hours
          const bookingDateTime = new Date(`${currentBooking.date} ${currentBooking.time}`);
          const now = new Date();
          const timeDifference = bookingDateTime.getTime() - now.getTime();
          const hoursUntilBooking = timeDifference / (1000 * 60 * 60);
          const isWithin3Hours = hoursUntilBooking <= 3 && hoursUntilBooking > 0;
          
          if (isWithin3Hours) {
            return (
              <Card className="p-4 border-destructive/20 bg-destructive/5">
                <h4 className="font-medium text-destructive mb-2">Fee Preview</h4>
                <div className="flex justify-between text-sm">
                  <span>Minimum service fee</span>
                  <span className="font-medium">₹199</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This fee helps cover technician travel and scheduling costs.
                </p>
              </Card>
            );
          }
          return null;
        })()}

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setCurrentScreen('order-detail')}
          >
            Keep Booking
          </Button>
          <Button 
            className="flex-1 bg-destructive hover:bg-destructive/90"
            disabled={!cancelReason || (cancelReason === 'Other' && !cancelOtherReason.trim())}
            onClick={() => {
              // Show success toast and redirect
              setCurrentScreen('orders');
              // Here you would typically show a toast: "Booking cancelled."
            }}
          >
            Cancel Booking
          </Button>
        </div>
      </div>
    </div>
  );

  const renderRescheduleBooking = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Reschedule Booking"
        showBack={true}
        onBack={() => setCurrentScreen('order-detail')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="p-4">
          <h3 className="font-medium mb-2">Current Booking</h3>
          <p className="text-sm text-muted-foreground">{currentBooking.service}</p>
          <p className="text-sm text-muted-foreground">{currentBooking.date} at {currentBooking.time}</p>
        </Card>

        <Alert className="border-info/20 bg-info/5">
          <Clock className="h-4 w-4 text-info" />
          <AlertDescription>
            <p className="text-info font-medium mb-1">Reschedule Policy</p>
            <p className="text-sm">Free reschedule until 3 hours before the appointment. Closer changes may be limited.</p>
          </AlertDescription>
        </Alert>

        {/* Date Selection with Calendar */}
        <div>
          <h3 className="font-medium mb-4">Select New Date</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              {(() => {
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const dayAfter = new Date(today);
                dayAfter.setDate(today.getDate() + 2);
                
                const quickDates = [
                  { label: 'Today', date: today.toLocaleDateString('en-GB'), value: 'Today' },
                  { label: 'Tomorrow', date: tomorrow.toLocaleDateString('en-GB'), value: 'Tomorrow' },
                  { label: dayAfter.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }), date: dayAfter.toLocaleDateString('en-GB'), value: dayAfter.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) }
                ];
                
                return quickDates.map((dateOption) => (
                  <Button 
                    key={dateOption.value}
                    variant={rescheduleSelectedDate === dateOption.value ? 'default' : 'outline'}
                    className="h-16 flex flex-col"
                    onClick={() => setRescheduleSelectedDate(dateOption.value)}
                  >
                    <span className="text-sm">{dateOption.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {dateOption.date}
                    </span>
                  </Button>
                ));
              })()}
            </div>

            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={() => setShowRescheduleCalendar(true)}
            >
              <CalendarIcon className="h-4 w-4" />
              Choose from Calendar
            </Button>

            {/* Calendar Modal */}
            {showRescheduleCalendar && (
              <Card className="p-4 border-2 border-primary/20 bg-primary/5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium">Select Date</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowRescheduleCalendar(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                    <div key={day} className="p-2 font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {(() => {
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = today.getMonth();
                    const firstDay = new Date(year, month, 1);
                    const lastDay = new Date(year, month + 1, 0);
                    const startDate = new Date(firstDay);
                    startDate.setDate(startDate.getDate() - firstDay.getDay());
                    
                    const calendar = [];
                    for (let i = 0; i < 42; i++) {
                      const currentDate = new Date(startDate);
                      currentDate.setDate(startDate.getDate() + i);
                      
                      const isCurrentMonth = currentDate.getMonth() === month;
                      const isToday = currentDate.toDateString() === today.toDateString();
                      const isPast = currentDate < today && !isToday;
                      const dateStr = currentDate.toLocaleDateString('en-GB');
                      
                      calendar.push(
                        <Button
                          key={i}
                          variant={rescheduleSelectedDate === dateStr ? 'default' : 'ghost'}
                          size="sm"
                          className={`h-8 w-8 p-0 ${!isCurrentMonth ? 'text-muted-foreground/50' : ''} ${isToday ? 'bg-primary/10' : ''}`}
                          disabled={isPast}
                          onClick={() => {
                            if (!isPast && isCurrentMonth) {
                              setRescheduleSelectedDate(dateStr);
                              setShowRescheduleCalendar(false);
                            }
                          }}
                        >
                          {currentDate.getDate()}
                        </Button>
                      );
                    }
                    return calendar;
                  })()}
                </div>
              </Card>
            )}

            {rescheduleSelectedDate && (
              <div className="text-center text-sm text-muted-foreground">
                Selected: {rescheduleSelectedDate}
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Available Time Slots</h3>
          <div className="grid grid-cols-2 gap-3">
            {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
              <Button 
                key={time}
                variant={rescheduleSelectedTime === time ? 'default' : 'outline'}
                onClick={() => setRescheduleSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setCurrentScreen('order-detail')}
          >
            Back
          </Button>
          <Button 
            className="flex-1"
            disabled={!rescheduleSelectedDate || !rescheduleSelectedTime}
            onClick={() => {
              // Update the current booking with new date and time
              const newDate = rescheduleSelectedDate;
              const newTime = rescheduleSelectedTime;
              
              setCurrentBooking(prev => ({
                ...prev,
                date: newDate,
                time: newTime
              }));
              
              // Reset reschedule form
              setRescheduleSelectedDate('');
              setRescheduleSelectedTime('');
              setShowRescheduleCalendar(false);
              
              // Show success toast and redirect
              setCurrentScreen('order-detail');
              // Here you would typically show a toast: "Your booking was rescheduled to {newDate} at {newTime}."
            }}
          >
            Confirm Reschedule
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAddAddress = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Add New Address"
        showBack={true}
        onBack={() => setCurrentScreen('booking-address')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Address Name</label>
            <Input placeholder="e.g., Home, Office, Friend's Place" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Complete Address</label>
            <Textarea
              placeholder="Enter your complete address..."
              className="min-h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">PIN Code</label>
              <Input placeholder="400001" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <Input placeholder="Mumbai" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="default-address" />
            <label htmlFor="default-address" className="text-sm">
              Set as default address
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setCurrentScreen('booking-address')}
          >
            Cancel
          </Button>
          <Button 
            className="flex-1"
            onClick={() => {
              // Save address and set as selected
              setSelectedAddressId('new-address');
              setCurrentScreen('booking-address');
            }}
          >
            Save Address
          </Button>
        </div>
      </div>
    </div>
  );

  const renderOrderDetail = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Order Details"
        showBack={true}
        onBack={() => setCurrentScreen('orders')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium">{currentBooking.service}</h3>
              <p className="text-sm text-muted-foreground">{currentBooking.id}</p>
            </div>
            <StatusChip status={currentBooking.status} />
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Service Date</span>
              <span>{currentBooking.date} at {currentBooking.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span>2-3 hours</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount</span>
              <span className="font-medium">₹{1060 + selectedTip}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-3">Service Address</h3>
          <div className="flex items-start gap-3">
            <MapPinIcon className="h-5 w-5 text-muted-foreground mt-1" />
            <div>
              <p>123 Main Street, Bandra West</p>
              <p className="text-sm text-muted-foreground">Mumbai 400050</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-3">Technician Details</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Raj Kumar</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span>4.9 (120 reviews)</span>
              </div>
            </div>
            <div className="ml-auto space-x-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={() => setCurrentScreen('cancel-booking')}
          >
            Cancel
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setCurrentScreen('reschedule-booking')}
          >
            Reschedule
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSupportScreen = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader title="Customer Support" />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="p-4 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <img src={exampleImage} alt="Happro Logo" className="w-10 h-10" />
          </div>
          <h3 className="font-medium mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground">
            Our support team is here to assist you 24/7
          </p>
        </Card>

        <div className="space-y-3">
          <h3 className="font-medium">Contact Us</h3>
          
          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
            onClick={() => setCurrentScreen('support-chat')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Live Chat</p>
                <p className="text-sm text-muted-foreground">Chat with our support team</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Call Us</p>
                <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
              </div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">WhatsApp</p>
                <p className="text-sm text-muted-foreground">Message us on WhatsApp</p>
              </div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-start h-auto p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-red-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-muted-foreground">support@happro.in</p>
              </div>
            </div>
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium">Quick Help</h3>
          
          <Button 
            variant="outline" 
            className="w-full justify-between"
            onClick={() => setCurrentScreen('support-faq')}
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              <span>Frequently Asked Questions</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>

          <Button 
            variant="outline" 
            className="w-full justify-between"
            onClick={() => setCurrentScreen('report-issue')}
          >
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span>Report an Issue</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      <BottomTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );

  const renderSupportChat = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Live Chat"
        showBack={true}
        onBack={() => setCurrentScreen('support')}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Today, 2:30 PM
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Headphones className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
              <p className="text-sm">Hello! I'm here to help you. How can I assist you today?</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input 
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSupportFAQ = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="FAQ"
        showBack={true}
        onBack={() => setCurrentScreen('support')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[
          {
            question: "How do I book a service?",
            answer: "You can book a service by selecting the service you need, choosing your preferred date and time, and completing the payment."
          },
          {
            question: "Can I reschedule my booking?",
            answer: "Yes, you can reschedule your booking up to 4 hours before the scheduled time without any charges."
          },
          {
            question: "How does the tip system work?",
            answer: "100% of your tip goes directly to the technician. We don't take any cut from the tips you provide."
          },
          {
            question: "What if I'm not satisfied with the service?",
            answer: "If you're not satisfied, please contact our support team. We offer a satisfaction guarantee and will resolve any issues."
          }
        ].map((faq, index) => (
          <Card key={index} className="p-4">
            <h4 className="font-medium mb-2">{faq.question}</h4>
            <p className="text-sm text-muted-foreground">{faq.answer}</p>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfileScreen = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader title="Profile" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Amit Sharma</h3>
                <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                <p className="text-sm text-muted-foreground">amit.sharma@email.com</p>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            <h3 className="font-medium">Account</h3>
            
            <Button 
              variant="outline" 
              className="w-full justify-between h-auto p-4"
              onClick={() => setCurrentScreen('wallet')}
            >
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">Wallet</p>
                  <p className="text-sm text-muted-foreground">Balance: ₹250</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-between h-auto p-4"
              onClick={() => setCurrentScreen('addresses')}
            >
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">My Addresses</p>
                  <p className="text-sm text-muted-foreground">Manage saved addresses</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>

            <Button variant="outline" className="w-full justify-between h-auto p-4">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">Favorites</p>
                  <p className="text-sm text-muted-foreground">Your favorite services</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>

            <Button variant="outline" className="w-full justify-between h-auto p-4">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-muted-foreground" />
                <div className="text-left">
                  <p className="font-medium">Refer & Earn</p>
                  <p className="text-sm text-muted-foreground">Invite friends and earn rewards</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium">Preferences</h3>
            
            <Button 
              variant="outline" 
              className="w-full justify-between h-auto p-4"
              onClick={() => setCurrentScreen('settings')}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <span>Settings</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>

            <Button variant="outline" className="w-full justify-between h-auto p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span>Notifications</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          <Button variant="outline" className="w-full text-red-600 border-red-200">
            Sign Out
          </Button>
        </div>
      </div>

      <BottomTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );

  const renderWalletScreen = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Wallet"
        showBack={true}
        onBack={() => setCurrentScreen('profile')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="p-6 bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="text-center space-y-2">
            <p className="text-sm opacity-90">Available Balance</p>
            <p className="text-3xl font-bold">₹250</p>
            <Button variant="secondary" size="sm" className="mt-3">
              Add Money
            </Button>
          </div>
        </Card>

        <div>
          <h3 className="font-medium mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[
              { type: 'debit', amount: '₹1,060', desc: 'Home Cleaning Service', date: 'Dec 28' },
              { type: 'credit', amount: '₹500', desc: 'Money Added', date: 'Dec 25' },
              { type: 'credit', amount: '₹100', desc: 'Referral Bonus', date: 'Dec 20' }
            ].map((transaction, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? 
                        <ArrowLeft className="h-4 w-4 text-green-600 rotate-180" /> :
                        <ArrowRight className="h-4 w-4 text-red-600" />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.desc}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <span className={`font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAddressesScreen = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="My Addresses"
        showBack={true}
        onBack={() => setCurrentScreen('profile')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Button 
          className="w-full gap-2"
          onClick={() => setCurrentScreen('add-address')}
        >
          <MapPinIcon className="h-4 w-4" />
          Add New Address
        </Button>

        <div className="space-y-3">
          {[
            { label: 'Home', address: '123 Main Street, Bandra West, Mumbai 400050', isDefault: true },
            { label: 'Office', address: '456 Business Park, Andheri East, Mumbai 400069', isDefault: false }
          ].map((addr, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-5 w-5 text-muted-foreground mt-1" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{addr.label}</p>
                      {addr.isDefault && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{addr.address}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAddAddressScreen = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Add Address"
        showBack={true}
        onBack={() => setCurrentScreen('addresses')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Address Label</label>
            <Input placeholder="e.g., Home, Office, etc." />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Complete Address</label>
            <Textarea 
              placeholder="Enter your complete address..."
              className="min-h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">PIN Code</label>
              <Input placeholder="400050" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <Input placeholder="Mumbai" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Landmark (Optional)</label>
            <Input placeholder="Near XYZ Mall" />
          </div>
        </div>

        <Button className="w-full">
          Save Address
        </Button>
      </div>
    </div>
  );

  const renderOrdersScreen = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader title="My Bookings" />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <Button variant="default" size="sm">Upcoming</Button>
            <Button variant="outline" size="sm">Ongoing</Button>
            <Button variant="outline" size="sm">Completed</Button>
          </div>

          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium">{currentBooking.service}</h4>
                  <p className="text-sm text-muted-foreground">{currentBooking.id}</p>
                </div>
                <StatusChip status={currentBooking.status} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Date & Time</span>
                  <span>{currentBooking.date} at {currentBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span>₹{1060 + selectedTip}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3"
                onClick={() => setCurrentScreen('order-detail')}
              >
                View Details
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <BottomTabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );

  const renderReportIssue = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Report an Issue"
        showBack={true}
        onBack={() => setCurrentScreen('support')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-orange-900">We're here to help</p>
              <p className="text-xs text-orange-700">Please provide details about the issue you're facing so we can assist you better.</p>
            </div>
          </div>
        </Card>

        <div>
          <label className="block text-sm font-medium mb-2">Issue Category *</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Service Quality',
              'Payment Issue',
              'Technician Behavior',
              'Booking Problem',
              'App Technical Issue',
              'Other'
            ].map((category) => (
              <Button
                key={category}
                variant={issueCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIssueCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Related Booking (Optional)</label>
          <select 
            className="w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm"
            value={issueRelatedBooking}
            onChange={(e) => setIssueRelatedBooking(e.target.value)}
          >
            <option value="">Select a booking</option>
            <option value="HP12345">HP12345 - Home Cleaning (Dec 28)</option>
            <option value="HP12344">HP12344 - Plumbing (Dec 25)</option>
            <option value="HP12343">HP12343 - Electrical (Dec 20)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Describe the Issue *</label>
          <Textarea
            placeholder="Please describe your issue in detail..."
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            className="min-h-32"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Include as many details as possible to help us resolve your issue quickly
          </p>
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <HelpCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900 text-sm">
            Our support team typically responds within 24 hours. For urgent matters, please call us at +91 1800-123-4567.
          </AlertDescription>
        </Alert>

        <Button 
          className="w-full"
          disabled={!issueCategory || !issueDescription}
          onClick={() => {
            // Submit the issue
            setCurrentScreen('report-issue-submitted');
            // Reset form
            setIssueCategory('');
            setIssueRelatedBooking('');
            setIssueDescription('');
          }}
        >
          Submit Issue
        </Button>
      </div>
    </div>
  );

  const renderReportIssueSubmitted = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Issue Reported"
        showBack={false}
      />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <div className="text-center space-y-2">
          <h2>Issue Reported Successfully</h2>
          <p className="text-muted-foreground">
            Your issue has been recorded with reference ID: <span className="font-medium">#ISSUE{Date.now().toString().slice(-5)}</span>
          </p>
        </div>

        <Card className="p-4 w-full">
          <h3 className="font-medium mb-3">What happens next?</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-primary">1</span>
              </div>
              <p className="text-muted-foreground">Our support team will review your issue within 24 hours</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-primary">2</span>
              </div>
              <p className="text-muted-foreground">We'll contact you via phone or email with updates</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <span className="text-xs font-medium text-primary">3</span>
              </div>
              <p className="text-muted-foreground">You can track the status in your notifications</p>
            </div>
          </div>
        </Card>

        <div className="flex gap-3 w-full">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => setCurrentScreen('support')}
          >
            Back to Support
          </Button>
          <Button 
            className="flex-1"
            onClick={() => setCurrentScreen('home')}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );

  const renderManageCards = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Manage Cards"
        showBack={true}
        onBack={() => setCurrentScreen('wallet')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Alert className="border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900 text-sm">
            Your card details are encrypted and stored securely. We never share your information with third parties.
          </AlertDescription>
        </Alert>

        <div>
          <h3 className="font-medium mb-4">Saved Cards</h3>
          {savedCards.length === 0 ? (
            <Card className="p-6 text-center">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No cards saved yet</p>
              <p className="text-sm text-muted-foreground">Add a card for faster checkout</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {savedCards.map((card) => (
                <Card key={card.id} className={`p-4 ${card.isDefault ? 'border-primary bg-primary/5' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {card.type === 'visa' ? 'Visa' : card.type === 'mastercard' ? 'Mastercard' : 'Card'} •••• {card.last4}
                        </p>
                        <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                        {card.isDefault && (
                          <Badge variant="secondary" className="text-xs mt-1">Default</Badge>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setSavedCards(savedCards.filter(c => c.id !== card.id));
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {!card.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3"
                      onClick={() => {
                        setSavedCards(savedCards.map(c => ({
                          ...c,
                          isDefault: c.id === card.id
                        })));
                      }}
                    >
                      Set as Default
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        <Button 
          className="w-full gap-2"
          onClick={() => setCurrentScreen('add-card')}
        >
          <Plus className="h-4 w-4" />
          Add New Card
        </Button>
      </div>
    </div>
  );

  const renderAddCard = () => (
    <div className="flex-1 flex flex-col">
      <MobileHeader 
        title="Add New Card"
        showBack={true}
        onBack={() => setCurrentScreen('manage-cards')}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <CreditCard className="h-8 w-8" />
              <p className="text-xs opacity-75">CREDIT/DEBIT CARD</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm opacity-75">Card Number</p>
              <p className="text-xl tracking-wider">•••• •••• •••• ••••</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-xs opacity-75">Card Holder</p>
                <p className="text-sm">YOUR NAME</p>
              </div>
              <div className="text-right">
                <p className="text-xs opacity-75">Expires</p>
                <p className="text-sm">MM/YY</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Card Number *</label>
            <Input 
              placeholder="1234 5678 9012 3456" 
              maxLength={19}
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cardholder Name *</label>
            <Input placeholder="Name as on card" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">Expiry Date *</label>
              <Input placeholder="MM/YY" maxLength={5} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CVV *</label>
              <Input placeholder="123" maxLength={3} type="password" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="save-card" defaultChecked />
            <label htmlFor="save-card" className="text-sm">
              Save this card for future payments
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="default-card" />
            <label htmlFor="default-card" className="text-sm">
              Set as default payment method
            </label>
          </div>
        </div>

        <Alert className="border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900 text-sm">
            Your card information is encrypted with bank-grade security and never stored on our servers.
          </AlertDescription>
        </Alert>

        <Button 
          className="w-full"
          onClick={() => {
            // Add the new card
            const newCard = {
              id: `card-${Date.now()}`,
              type: 'visa',
              last4: '1234',
              expiry: '12/25',
              isDefault: false
            };
            setSavedCards([...savedCards, newCard]);
            setCurrentScreen('manage-cards');
          }}
        >
          Add Card
        </Button>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'location':
        return renderLocationScreen();
      case 'home':
        return renderHomeScreen();
      case 'home-preview':
        return renderHomeScreen(); // Preview uses same layout as home
      case 'service-detail':
        return renderServiceDetail();
      case 'booking-slot':
        return renderBookingSlot();
      case 'booking-address':
        return renderBookingAddress();
      case 'booking-verify':
        return renderBookingVerify();
      case 'booking-payment':
        return renderBookingPayment();
      case 'payment-due':
        return renderPaymentDue();
      case 'order-confirmation':
        return renderOrderConfirmation();
      case 'orders':
        return renderOrdersScreen();
      case 'order-detail':
        return renderOrderDetail();
      case 'cancel-booking':
        return renderCancelBooking();
      case 'reschedule-booking':
        return renderRescheduleBooking();
      case 'support':
        return renderSupportScreen();
      case 'support-chat':
        return renderSupportChat();
      case 'support-faq':
        return renderSupportFAQ();
      case 'report-issue':
        return renderReportIssue();
      case 'report-issue-submitted':
        return renderReportIssueSubmitted();
      case 'profile':
        return renderProfileScreen();
      case 'wallet':
        return renderWalletScreen();
      case 'manage-cards':
        return renderManageCards();
      case 'add-card':
        return renderAddCard();
      case 'addresses':
        return renderAddressesScreen();
      case 'add-address':
        return renderAddAddress();
      default:
        return renderHomeScreen();
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-sm mx-auto border-x border-border">
      {renderScreen()}
    </div>
  );
}