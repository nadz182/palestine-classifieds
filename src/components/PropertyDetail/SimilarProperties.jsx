import { useTranslation } from 'react-i18next';
import { PropertyCard } from '../Property/PropertyCard';
import { getProperties } from '../../utils/storage';

export function SimilarProperties({ currentProperty }) {
  const { t } = useTranslation();
  const allProperties = getProperties();
  const similar = allProperties
    .filter(p =>
      p.id !== currentProperty.id &&
      (p.category === currentProperty.category || p.city === currentProperty.city)
    )
    .slice(0, 4);

  if (similar.length === 0) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('detail.similarProperties')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {similar.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
