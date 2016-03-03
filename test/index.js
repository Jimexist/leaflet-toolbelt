import chai from 'chai';
import jsdom from 'mocha-jsdom';

const expect = chai.expect;

const ONE_DEGREE = 6371 * 1000 * 2 * 3.14 / 360;

describe('leaflet toolbelt', () => {
  let circle;
  let polygon;
  let layerGroup;
  let LT;
  let p1, p2, p3;

  // we have to include jsdom because Leaflet will depend on
  jsdom();

  before(() => {
    LT = require("../lib/index");
    const L = require("leaflet");
    global.L = L;
    p1 = L.latLng(0, 0);
    p2 = L.latLng(-1, -1);
    p3 = L.latLng(100, 0);
    circle = L.circle(L.latLng(0, 0), 20 * ONE_DEGREE);
    polygon = L.rectangle(L.latLngBounds(L.latLng(0, 0), L.latLng(1, 1)));
    layerGroup = L.layerGroup([circle, polygon]);
  });

  it('should filter circle correctly', () => {
    const f = LT.leafletLayerToLatLngFilter(circle, 'circle');
    expect(f(p1)).to.be.equal(true);
    expect(f(p3)).to.be.equal(false);
  });

  it('should filter polygon correctly', () => {
    const f = LT.leafletLayerToLatLngFilter(polygon, 'polygon');
    expect(f(p1)).to.be.equal(true);
    expect(f(p2)).to.be.equal(false);
  });

  it('should filter layer group properly', () => {
    const f = LT.leafletLayerGroupToLatLngFilter(layerGroup);
    expect(f(p1)).to.be.equal(true);
    expect(f(p2)).to.be.equal(true);
    expect(f(p3)).to.be.equal(false);
  });

});
