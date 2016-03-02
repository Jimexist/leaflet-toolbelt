import chai from 'chai';
import LT from '../lib/index';

const expect = chai.expect;

describe('leaflet toolbelt', () => {

  it('should work', () => {
    const circle = {
      getLatLng() {
        return {
          lat: 0,
          lng: 0
        }
      },
      getRadius() {
        return 100;
      }
    };
    const f = LT.leafletLayerToLatLngFilter(circle, 'circle');
    expect(f({
      lat: 0,
      lng: 0
    })).to.be.equal(true);
    expect(f({
      lat: 101,
      lng: 0
    })).to.be.equal(false);
  });

});
