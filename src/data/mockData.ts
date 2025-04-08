
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: 'hour' | 'day' | 'week' | 'month';
  images: string[];
  category: string;
  vendor: {
    id: string;
    name: string;
    rating: number;
  };
  availabilityCalendar?: {
    unavailableDates: string[];
  };
  videoUrl?: string;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'c1',
    name: 'Electronics',
    icon: '💻',
    description: 'Rent the latest electronics and gadgets'
  },
  {
    id: 'c2',
    name: 'Home & Furniture',
    icon: '🛋️',
    description: 'Furniture and home appliances for rent'
  },
  {
    id: 'c3',
    name: 'Tools & Equipment',
    icon: '🔨',
    description: 'Professional tools and equipment'
  },
  {
    id: 'c4',
    name: 'Vehicles',
    icon: '🚗',
    description: 'Cars, bikes, and other vehicles'
  },
  {
    id: 'c5',
    name: 'Clothing & Accessories',
    icon: '👔',
    description: 'Designer clothing and accessories'
  },
  {
    id: 'c6',
    name: 'Sports & Outdoors',
    icon: '⚽',
    description: 'Equipment for sports and outdoor activities'
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    title: 'High-End DSLR Camera',
    description: 'Professional-grade camera perfect for photography enthusiasts. Comes with multiple lenses and accessories.',
    price: 35,
    priceUnit: 'day',
    images: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&q=80&w=1000',
    ],
    category: 'c1',
    vendor: {
      id: 'v1',
      name: 'Pro Camera Rentals',
      rating: 4.8
    },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    rating: 4.9,
    reviews: 245
  },
  {
    id: 'p2',
    title: 'Luxury Sofa Set',
    description: 'Modern design luxury sofa set with a coffee table. Perfect for home staging or temporary needs.',
    price: 150,
    priceUnit: 'week',
    images: [
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1000',
    ],
    category: 'c2',
    vendor: {
      id: 'v2',
      name: 'Furniture Leasing Inc',
      rating: 4.5
    },
    rating: 4.7,
    reviews: 132
  },
  {
    id: 'p3',
    title: 'Professional Power Drill Set',
    description: 'Complete set of professional-grade power tools including a drill, impact driver, and accessories.',
    price: 25,
    priceUnit: 'day',
    images: [
      'https://images.unsplash.com/photo-1616345840969-855ef4b4f6b5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?auto=format&fit=crop&q=80&w=1000',
    ],
    category: 'c3',
    vendor: {
      id: 'v3',
      name: 'Tool Rental Depot',
      rating: 4.6
    },
    rating: 4.5,
    reviews: 198
  },
  {
    id: 'p4',
    title: 'Electric Scooter',
    description: 'Eco-friendly electric scooter with a range of 30 miles per charge. Great for city commuting.',
    price: 20,
    priceUnit: 'day',
    images: [
      'https://images.unsplash.com/photo-1589632893573-62e946654539?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1561128290-315f754e348c?auto=format&fit=crop&q=80&w=1000',
    ],
    category: 'c4',
    vendor: {
      id: 'v4',
      name: 'Urban Mobility',
      rating: 4.7
    },
    rating: 4.8,
    reviews: 310
  },
  {
    id: 'p5',
    title: 'Designer Evening Gown',
    description: 'Elegant designer evening gown, perfect for special occasions and formal events.',
    price: 75,
    priceUnit: 'day',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=1000',
    ],
    category: 'c5',
    vendor: {
      id: 'v5',
      name: 'Fashion Forward Rentals',
      rating: 4.9
    },
    rating: 4.9,
    reviews: 156
  },
  {
    id: 'p6',
    title: 'Mountain Bike',
    description: 'High-performance mountain bike suitable for all terrains. Includes helmet and basic repair kit.',
    price: 30,
    priceUnit: 'day',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1559348349-86f1f65817fe?auto=format&fit=crop&q=80&w=1000',
    ],
    category: 'c6',
    vendor: {
      id: 'v6',
      name: 'Adventure Sports Rentals',
      rating: 4.7
    },
    availabilityCalendar: {
      unavailableDates: ['2025-04-15', '2025-04-16', '2025-04-17']
    },
    rating: 4.6,
    reviews: 215
  },
];

// Mock order data
export interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  rentalPeriod: string;
  vendorName: string;
  deliveryAddress: string;
}

export const orders: Order[] = [
  {
    id: 'o1',
    productId: 'p1',
    productName: 'High-End DSLR Camera',
    productImage: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1000',
    startDate: '2025-04-10',
    endDate: '2025-04-15',
    totalPrice: 175,
    status: 'confirmed',
    rentalPeriod: '5 days',
    vendorName: 'Pro Camera Rentals',
    deliveryAddress: '123 Main St, Anytown, USA'
  },
  {
    id: 'o2',
    productId: 'p3',
    productName: 'Professional Power Drill Set',
    productImage: 'https://images.unsplash.com/photo-1616345840969-855ef4b4f6b5?auto=format&fit=crop&q=80&w=1000',
    startDate: '2025-03-28',
    endDate: '2025-03-30',
    totalPrice: 50,
    status: 'delivered',
    rentalPeriod: '2 days',
    vendorName: 'Tool Rental Depot',
    deliveryAddress: '123 Main St, Anytown, USA'
  },
];
