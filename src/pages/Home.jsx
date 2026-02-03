import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { CategoryGrid } from '../components/Category/CategoryGrid';
import { AdCard } from '../components/Ad/AdCard';
import { AdsMapView } from '../components/Map/AdsMapView';
import { getAds } from '../utils/storage';

export function Home() {
  const [ads] = useState(getAds());
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAds = ads.filter(ad =>
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const adsWithLocation = filteredAds.filter(ad => ad.location);

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to Palestine Classifieds</h1>
        <p className="text-xl mb-6">Buy, sell, and discover items across Palestine</p>
        
        <div className="max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for items, services, or properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
        </div>
      </section>

      {adsWithLocation.length > 0 && (
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <MapPin className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Ads on Map
            </h2>
            <span className="text-sm text-gray-600">
              ({adsWithLocation.length} {adsWithLocation.length === 1 ? 'ad' : 'ads'} with location)
            </span>
          </div>
          <AdsMapView ads={filteredAds} height="500px" />
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Categories</h2>
        <CategoryGrid />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {searchQuery ? 'Search Results' : 'Recent Ads'}
        </h2>
        {filteredAds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds.map((ad) => (
              <AdCard key={ad.id} ad={ad} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">
              {searchQuery ? 'No ads found matching your search.' : 'No ads posted yet. Be the first to post!'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
