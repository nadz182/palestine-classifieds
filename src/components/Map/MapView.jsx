import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { palestineCenter, palestineBounds, palestineCities } from '../../data/palestineData';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition, selectable }) {
  useMapEvents({
    click(e) {
      if (selectable) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        Selected Location
        <br />
        Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
      </Popup>
    </Marker>
  ) : null;
}

export function MapView({ selectedLocation, onLocationSelect, height = '400px', selectable = false, showCities = true }) {
  const [position, setPosition] = useState(selectedLocation || null);

  useEffect(() => {
    if (position && onLocationSelect) {
      onLocationSelect(position);
    }
  }, [position, onLocationSelect]);

  return (
    <div style={{ height, width: '100%' }} className="rounded-xl overflow-hidden border border-gray-200">
      <MapContainer
        center={palestineCenter}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        maxBounds={palestineBounds}
        minZoom={7}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showCities && palestineCities.map((city) => (
          <Marker key={city.name} position={city.coordinates}>
            <Popup>{city.name}</Popup>
          </Marker>
        ))}

        {selectable && (
          <LocationMarker position={position} setPosition={setPosition} selectable={selectable} />
        )}

        {!selectable && position && (
          <Marker position={position}>
            <Popup>Property Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

