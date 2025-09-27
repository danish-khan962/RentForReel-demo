"use client";

import React, { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import L, { LatLngExpression, Map as LeafletMap } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

interface SearchResult {
  label: string;
}

const customIcon = L.icon({
  iconUrl: "/FindYourSpace/space/home_map_marker.png",
  iconSize: [70, 70],
  iconAnchor: [35, 70],
  popupAnchor: [0, -70],
});

// SearchControl component
const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = GeoSearchControl({
      provider,
      style: "circle",
      showMarker: true,
      showPopup: true,
      marker: {
        icon: customIcon,
      },
      popupFormat: ({ result }: { result: SearchResult }) =>
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

const LocationMap = () => {
  const position: LatLngExpression = [28.544788, 77.18987];
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && mapRef.current) {
        mapRef.current.scrollWheelZoom.enable();
        mapRef.current.touchZoom.enable();
        mapRef.current.doubleClickZoom.enable();
        mapRef.current.boxZoom.enable();
      }
    };

    const handleKeyUp = () => {
      if (mapRef.current) {
        mapRef.current.scrollWheelZoom.disable();
        mapRef.current.touchZoom.disable();
        mapRef.current.doubleClickZoom.disable();
        mapRef.current.boxZoom.disable();
      }
    };

    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 640) { // sm: is 640px in Tailwind
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-[#000000]">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full z-10"
        ref={(mapInstance) => {
          if (mapInstance && !mapRef.current) {
            mapRef.current = mapInstance;

            mapInstance.scrollWheelZoom.disable();
            mapInstance.touchZoom.disable();
            mapInstance.doubleClickZoom.disable();
            mapInstance.boxZoom.disable();
          }
        }}
      >


        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <SearchControl />
        <Marker position={position} icon={customIcon}>
          <Popup>Custom Marker Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
