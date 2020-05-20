"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEmsTileLayerId = exports.getEnableExternalUrls = exports.getEsShardTimeout = exports.setInjectedVars = exports.getInjectedVars = exports.setSavedObjects = exports.getSavedObjects = exports.setUISettings = exports.getUISettings = exports.setNotifications = exports.getNotifications = exports.setData = exports.getData = void 0;

var _public = require("../../../../plugins/kibana_utils/public");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _createGetterSetter = (0, _public.createGetterSetter)('Data'),
    _createGetterSetter2 = _slicedToArray(_createGetterSetter, 2),
    getData = _createGetterSetter2[0],
    setData = _createGetterSetter2[1];

exports.setData = setData;
exports.getData = getData;

var _createGetterSetter3 = (0, _public.createGetterSetter)('Notifications'),
    _createGetterSetter4 = _slicedToArray(_createGetterSetter3, 2),
    getNotifications = _createGetterSetter4[0],
    setNotifications = _createGetterSetter4[1];

exports.setNotifications = setNotifications;
exports.getNotifications = getNotifications;

var _createGetterSetter5 = (0, _public.createGetterSetter)('UISettings'),
    _createGetterSetter6 = _slicedToArray(_createGetterSetter5, 2),
    getUISettings = _createGetterSetter6[0],
    setUISettings = _createGetterSetter6[1];

exports.setUISettings = setUISettings;
exports.getUISettings = getUISettings;

var _createGetterSetter7 = (0, _public.createGetterSetter)('SavedObjects'),
    _createGetterSetter8 = _slicedToArray(_createGetterSetter7, 2),
    getSavedObjects = _createGetterSetter8[0],
    setSavedObjects = _createGetterSetter8[1];

exports.setSavedObjects = setSavedObjects;
exports.getSavedObjects = getSavedObjects;

var _createGetterSetter9 = (0, _public.createGetterSetter)('InjectedVars'),
    _createGetterSetter10 = _slicedToArray(_createGetterSetter9, 2),
    getInjectedVars = _createGetterSetter10[0],
    setInjectedVars = _createGetterSetter10[1];

exports.setInjectedVars = setInjectedVars;
exports.getInjectedVars = getInjectedVars;

var getEsShardTimeout = function getEsShardTimeout() {
  return getInjectedVars().esShardTimeout;
};

exports.getEsShardTimeout = getEsShardTimeout;

var getEnableExternalUrls = function getEnableExternalUrls() {
  return getInjectedVars().enableExternalUrls;
};

exports.getEnableExternalUrls = getEnableExternalUrls;

var getEmsTileLayerId = function getEmsTileLayerId() {
  return getInjectedVars().emsTileLayerId;
};

exports.getEmsTileLayerId = getEmsTileLayerId;