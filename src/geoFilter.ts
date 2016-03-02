/// <reference path="./geolib.d.ts" />
import { Point, isPointInCircle, isPointInside } from "geolib";

export interface LatLngFilter {
  (latLng: L.LatLng): boolean;
}

function convertPoint(latLng: L.LatLng): Point {
  return {
    latitude: latLng.lat,
    longitude: latLng.lng
  };
}

export function leafletLayerToLatLngFilter(layer: L.ILayer, layerType: string): LatLngFilter {
  if (layerType === "circle") {
    const circle: L.Circle = <L.Circle> layer;
    return (latLng: L.LatLng) => isPointInCircle(convertPoint(latLng),
      convertPoint(circle.getLatLng()),
      circle.getRadius());
  } else if (layerType === "rectangle" || layerType === "polygon") {
    const polygon: L.Polygon = <L.Polygon> layer;
    return (latLng: L.LatLng) => isPointInside(convertPoint(latLng),
      polygon.getLatLngs().map(convertPoint));
  } else {
    return () => true;
  }
}
