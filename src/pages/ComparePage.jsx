import { Link } from 'react-router-dom';
import { ArrowLeftRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PropertyCompare } from '../components/Property/PropertyCompare';
import { Button } from '../components/ui/Button';
import { getProperties } from '../utils/storage';
import { useStore } from '../store/useStore';

export function ComparePage() {
  const { t } = useTranslation();
  const { compareList, toggleCompare, clearCompare } = useStore();
  const allProperties = getProperties();
  const properties = allProperties.filter(p => compareList.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6 text-primary-600" />
            {t('compare.title')}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {t('compare.selectedOf', { count: properties.length })}
          </p>
        </div>
        {properties.length > 0 && (
          <Button variant="secondary" onClick={clearCompare} className="text-sm">
            {t('compare.clearAll')}
          </Button>
        )}
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <ArrowLeftRight className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('compare.noProperties')}</h3>
          <p className="text-gray-500 mb-4">{t('compare.addUpTo')}</p>
          <Link to="/search">
            <Button>{t('compare.browseProperties')}</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <PropertyCompare properties={properties} onRemove={toggleCompare} />
        </div>
      )}
    </div>
  );
}
