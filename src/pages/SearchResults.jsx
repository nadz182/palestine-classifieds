import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SearchFilters } from '../components/Search/SearchFilters';
import { ActiveFilters } from '../components/Search/ActiveFilters';
import { SortDropdown } from '../components/Search/SortDropdown';
import { PropertyGrid } from '../components/Property/PropertyGrid';
import { SearchBar } from '../components/Search/SearchBar';
import { Button } from '../components/ui/Button';
import { getProperties } from '../utils/storage';
import { useStore } from '../store/useStore';
import { categories } from '../data/categories';

export function SearchResults() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { filters, setFilters } = useStore();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [properties] = useState(getProperties());

  // Sync URL params to filters on mount
  useEffect(() => {
    const updates = {};
    const q = searchParams.get('q');
    const city = searchParams.get('city');
    const category = searchParams.get('category');
    const listingType = searchParams.get('listingType');
    const group = searchParams.get('group');

    if (q) updates.query = q;
    if (city) updates.city = city;
    if (category) updates.propertyType = category;
    if (listingType) updates.listingType = listingType;
    if (group) {
      const groupCategories = categories.filter(c => c.group === group);
      if (groupCategories.length > 0) {
        // Don't set specific type, let it show all in group
      }
    }

    if (Object.keys(updates).length > 0) {
      setFilters(updates);
    }
  }, [searchParams, setFilters]);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Group filter from URL
    const group = searchParams.get('group');
    if (group) {
      const groupCategoryIds = categories.filter(c => c.group === group).map(c => c.id);
      result = result.filter(p => groupCategoryIds.includes(p.category));
    }

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.city?.toLowerCase().includes(q)
      );
    }

    if (filters.listingType) {
      result = result.filter(p => p.listingType === filters.listingType);
    }

    if (filters.propertyType) {
      result = result.filter(p => p.category === filters.propertyType);
    }

    if (filters.city) {
      result = result.filter(p => p.city === filters.city);
    }

    if (filters.priceMin > 0) {
      result = result.filter(p => p.price >= filters.priceMin);
    }
    if (filters.priceMax > 0) {
      result = result.filter(p => p.price <= filters.priceMax);
    }

    if (filters.areaMin > 0) {
      result = result.filter(p => p.area >= filters.areaMin);
    }
    if (filters.areaMax > 0) {
      result = result.filter(p => p.area <= filters.areaMax);
    }

    if (filters.features.length > 0) {
      result = result.filter(p =>
        filters.features.every(f => p.features?.includes(f))
      );
    }

    if (filters.zoning) {
      result = result.filter(p => p.zoning === filters.zoning);
    }

    switch (filters.sortBy) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-asc':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'area-desc':
        result.sort((a, b) => (b.area || 0) - (a.area || 0));
        break;
      case 'area-asc':
        result.sort((a, b) => (a.area || 0) - (b.area || 0));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [properties, filters, searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('search.searchProperties')}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{t('search.findYourPerfect')}</p>
        </div>
        <div className="flex items-center gap-3">
          <SortDropdown />
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-1.5 text-sm"
          >
            <Filter className="w-4 h-4" /> {t('search.filters')}
          </Button>
        </div>
      </div>

      {/* Search bar + Active filters */}
      <div className="mb-6 space-y-3">
        <SearchBar
          value={filters.query}
          onChange={(q) => setFilters({ query: q })}
          onSubmit={(e) => e.preventDefault()}
        />
        <ActiveFilters />
      </div>

      {/* Layout */}
      <div className="flex gap-6">
        {/* Sidebar filters (desktop) */}
        <aside className="hidden md:block w-72 flex-shrink-0">
          <SearchFilters />
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <PropertyGrid properties={filteredProperties} />
        </div>
      </div>

      {/* Mobile filter overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
          <div className="absolute end-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
            <SearchFilters onClose={() => setShowMobileFilters(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
