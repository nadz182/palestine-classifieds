import { MapPin, Maximize2, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { categories } from '../../data/categories';

export function MapPopupCard({ property, onViewDetails }) {
  const { t } = useTranslation();
  const category = categories.find(c => c.id === property.category);
  const hasImage = property.images && property.images.length > 0;

  const formatPrice = (price, listingType) => {
    if (!price) return t('property.contactForPrice');
    const str = `$${price.toLocaleString()}`;
    return listingType === 'rent' ? `${str}/mo` : str;
  };

  return (
    <div className="w-[280px] font-sans">
      {/* Image */}
      <div className="relative h-[140px] -mx-[13px] -mt-[13px] mb-2 overflow-hidden rounded-t-lg">
        {hasImage ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            {category && <category.icon className="w-10 h-10 text-gray-400 opacity-40" />}
          </div>
        )}
        {/* Listing type badge */}
        <div className="absolute top-2 start-2">
          <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide text-white ${
            property.listingType === 'rent' ? 'bg-green-600' : 'bg-blue-600'
          }`}>
            {property.listingType === 'rent' ? t('property.forRent') : t('property.forSale')}
          </span>
        </div>
        {/* Price overlay */}
        <div className="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
          <span className="text-white font-bold text-lg">
            {formatPrice(property.price, property.listingType)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-0.5">
        <h3 className="font-semibold text-gray-900 text-[13px] leading-tight mb-1.5 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 text-[11px] mb-2">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span>{property.city}{property.district ? `, ${property.district}` : ''}</span>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-3 text-[11px] text-gray-600 mb-2.5 pb-2.5 border-b border-gray-100">
          {property.area && (
            <div className="flex items-center gap-1">
              <Maximize2 className="w-3 h-3 text-gray-400" />
              <span>{property.area} {property.areaUnit}</span>
            </div>
          )}
          {category && (
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3 text-gray-400" />
              <span>{t(`categories.${category.id}`)}</span>
            </div>
          )}
          {property.zoning && (
            <span className="text-gray-400">{t(`zoning.${property.zoning}`)}</span>
          )}
        </div>

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2.5">
            {property.features.slice(0, 3).map(f => (
              <span key={f} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                {t(`features.${f}`)}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="text-[10px] text-gray-400">+{property.features.length - 3}</span>
            )}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => onViewDetails(property.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
        >
          {t('property.viewDetails')}
        </button>
      </div>
    </div>
  );
}
