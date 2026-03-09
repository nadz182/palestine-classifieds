import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { palestineCities } from '../../data/palestineData';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-primary-400" />
              <span className="text-lg font-bold text-white">{t('brand')}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{t('footer.description')}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="text-sm hover:text-white transition-colors">{t('nav.browse')}</Link></li>
              <li><Link to="/search?listingType=sale" className="text-sm hover:text-white transition-colors">{t('quickFilters.forSale')}</Link></li>
              <li><Link to="/search?listingType=rent" className="text-sm hover:text-white transition-colors">{t('quickFilters.forRent')}</Link></li>
              <li><Link to="/map" className="text-sm hover:text-white transition-colors">{t('nav.mapSearch')}</Link></li>
              <li><Link to="/create" className="text-sm hover:text-white transition-colors">{t('nav.postAListing')}</Link></li>
              <li><Link to="/about" className="text-sm hover:text-white transition-colors">{t('nav.aboutUs')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('footer.browseByCity')}</h3>
            <ul className="space-y-2">
              {palestineCities.slice(0, 8).map(city => (
                <li key={city.name}>
                  <Link to={`/search?city=${encodeURIComponent(city.name)}`} className="text-sm hover:text-white transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Palestine</li>
              <li><a href="mailto:info@mstkshf.com" className="hover:text-white transition-colors">info@mstkshf.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} {t('footer.allRights')}</p>
          <p className="text-sm text-gray-500">{t('partOf')} <span className="text-gray-400">mstkshf.com</span></p>
        </div>
      </div>
    </footer>
  );
}
