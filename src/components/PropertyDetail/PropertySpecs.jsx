import { Maximize2, DollarSign, Map, Tag, CalendarDays } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function SpecRow({ icon, label, value }) {
  const Icon = icon;
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-2 text-gray-600">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-medium text-gray-900 capitalize">{value}</span>
    </div>
  );
}

export function PropertySpecs({ property }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'ar' ? 'ar-PS' : 'en-US';

  const specs = [
    { icon: Maximize2, label: t('detail.area'), value: `${property.area} ${property.areaUnit}` },
    { icon: DollarSign, label: t('detail.pricePerUnit'), value: property.pricePerUnit ? `$${property.pricePerUnit.toLocaleString()}/${property.areaUnit}` : 'N/A' },
    { icon: Map, label: t('detail.zoning'), value: property.zoning ? t(`zoning.${property.zoning}`) : 'N/A' },
    { icon: Tag, label: t('detail.category'), value: property.category ? t(`categories.${property.category}`) : (property.subcategory || 'N/A') },
    { icon: CalendarDays, label: t('detail.listed'), value: new Date(property.createdAt).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }) },
  ].filter(s => s.value);

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      <h3 className="font-semibold text-gray-900 mb-4">{t('detail.specs')}</h3>
      <div className="space-y-3">
        {specs.map((spec) => (
          <SpecRow key={spec.label} icon={spec.icon} label={spec.label} value={spec.value} />
        ))}
      </div>
    </div>
  );
}
