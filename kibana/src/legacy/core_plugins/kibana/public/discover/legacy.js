"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.setup = exports.pluginInstance = void 0;

var _new_platform = require("ui/new_platform");

var _index = require("./index");

var _legacy = require("../../../../core_plugins/visualizations/public/np_ready/public/legacy");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Legacy compatibility part - to be removed at cutover, replaced by a kibana.json file
var pluginInstance = (0, _index.plugin)({});
exports.pluginInstance = pluginInstance;
var setup = pluginInstance.setup(_new_platform.npSetup.core, _objectSpread({}, _new_platform.npSetup.plugins, {
  visualizations: _legacy.setup
}));
exports.setup = setup;
var start = pluginInstance.start(_new_platform.npStart.core, _objectSpread({}, _new_platform.npStart.plugins, {
  visualizations: _legacy.start
}));
exports.start = start;