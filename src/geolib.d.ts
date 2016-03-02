// this is to (incompletely) annotate https://github.com/manuelbieh/Geolib

declare module geolib {

  export interface Point {
    latitude: number;
    longitude: number;
  }

  export function isPointInside(p: Point, coords: Point[]): boolean;

  export function isPointInCircle(p: Point, center: Point, radius: number): boolean;

}

declare module "geolib" {
  export default geolib;
}
