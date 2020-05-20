"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSearchService = exports.getSearchService = exports.setInjectedMetadata = exports.getInjectedMetadata = exports.setQueryService = exports.getQueryService = exports.setIndexPatterns = exports.getIndexPatterns = exports.setOverlays = exports.getOverlays = exports.setFieldFormats = exports.getFieldFormats = exports.setHttp = exports.getHttp = exports.setUiSettings = exports.getUiSettings = exports.setNotifications = exports.getNotifications = void 0;

var _public = require("../../kibana_utils/public");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _createGetterSetter = (0, _public.createGetterSetter)('Notifications'),
    _createGetterSetter2 = _slicedToArray(_createGetterSetter, 2),
    getNotifications = _createGetterSetter2[0],
    setNotifications = _createGetterSetter2[1];

exports.setNotifications = setNotifications;
exports.getNotifications = getNotifications;

var _createGetterSetter3 = (0, _public.createGetterSetter)('UiSettings'),
    _createGetterSetter4 = _slicedToArray(_createGetterSetter3, 2),
    getUiSettings = _createGetterSetter4[0],
    setUiSettings = _createGetterSetter4[1];

exports.setUiSettings = setUiSettings;
exports.getUiSettings = getUiSettings;

var _createGetterSetter5 = (0, _public.createGetterSetter)('Http'),
    _createGetterSetter6 = _slicedToArray(_createGetterSetter5, 2),
    getHttp = _createGetterSetter6[0],
    setHttp = _createGetterSetter6[1];

exports.setHttp = setHttp;
exports.getHttp = getHttp;

var _createGetterSetter7 = (0, _public.createGetterSetter)('FieldFormats'),
    _createGetterSetter8 = _slicedToArray(_createGetterSetter7, 2),
    getFieldFormats = _createGetterSetter8[0],
    setFieldFormats = _createGetterSetter8[1];

exports.setFieldFormats = setFieldFormats;
exports.getFieldFormats = getFieldFormats;

var _createGetterSetter9 = (0, _public.createGetterSetter)('Overlays'),
    _createGetterSetter10 = _slicedToArray(_createGetterSetter9, 2),
    getOverlays = _createGetterSetter10[0],
    setOverlays = _createGetterSetter10[1];

exports.setOverlays = setOverlays;
exports.getOverlays = getOverlays;

var _createGetterSetter11 = (0, _public.createGetterSetter)('IndexPatterns'),
    _createGetterSetter12 = _slicedToArray(_createGetterSetter11, 2),
    getIndexPatterns = _createGetterSetter12[0],
    setIndexPatterns = _createGetterSetter12[1];

exports.setIndexPatterns = setIndexPatterns;
exports.getIndexPatterns = getIndexPatterns;

var _createGetterSetter13 = (0, _public.createGetterSetter)('Query'),
    _createGetterSetter14 = _slicedToArray(_createGetterSetter13, 2),
    getQueryService = _createGetterSetter14[0],
    setQueryService = _createGetterSetter14[1];

exports.setQueryService = setQueryService;
exports.getQueryService = getQueryService;

var _createGetterSetter15 = (0, _public.createGetterSetter)('InjectedMetadata'),
    _createGetterSetter16 = _slicedToArray(_createGetterSetter15, 2),
    getInjectedMetadata = _createGetterSetter16[0],
    setInjectedMetadata = _createGetterSetter16[1];

exports.setInjectedMetadata = setInjectedMetadata;
exports.getInjectedMetadata = getInjectedMetadata;

var _createGetterSetter17 = (0, _public.createGetterSetter)('Search'),
    _createGetterSetter18 = _slicedToArray(_createGetterSetter17, 2),
    getSearchService = _createGetterSetter18[0],
    setSearchService = _createGetterSetter18[1];

exports.setSearchService = setSearchService;
exports.getSearchService = getSearchService;