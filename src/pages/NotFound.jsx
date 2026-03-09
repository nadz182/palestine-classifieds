import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-3">{t('notFound.title')}</h1>
      <p className="text-lg text-gray-500 mb-8">{t('notFound.message')}</p>
      <div className="flex justify-center gap-3">
        <Link to="/">
          <Button>{t('notFound.goHome')}</Button>
        </Link>
        <Link to="/search">
          <Button variant="outline">{t('notFound.browseProperties')}</Button>
        </Link>
      </div>
    </div>
  );
}
