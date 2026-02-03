import { useMemo, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { palestineCenter, palestineBounds } from '../../data/palestineData';
import { categories } from '../../data/categories';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export function AdsMapView({ ads, height = '500px' }) {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  
  const adsWithLocation = useMemo(() => 
    ads.filter(ad => ad.location && ad.location.length === 2),
    [ads]
  );

  const handleMarkerClick = (adId) => {
    navigate(`/ad/${adId}`);
  };

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden border border-gray-300 shadow-md">
      <MapContainer
        ref={mapRef}
        center={palestineCenter}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        maxBounds={palestineBounds}
        minZoom={7}
        scrollWheelZoom={true}
        whenCreated={(map) => { mapRef.current = map; }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {adsWithLocation.map((ad) => {
          const category = categories.find(c => c.id === ad.category);
          return (
            <Marker 
              key={ad.id} 
              position={ad.location}
              eventHandlers={{
                click: () => handleMarkerClick(ad.id),
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-gray-900 mb-1">{ad.title}</h3>
                  {ad.price && (
                    <p className="text-primary-600 font-semibold mb-2">
                      ${ad.price.toLocaleString()}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {ad.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{category?.name}</span>
                    <span>{ad.city}</span>
                  </div>
                  <button
                    onClick={() => handleMarkerClick(ad.id)}
                    className="mt-2 w-full bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
