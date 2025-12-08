// CMS Content Types and Mock Data

export type CMSContentType = 'category' | 'banner' | 'festivalWish' | 'customSection';

export interface CMSSection {
  id: string;
  type: CMSContentType;
  title: string;
  description?: string;
  iconUrl?: string;
  imageUrl?: string;
  actionLabel?: string;
  actionUrl?: string;
  isActive: boolean;
  order: number;
  validUntil?: string;
  backgroundColor?: string;
}

export interface CMSDashboardContent {
  category: CMSSection[];
  banner: CMSSection[];
  festivalWish: CMSSection[];
  customSection: CMSSection[];
}

export interface CMSContent {
  customer: CMSDashboardContent;
  partner: CMSDashboardContent;
}

// Mock CMS Content
export const cmsContent: CMSContent = {
  customer: {
    category: [
      {
        id: 'cat_1',
        type: 'category',
        title: 'AC Repair & Service',
        description: 'Installation, repair, and maintenance',
        iconUrl: '❄️',
        actionLabel: 'Book Now',
        actionUrl: '/services/ac-repair',
        isActive: true,
        order: 1,
      },
      {
        id: 'cat_2',
        type: 'category',
        title: 'Plumbing',
        description: 'Leak fixes, pipe installation',
        iconUrl: '🔧',
        actionLabel: 'Book Now',
        actionUrl: '/services/plumbing',
        isActive: true,
        order: 2,
      },
      {
        id: 'cat_3',
        type: 'category',
        title: 'Electrical',
        description: 'Wiring, switches, appliance repair',
        iconUrl: '⚡',
        actionLabel: 'Book Now',
        actionUrl: '/services/electrical',
        isActive: true,
        order: 3,
      },
      {
        id: 'cat_4',
        type: 'category',
        title: 'Cleaning',
        description: 'Deep cleaning, sanitization',
        iconUrl: '✨',
        actionLabel: 'Book Now',
        actionUrl: '/services/cleaning',
        isActive: true,
        order: 4,
      },
      {
        id: 'cat_5',
        type: 'category',
        title: 'Painting',
        description: 'Interior & exterior painting',
        iconUrl: '🎨',
        actionLabel: 'Book Now',
        actionUrl: '/services/painting',
        isActive: true,
        order: 5,
      },
      {
        id: 'cat_6',
        type: 'category',
        title: 'Carpentry',
        description: 'Furniture repair & installation',
        iconUrl: '🪚',
        actionLabel: 'Book Now',
        actionUrl: '/services/carpentry',
        isActive: true,
        order: 6,
      },
    ],
    banner: [
      {
        id: 'banner_1',
        type: 'banner',
        title: 'Diwali Special - 25% Off',
        description: 'Get 25% off on all home cleaning services',
        imageUrl: 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=800',
        actionLabel: 'Claim Offer',
        actionUrl: '/offers/diwali',
        isActive: true,
        order: 1,
        validUntil: '2025-11-15',
        backgroundColor: '#FFF4E6',
      },
      {
        id: 'banner_2',
        type: 'banner',
        title: 'Free AC Checkup',
        description: 'Summer special - Free inspection with every service',
        imageUrl: 'https://images.unsplash.com/photo-1631545806609-4b0c56bcb954?w=800',
        actionLabel: 'Learn More',
        actionUrl: '/offers/ac-checkup',
        isActive: true,
        order: 2,
        validUntil: '2025-06-30',
        backgroundColor: '#E0F2FE',
      },
    ],
    festivalWish: [
      {
        id: 'wish_1',
        type: 'festivalWish',
        title: 'Happy Diwali! 🪔',
        description: 'Wishing you and your family a bright and prosperous Diwali',
        imageUrl: 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=600',
        isActive: true,
        order: 1,
        validUntil: '2025-11-15',
      },
    ],
    customSection: [
      {
        id: 'custom_1',
        type: 'customSection',
        title: 'Refer & Earn ₹500',
        description: 'Share Happro with friends and earn rewards on every successful booking',
        iconUrl: '🎁',
        actionLabel: 'Refer Now',
        actionUrl: '/referral',
        isActive: true,
        order: 1,
      },
    ],
  },
  partner: {
    category: [
      {
        id: 'p_cat_1',
        type: 'category',
        title: 'New Jobs Available',
        description: 'Browse and accept new service requests',
        iconUrl: '📋',
        actionLabel: 'View Jobs',
        actionUrl: '/jobs',
        isActive: true,
        order: 1,
      },
      {
        id: 'p_cat_2',
        type: 'category',
        title: 'My Earnings',
        description: 'Track your income and payouts',
        iconUrl: '💰',
        actionLabel: 'View Details',
        actionUrl: '/earnings',
        isActive: true,
        order: 2,
      },
      {
        id: 'p_cat_3',
        type: 'category',
        title: 'Tips Received',
        description: '100% of customer tips go to you',
        iconUrl: '⭐',
        actionLabel: 'View Tips',
        actionUrl: '/tips',
        isActive: true,
        order: 3,
      },
    ],
    banner: [
      {
        id: 'p_banner_1',
        type: 'banner',
        title: 'Earn More This Diwali!',
        description: 'Complete 20 jobs this week and get ₹2000 bonus',
        imageUrl: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=800',
        actionLabel: 'View Details',
        actionUrl: '/incentives/diwali',
        isActive: true,
        order: 1,
        validUntil: '2025-11-15',
        backgroundColor: '#FEF3C7',
      },
    ],
    festivalWish: [
      {
        id: 'p_wish_1',
        type: 'festivalWish',
        title: 'Happy Diwali, Partner! 🪔',
        description: 'Thank you for being a valued Happro partner. Wishing you prosperity!',
        imageUrl: 'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?w=600',
        isActive: true,
        order: 1,
        validUntil: '2025-11-15',
      },
    ],
    customSection: [
      {
        id: 'p_custom_1',
        type: 'customSection',
        title: 'Training Resources',
        description: 'Access video tutorials and best practices',
        iconUrl: '📚',
        actionLabel: 'Learn Now',
        actionUrl: '/training',
        isActive: true,
        order: 1,
      },
      {
        id: 'p_custom_2',
        type: 'customSection',
        title: 'Partner Leaderboard',
        description: 'See top performers and monthly rankings',
        iconUrl: '🏆',
        actionLabel: 'View Rankings',
        actionUrl: '/leaderboard',
        isActive: true,
        order: 2,
      },
    ],
  },
};
