import { Phone, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';

export function ContactCard({ property }) {
  const { t } = useTranslation();
  const whatsappNumber = property.phone?.replace(/[^0-9+]/g, '');
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in your property: ${property.title}`);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 sticky top-20">
      <h3 className="font-semibold text-gray-900 mb-4">{t('detail.contactSeller')}</h3>

      <div className="space-y-3">
        {/* Phone */}
        <a
          href={`tel:${property.phone}`}
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('detail.phone')}</p>
            <p className="font-medium text-gray-900">{property.phone}</p>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-700 mt-2">
            <MessageCircle className="w-5 h-5" />
            {t('detail.whatsapp')}
          </Button>
        </a>

        {/* Call button */}
        <a href={`tel:${property.phone}`}>
          <Button variant="outline" className="w-full flex items-center justify-center gap-2 mt-2">
            <Phone className="w-5 h-5" />
            {t('detail.callSeller')}
          </Button>
        </a>
      </div>

      {/* Ad ID */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-400">{t('detail.listingId')}: #{property.id}</p>
      </div>
    </div>
  );
}
