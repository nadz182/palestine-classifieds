import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Phone, Tag, ArrowLeft, Trash2 } from 'lucide-react';
import { getAdById, deleteAd } from '../utils/storage';
import { categories } from '../data/categories';
import { Button } from '../components/ui/Button';
import { MapView } from '../components/Map/MapView';

export function AdDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ad = getAdById(id);

  useEffect(() => {
    if (!ad) {
      navigate('/');
    }
  }, [ad, navigate]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this ad?')) {
      deleteAd(id);
      navigate('/');
    }
  };

  if (!ad) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const category = categories.find(c => c.id === ad.category);
  const Icon = category?.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="secondary"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </Button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {Icon && (
                <div className="p-3 bg-primary-100 rounded-full">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
              )}
              <div>
                <p className="text-sm text-primary-600 font-medium">{category?.name}</p>
                {ad.subcategory && (
                  <p className="text-xs text-gray-500">{ad.subcategory}</p>
                )}
              </div>
            </div>
            <Button
              variant="danger"
              onClick={handleDelete}
              className="flex items-center space-x-2"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </Button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{ad.title}</h1>

          {ad.price && (
            <div className="mb-6">
              <p className="text-3xl font-bold text-primary-600">
                ${ad.price.toLocaleString()}
              </p>
            </div>
          )}

          <div className="prose max-w-none mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{ad.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{ad.city}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="font-medium">{formatDate(ad.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{ad.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-gray-700">
                <Tag className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Ad ID</p>
                  <p className="font-medium">#{ad.id}</p>
                </div>
              </div>
            </div>
          </div>

          {ad.location && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location on Map</h2>
              <MapView
                selectedLocation={ad.location}
                height="400px"
                selectable={false}
                showCities={true}
              />
            </div>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <Button
            onClick={() => window.location.href = `tel:${ad.phone}`}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Phone className="w-5 h-5" />
            <span>Call Seller</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
