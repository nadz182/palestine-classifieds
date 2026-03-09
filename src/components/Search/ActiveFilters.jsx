import { useTranslation } from 'react-i18next';
import { Chip } from '../ui/Chip';
import { categories } from '../../data/categories';
import { useStore } from '../../store/useStore';

export function ActiveFilters() {
  const { t } = useTranslation();
  const { filters, setFilters } = useStore();
  const chips = [];

  if (filters.query) {
    chips.push({ label: `"${filters.query}"`, onRemove: () => setFilters({ query: '' }) });
  }
  if (filters.listingType) {
    chips.push({
      label: filters.listingType === 'sale' ? t('property.forSale') : t('property.forRent'),
      onRemove: () => setFilters({ listingType: '' }),
    });
  }
  if (filters.propertyType) {
    const cat = categories.find(c => c.id === filters.propertyType);
    chips.push({ label: cat ? t(`categories.${cat.id}`) : filters.propertyType, onRemove: () => setFilters({ propertyType: '' }) });
  }
  if (filters.city) {
    chips.push({ label: filters.city, onRemove: () => setFilters({ city: '' }) });
  }
  if (filters.priceMin > 0 || filters.priceMax > 0) {
    const min = filters.priceMin > 0 ? `$${(filters.priceMin / 1000).toFixed(0)}K` : '$0';
    const max = filters.priceMax > 0 ? `$${(filters.priceMax / 1000).toFixed(0)}K` : 'Any';
    chips.push({ label: `${t('search.priceRange')}: ${min} - ${max}`, onRemove: () => setFilters({ priceMin: 0, priceMax: 0 }) });
  }
  if (filters.zoning) {
    chips.push({ label: `${t('search.zoning')}: ${t(`zoning.${filters.zoning}`)}`, onRemove: () => setFilters({ zoning: '' }) });
  }
  filters.features.forEach(f => {
    chips.push({ label: t(`features.${f}`), onRemove: () => setFilters({ features: filters.features.filter(x => x !== f) }) });
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-500">{t('search.active')}</span>
      {chips.map((chip, i) => (
        <Chip key={i} active onRemove={chip.onRemove}>
          {chip.label}
        </Chip>
      ))}
    </div>
  );
}
