"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignFeatureIds = assignFeatureIds;

var _lodash = _interopRequireDefault(require("lodash"));

var _constants = require("../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var idCounter = 0;

function generateNumericalId() {
  var newId = idCounter < Number.MAX_SAFE_INTEGER ? idCounter : 0;
  idCounter = newId + 1;
  return newId;
}

function assignFeatureIds(featureCollection) {
  // wrt https://github.com/elastic/kibana/issues/39317
  // In constrained resource environments, mapbox-gl may throw a stackoverflow error due to hitting the browser's recursion limit. This crashes Kibana.
  // This error is thrown in mapbox-gl's quicksort implementation, when it is sorting all the features by id.
  // This is a work-around to avoid hitting such a worst-case
  // This was tested as a suitable work-around for mapbox-gl 0.54
  // The core issue itself is likely related to https://github.com/mapbox/mapbox-gl-js/issues/6086
  // This only shuffles the id-assignment, _not_ the features in the collection
  // The reason for this is that we do not want to modify the feature-ordering, which is the responsiblity of the VectorSource#.
  var ids = [];

  for (var i = 0; i < featureCollection.features.length; i++) {
    var id = generateNumericalId();
    ids.push(id);
  }

  var randomizedIds = _lodash.default.shuffle(ids);

  var features = [];

  for (var _i = 0; _i < featureCollection.features.length; _i++) {
    var numericId = randomizedIds[_i];
    var feature = featureCollection.features[_i];
    features.push({
      type: 'Feature',
      geometry: feature.geometry,
      // do not copy geometry, this object can be massive
      properties: _objectSpread(_defineProperty({}, _constants.FEATURE_ID_PROPERTY_NAME, feature.id == null ? numericId : feature.id), feature.properties),
      id: numericId // Mapbox feature state id, must be integer

    });
  }

  return {
    type: 'FeatureCollection',
    features: features
  };
}