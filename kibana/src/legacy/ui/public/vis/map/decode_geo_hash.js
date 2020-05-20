"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeGeoHash = decodeGeoHash;
exports.geohashColumns = geohashColumns;
exports.getPrecision = getPrecision;
exports.scaleBounds = scaleBounds;
exports.geoContains = geoContains;
exports.zoomPrecision = void 0;

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var config = _chrome.default.getUiSettingsClient();

/**
 * Decodes geohash to object containing
 * top-left and bottom-right corners of
 * rectangle and center point.
 */
function decodeGeoHash(geohash) {
  var BITS = [16, 8, 4, 2, 1];
  var BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';
  var isEven = true;
  var lat = [];
  var lon = [];
  lat[0] = -90.0;
  lat[1] = 90.0;
  lon[0] = -180.0;
  lon[1] = 180.0;
  var latErr = 90.0;
  var lonErr = 180.0;

  _toConsumableArray(geohash).forEach(function (nextChar) {
    var cd = BASE32.indexOf(nextChar);

    for (var j = 0; j < 5; j++) {
      var mask = BITS[j];

      if (isEven) {
        lonErr = lonErr /= 2;
        refineInterval(lon, cd, mask);
      } else {
        latErr = latErr /= 2;
        refineInterval(lat, cd, mask);
      }

      isEven = !isEven;
    }
  });

  lat[2] = (lat[0] + lat[1]) / 2;
  lon[2] = (lon[0] + lon[1]) / 2;
  return {
    latitude: lat,
    longitude: lon
  };
}

function refineInterval(interval, cd, mask) {
  if (cd & mask) {
    /* eslint-disable-line */
    interval[0] = (interval[0] + interval[1]) / 2;
  } else {
    interval[1] = (interval[0] + interval[1]) / 2;
  }
}
/**
 * Get the number of geohash cells for a given precision
 *
 * @param {number} precision the geohash precision (1<=precision<=12).
 * @param {number} axis constant for the axis 0=lengthwise (ie. columns, along longitude), 1=heightwise (ie. rows, along latitude).
 * @returns {number} Number of geohash cells (rows or columns) at that precision
 */


function geohashCells(precision, axis) {
  var cells = 1;

  for (var i = 1; i <= precision; i += 1) {
    /* On odd precisions, rows divide by 4 and columns by 8. Vice-versa on even precisions */
    cells *= i % 2 === axis ? 4 : 8;
  }

  return cells;
}
/**
 * Get the number of geohash columns (world-wide) for a given precision
 * @param precision the geohash precision
 * @returns {number} the number of columns
 */


function geohashColumns(precision) {
  return geohashCells(precision, 0);
}

var defaultPrecision = 2;
var maxPrecision = parseInt(config.get('visualization:tileMap:maxPrecision'), 10) || 12;
/**
 * Map Leaflet zoom levels to geohash precision levels.
 * The size of a geohash column-width on the map should be at least `minGeohashPixels` pixels wide.
 */

var zoomPrecision = {};
exports.zoomPrecision = zoomPrecision;
var minGeohashPixels = 16;

for (var zoom = 0; zoom <= 21; zoom += 1) {
  var worldPixels = 256 * Math.pow(2, zoom);
  zoomPrecision[zoom] = 1;

  for (var precision = 2; precision <= maxPrecision; precision += 1) {
    var columns = geohashColumns(precision);

    if (worldPixels / columns >= minGeohashPixels) {
      zoomPrecision[zoom] = precision;
    } else {
      break;
    }
  }
}

function getPrecision(val) {
  var precision = parseInt(val, 10);

  if (Number.isNaN(precision)) {
    precision = defaultPrecision;
  }

  if (precision > maxPrecision) {
    return maxPrecision;
  }

  return precision;
}

function scaleBounds(bounds) {
  var scale = 0.5; // scale bounds by 50%

  var topLeft = bounds.top_left;
  var bottomRight = bounds.bottom_right;

  var latDiff = _lodash.default.round(Math.abs(topLeft.lat - bottomRight.lat), 5);

  var lonDiff = _lodash.default.round(Math.abs(bottomRight.lon - topLeft.lon), 5); // map height can be zero when vis is first created


  if (latDiff === 0) latDiff = lonDiff;
  var latDelta = latDiff * scale;
  var topLeftLat = _lodash.default.round(topLeft.lat, 5) + latDelta;
  if (topLeftLat > 90) topLeftLat = 90;
  var bottomRightLat = _lodash.default.round(bottomRight.lat, 5) - latDelta;
  if (bottomRightLat < -90) bottomRightLat = -90;
  var lonDelta = lonDiff * scale;
  var topLeftLon = _lodash.default.round(topLeft.lon, 5) - lonDelta;
  if (topLeftLon < -180) topLeftLon = -180;
  var bottomRightLon = _lodash.default.round(bottomRight.lon, 5) + lonDelta;
  if (bottomRightLon > 180) bottomRightLon = 180;
  return {
    top_left: {
      lat: topLeftLat,
      lon: topLeftLon
    },
    bottom_right: {
      lat: bottomRightLat,
      lon: bottomRightLon
    }
  };
}

function geoContains(collar, bounds) {
  if (!bounds || !collar) return false; // test if bounds top_left is outside collar

  if (bounds.top_left.lat > collar.top_left.lat || bounds.top_left.lon < collar.top_left.lon) {
    return false;
  } // test if bounds bottom_right is outside collar


  if (bounds.bottom_right.lat < collar.bottom_right.lat || bounds.bottom_right.lon > collar.bottom_right.lon) {
    return false;
  } // both corners are inside collar so collar contains bounds


  return true;
}