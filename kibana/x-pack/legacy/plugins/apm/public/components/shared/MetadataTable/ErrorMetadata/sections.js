"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ERROR_METADATA_SECTIONS = void 0;

var _sections = require("../sections");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ERROR_METADATA_SECTIONS = [_objectSpread({}, _sections.LABELS, {
  required: true
}), _sections.ERROR, _sections.HTTP, _sections.HOST, _sections.CONTAINER, _sections.SERVICE, _sections.PROCESS, _sections.AGENT, _sections.URL, _objectSpread({}, _sections.USER, {
  required: true
}), _sections.CUSTOM_ERROR];
exports.ERROR_METADATA_SECTIONS = ERROR_METADATA_SECTIONS;