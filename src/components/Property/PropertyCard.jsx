import { useNavigate } from 'react-router-dom';
import { MapPin, Heart, Maximize2, ArrowLeftRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';
import { categories } from '../../data/categories';
import { useStore } from '../../store/useStore';

export function PropertyCard({ property }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, toggleCompare, isInCompare } = useStore();
  const category = categories.find(c => c.id === property.category);
  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  const formatPrice = (price, listingType) => {
    if (!price) return t('property.contactForPrice');
    const formatted = price >= 1000 ? `$${(price / 1000).toFixed(price >= 10000 ? 0 : 1)}K` : `$${price}`;
    return listingType === 'rent' ? `${formatted}/mo` : `$${price.toLocaleString()}`;
  };

  return (
    <div
      className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            {category && <category.icon className="w-16 h-16 opacity-30" />}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 start-3 flex gap-1.5">
          <Badge variant={property.listingType === 'rent' ? 'rent' : 'sale'}>
            {property.listingType === 'rent' ? t('property.forRent') : t('property.forSale')}
          </Badge>
          <Badge variant={property.propertyType === 'land' ? 'land' : 'property'}>
            {category ? t(`categories.${category.id}`) : ''}
          </Badge>
        </div>

        {/* Actions */}
        <div className="absolute top-3 end-3 flex gap-1.5" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => toggleFavorite(property.id)}
            className={cn(
              'p-2 rounded-full backdrop-blur-sm transition-colors',
              favorited ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
            )}
          >
            <Heart className={cn('w-4 h-4', favorited && 'fill-current')} />
          </button>
          <button
            onClick={() => toggleCompare(property.id)}
            className={cn(
              'p-2 rounded-full backdrop-blur-sm transition-colors',
              compared ? 'bg-primary-600 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
            )}
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
          <span className="text-xl font-bold text-white">
            {formatPrice(property.price, property.listingType)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{property.city}{property.district ? `, ${property.district}` : ''}</span>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {property.area && (
            <div className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{property.area} {property.areaUnit}</span>
            </div>
          )}
          {property.pricePerUnit && property.area && (
            <span className="text-xs text-gray-400">
              ${property.pricePerUnit.toLocaleString()}/{property.areaUnit}
            </span>
          )}
        </div>

        {/* Features preview */}
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {property.features.slice(0, 3).map(f => (
              <span key={f} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                {t(`features.${f}`)}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="text-xs text-gray-400">+{property.features.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
