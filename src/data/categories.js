import { Home, Car, MapPin, Briefcase, Smartphone, Sofa, ShoppingBag, Users } from 'lucide-react';

export const categories = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    icon: Home,
    subcategories: ['Houses', 'Apartments', 'Land', 'Commercial', 'Farms']
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    icon: Car,
    subcategories: ['Cars', 'Motorcycles', 'Trucks', 'Buses', 'Parts & Accessories']
  },
  {
    id: 'land',
    name: 'Land',
    icon: MapPin,
    subcategories: ['Agricultural', 'Residential', 'Commercial', 'Industrial']
  },
  {
    id: 'jobs',
    name: 'Jobs',
    icon: Briefcase,
    subcategories: ['Full Time', 'Part Time', 'Freelance', 'Internship']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Smartphone,
    subcategories: ['Phones', 'Computers', 'TVs', 'Cameras', 'Accessories']
  },
  {
    id: 'furniture',
    name: 'Furniture',
    icon: Sofa,
    subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Office', 'Outdoor']
  },
  {
    id: 'services',
    name: 'Services',
    icon: Users,
    subcategories: ['Construction', 'Cleaning', 'Education', 'Health', 'Other']
  },
  {
    id: 'other',
    name: 'Other',
    icon: ShoppingBag,
    subcategories: ['Clothing', 'Books', 'Sports', 'Toys', 'Miscellaneous']
  }
];
