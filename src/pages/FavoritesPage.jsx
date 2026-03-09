import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PropertyGrid } from '../components/Property/PropertyGrid';
import { Button } from '../components/ui/Button';
import { getProperties } from '../utils/storage';
import { useStore } from '../store/useStore';

export function FavoritesPage() {
  const { t } = useTranslation();
  const { favorites } = useStore();
  const allProperties = getProperties();
  const properties = allProperties.filter(p => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          {t('favorites.title')}
        </h1>
        <p className="text-sm text-gray-500 mt-1">{t('favorites.count', { count: properties.length })}</p>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('favorites.noProperties')}</h3>
          <p className="text-gray-500 mb-4">{t('favorites.clickHeart')}</p>
          <Link to="/search">
            <Button>{t('favorites.browseProperties')}</Button>
          </Link>
        </div>
      ) : (
        <PropertyGrid properties={properties} />
      )}
    </div>
  );
}
