// Mock data for Partner App
export const deals = [
  {
    id: '1',
    title: '20% Off All Cleaning Services',
    description: 'Valid till Dec 31',
    badge: 'Featured'
  },
  {
    id: '2',
    title: 'New Year Special - Free Equipment Upgrade',
    description: 'For electrical services',
    badge: 'New'
  }
];

export const technicians = [
  {
    id: 'tech-1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 11111',
    skills: ['Plumbing', 'Electrical'],
    rating: '4.8',
    completedJobs: 145,
    areas: ['400001', '400002'],
    status: 'Active' as const
  },
  {
    id: 'tech-2',
    name: 'Amit Singh',
    phone: '+91 98765 22222',
    skills: ['Home Cleaning'],
    rating: '4.6',
    completedJobs: 98,
    areas: ['400001', '400003'],
    status: 'Active' as const
  },
  {
    id: 'tech-3',
    name: 'Pradeep Sharma',
    phone: '+91 98765 33333',
    skills: ['Carpentry', 'Painting'],
    rating: '4.9',
    completedJobs: 167,
    areas: ['400002', '400004'],
    status: 'Active' as const
  }
];

export const services = [
  {
    id: 'srv-1',
    name: 'Home Cleaning',
    description: 'Professional deep cleaning',
    price: '₹999',
    inMyArea: true
  },
  {
    id: 'srv-2',
    name: 'Plumbing',
    description: 'Fix leaks, install fixtures',
    price: '₹599',
    inMyArea: true
  },
  {
    id: 'srv-3',
    name: 'Electrical Work',
    description: 'Wiring, repairs, installations',
    price: '₹699',
    inMyArea: true
  },
  {
    id: 'srv-4',
    name: 'Carpentry',
    description: 'Furniture repair and installation',
    price: '₹799',
    inMyArea: false
  },
  {
    id: 'srv-5',
    name: 'Painting',
    description: 'Interior and exterior painting',
    price: '₹1499',
    inMyArea: false
  }
];

export const bookings = [
  {
    id: 'HP12345',
    service: 'Home Cleaning',
    customer: 'Priya Sharma',
    customerPhone: '+91 98765 11111',
    date: 'Dec 29, 2024',
    time: '10:00 AM',
    amount: '₹1060',
    tip: '₹100',
    status: 'accepted' as const,
    technician: 'Rajesh Kumar',
    address: '123 MG Road, Mumbai 400001'
  },
  {
    id: 'HP12346',
    service: 'Plumbing',
    customer: 'Amit Patel',
    customerPhone: '+91 98765 22222',
    date: 'Dec 29, 2024',
    time: '2:00 PM',
    amount: '₹760',
    tip: '₹50',
    status: 'pending' as const,
    technician: null,
    address: '456 Link Road, Mumbai 400002'
  }
];

export const jobs = [
  {
    id: 'HP12347',
    service: 'Home Cleaning',
    customer: 'Sunita Roy',
    customerPhone: '+91 98765 33333',
    date: 'Dec 29, 2024',
    time: '11:00 AM',
    amount: '₹1060',
    tip: '₹80',
    status: 'new' as const,
    address: '789 Park Street, Mumbai 400003',
    distance: '2.3 km'
  },
  {
    id: 'HP12348',
    service: 'Electrical Work',
    customer: 'Vikram Mehta',
    customerPhone: '+91 98765 44444',
    date: 'Dec 29, 2024',
    time: '3:00 PM',
    amount: '₹850',
    tip: '₹100',
    status: 'today' as const,
    address: '321 Station Road, Mumbai 400001',
    distance: '1.8 km'
  },
  {
    id: 'HP12345',
    service: 'Home Cleaning',
    customer: 'Priya Sharma',
    customerPhone: '+91 98765 11111',
    date: 'Dec 28, 2024',
    time: '10:00 AM',
    amount: '₹1060',
    tip: '₹100',
    status: 'completed' as const,
    address: '123 MG Road, Mumbai 400001',
    distance: '1.5 km',
    rating: 5,
    feedback: 'Excellent service! Very professional and thorough cleaning. Would definitely book again.'
  },
  {
    id: 'HP12340',
    service: 'Plumbing',
    customer: 'Amit Patel',
    customerPhone: '+91 98765 22222',
    date: 'Dec 27, 2024',
    time: '2:00 PM',
    amount: '₹760',
    tip: '₹50',
    status: 'completed' as const,
    address: '456 Link Road, Mumbai 400002',
    distance: '2.1 km',
    rating: 4,
    feedback: 'Good work, but arrived 15 minutes late.'
  }
];

export const notifications = [
  {
    id: 'not-1',
    type: 'new-job',
    title: 'New Job Available',
    message: 'Home Cleaning service at 2.3 km away',
    time: '2 min ago',
    read: false,
    jobId: 'HP12347'
  },
  {
    id: 'not-2',
    type: 'job-reminder',
    title: 'Upcoming Job Reminder',
    message: 'Electrical Work scheduled for today at 3:00 PM',
    time: '1 hour ago',
    read: false,
    jobId: 'HP12348'
  },
  {
    id: 'not-3',
    type: 'payment',
    title: 'Payment Received',
    message: '₹1,160 credited for booking #HP12345',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'not-4',
    type: 'rating',
    title: 'Customer Rated You',
    message: 'Priya Sharma gave you 5 stars! ⭐',
    time: '3 hours ago',
    read: true,
    jobId: 'HP12345'
  },
  {
    id: 'not-5',
    type: 'rating',
    title: 'Customer Rated You',
    message: 'Amit Patel gave you 4 stars',
    time: '1 day ago',
    read: true,
    jobId: 'HP12340'
  }
];