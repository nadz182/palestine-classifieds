import L from 'leaflet';

export const markerColors = {
  sale: '#2563eb',
  rent: '#16a34a',
  default: '#6b7280',
};

// PointFinder-style price-label marker
export function createPriceIcon(price, listingType, isActive = false) {
  const color = markerColors[listingType] || markerColors.default;
  const bg = isActive ? '#ef4444' : color;
  const label = formatShortPrice(price, listingType);

  return L.divIcon({
    className: 'price-marker',
    html: `
      <div style="
        background: ${bg};
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 700;
        font-family: Inter, sans-serif;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        border: 2px solid white;
        cursor: pointer;
        position: relative;
        text-align: center;
        line-height: 1.2;
      ">
        ${label}
        <div style="
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid ${bg};
        "></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 36],
    popupAnchor: [0, -40],
  });
}

// Simple dot marker (fallback)
export function createColorIcon(color) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background:${color};width:24px;height:24px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function formatShortPrice(price, listingType) {
  if (!price) return '?';
  let str;
  if (price >= 1000000) {
    str = `$${(price / 1000000).toFixed(1)}M`;
  } else if (price >= 1000) {
    str = `$${(price / 1000).toFixed(price >= 100000 ? 0 : 0)}K`;
  } else {
    str = `$${price}`;
  }
  if (listingType === 'rent') str += '/mo';
  return str;
}

// Custom cluster icon styled like PointFinder
export function createClusterIcon(cluster) {
  const count = cluster.getChildCount();
  let size, fontSize, bg;

  if (count < 5) {
    size = 36;
    fontSize = 13;
    bg = '#3b82f6';
  } else if (count < 15) {
    size = 44;
    fontSize = 14;
    bg = '#2563eb';
  } else {
    size = 52;
    fontSize = 15;
    bg = '#1d4ed8';
  }

  return L.divIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${bg};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        font-size: ${fontSize}px;
        font-family: Inter, sans-serif;
        box-shadow: 0 3px 12px rgba(37, 99, 235, 0.4);
        cursor: pointer;
      ">${count}</div>
    `,
    className: 'marker-cluster-custom',
    iconSize: L.point(size, size),
    iconAnchor: [size / 2, size / 2],
  });
}
