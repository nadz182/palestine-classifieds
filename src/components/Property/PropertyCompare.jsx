import { useNavigate } from 'react-router-dom';
import { X, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { categories } from '../../data/categories';
import { Badge } from '../ui/Badge';

export function PropertyCompare({ properties, onRemove }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl">
        <p className="text-gray-500 text-lg">{t('compare.noProperties')}</p>
        <p className="text-gray-400 text-sm mt-1">{t('compare.addUpTo')}</p>
      </div>
    );
  }

  const allFeatures = [...new Set(properties.flatMap(p => p.features || []))];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start p-4 bg-gray-50 font-medium text-gray-600 w-40">{t('compare.property')}</th>
            {properties.map(p => (
              <th key={p.id} className="p-4 bg-gray-50 min-w-[250px]">
                <div className="relative">
                  {onRemove && (
                    <button
                      onClick={() => onRemove(p.id)}
                      className="absolute -top-1 -right-1 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <div className="h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-2 overflow-hidden">
                    {p.images && p.images.length > 0 ? (
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {(() => { const cat = categories.find(c => c.id === p.category); return cat ? <cat.icon className="w-10 h-10 text-gray-400" /> : null; })()}
                      </div>
                    )}
                  </div>
                  <h3
                    className="font-semibold text-gray-900 text-sm cursor-pointer hover:text-primary-600 line-clamp-2"
                    onClick={() => navigate(`/property/${p.id}`)}
                  >
                    {p.title}
                  </h3>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <CompareRow label={t('compare.price')}>
            {properties.map(p => (
              <td key={p.id} className="p-4 text-center">
                <span className="text-lg font-bold text-primary-600">
                  ${p.price?.toLocaleString() || 'N/A'}
                </span>
                {p.listingType === 'rent' && <span className="text-sm text-gray-400">/mo</span>}
              </td>
            ))}
          </CompareRow>
          <CompareRow label={t('compare.type')}>
            {properties.map(p => (
              <td key={p.id} className="p-4 text-center">
                <Badge variant={p.listingType === 'rent' ? 'rent' : 'sale'}>
                  {p.listingType === 'rent' ? t('search.rent') : t('search.sale')}
                </Badge>
              </td>
            ))}
          </CompareRow>
          <CompareRow label={t('compare.area')}>
            {properties.map(p => (
              <td key={p.id} className="p-4 text-center text-gray-700">
                {p.area} {p.areaUnit}
              </td>
            ))}
          </CompareRow>
          <CompareRow label={t('compare.priceUnit')}>
            {properties.map(p => (
              <td key={p.id} className="p-4 text-center text-gray-700">
                ${p.pricePerUnit?.toLocaleString() || 'N/A'}/{p.areaUnit}
              </td>
            ))}
          </CompareRow>
          <CompareRow label={t('compare.location')}>
            {properties.map(p => (
              <td key={p.id} className="p-4 text-center text-gray-700">
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {p.city}{p.district ? `, ${p.district}` : ''}
                </div>
              </td>
            ))}
          </CompareRow>
          <CompareRow label={t('compare.zoning')}>
            {properties.map(p => (
              <td key={p.id} className="p-4 text-center text-gray-700">
                {p.zoning ? t(`zoning.${p.zoning}`) : 'N/A'}
              </td>
            ))}
          </CompareRow>
          {allFeatures.map(feature => (
            <CompareRow key={feature} label={t(`features.${feature}`)}>
              {properties.map(p => (
                <td key={p.id} className="p-4 text-center">
                  {p.features?.includes(feature)
                    ? <span className="text-accent-600 font-bold">&#10003;</span>
                    : <span className="text-gray-300">&#8212;</span>
                  }
                </td>
              ))}
            </CompareRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompareRow({ label, children }) {
  return (
    <tr>
      <td className="p-4 font-medium text-gray-600 bg-gray-50 text-sm">{label}</td>
      {children}
    </tr>
  );
}
