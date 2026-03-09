import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function HeroSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const quickFilters = [
    { label: t('quickFilters.forSale'), param: 'listingType', value: 'sale' },
    { label: t('quickFilters.forRent'), param: 'listingType', value: 'rent' },
    { label: t('quickFilters.land'), param: 'group', value: 'land' },
    { label: t('quickFilters.apartments'), param: 'category', value: 'apartments' },
    { label: t('quickFilters.houses'), param: 'category', value: 'houses-villas' },
    { label: t('quickFilters.farms'), param: 'category', value: 'farms' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleQuickFilter = (filter) => {
    navigate(`/search?${filter.param}=${encodeURIComponent(filter.value)}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, white 2px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-primary-100">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-6">
          <div className="flex bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="flex-1 flex items-center px-4">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder={t('hero.searchPlaceholder')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-4 text-gray-900 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 md:px-8 font-medium transition-colors flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">{t('hero.search')}</span>
            </button>
          </div>
        </form>

        {/* Quick filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {quickFilters.map(filter => (
            <button
              key={filter.value}
              onClick={() => handleQuickFilter(filter)}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-sm rounded-full backdrop-blur-sm transition-colors border border-white/20"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
