import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ui/Modal';
import { cn } from '../../utils/cn';

export function ImageGallery({ images, categoryIcon: CategoryIcon }) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasImages = images && images.length > 0;

  const prev = () => setCurrentIndex(i => (i === 0 ? (images?.length || 1) - 1 : i - 1));
  const next = () => setCurrentIndex(i => (i === (images?.length || 1) - 1 ? 0 : i + 1));

  return (
    <>
      <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
        {/* Main image area */}
        <div className="aspect-[16/9] flex items-center justify-center relative">
          {hasImages ? (
            <img
              src={images[currentIndex]}
              alt={`${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            CategoryIcon && <CategoryIcon className="w-24 h-24 text-gray-400 opacity-30" />
          )}

          {/* Navigation */}
          {hasImages && images.length > 1 && (
            <>
              <button onClick={prev} className="absolute start-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-md transition-colors z-10">
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <button onClick={next} className="absolute end-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white shadow-md transition-colors z-10">
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </>
          )}

          {/* Expand button */}
          {hasImages && (
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute bottom-3 end-3 p-2 bg-white/80 rounded-lg hover:bg-white shadow-md transition-colors z-10"
            >
              <Expand className="w-4 h-4" />
            </button>
          )}

          {/* Image counter */}
          {hasImages && images.length > 1 && (
            <div className="absolute bottom-3 start-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full z-10">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {hasImages && images.length > 1 && (
          <div className="flex gap-2 p-3 bg-white/80 backdrop-blur-sm">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  'w-20 h-14 rounded-lg flex-shrink-0 overflow-hidden transition-all',
                  i === currentIndex ? 'ring-2 ring-primary-600 opacity-100' : 'opacity-60 hover:opacity-80'
                )}
              >
                <img src={img} alt={`${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Modal isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} title={t('detail.gallery', 'Gallery')} className="max-w-5xl">
        <div className="relative">
          {hasImages && (
            <img
              src={images[currentIndex]}
              alt={`${currentIndex + 1}`}
              className="w-full rounded-lg max-h-[75vh] object-contain bg-gray-900"
            />
          )}
          {hasImages && images.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button onClick={prev} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>
              <span className="flex items-center text-sm text-gray-500">
                {currentIndex + 1} / {images.length}
              </span>
              <button onClick={next} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                <ChevronRight className="w-5 h-5 rtl:rotate-180" />
              </button>
            </div>
          )}
          {/* Thumbnail strip in lightbox */}
          {hasImages && images.length > 1 && (
            <div className="flex gap-2 justify-center mt-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={cn(
                    'w-16 h-12 rounded-lg overflow-hidden transition-all flex-shrink-0',
                    i === currentIndex ? 'ring-2 ring-primary-600 opacity-100' : 'opacity-50 hover:opacity-80'
                  )}
                >
                  <img src={img} alt={`${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
