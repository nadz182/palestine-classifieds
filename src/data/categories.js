import { Home, Trees, Building2, Factory, Building, Warehouse, Tractor, LandPlot } from 'lucide-react';

export const categories = [
  {
    id: 'residential-land',
    name: 'Residential Land',
    icon: LandPlot,
    subcategories: ['Zoned Residential', 'Unzoned', 'Subdivision Ready', 'Hilltop'],
    group: 'land',
  },
  {
    id: 'agricultural-land',
    name: 'Agricultural Land',
    icon: Trees,
    subcategories: ['Irrigated', 'Rain-fed', 'Olive Groves', 'Greenhouses'],
    group: 'land',
  },
  {
    id: 'commercial-land',
    name: 'Commercial Land',
    icon: Building2,
    subcategories: ['Roadside', 'City Center', 'Industrial Zone', 'Mixed Use'],
    group: 'land',
  },
  {
    id: 'industrial-land',
    name: 'Industrial Land',
    icon: Factory,
    subcategories: ['Light Industrial', 'Heavy Industrial', 'Warehouse Zone', 'Free Zone'],
    group: 'land',
  },
  {
    id: 'houses-villas',
    name: 'Houses & Villas',
    icon: Home,
    subcategories: ['Detached Villa', 'Semi-Detached', 'Townhouse', 'Traditional House'],
    group: 'property',
  },
  {
    id: 'apartments',
    name: 'Apartments',
    icon: Building,
    subcategories: ['Studio', '1 Bedroom', '2 Bedrooms', '3+ Bedrooms', 'Penthouse', 'Duplex'],
    group: 'property',
  },
  {
    id: 'commercial-property',
    name: 'Commercial Property',
    icon: Warehouse,
    subcategories: ['Office', 'Retail Shop', 'Warehouse', 'Restaurant', 'Showroom'],
    group: 'property',
  },
  {
    id: 'farms',
    name: 'Farms',
    icon: Tractor,
    subcategories: ['Working Farm', 'Hobby Farm', 'Poultry Farm', 'Livestock Farm', 'Mixed Farm'],
    group: 'property',
  },
];

export const categoryGroups = [
  { id: 'land', name: 'Land', description: 'Find the perfect plot' },
  { id: 'property', name: 'Properties', description: 'Ready-built spaces' },
];
