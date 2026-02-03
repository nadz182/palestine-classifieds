import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';
import { categories } from '../../data/categories';

export function AdCard({ ad }) {
  const navigate = useNavigate();
  const category = categories.find(c => c.id === ad.category);
  const Icon = category?.icon;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => navigate(`/ad/${ad.id}`)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {Icon && <Icon className="w-5 h-5 text-primary-600" />}
            <span className="text-sm font-medium text-primary-600">
              {category?.name}
            </span>
          </div>
          {ad.price && (
            <span className="text-lg font-bold text-gray-900">
              ${ad.price.toLocaleString()}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {ad.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {ad.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{ad.city || 'Palestine'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(ad.createdAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
