"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truncatedColorSchemas = exports.truncatedColorMaps = void 0;

var _color_maps = require("./color_maps");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var truncatedColorMaps = {};
exports.truncatedColorMaps = truncatedColorMaps;
var colormaps = _color_maps.vislibColorMaps;

for (var key in colormaps) {
  if (colormaps.hasOwnProperty(key)) {
    // slice off lightest colors
    // @ts-ignore
    var color = colormaps[key];
    truncatedColorMaps[key] = _objectSpread({}, color, {
      value: color.value.slice(Math.floor(color.value.length / 4))
    });
  }
}

var truncatedColorSchemas = Object.values(truncatedColorMaps).map(function (_ref) {
  var id = _ref.id,
      label = _ref.label;
  return {
    value: id,
    text: label
  };
});
exports.truncatedColorSchemas = truncatedColorSchemas;