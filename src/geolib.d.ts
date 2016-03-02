// this is to (incompletely) annotate https://github.com/manuelbieh/Geolib

declare module "geolib" {

  export interface Point {
    latitude: number;
    longitude: number;
  }

  function isPointInside(p: Point, coords: Point[]): boolean;

  function isPointInCircle(p: Point, center: Point, radius: number): boolean;

  export default {
    isPointInside,
    isPointInCircle,
  }
}