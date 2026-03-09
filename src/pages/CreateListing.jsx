import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { MapView } from '../components/Map/MapView';
import { categories } from '../data/categories';
import { palestineCities, palestineDistricts } from '../data/palestineData';
import { saveProperty } from '../utils/storage';
import { cn } from '../utils/cn';

const featureKeys = [
  'Parking', 'Garden', 'Pool', 'Elevator', 'Central Heating', 'Air Conditioning',
  'Balcony', 'Security System', 'Furnished', 'Water Well', 'Road Access', 'Fenced',
  'Storage', 'Garage', 'Solar Panels', 'Internet', 'Generator', 'Water Heater',
  'Building Permit', 'Flat Terrain',
];

const zoningKeys = ['residential-a', 'residential-b', 'commercial', 'agricultural', 'industrial'];

export function CreateListing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    listingType: 'sale',
    price: '',
    area: '',
    areaUnit: 'dunam',
    city: '',
    district: '',
    phone: '',
    location: null,
    features: [],
    zoning: '',
  });

  const steps = [
    { id: 1, title: t('create.step1') },
    { id: 2, title: t('create.step2') },
    { id: 3, title: t('create.step3') },
    { id: 4, title: t('create.step4') },
    { id: 5, title: t('create.step5') },
  ];

  const selectedCategory = categories.find(c => c.id === formData.category);
  const districts = palestineDistricts[formData.city] || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'category' && { subcategory: '' }),
      ...(name === 'city' && { district: '' }),
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleFeature = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.category) newErrors.category = t('create.category') + ' *';
      if (!formData.listingType) newErrors.listingType = t('create.listingType') + ' *';
    }
    if (step === 2) {
      if (!formData.title.trim()) newErrors.title = t('create.title') + ' *';
      if (!formData.description.trim()) newErrors.description = t('create.description') + ' *';
      if (!formData.phone.trim()) newErrors.phone = t('create.phoneNumber') + ' *';
    }
    if (step === 3) {
      if (!formData.city) newErrors.city = t('create.city') + ' *';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(s => Math.min(s + 1, 5));
    }
  };

  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 1));

  const handleSubmit = () => {
    try {
      const property = saveProperty({
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        area: formData.area ? parseFloat(formData.area) : null,
        pricePerUnit: formData.price && formData.area
          ? Math.round(parseFloat(formData.price) / parseFloat(formData.area))
          : null,
        propertyType: selectedCategory?.group || 'property',
      });
      navigate(`/property/${property.id}`);
    } catch (error) {
      console.error('Failed to create listing:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                currentStep > step.id ? 'bg-accent-600 text-white' :
                currentStep === step.id ? 'bg-primary-600 text-white' :
                'bg-gray-200 text-gray-500'
              )}>
                {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span className="text-xs text-gray-500 mt-1 hidden sm:block">{step.title}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                'flex-1 h-0.5 mx-2',
                currentStep > step.id ? 'bg-accent-600' : 'bg-gray-200'
              )} />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Step 1: Property Type */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('create.whatType')}</h2>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{t('create.listingType')} *</label>
              <div className="grid grid-cols-2 gap-3">
                {['sale', 'rent'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, listingType: type }))}
                    className={cn(
                      'p-4 rounded-lg border-2 text-center transition-colors',
                      formData.listingType === type
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <span className="font-medium">{type === 'sale' ? t('property.forSale') : t('property.forRent')}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">{t('create.category')} *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map(cat => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.id, subcategory: '' }))}
                      className={cn(
                        'p-4 rounded-lg border-2 text-center transition-colors',
                        formData.category === cat.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <Icon className={cn(
                        'w-6 h-6 mx-auto mb-1',
                        formData.category === cat.id ? 'text-primary-600' : 'text-gray-400'
                      )} />
                      <span className="text-xs font-medium">{t(`categories.${cat.id}`)}</span>
                    </button>
                  );
                })}
              </div>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>

            {selectedCategory && (
              <Select
                label={t('create.subcategory')}
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
              >
                <option value="">{t('create.selectSubcategory')}</option>
                {selectedCategory.subcategories.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </Select>
            )}
          </div>
        )}

        {/* Step 2: Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('create.propertyDetails')}</h2>

            <Input
              label={`${t('create.title')} *`}
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              placeholder={t('create.titlePlaceholder')}
            />

            <Textarea
              label={`${t('create.description')} *`}
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              placeholder={t('create.descriptionPlaceholder')}
              rows={5}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t('create.priceUsd')}
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label={t('create.area')}
                  name="area"
                  type="number"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="0"
                />
                <Select
                  label={t('create.unit')}
                  name="areaUnit"
                  value={formData.areaUnit}
                  onChange={handleChange}
                >
                  <option value="dunam">{t('create.dunam')}</option>
                  <option value="sqm">{t('create.sqm')}</option>
                </Select>
              </div>
            </div>

            <Input
              label={`${t('create.phoneNumber')} *`}
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder={t('create.phonePlaceholder')}
            />

            <Select
              label={t('create.zoning')}
              name="zoning"
              value={formData.zoning}
              onChange={handleChange}
            >
              <option value="">{t('create.selectZoning')}</option>
              {zoningKeys.map(key => (
                <option key={key} value={key}>{t(`zoning.${key}`)}</option>
              ))}
            </Select>
          </div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('create.step3')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label={`${t('create.city')} *`}
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              >
                <option value="">{t('create.selectCity')}</option>
                {palestineCities.map(city => (
                  <option key={city.name} value={city.name}>{city.name}</option>
                ))}
              </Select>

              {districts.length > 0 && (
                <Select
                  label={t('create.district')}
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                >
                  <option value="">{t('create.selectDistrict')}</option>
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Select>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('create.pinLocation')}
              </label>
              <MapView
                selectedLocation={formData.location}
                onLocationSelect={(loc) => setFormData(prev => ({ ...prev, location: loc }))}
                height="400px"
                selectable={true}
                showCities={true}
              />
              {formData.location && (
                <p className="mt-2 text-sm text-gray-500">
                  {t('create.selected')}: {formData.location[0].toFixed(4)}, {formData.location[1].toFixed(4)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Features */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('create.featuresAmenities')}</h2>
            <p className="text-sm text-gray-500">{t('create.selectAll')}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {featureKeys.map(feature => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => toggleFeature(feature)}
                  className={cn(
                    'flex items-center gap-2 p-3 rounded-lg border text-sm text-start transition-colors',
                    formData.features.includes(feature)
                      ? 'border-primary-300 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <div className={cn(
                    'w-5 h-5 rounded border flex items-center justify-center flex-shrink-0',
                    formData.features.includes(feature)
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300'
                  )}>
                    {formData.features.includes(feature) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  {t(`features.${feature}`)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">{t('create.reviewListing')}</h2>

            <div className="space-y-4">
              <ReviewItem label={t('create.title')} value={formData.title} />
              <ReviewItem label={t('create.category')} value={selectedCategory ? t(`categories.${selectedCategory.id}`) : ''} />
              <ReviewItem label={t('create.subcategory')} value={formData.subcategory} />
              <ReviewItem label={t('create.listingType')} value={formData.listingType === 'sale' ? t('property.forSale') : t('property.forRent')} />
              <ReviewItem label={t('create.priceUsd')} value={formData.price ? `$${Number(formData.price).toLocaleString()}` : t('create.notSpecified')} />
              <ReviewItem label={t('create.area')} value={formData.area ? `${formData.area} ${formData.areaUnit}` : t('create.notSpecified')} />
              <ReviewItem label={t('create.city')} value={formData.city} />
              <ReviewItem label={t('create.district')} value={formData.district} />
              <ReviewItem label={t('create.phoneNumber')} value={formData.phone} />
              <ReviewItem label={t('create.zoning')} value={formData.zoning ? t(`zoning.${formData.zoning}`) : t('create.notSpecified')} />
              <ReviewItem label={t('create.featuresAmenities')} value={formData.features.map(f => t(`features.${f}`)).join(', ') || t('create.noneSelected')} />
              <ReviewItem label={t('create.mapLocation')} value={formData.location ? `${formData.location[0].toFixed(4)}, ${formData.location[1].toFixed(4)}` : t('create.notPinned')} />

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-1">{t('create.description')}</h4>
                <p className="text-gray-600 text-sm whitespace-pre-wrap">{formData.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          {currentStep > 1 ? (
            <Button variant="secondary" onClick={prevStep} className="flex items-center gap-1.5">
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" /> {t('create.back')}
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => navigate('/')}>{t('create.cancel')}</Button>
          )}

          {currentStep < 5 ? (
            <Button onClick={nextStep} className="flex items-center gap-1.5">
              {t('create.next')} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex items-center gap-1.5">
              <Check className="w-4 h-4" /> {t('create.publishListing')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ReviewItem({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-end max-w-[60%]">{value}</span>
    </div>
  );
}
