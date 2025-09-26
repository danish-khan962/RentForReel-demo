"use client";

import React, { useEffect } from "react";
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

//  Custom marker icon
const customIcon = L.icon({
  iconUrl: "/FindYourSpace/space/home_map_marker.png",
  iconSize: [70, 70],
  iconAnchor: [35, 70],
  popupAnchor: [0, -70],
});

//  Search control as a React component
const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    // Create the search control
    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: "circle",
      showMarker: true,
      showPopup: true,
      marker: {
        icon: customIcon,
      },
      popupFormat: ({ result }: any) => `<strong>${result.label}</strong>`,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      searchLabel: "Search location...",
      keepResult: true,
    });

    (map as LeafletMap).addControl(searchControl);

    return () => {
      (map as LeafletMap).removeControl(searchControl);
    };
  }, [map]);

  return null;
};

const LocationMap = () => {
  const position: LatLngExpression = [28.544788, 77.18987];

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-[#000000]">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        className="w-full h-full z-10"
      >
        {/* Base tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Controls */}
        <ZoomControl position="topright" />
        <SearchControl />

        {/* Marker */}
        <Marker position={position} icon={customIcon}>
          <Popup>Custom Marker Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
