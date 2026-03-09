import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

export function SearchBar({ value, onChange, onSubmit, placeholder, className }) {
  const { t } = useTranslation();

  return (
    <form onSubmit={onSubmit} className={cn('relative', className)}>
      <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder={placeholder || t('search.searchPlaceholder')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full ps-9 pe-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </form>
  );
}
