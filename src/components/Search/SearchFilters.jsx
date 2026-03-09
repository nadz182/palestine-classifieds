import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Slider } from '../ui/Slider';
import { cn } from '../../utils/cn';
import { categories } from '../../data/categories';
import { palestineCities } from '../../data/palestineData';
import { useStore } from '../../store/useStore';

const zoningKeys = ['residential-a', 'residential-b', 'commercial', 'agricultural', 'industrial'];

const featureKeys = [
  'Parking', 'Garden', 'Pool', 'Elevator', 'Central Heating', 'Air Conditioning',
  'Balcony', 'Security System', 'Furnished', 'Water Well', 'Road Access', 'Fenced',
];

export function SearchFilters({ className, onClose }) {
  const { t } = useTranslation();
  const { filters, setFilters, resetFilters } = useStore();
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    location: true,
    price: true,
    area: false,
    features: false,
    zoning: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className={cn('bg-white rounded-xl shadow-md p-5', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-900">{t('search.filters')}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            {t('search.clearAll')}
          </button>
          {onClose && (
            <button onClick={onClose} className="md:hidden p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1">
        {/* Property Type */}
        <FilterSection title={t('search.propertyType')} expanded={expandedSections.type} onToggle={() => toggleSection('type')}>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{t('search.listingType')}</label>
              <div className="flex gap-2">
                {['', 'sale', 'rent'].map(type => (
                  <button
                    key={type}
                    onClick={() => setFilters({ listingType: type })}
                    className={cn(
                      'flex-1 py-2 text-sm rounded-lg border transition-colors',
                      filters.listingType === type
                        ? 'bg-primary-50 border-primary-300 text-primary-700 font-medium'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    {type === '' ? t('search.all') : type === 'sale' ? t('search.sale') : t('search.rent')}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">{t('search.category')}</label>
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({ propertyType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">{t('search.allCategories')}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{t(`categories.${cat.id}`)}</option>
                ))}
              </select>
            </div>
          </div>
        </FilterSection>

        {/* Location */}
        <FilterSection title={t('search.location')} expanded={expandedSections.location} onToggle={() => toggleSection('location')}>
          <select
            value={filters.city}
            onChange={(e) => setFilters({ city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">{t('search.allCities')}</option>
            {palestineCities.map(city => (
              <option key={city.name} value={city.name}>{city.name}</option>
            ))}
          </select>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title={t('search.priceRange')} expanded={expandedSections.price} onToggle={() => toggleSection('price')}>
          <Slider
            min={0}
            max={500000}
            value={[filters.priceMin, filters.priceMax || 500000]}
            onChange={([min, max]) => setFilters({ priceMin: min, priceMax: max === 500000 ? 0 : max })}
            step={5000}
            formatLabel={(v) => v >= 500000 ? '$500K+' : `$${(v / 1000).toFixed(0)}K`}
          />
        </FilterSection>

        {/* Area Range */}
        <FilterSection title={t('search.area')} expanded={expandedSections.area} onToggle={() => toggleSection('area')}>
          <Slider
            min={0}
            max={50}
            value={[filters.areaMin, filters.areaMax || 50]}
            onChange={([min, max]) => setFilters({ areaMin: min, areaMax: max === 50 ? 0 : max })}
            step={1}
            formatLabel={(v) => v >= 50 ? '50+' : `${v} dunam`}
          />
        </FilterSection>

        {/* Features */}
        <FilterSection title={t('search.features')} expanded={expandedSections.features} onToggle={() => toggleSection('features')}>
          <div className="flex flex-wrap gap-2">
            {featureKeys.map(feature => {
              const active = filters.features.includes(feature);
              return (
                <button
                  key={feature}
                  onClick={() => {
                    const features = active
                      ? filters.features.filter(f => f !== feature)
                      : [...filters.features, feature];
                    setFilters({ features });
                  }}
                  className={cn(
                    'px-2.5 py-1 text-xs rounded-full border transition-colors',
                    active
                      ? 'bg-primary-50 border-primary-300 text-primary-700'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {t(`features.${feature}`)}
                </button>
              );
            })}
          </div>
        </FilterSection>

        {/* Zoning */}
        <FilterSection title={t('search.zoning')} expanded={expandedSections.zoning} onToggle={() => toggleSection('zoning')}>
          <select
            value={filters.zoning}
            onChange={(e) => setFilters({ zoning: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">{t('search.allZoning')}</option>
            {zoningKeys.map(key => (
              <option key={key} value={key}>{t(`zoning.${key}`)}</option>
            ))}
          </select>
        </FilterSection>
      </div>
    </div>
  );
}

function FilterSection({ title, expanded, onToggle, children }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3 text-sm font-medium text-gray-700"
      >
        {title}
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {expanded && <div className="pb-4">{children}</div>}
    </div>
  );
}
