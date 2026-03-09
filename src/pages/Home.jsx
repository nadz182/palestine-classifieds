import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { HeroSearch } from '../components/Search/HeroSearch';
import { PropertyCard } from '../components/Property/PropertyCard';
import { PropertyMapView } from '../components/Map/PropertyMapView';
import { Button } from '../components/ui/Button';
import { categories } from '../data/categories';
import { palestineCities } from '../data/palestineData';
import { getProperties } from '../utils/storage';

export function Home() {
  const { t } = useTranslation();
  const [properties] = useState(getProperties());

  const recentProperties = useMemo(() =>
    [...properties].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6),
    [properties]
  );

  const propertiesWithLocation = properties.filter(p => p.location);

  return (
    <div>
      {/* Hero */}
      <HeroSearch />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Properties */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('home.featuredProperties')}</h2>
              <p className="text-gray-500 text-sm mt-1">{t('home.latestListings')}</p>
            </div>
            <Link to="/search">
              <Button variant="outline" className="flex items-center gap-1.5 text-sm">
                {t('home.viewAll')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* Browse by Type */}
        <section className="py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('home.browseByType')}</h2>
          <p className="text-gray-500 text-sm mb-6">{t('home.findExactly')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(category => {
              const Icon = category.icon;
              const count = properties.filter(p => p.category === category.id).length;
              return (
                <Link
                  key={category.id}
                  to={`/search?category=${category.id}`}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 group"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary-100 transition-colors">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t(`categories.${category.id}`)}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{count} {t('home.listings')}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Browse by City */}
        <section className="py-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('home.browseByCity')}</h2>
          <p className="text-gray-500 text-sm mb-6">{t('home.exploreProperties')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {palestineCities.slice(0, 10).map(city => {
              const count = properties.filter(p => p.city === city.name).length;
              return (
                <Link
                  key={city.name}
                  to={`/search?city=${encodeURIComponent(city.name)}`}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 text-center group"
                >
                  <MapPin className="w-5 h-5 text-primary-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-gray-900 text-sm">{city.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{count} {t('home.properties')}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Map Section */}
        {propertiesWithLocation.length > 0 && (
          <section className="py-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('home.propertiesOnMap')}</h2>
                <p className="text-gray-500 text-sm mt-1">{t('home.propertiesWithLocation', { count: propertiesWithLocation.length })}</p>
              </div>
              <Link to="/map">
                <Button variant="outline" className="flex items-center gap-1.5 text-sm">
                  {t('home.fullMap')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
            <PropertyMapView properties={properties} height="450px" />
          </section>
        )}
      </div>
    </div>
  );
}
