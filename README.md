# Palestine Classifieds

A modern, mobile-ready classifieds platform built with React, featuring interactive map integration for Palestine. Users can browse categories, post ads, and select locations on an interactive map.

## Features

- **Interactive Map Integration**: Built with Leaflet/React-Leaflet showing Palestine with major cities
- **Location Selection**: Click on map to select precise locations for ads
- **Multiple Categories**: Real Estate, Vehicles, Land, Jobs, Electronics, Furniture, Services, and more
- **Subcategories**: Each category has relevant subcategories for better organization
- **Search Functionality**: Search across all ads by title and description
- **Responsive Design**: Mobile-first design ready for conversion to a mobile app
- **Local Storage**: Ads are stored locally in the browser
- **Modern UI**: Built with TailwindCSS and Lucide icons

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Leaflet & React-Leaflet** - Interactive maps
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **LocalStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Ad/
│   │   └── AdCard.jsx          # Ad listing card component
│   ├── Category/
│   │   └── CategoryGrid.jsx    # Category grid display
│   ├── Layout/
│   │   ├── Header.jsx          # App header with navigation
│   │   └── Layout.jsx          # Main layout wrapper
│   ├── Map/
│   │   └── MapView.jsx         # Interactive map component
│   └── ui/
│       ├── Button.jsx          # Reusable button component
│       ├── Card.jsx            # Card container component
│       ├── Input.jsx           # Form input component
│       ├── Select.jsx          # Select dropdown component
│       └── Textarea.jsx        # Textarea component
├── data/
│   ├── categories.js           # Category definitions
│   └── palestineData.js        # Palestine map data and cities
├── pages/
│   ├── Home.jsx                # Homepage with search and categories
│   ├── CreateAd.jsx            # Create new ad form
│   ├── AdDetail.jsx            # Individual ad detail page
│   └── CategoryPage.jsx        # Category-specific ad listings
├── utils/
│   ├── cn.js                   # Utility for className merging
│   └── storage.js              # LocalStorage management
├── App.jsx                     # Main app with routing
└── main.jsx                    # App entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Categories

The platform includes 8 main categories:
- Real Estate (Houses, Apartments, Land, Commercial, Farms)
- Vehicles (Cars, Motorcycles, Trucks, Buses, Parts)
- Land (Agricultural, Residential, Commercial, Industrial)
- Jobs (Full Time, Part Time, Freelance, Internship)
- Electronics (Phones, Computers, TVs, Cameras, Accessories)
- Furniture (Living Room, Bedroom, Kitchen, Office, Outdoor)
- Services (Construction, Cleaning, Education, Health, Other)
- Other (Clothing, Books, Sports, Toys, Miscellaneous)

### Map Integration

- Interactive map centered on Palestine
- Major cities marked (Jerusalem, Gaza, Ramallah, Hebron, Nablus, etc.)
- Click-to-select location when creating ads
- View ad locations on detail pages
- Bounded to Palestine region for focused experience

## Future Enhancements

- User authentication and profiles
- Image upload for ads
- Favorites/Bookmarks
- Advanced filtering (price range, date, location radius)
- Chat/messaging between buyers and sellers
- Email notifications
- Backend API integration
- Mobile app conversion (React Native)
- Social media sharing
- Ad expiration and renewal
- Payment integration for premium listings

## Mobile App Conversion

This project is built with mobile app conversion in mind:
- Component-based architecture
- React Router for navigation (easily convertible to React Navigation)
- Responsive design with TailwindCSS
- No browser-specific dependencies (except LocalStorage, which can be replaced with AsyncStorage)
- Clean separation of concerns

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
