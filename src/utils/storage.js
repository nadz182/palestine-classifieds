import { mockAds } from '../data/mockAds';

const STORAGE_KEY = 'palestine_properties_ads';
const MOCK_LOADED_KEY = 'palestine_properties_mock_loaded';
const FAVORITES_KEY = 'palestine_properties_favorites';
const COMPARE_KEY = 'palestine_properties_compare';
const SEARCH_PREFS_KEY = 'palestine_properties_search_prefs';

// Bump this when mock data changes to force re-seed
const MOCK_DATA_VERSION = '3';

// Properties CRUD
export const getProperties = () => {
  try {
    const mockLoaded = localStorage.getItem(MOCK_LOADED_KEY);

    if (mockLoaded !== MOCK_DATA_VERSION) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAds));
      localStorage.setItem(MOCK_LOADED_KEY, MOCK_DATA_VERSION);
      return mockAds;
    }

    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading properties:', error);
    return [];
  }
};

export const saveProperty = (property) => {
  try {
    const properties = getProperties();
    const newProperty = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    properties.push(newProperty);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    return newProperty;
  } catch (error) {
    console.error('Error saving property:', error);
    throw error;
  }
};

export const getPropertyById = (id) => {
  const properties = getProperties();
  return properties.find(p => p.id === id);
};

export const deleteProperty = (id) => {
  try {
    const properties = getProperties();
    const filtered = properties.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting property:', error);
    throw error;
  }
};

export const loadMockData = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockAds));
    localStorage.setItem(MOCK_LOADED_KEY, MOCK_DATA_VERSION);
    return mockAds;
  } catch (error) {
    console.error('Error loading mock data:', error);
    throw error;
  }
};

export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(MOCK_LOADED_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};

// Favorites
export const getFavorites = () => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const toggleFavorite = (propertyId) => {
  const favorites = getFavorites();
  const index = favorites.indexOf(propertyId);
  if (index === -1) {
    favorites.push(propertyId);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
};

export const isFavorite = (propertyId) => {
  return getFavorites().includes(propertyId);
};

// Compare
export const getCompareList = () => {
  try {
    const data = localStorage.getItem(COMPARE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const toggleCompare = (propertyId) => {
  const list = getCompareList();
  const index = list.indexOf(propertyId);
  if (index === -1) {
    if (list.length >= 3) return list;
    list.push(propertyId);
  } else {
    list.splice(index, 1);
  }
  localStorage.setItem(COMPARE_KEY, JSON.stringify(list));
  return list;
};

export const clearCompare = () => {
  localStorage.setItem(COMPARE_KEY, JSON.stringify([]));
  return [];
};

// Search Preferences
export const getSearchPrefs = () => {
  try {
    const data = localStorage.getItem(SEARCH_PREFS_KEY);
    return data ? JSON.parse(data) : { viewMode: 'grid' };
  } catch {
    return { viewMode: 'grid' };
  }
};

export const saveSearchPrefs = (prefs) => {
  localStorage.setItem(SEARCH_PREFS_KEY, JSON.stringify(prefs));
};

// Backward compat aliases
export const getAds = getProperties;
export const saveAd = saveProperty;
export const getAdById = getPropertyById;
export const deleteAd = deleteProperty;
