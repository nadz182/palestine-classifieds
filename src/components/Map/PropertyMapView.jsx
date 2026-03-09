import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { palestineCenter, palestineBounds } from '../../data/palestineData';
import { createPriceIcon, createClusterIcon } from './mapUtils';
import { MapPopupCard } from './MapPopupCard';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export function PropertyMapView({ properties, height = '500px' }) {
  const navigate = useNavigate();

  const propertiesWithLocation = useMemo(() =>
    properties.filter(p => p.location && p.location.length === 2),
    [properties]
  );

  const handleViewDetails = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div style={{ height, width: '100%' }} className="rounded-xl overflow-hidden border border-gray-200 shadow-md">
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
              icon={createPriceIcon(property.price, property.listingType)}
            >
              <Popup maxWidth={310} minWidth={280} closeButton={true}>
                <MapPopupCard property={property} onViewDetails={handleViewDetails} />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
