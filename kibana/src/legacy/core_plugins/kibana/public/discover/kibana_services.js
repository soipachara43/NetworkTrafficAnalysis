"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAngularModule = setAngularModule;
exports.getAngularModule = getAngularModule;
exports.getServices = getServices;
exports.setServices = setServices;
Object.defineProperty(exports, "angular", {
  enumerable: true,
  get: function get() {
    return _angular.default;
  }
});
Object.defineProperty(exports, "unhashUrl", {
  enumerable: true,
  get: function get() {
    return _public.unhashUrl;
  }
});
Object.defineProperty(exports, "redirectWhenMissing", {
  enumerable: true,
  get: function get() {
    return _public.redirectWhenMissing;
  }
});
Object.defineProperty(exports, "ensureDefaultIndexPattern", {
  enumerable: true,
  get: function get() {
    return _public.ensureDefaultIndexPattern;
  }
});
Object.defineProperty(exports, "IndexPatternsContract", {
  enumerable: true,
  get: function get() {
    return _public2.IndexPatternsContract;
  }
});
Object.defineProperty(exports, "IIndexPattern", {
  enumerable: true,
  get: function get() {
    return _public2.IIndexPattern;
  }
});
Object.defineProperty(exports, "IndexPattern", {
  enumerable: true,
  get: function get() {
    return _public2.IndexPattern;
  }
});
Object.defineProperty(exports, "indexPatterns", {
  enumerable: true,
  get: function get() {
    return _public2.indexPatterns;
  }
});
Object.defineProperty(exports, "IFieldType", {
  enumerable: true,
  get: function get() {
    return _public2.IFieldType;
  }
});
Object.defineProperty(exports, "SearchSource", {
  enumerable: true,
  get: function get() {
    return _public2.SearchSource;
  }
});
Object.defineProperty(exports, "ISearchSource", {
  enumerable: true,
  get: function get() {
    return _public2.ISearchSource;
  }
});
Object.defineProperty(exports, "EsQuerySortValue", {
  enumerable: true,
  get: function get() {
    return _public2.EsQuerySortValue;
  }
});
Object.defineProperty(exports, "SortDirection", {
  enumerable: true,
  get: function get() {
    return _public2.SortDirection;
  }
});
Object.defineProperty(exports, "wrapInI18nContext", {
  enumerable: true,
  get: function get() {
    return _i18n.wrapInI18nContext;
  }
});
Object.defineProperty(exports, "formatMsg", {
  enumerable: true,
  get: function get() {
    return _public3.formatMsg;
  }
});
Object.defineProperty(exports, "formatStack", {
  enumerable: true,
  get: function get() {
    return _public3.formatStack;
  }
});
Object.defineProperty(exports, "subscribeWithScope", {
  enumerable: true,
  get: function get() {
    return _public3.subscribeWithScope;
  }
});
Object.defineProperty(exports, "getFormat", {
  enumerable: true,
  get: function get() {
    return _utilities.getFormat;
  }
});
Object.defineProperty(exports, "buildPointSeriesData", {
  enumerable: true,
  get: function get() {
    return _point_series.buildPointSeriesData;
  }
});
exports.tabifyAggResponse = exports.getResponseInspectorStats = exports.getRequestInspectorStats = exports.setUrlTracker = exports.getUrlTracker = void 0;

var _angular = _interopRequireDefault(require("angular"));

var _public = require("../../../../../plugins/kibana_utils/public");

var _public2 = require("../../../../../plugins/data/public");

var _i18n = require("ui/i18n");

var _public3 = require("../../../../../plugins/kibana_legacy/public");

var _utilities = require("ui/visualize/loader/pipeline_helpers/utilities");

var _point_series = require("ui/agg_response/point_series/point_series");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var angularModule = null;
var services = null;
/**
 * set bootstrapped inner angular module
 */

function setAngularModule(module) {
  angularModule = module;
}
/**
 * get boostrapped inner angular module
 */


function getAngularModule() {
  return angularModule;
}

function getServices() {
  if (!services) {
    throw new Error('Discover services are not yet available');
  }

  return services;
}

function setServices(newServices) {
  services = newServices;
}

var _createGetterSetter = (0, _public.createGetterSetter)('urlTracker'),
    _createGetterSetter2 = _slicedToArray(_createGetterSetter, 2),
    getUrlTracker = _createGetterSetter2[0],
    setUrlTracker = _createGetterSetter2[1]; // EXPORT legacy static dependencies, should be migrated when available in a new version;


exports.setUrlTracker = setUrlTracker;
exports.getUrlTracker = getUrlTracker;
var getRequestInspectorStats = _public2.search.getRequestInspectorStats,
    getResponseInspectorStats = _public2.search.getResponseInspectorStats,
    tabifyAggResponse = _public2.search.tabifyAggResponse;
exports.tabifyAggResponse = tabifyAggResponse;
exports.getResponseInspectorStats = getResponseInspectorStats;
exports.getRequestInspectorStats = getRequestInspectorStats;