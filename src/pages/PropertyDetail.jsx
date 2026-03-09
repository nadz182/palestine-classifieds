import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, ArrowLeftRight, Trash2, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getPropertyById, deleteProperty } from '../utils/storage';
import { categories } from '../data/categories';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ImageGallery } from '../components/PropertyDetail/ImageGallery';
import { PropertySpecs } from '../components/PropertyDetail/PropertySpecs';
import { PropertyFeatures } from '../components/PropertyDetail/PropertyFeatures';
import { ContactCard } from '../components/PropertyDetail/ContactCard';
import { SimilarProperties } from '../components/PropertyDetail/SimilarProperties';
import { MapView } from '../components/Map/MapView';
import { useStore } from '../store/useStore';
import { cn } from '../utils/cn';

export function PropertyDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const property = getPropertyById(id);
  const { toggleFavorite, isFavorite, toggleCompare, isInCompare } = useStore();

  useEffect(() => {
    if (!property) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [property, navigate]);

  const handleDelete = () => {
    if (window.confirm(t('property.confirmDelete'))) {
      deleteProperty(id);
      navigate('/');
    }
  };

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">{t('property.loading')}</p>
      </div>
    );
  }

  const category = categories.find(c => c.id === property.category);
  const favorited = isFavorite(property.id);
  const compared = isInCompare(property.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-primary-600">{t('nav.home')}</Link>
        <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
        <Link to="/search" className="hover:text-primary-600">{t('nav.search')}</Link>
        <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
        {category && (
          <>
            <Link to={`/search?category=${category.id}`} className="hover:text-primary-600">{t(`categories.${category.id}`)}</Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </>
        )}
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{property.title}</span>
      </nav>

      {/* Image Gallery */}
      <ImageGallery images={property.images} categoryIcon={category?.icon} />

      {/* Header */}
      <div className="mt-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={property.listingType === 'rent' ? 'rent' : 'sale'}>
                {property.listingType === 'rent' ? t('property.forRent') : t('property.forSale')}
              </Badge>
              <Badge variant="outline">{category ? t(`categories.${category.id}`) : ''}</Badge>
              {property.subcategory && <Badge variant="outline">{property.subcategory}</Badge>}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
            <p className="text-gray-500 mt-1">{property.city}{property.district ? `, ${property.district}` : ''}</p>
          </div>
          <div className="text-end">
            <p className="text-3xl font-bold text-primary-600">
              ${property.price?.toLocaleString()}
              {property.listingType === 'rent' && <span className="text-base font-normal text-gray-400">/mo</span>}
            </p>
            {property.pricePerUnit && (
              <p className="text-sm text-gray-400">${property.pricePerUnit.toLocaleString()}/{property.areaUnit}</p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => toggleFavorite(property.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors',
              favorited ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            <Heart className={cn('w-4 h-4', favorited && 'fill-current')} />
            {favorited ? t('property.saved') : t('property.save')}
          </button>
          <button
            onClick={() => toggleCompare(property.id)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors',
              compared ? 'bg-primary-50 border-primary-200 text-primary-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            <ArrowLeftRight className="w-4 h-4" />
            {t('property.compare')}
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            {t('property.delete')}
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h3 className="font-semibold text-gray-900 mb-3">{t('detail.description')}</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{property.description}</p>
          </div>

          <PropertySpecs property={property} />
          <PropertyFeatures features={property.features} />

          {/* Map */}
          {property.location && (
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-semibold text-gray-900 mb-3">{t('detail.location')}</h3>
              <MapView
                selectedLocation={property.location}
                height="350px"
                selectable={false}
                showCities={false}
              />
            </div>
          )}
        </div>

        {/* Right column — Contact card */}
        <div>
          <ContactCard property={property} />
        </div>
      </div>

      {/* Similar Properties */}
      <div className="mt-12">
        <SimilarProperties currentProperty={property} />
      </div>
    </div>
  );
}
