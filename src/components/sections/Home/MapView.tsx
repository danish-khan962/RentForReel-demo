"use client";

import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLngExpression, Map as LeafletMap } from "leaflet";

const MapView = () => {
  const position: LatLngExpression = [19.076, 72.8777]; // Mumbai location
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
      if (screenWidth >= 640) {
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
    <div className="w-full h-full rounded-4xl overflow-hidden border border-[#000000]">
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
        <Marker position={position}>
          <Popup>
            You&apos;re here! 📍
            <br />
            Mumbai Center.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
