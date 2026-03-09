import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Plus, Search, Menu, X, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 flex-shrink-0">
            <MapPin className="w-7 h-7" />
            <div className="hidden sm:block">
              <span className="text-lg font-bold">{t('brandPalestine')}</span>
              <span className="text-lg font-light text-gray-500 ms-1">{t('brandProperties')}</span>
            </div>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t('search.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-9 pe-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </form>

          <nav className="hidden md:flex items-center gap-2">
            <Link to="/favorites">
              <Button variant="secondary" className="flex items-center gap-1.5 text-sm">
                <Heart className="w-4 h-4" />
                <span>{t('nav.favorites')}</span>
              </Button>
            </Link>
            <LanguageSwitcher />
            <Link to="/create">
              <Button className="flex items-center gap-1.5 text-sm">
                <Plus className="w-4 h-4" />
                <span>{t('nav.postListing')}</span>
              </Button>
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('search.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full ps-9 pe-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </form>
            <div className="flex justify-center mb-3">
              <LanguageSwitcher />
            </div>
            <div className="space-y-1">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/search', label: t('nav.browse') },
                { to: '/map', label: t('nav.mapSearch') },
                { to: '/favorites', label: t('nav.favorites') },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/create"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg bg-primary-600 text-white text-center font-medium mt-2"
              >
                {t('nav.postAListing')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
