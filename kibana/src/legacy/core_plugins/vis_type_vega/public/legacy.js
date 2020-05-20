"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = exports.setup = void 0;

var _new_platform = require("ui/new_platform");

var _legacy = require("../../visualizations/public/np_ready/public/legacy");

var _shim = require("./shim");

var _ = require(".");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setupPlugins = _objectSpread({}, _new_platform.npSetup.plugins, {
  visualizations: _legacy.setup,
  // Temporary solution
  // It will be removed when all dependent services are migrated to the new platform.
  __LEGACY: new _shim.LegacyDependenciesPlugin()
});

var startPlugins = _objectSpread({}, _new_platform.npStart.plugins);

var pluginInstance = (0, _.plugin)({});
var setup = pluginInstance.setup(_new_platform.npSetup.core, setupPlugins);
exports.setup = setup;
var start = pluginInstance.start(_new_platform.npStart.core, startPlugins);
exports.start = start;