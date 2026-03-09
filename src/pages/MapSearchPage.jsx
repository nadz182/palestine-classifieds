import { useState } from 'react';
import { MapSearch } from '../components/Map/MapSearch';
import { getProperties } from '../utils/storage';

export function MapSearchPage() {
  const [properties] = useState(getProperties());

  return <MapSearch properties={properties} />;
}
