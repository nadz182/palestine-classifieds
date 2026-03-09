import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Plus, Heart, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

export function MobileNav() {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/search', icon: Search, label: t('nav.search') },
    { to: '/create', icon: Plus, label: t('nav.post'), primary: true },
    { to: '/favorites', icon: Heart, label: t('nav.favorites') },
    { to: '/about', icon: User, label: t('nav.profile') },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex items-center justify-around py-1">
        {navItems.map(({ to, icon, label, primary }) => {
          const active = location.pathname === to || (to === '/search' && location.pathname.startsWith('/search'));
          const IconComponent = icon;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[60px]',
                primary && 'relative'
              )}
            >
              {primary ? (
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center -mt-5 shadow-lg">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
              ) : (
                <IconComponent className={cn('w-5 h-5', active ? 'text-primary-600' : 'text-gray-400')} />
              )}
              <span className={cn(
                'text-[10px] font-medium',
                active ? 'text-primary-600' : 'text-gray-400',
                primary && 'mt-0.5'
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
