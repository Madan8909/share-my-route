import { useEffect, useRef } from "react";
import L from "leaflet";
import { CHENNAI_CENTER } from "@/data/mockData";

interface RouteMapProps {
  routes?: { start: { lat: number; lng: number }; end: { lat: number; lng: number }; waypoints?: { lat: number; lng: number }[]; color?: string }[];
  markers?: { lat: number; lng: number; label?: string; color?: string }[];
  height?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const RouteMap = ({ routes = [], markers = [], height = "300px", center, zoom = 12 }: RouteMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    const mapCenter = center || CHENNAI_CENTER;
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
    }).setView([mapCenter.lat, mapCenter.lng], zoom);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Draw routes
    routes.forEach((route) => {
      const points: L.LatLngExpression[] = [
        [route.start.lat, route.start.lng],
        ...(route.waypoints || []).map((w) => [w.lat, w.lng] as L.LatLngExpression),
        [route.end.lat, route.end.lng],
      ];

      L.polyline(points, {
        color: route.color || "#00D4AA",
        weight: 4,
        opacity: 0.8,
        smoothFactor: 1,
      }).addTo(map);
    });

    // Add markers
    markers.forEach((marker) => {
      const markerColor = marker.color || "#00D4AA";
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="width:14px;height:14px;border-radius:50%;background:${markerColor};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const m = L.marker([marker.lat, marker.lng], { icon }).addTo(map);
      if (marker.label) {
        m.bindTooltip(marker.label, { permanent: false, direction: "top", offset: [0, -10] });
      }
    });

    // Fit bounds if we have routes or markers
    const allPoints: L.LatLngExpression[] = [
      ...routes.flatMap((r) => [
        [r.start.lat, r.start.lng] as L.LatLngExpression,
        ...(r.waypoints || []).map((w) => [w.lat, w.lng] as L.LatLngExpression),
        [r.end.lat, r.end.lng] as L.LatLngExpression,
      ]),
      ...markers.map((m) => [m.lat, m.lng] as L.LatLngExpression),
    ];

    if (allPoints.length > 1) {
      map.fitBounds(L.latLngBounds(allPoints), { padding: [30, 30] });
    }

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [routes, markers, center, zoom]);

  return <div ref={mapRef} style={{ height, width: "100%" }} className="rounded-2xl overflow-hidden" />;
};

export default RouteMap;
