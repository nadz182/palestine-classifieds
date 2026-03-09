import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const toggle = () => {
    const newLang = isAr ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        'px-3 py-1.5 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors',
        isAr ? 'font-sans' : 'font-arabic'
      )}
    >
      {isAr ? 'EN' : 'عربي'}
    </button>
  );
}
