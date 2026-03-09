import { LayoutGrid, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PropertyCard } from './PropertyCard';
import { PropertyCardList } from './PropertyCardList';
import { PropertyCardSkeleton } from '../ui/Skeleton';
import { cn } from '../../utils/cn';
import { useStore } from '../../store/useStore';

export function PropertyGrid({ properties, loading }) {
  const { t } = useTranslation();
  const { viewMode, setViewMode } = useStore();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl">
        <p className="text-gray-500 text-lg">{t('property.noProperties')}</p>
        <p className="text-gray-400 text-sm mt-1">{t('property.tryAdjusting')}</p>
      </div>
    );
  }

  return (
    <div>
      {/* View toggle */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {t('property.propertiesFound', { count: properties.length })}
        </p>
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-2 transition-colors',
              viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-2 transition-colors',
              viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Properties */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map(property => (
            <PropertyCardList key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
