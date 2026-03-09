import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function PropertyFeatures({ features }) {
  const { t } = useTranslation();

  if (!features || features.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h3 className="font-semibold text-gray-900 mb-4">{t('detail.featuresAmenities')}</h3>
      <div className="grid grid-cols-2 gap-2">
        {features.map(feature => (
          <div key={feature} className="flex items-center gap-2 py-1.5">
            <div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
              <Check className="w-3 h-3 text-accent-600" />
            </div>
            <span className="text-sm text-gray-700">{t(`features.${feature}`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
