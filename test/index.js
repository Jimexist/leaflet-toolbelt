import chai from 'chai';
import LT from '../lib/index';

const expect = chai.expect;

describe('leaflet toolbelt', () => {

  it('should filter circle correctly', () => {
    const circle = {
      getLatLng() {
        return { lat: 0, lng: 0 }
      },
      getRadius() {
        return 100;
      }
    };
    const f = LT.leafletLayerToLatLngFilter(circle, 'circle');
    expect(f({ lat: 0, lng: 0 })).to.be.equal(true);
    expect(f({ lat: 101, lng: 0 })).to.be.equal(false);
  });

  it('should filter polygon correctly', () => {
    const polygon = {
      getLatLngs() {
        const p0 = { lat: 0, lng: 0, };
        const p1 = { lat: 1, lng: 1, };
        const p2 = { lat: 1, lng: 0, };
        return [p0, p1, p2, p0];
      }
    };
    const f = LT.leafletLayerToLatLngFilter(polygon, 'polygon');
    expect(f({ lat: 0.5, lng: 0.5 })).to.be.equal(true);
    expect(f({ lat: -1, lng: 0.5 })).to.be.equal(false);
  });

});
