import { useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { palestineCenter, palestineBounds } from '../../data/palestineData';
import { PropertyCard } from '../Property/PropertyCard';
import { createPriceIcon, createClusterIcon } from './mapUtils';
import { MapPopupCard } from './MapPopupCard';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export function MapSearch({ properties }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);

  const propertiesWithLocation = useMemo(() =>
    properties.filter(p => p.location && p.location.length === 2),
    [properties]
  );

  const handleViewDetails = useCallback((id) => {
    navigate(`/property/${id}`);
  }, [navigate]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
      {/* Map */}
      <div className="flex-1 min-h-[400px]">
        <MapContainer
          center={palestineCenter}
          zoom={9}
          style={{ height: '100%', width: '100%' }}
          maxBounds={palestineBounds}
          minZoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MarkerClusterGroup
            iconCreateFunction={createClusterIcon}
            maxClusterRadius={60}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
            animate={true}
            animateAddingMarkers={true}
            disableClusteringAtZoom={15}
          >
            {propertiesWithLocation.map((property) => (
              <Marker
                key={property.id}
                position={property.location}
                icon={createPriceIcon(property.price, property.listingType, selectedId === property.id)}
                eventHandlers={{
                  click: () => setSelectedId(property.id),
                }}
              >
                <Popup maxWidth={310} minWidth={280} closeButton={true}>
                  <MapPopupCard property={property} onViewDetails={handleViewDetails} />
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>

      {/* Sidebar listings */}
      <div className="w-full lg:w-96 bg-gray-50 overflow-y-auto border-t lg:border-t-0 lg:border-s border-gray-200">
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1">
            {t('map.propertiesOnMap', { count: propertiesWithLocation.length })}
          </h3>
          <p className="text-sm text-gray-500 mb-4">{t('map.clickMarker')}</p>
          <div className="space-y-4">
            {propertiesWithLocation.map(property => (
              <div
                key={property.id}
                className={selectedId === property.id ? 'ring-2 ring-primary-500 rounded-xl' : ''}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
