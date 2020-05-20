"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setApplication = exports.getApplication = exports.setChrome = exports.getChrome = exports.setOverlays = exports.getOverlays = exports.setAggs = exports.getAggs = exports.setSavedVisualizationsLoader = exports.getSavedVisualizationsLoader = exports.setUiActions = exports.getUiActions = exports.setExpressions = exports.getExpressions = exports.setUsageCollector = exports.getUsageCollector = exports.setIndexPatterns = exports.getIndexPatterns = exports.setTimeFilter = exports.getTimeFilter = exports.setFilterManager = exports.getFilterManager = exports.setI18n = exports.getI18n = exports.setTypes = exports.getTypes = exports.setSavedObjects = exports.getSavedObjects = exports.setHttp = exports.getHttp = exports.setCapabilities = exports.getCapabilities = exports.setUISettings = exports.getUISettings = void 0;

var _public = require("../../../../../../plugins/kibana_utils/public");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _createGetterSetter = (0, _public.createGetterSetter)('UISettings'),
    _createGetterSetter2 = _slicedToArray(_createGetterSetter, 2),
    getUISettings = _createGetterSetter2[0],
    setUISettings = _createGetterSetter2[1];

exports.setUISettings = setUISettings;
exports.getUISettings = getUISettings;

var _createGetterSetter3 = (0, _public.createGetterSetter)('Capabilities'),
    _createGetterSetter4 = _slicedToArray(_createGetterSetter3, 2),
    getCapabilities = _createGetterSetter4[0],
    setCapabilities = _createGetterSetter4[1];

exports.setCapabilities = setCapabilities;
exports.getCapabilities = getCapabilities;

var _createGetterSetter5 = (0, _public.createGetterSetter)('Http'),
    _createGetterSetter6 = _slicedToArray(_createGetterSetter5, 2),
    getHttp = _createGetterSetter6[0],
    setHttp = _createGetterSetter6[1];

exports.setHttp = setHttp;
exports.getHttp = getHttp;

var _createGetterSetter7 = (0, _public.createGetterSetter)('SavedObjects'),
    _createGetterSetter8 = _slicedToArray(_createGetterSetter7, 2),
    getSavedObjects = _createGetterSetter8[0],
    setSavedObjects = _createGetterSetter8[1];

exports.setSavedObjects = setSavedObjects;
exports.getSavedObjects = getSavedObjects;

var _createGetterSetter9 = (0, _public.createGetterSetter)('Types'),
    _createGetterSetter10 = _slicedToArray(_createGetterSetter9, 2),
    getTypes = _createGetterSetter10[0],
    setTypes = _createGetterSetter10[1];

exports.setTypes = setTypes;
exports.getTypes = getTypes;

var _createGetterSetter11 = (0, _public.createGetterSetter)('I18n'),
    _createGetterSetter12 = _slicedToArray(_createGetterSetter11, 2),
    getI18n = _createGetterSetter12[0],
    setI18n = _createGetterSetter12[1];

exports.setI18n = setI18n;
exports.getI18n = getI18n;

var _createGetterSetter13 = (0, _public.createGetterSetter)('FilterManager'),
    _createGetterSetter14 = _slicedToArray(_createGetterSetter13, 2),
    getFilterManager = _createGetterSetter14[0],
    setFilterManager = _createGetterSetter14[1];

exports.setFilterManager = setFilterManager;
exports.getFilterManager = getFilterManager;

var _createGetterSetter15 = (0, _public.createGetterSetter)('TimeFilter'),
    _createGetterSetter16 = _slicedToArray(_createGetterSetter15, 2),
    getTimeFilter = _createGetterSetter16[0],
    setTimeFilter = _createGetterSetter16[1];

exports.setTimeFilter = setTimeFilter;
exports.getTimeFilter = getTimeFilter;

var _createGetterSetter17 = (0, _public.createGetterSetter)('IndexPatterns'),
    _createGetterSetter18 = _slicedToArray(_createGetterSetter17, 2),
    getIndexPatterns = _createGetterSetter18[0],
    setIndexPatterns = _createGetterSetter18[1];

exports.setIndexPatterns = setIndexPatterns;
exports.getIndexPatterns = getIndexPatterns;

var _createGetterSetter19 = (0, _public.createGetterSetter)('UsageCollection'),
    _createGetterSetter20 = _slicedToArray(_createGetterSetter19, 2),
    getUsageCollector = _createGetterSetter20[0],
    setUsageCollector = _createGetterSetter20[1];

exports.setUsageCollector = setUsageCollector;
exports.getUsageCollector = getUsageCollector;

var _createGetterSetter21 = (0, _public.createGetterSetter)('Expressions'),
    _createGetterSetter22 = _slicedToArray(_createGetterSetter21, 2),
    getExpressions = _createGetterSetter22[0],
    setExpressions = _createGetterSetter22[1];

exports.setExpressions = setExpressions;
exports.getExpressions = getExpressions;

var _createGetterSetter23 = (0, _public.createGetterSetter)('UiActions'),
    _createGetterSetter24 = _slicedToArray(_createGetterSetter23, 2),
    getUiActions = _createGetterSetter24[0],
    setUiActions = _createGetterSetter24[1];

exports.setUiActions = setUiActions;
exports.getUiActions = getUiActions;

var _createGetterSetter25 = (0, _public.createGetterSetter)('SavedVisualisationsLoader'),
    _createGetterSetter26 = _slicedToArray(_createGetterSetter25, 2),
    getSavedVisualizationsLoader = _createGetterSetter26[0],
    setSavedVisualizationsLoader = _createGetterSetter26[1];

exports.setSavedVisualizationsLoader = setSavedVisualizationsLoader;
exports.getSavedVisualizationsLoader = getSavedVisualizationsLoader;

var _createGetterSetter27 = (0, _public.createGetterSetter)('AggConfigs'),
    _createGetterSetter28 = _slicedToArray(_createGetterSetter27, 2),
    getAggs = _createGetterSetter28[0],
    setAggs = _createGetterSetter28[1];

exports.setAggs = setAggs;
exports.getAggs = getAggs;

var _createGetterSetter29 = (0, _public.createGetterSetter)('Overlays'),
    _createGetterSetter30 = _slicedToArray(_createGetterSetter29, 2),
    getOverlays = _createGetterSetter30[0],
    setOverlays = _createGetterSetter30[1];

exports.setOverlays = setOverlays;
exports.getOverlays = getOverlays;

var _createGetterSetter31 = (0, _public.createGetterSetter)('Chrome'),
    _createGetterSetter32 = _slicedToArray(_createGetterSetter31, 2),
    getChrome = _createGetterSetter32[0],
    setChrome = _createGetterSetter32[1];

exports.setChrome = setChrome;
exports.getChrome = getChrome;

var _createGetterSetter33 = (0, _public.createGetterSetter)('Application'),
    _createGetterSetter34 = _slicedToArray(_createGetterSetter33, 2),
    getApplication = _createGetterSetter34[0],
    setApplication = _createGetterSetter34[1];

exports.setApplication = setApplication;
exports.getApplication = getApplication;