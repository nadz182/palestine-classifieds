import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { MapView } from '../components/Map/MapView';
import { categories } from '../data/categories';
import { palestineCities } from '../data/palestineData';
import { saveAd } from '../utils/storage';

export function CreateAd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    city: '',
    phone: '',
    location: null,
  });
  const [errors, setErrors] = useState({});
  const [showMap, setShowMap] = useState(false);

  const selectedCategory = categories.find(c => c.id === formData.category);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && { subcategory: '' })
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleLocationSelect = (location) => {
    setFormData(prev => ({ ...prev, location }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      const ad = saveAd({
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
      });
      navigate(`/ad/${ad.id}`);
    } catch (error) {
      console.error('Failed to create ad:', error);
      alert('Failed to create ad. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Post a New Ad</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title *"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="e.g., 2-bedroom apartment in Ramallah"
          />

          <Textarea
            label="Description *"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            placeholder="Describe your item or service in detail..."
            rows={5}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category *"
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={errors.category}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </Select>

            {selectedCategory && (
              <Select
                label="Subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
              >
                <option value="">Select a subcategory</option>
                {selectedCategory.subcategories.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </Select>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Price (USD)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
            />

            <Select
              label="City *"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
            >
              <option value="">Select a city</option>
              {palestineCities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </Select>
          </div>

          <Input
            label="Phone Number *"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="+970 XX XXX XXXX"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location on Map (Optional)
            </label>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowMap(!showMap)}
              className="mb-4 flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>{showMap ? 'Hide Map' : 'Select Location on Map'}</span>
            </Button>

            {showMap && (
              <MapView
                selectedLocation={formData.location}
                onLocationSelect={handleLocationSelect}
                height="400px"
                selectable={true}
                showCities={false}
              />
            )}
            {formData.location && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {formData.location[0].toFixed(4)}, {formData.location[1].toFixed(4)}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            <Button type="submit" className="flex-1">
              Post Ad
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
