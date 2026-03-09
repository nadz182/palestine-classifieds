import { useTranslation } from 'react-i18next';
import { Dropdown, DropdownItem } from '../ui/Dropdown';
import { useStore } from '../../store/useStore';

export function SortDropdown() {
  const { t } = useTranslation();
  const { filters, setFilters } = useStore();

  const sortOptions = [
    { id: 'newest', label: t('sort.newestFirst') },
    { id: 'oldest', label: t('sort.oldestFirst') },
    { id: 'price-asc', label: t('sort.priceLowHigh') },
    { id: 'price-desc', label: t('sort.priceHighLow') },
    { id: 'area-desc', label: t('sort.largestArea') },
    { id: 'area-asc', label: t('sort.smallestArea') },
  ];

  const current = sortOptions.find(o => o.id === filters.sortBy) || sortOptions[0];

  return (
    <Dropdown trigger={current.label}>
      {sortOptions.map(option => (
        <DropdownItem
          key={option.id}
          onClick={() => setFilters({ sortBy: option.id })}
          active={filters.sortBy === option.id}
        >
          {option.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
