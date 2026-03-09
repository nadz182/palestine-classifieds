import { useNavigate } from 'react-router-dom';
import { MapPin, Heart, Maximize2, ArrowLeftRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';
import { categories } from '../../data/categories';
import { useStore } from '../../store/useStore';

export function PropertyCardList({ property }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, toggleCompare, isInCompare } = useStore();
  const category = categories.find(c => c.id === property.category);
  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const formatPrice = (price, listingType) => {
    if (!price) return t('property.contactForPrice');
    return listingType === 'rent' ? `$${price.toLocaleString()}/mo` : `$${price.toLocaleString()}`;
  };

  return (
    <div
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer flex"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      {/* Image */}
      <div className="relative w-64 min-h-[180px] bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            {category && <category.icon className="w-12 h-12 opacity-30" />}
          </div>
        )}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5">
          <Badge variant={property.listingType === 'rent' ? 'rent' : 'sale'}>
            {property.listingType === 'rent' ? t('property.forRent') : t('property.forSale')}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex gap-1.5 ms-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => toggleFavorite(property.id)}
                className={cn(
                  'p-1.5 rounded-full transition-colors',
                  favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                )}
              >
                <Heart className={cn('w-4 h-4', favorited && 'fill-current')} />
              </button>
              <button
                onClick={() => toggleCompare(property.id)}
                className={cn(
                  'p-1.5 rounded-full transition-colors',
                  compared ? 'text-primary-600' : 'text-gray-400 hover:text-primary-600'
                )}
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{property.city}{property.district ? `, ${property.district}` : ''}</span>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{property.description}</p>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            {property.area && (
              <div className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{property.area} {property.areaUnit}</span>
              </div>
            )}
            {category && (
              <Badge variant="outline">{t(`categories.${category.id}`)}</Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-lg font-bold text-primary-600">
            {formatPrice(property.price, property.listingType)}
          </span>
          {property.features && property.features.length > 0 && (
            <div className="flex gap-1">
              {property.features.slice(0, 2).map(f => (
                <span key={f} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                  {t(`features.${f}`)}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
