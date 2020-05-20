"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawCircle = void 0;

var _turf = _interopRequireDefault(require("turf"));

var _circle = _interopRequireDefault(require("@turf/circle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/consistent-type-definitions */
// @ts-ignore
// @ts-ignore
var DrawCircle = {
  onSetup: function onSetup() {
    // @ts-ignore
    var circle = this.newFeature({
      type: 'Feature',
      properties: {
        center: null,
        radiusKm: 0
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[]]
      }
    }); // @ts-ignore

    this.addFeature(circle); // @ts-ignore

    this.clearSelectedFeatures(); // @ts-ignore

    this.updateUIClasses({
      mouse: 'add'
    }); // @ts-ignore

    this.setActionableState({
      trash: true
    });
    return {
      circle: circle
    };
  },
  onKeyUp: function onKeyUp(state, e) {
    if (e.keyCode === 27) {
      // clear point when user hits escape
      state.circle.properties.center = null;
      state.circle.properties.radiusKm = 0;
      state.circle.incomingCoords([[]]);
    }
  },
  onClick: function onClick(state, e) {
    if (!state.circle.properties.center) {
      // first click, start circle
      state.circle.properties.center = [e.lngLat.lng, e.lngLat.lat];
    } else {
      // second click, finish draw
      // @ts-ignore
      this.updateUIClasses({
        mouse: 'pointer'
      });
      state.circle.properties.radiusKm = _turf.default.distance(state.circle.properties.center, [e.lngLat.lng, e.lngLat.lat]); // @ts-ignore

      this.changeMode('simple_select', {
        featuresId: state.circle.id
      });
    }
  },
  onMouseMove: function onMouseMove(state, e) {
    if (!state.circle.properties.center) {
      // circle not started, nothing to update
      return;
    }

    var mouseLocation = [e.lngLat.lng, e.lngLat.lat];
    state.circle.properties.radiusKm = _turf.default.distance(state.circle.properties.center, mouseLocation);
    var newCircleFeature = (0, _circle.default)(state.circle.properties.center, state.circle.properties.radiusKm);
    state.circle.incomingCoords(newCircleFeature.geometry.coordinates);
  },
  onStop: function onStop(state) {
    // @ts-ignore
    this.updateUIClasses({
      mouse: 'none'
    }); // @ts-ignore

    this.activateUIButton(); // @ts-ignore

    if (this.getFeature(state.circle.id) === undefined) return;

    if (state.circle.properties.center && state.circle.properties.radiusKm > 0) {
      // @ts-ignore
      this.map.fire('draw.create', {
        features: [state.circle.toGeoJSON()]
      });
    } else {
      // @ts-ignore
      this.deleteFeature([state.circle.id], {
        silent: true
      }); // @ts-ignore

      this.changeMode('simple_select', {}, {
        silent: true
      });
    }
  },
  toDisplayFeatures: function toDisplayFeatures(state, geojson, display) {
    if (state.circle.properties.center) {
      geojson.properties.active = 'true';
      return display(geojson);
    }
  },
  onTrash: function onTrash(state) {
    // @ts-ignore
    this.deleteFeature([state.circle.id], {
      silent: true
    }); // @ts-ignore

    this.changeMode('simple_select');
  }
};
exports.DrawCircle = DrawCircle;