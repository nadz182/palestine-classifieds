import { mockAds } from '../data/mockAds';

const STORAGE_KEY = 'palestine_classifieds_ads';
const MOCK_LOADED_KEY = 'palestine_classifieds_mock_loaded';

export const getAds = () => {
  try {
    const ads = localStorage.getItem(STORAGE_KEY);
    const mockLoaded = localStorage.getItem(MOCK_LOADED_KEY);
    
    if (!ads && !mockLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAds));
      localStorage.setItem(MOCK_LOADED_KEY, 'true');
      return mockAds;
    }
    
    return ads ? JSON.parse(ads) : [];
  } catch (error) {
    console.error('Error loading ads:', error);
    return [];
  }
};

export const saveAd = (ad) => {
  try {
    const ads = getAds();
    const newAd = {
      ...ad,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    ads.push(newAd);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ads));
    return newAd;
  } catch (error) {
    console.error('Error saving ad:', error);
    throw error;
  }
};

export const getAdById = (id) => {
  const ads = getAds();
  return ads.find(ad => ad.id === id);
};

export const deleteAd = (id) => {
  try {
    const ads = getAds();
    const filteredAds = ads.filter(ad => ad.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredAds));
  } catch (error) {
    console.error('Error deleting ad:', error);
    throw error;
  }
};

export const loadMockAds = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAds));
    localStorage.setItem(MOCK_LOADED_KEY, 'true');
    return mockAds;
  } catch (error) {
    console.error('Error loading mock ads:', error);
    throw error;
  }
};

export const clearAllAds = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(MOCK_LOADED_KEY);
  } catch (error) {
    console.error('Error clearing ads:', error);
    throw error;
  }
};
