"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCoreSetup = getCoreSetup;
exports.getCoreStart = getCoreStart;
exports.getSetupPlugins = getSetupPlugins;
exports.getStartPlugins = getStartPlugins;

var _new_platform = require("ui/new_platform");

var _chrome = _interopRequireDefault(require("ui/chrome"));

var _absolute_to_parsed_url = require("ui/url/absolute_to_parsed_url");

var _public = require("../../../../../src/plugins/kibana_legacy/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// eslint-disable-line import/order
var shimCoreSetup = _objectSpread({}, _new_platform.npSetup.core);

var shimCoreStart = _objectSpread({}, _new_platform.npStart.core);

var shimSetupPlugins = {
  expressions: _new_platform.npSetup.plugins.expressions,
  home: _new_platform.npSetup.plugins.home
};

var shimStartPlugins = _objectSpread({}, _new_platform.npStart.plugins, {
  expressions: _new_platform.npStart.plugins.expressions,
  uiActions: _new_platform.npStart.plugins.uiActions,
  __LEGACY: {
    // ToDo: Copy directly into canvas
    absoluteToParsedUrl: _absolute_to_parsed_url.absoluteToParsedUrl,
    // ToDo: Copy directly into canvas
    formatMsg: _public.formatMsg,
    // ToDo: Won't be a part of New Platform. Will need to handle internally
    trackSubUrlForApp: _chrome.default.trackSubUrlForApp
  }
}); // These methods are intended to be a replacement for import from 'ui/whatever'
// These will go away once all of this one plugin start/setup properly
// injects wherever these need to go.


function getCoreSetup() {
  return shimCoreSetup;
}

function getCoreStart() {
  return shimCoreStart;
}

function getSetupPlugins() {
  return shimSetupPlugins;
}

function getStartPlugins() {
  return shimStartPlugins;
}