"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpPointsLayer = exports.getDownPointsLayer = exports.getLowPolyLayer = exports.getLayerList = void 0;

var _low_poly_layer = _interopRequireDefault(require("./low_poly_layer.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Returns `Source/Destination Point-to-point` Map LayerList configuration, with a source,
 * destination, and line layer for each of the provided indexPatterns
 *
 */
var getLayerList = function getLayerList(upPoints, downPoints, _ref) {
  var danger = _ref.danger;
  return [getLowPolyLayer(), getDownPointsLayer(downPoints, danger), getUpPointsLayer(upPoints)];
};

exports.getLayerList = getLayerList;

var getLowPolyLayer = function getLowPolyLayer() {
  return {
    id: 'low_poly_layer',
    label: 'World countries',
    minZoom: 0,
    maxZoom: 24,
    alpha: 1,
    sourceDescriptor: {
      id: 'b7486535-171b-4d3b-bb2e-33c1a0a2854c',
      type: 'GEOJSON_FILE',
      __featureCollection: _low_poly_layer.default
    },
    visible: true,
    style: {
      type: 'VECTOR',
      properties: {
        fillColor: {
          type: 'STATIC',
          options: {
            color: '#cad3e4'
          }
        },
        lineColor: {
          type: 'STATIC',
          options: {
            color: '#fff'
          }
        },
        lineWidth: {
          type: 'STATIC',
          options: {
            size: 0
          }
        },
        iconSize: {
          type: 'STATIC',
          options: {
            size: 6
          }
        }
      }
    },
    type: 'VECTOR'
  };
};

exports.getLowPolyLayer = getLowPolyLayer;

var getDownPointsLayer = function getDownPointsLayer(downPoints, dangerColor) {
  var features = downPoints === null || downPoints === void 0 ? void 0 : downPoints.map(function (point) {
    return {
      type: 'feature',
      geometry: {
        type: 'Point',
        coordinates: [+point.lon, +point.lat]
      }
    };
  });
  return {
    id: 'down_points',
    label: 'Down Locations',
    sourceDescriptor: {
      type: 'GEOJSON_FILE',
      __featureCollection: {
        features: features,
        type: 'FeatureCollection'
      }
    },
    visible: true,
    style: {
      type: 'VECTOR',
      properties: {
        fillColor: {
          type: 'STATIC',
          options: {
            color: dangerColor
          }
        },
        lineColor: {
          type: 'STATIC',
          options: {
            color: '#fff'
          }
        },
        lineWidth: {
          type: 'STATIC',
          options: {
            size: 2
          }
        },
        iconSize: {
          type: 'STATIC',
          options: {
            size: 6
          }
        }
      }
    },
    type: 'VECTOR'
  };
};

exports.getDownPointsLayer = getDownPointsLayer;

var getUpPointsLayer = function getUpPointsLayer(upPoints) {
  var features = upPoints === null || upPoints === void 0 ? void 0 : upPoints.map(function (point) {
    return {
      type: 'feature',
      geometry: {
        type: 'Point',
        coordinates: [+point.lon, +point.lat]
      }
    };
  });
  return {
    id: 'up_points',
    label: 'Up Locations',
    sourceDescriptor: {
      type: 'GEOJSON_FILE',
      __featureCollection: {
        features: features,
        type: 'FeatureCollection'
      }
    },
    visible: true,
    style: {
      type: 'VECTOR',
      properties: {
        fillColor: {
          type: 'STATIC',
          options: {
            color: '#98A2B2'
          }
        },
        lineColor: {
          type: 'STATIC',
          options: {
            color: '#fff'
          }
        },
        lineWidth: {
          type: 'STATIC',
          options: {
            size: 2
          }
        },
        iconSize: {
          type: 'STATIC',
          options: {
            size: 6
          }
        }
      }
    },
    type: 'VECTOR'
  };
};

exports.getUpPointsLayer = getUpPointsLayer;