import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getAds } from '../utils/storage';
import { categories } from '../data/categories';
import { AdCard } from '../components/Ad/AdCard';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';

export function CategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const category = categories.find(c => c.id === categoryId);

  const allAds = getAds();
  const ads = allAds.filter(ad => ad.category === categoryId);

  if (!category) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Category not found</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Go Home
        </Button>
      </div>
    );
  }

  const filteredAds = selectedSubcategory
    ? ads.filter(ad => ad.subcategory === selectedSubcategory)
    : ads;

  const Icon = category.icon;

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => navigate('/')}
        className="mb-6 flex items-center space-x-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Button>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-4 bg-primary-100 rounded-full">
            <Icon className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
            <p className="text-gray-600">{filteredAds.length} ads found</p>
          </div>
        </div>

        <div className="max-w-xs">
          <Select
            label="Filter by Subcategory"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">All Subcategories</option>
            {category.subcategories.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </Select>
        </div>
      </div>

      {filteredAds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">
            No ads found in this category yet.
          </p>
          <Button onClick={() => navigate('/create-ad')} className="mt-4">
            Post the First Ad
          </Button>
        </div>
      )}
    </div>
  );
}
