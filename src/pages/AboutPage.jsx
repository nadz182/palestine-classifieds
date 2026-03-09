import { MapPin, Shield, Users, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900">{t('about.title')}</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <Shield className="w-10 h-10 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{t('about.trusted')}</h3>
          <p className="text-sm text-gray-600">{t('about.trustedDesc')}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <Users className="w-10 h-10 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{t('about.local')}</h3>
          <p className="text-sm text-gray-600">{t('about.localDesc')}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <Globe className="w-10 h-10 text-primary-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">{t('about.bilingual')}</h3>
          <p className="text-sm text-gray-600">{t('about.bilingualDesc')}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t('about.mission')}</h2>
        <p className="text-gray-700 leading-relaxed mb-4">{t('about.missionP1')}</p>
        <p className="text-gray-700 leading-relaxed mb-4">{t('about.missionP2')}</p>
        <p className="text-gray-700 leading-relaxed">{t('about.missionP3')}</p>
      </div>
    </div>
  );
}
