import { create } from 'zustand';
import {
  getFavorites,
  toggleFavorite as storageToggleFavorite,
  getCompareList,
  toggleCompare as storageToggleCompare,
  clearCompare as storageClearCompare,
  getSearchPrefs,
  saveSearchPrefs,
} from '../utils/storage';

export const useStore = create((set, get) => ({
  // Favorites
  favorites: getFavorites(),
  toggleFavorite: (propertyId) => {
    const updated = storageToggleFavorite(propertyId);
    set({ favorites: updated });
  },
  isFavorite: (propertyId) => get().favorites.includes(propertyId),

  // Compare
  compareList: getCompareList(),
  toggleCompare: (propertyId) => {
    const updated = storageToggleCompare(propertyId);
    set({ compareList: updated });
  },
  clearCompare: () => {
    const updated = storageClearCompare();
    set({ compareList: updated });
  },
  isInCompare: (propertyId) => get().compareList.includes(propertyId),

  // View mode
  viewMode: getSearchPrefs().viewMode || 'grid',
  setViewMode: (mode) => {
    set({ viewMode: mode });
    saveSearchPrefs({ ...getSearchPrefs(), viewMode: mode });
  },

  // Filters
  filters: {
    query: '',
    propertyType: '',
    listingType: '',
    city: '',
    priceMin: 0,
    priceMax: 0,
    areaMin: 0,
    areaMax: 0,
    features: [],
    zoning: '',
    sortBy: 'newest',
  },
  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters } }));
  },
  resetFilters: () => {
    set({
      filters: {
        query: '',
        propertyType: '',
        listingType: '',
        city: '',
        priceMin: 0,
        priceMax: 0,
        areaMin: 0,
        areaMax: 0,
        features: [],
        zoning: '',
        sortBy: 'newest',
      },
    });
  },
}));
