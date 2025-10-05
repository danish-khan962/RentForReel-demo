"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import myQueries from "@/api/queries"; 
import type { LatLngExpression } from "leaflet";

const customIcon = L.icon({
  iconUrl: "/FindYourSpace/space/Home_map_marker.png",
  iconSize: [70, 70],
  iconAnchor: [35, 70],
  popupAnchor: [0, -70],
});

const SearchControl: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = GeoSearchControl({
      provider,
      style: "circle",
      showMarker: true,
      showPopup: true,
      marker: { icon: customIcon },
      popupFormat: ({ result }: { result: { label: string } }) =>
        `<strong>${result.label}</strong>`,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      searchLabel: "Search location...",
      keepResult: true,
    });

    map.addControl(searchControl);
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

// Child that recenters/flys the map when position updates
const Recenter: React.FC<{ position: LatLngExpression; zoom?: number }> = ({ position, zoom = 13 }) => {
  const map = useMap();
  useEffect(() => {
    if (!position) return;
    map.flyTo(position as L.LatLngExpression, zoom, { animate: true, duration: 0.8 });
  }, [position, zoom, map]);

  return null;
};

type Props = {
  spaceId?: string;
  pincode?: string | number;
  initialPosition?: LatLngExpression;
  zoom?: number;
};

const LocationMap: React.FC<Props> = ({ spaceId, pincode, initialPosition = [28.544788, 77.18987], zoom = 13 }) => {
  const [position, setPosition] = useState<LatLngExpression>(initialPosition);
  const { getSpaceById } = myQueries;

  useEffect(() => {
    if (!spaceId && !pincode) return;

    const controller = new AbortController();
    let mounted = true;

    (async () => {
      try {
        let pin = pincode ? String(pincode) : undefined;

        if (!pin && spaceId) {
          const resp = await getSpaceById(spaceId);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const payload = (resp && (resp as any).data) ? (resp as any).data : resp;
          pin = payload?.pincode ?? payload?.postalCode ?? payload?.address?.pincode ?? undefined;
          if (pin) pin = String(pin);
        }

        if (!pin) return;

        const url = `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(pin)}&country=India&format=json&limit=1`;
        const res = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
        if (!res.ok) {
          console.warn("Geocoding failed:", res.status);
          return;
        }

        const json = await res.json();
        if (!mounted) return;

        if (Array.isArray(json) && json.length > 0) {
          const lat = parseFloat(json[0].lat);
          const lon = parseFloat(json[0].lon);
          if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
            setPosition([lat, lon]);
          }
        } else {
          console.warn("No geocode results for pincode:", pin);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name === "AbortError") return;
          console.error("LocationMap geocode error:", err.message);
        } else {
          console.error("LocationMap geocode error:", err);
        }
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [spaceId, pincode, getSpaceById]);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-[#000000]">
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} zoomControl={false} className="w-full h-full z-10">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="topright" />
        <SearchControl />
        <Recenter position={position} zoom={zoom} />

        <Marker position={position} icon={customIcon}>
          <Popup>{`Location${pincode ? ` — pincode: ${pincode}` : ""}`}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
