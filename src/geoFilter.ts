/// <reference path="./geolib.d.ts" />
/// <reference path="../typings/main.d.ts" />
import * as geolib from "geolib";
// we include leaflet here but we do not set that as peer deps
// because although leaflet is available in npm
// many of its plugins are not npm friendly
declare var L;

export interface LatLngFilter {
  (latLng: L.LatLng): boolean;
}

function convertPoint(latLng: L.LatLng): geolib.Point {
  return {
    latitude: latLng.lat,
    longitude: latLng.lng
  };
}

function getLayerType(layer: L.ILayer): string {
  if (layer instanceof L.Circle) {
    return "circle";
  } else if (layer instanceof L.Polygon) {
    if (layer instanceof L.Rectangle) {
      return "rectangle";
    } else {
      return "polygon";
    }
  } // else return undefined
}

export function leafletLayerToLatLngFilter(layer: L.ILayer, layerType: string = getLayerType(layer)): LatLngFilter {
  if (layerType === "circle") {
    const circle: L.Circle = <L.Circle>layer;
    return (latLng: L.LatLng) => geolib.isPointInCircle(convertPoint(latLng),
      convertPoint(circle.getLatLng()),
      circle.getRadius()); // note in meters
  } else if (layerType === "rectangle" || layerType === "polygon") {
    const polygon: L.Polygon = <L.Polygon>layer;
    return (latLng: L.LatLng) => geolib.isPointInside(convertPoint(latLng),
      polygon.getLatLngs().map(convertPoint));
  } else {
    // possibly polyline or marker, which should always return false
    return () => false;
  }
}

export function leafletLayerGroupToLatLngFilter<T extends L.ILayer>(layerGroup: L.LayerGroup<T>): LatLngFilter {
  const predicates = layerGroup.getLayers().map(layer => leafletLayerToLatLngFilter(layer));
  return (latLng: L.LatLng) => {
    for (const predicate of predicates) {
      if (predicate(latLng)) {
        return true;
      }
    }
    return false;
  };
}
