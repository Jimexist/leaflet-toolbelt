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
    return (latLng: L.LatLng) => isPointInCircle(convertPoint(latLng),
      convertPoint(circle.getLatLng()),
      circle.getRadius());
  } else if (layerType === "rectangle" || layerType === "polygon") {
    const polygon: L.Polygon = <L.Polygon>layer;
    return (latLng: L.LatLng) => isPointInside(convertPoint(latLng), polygon.getLatLngs().map(convertPoint));
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
  }
}
