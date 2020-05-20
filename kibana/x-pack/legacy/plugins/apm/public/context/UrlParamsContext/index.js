"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUiFilters = useUiFilters;
exports.UrlParamsProvider = exports.UrlParamsContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _lodash = require("lodash");

var _helpers = require("./helpers");

var _resolveUrlParams = require("./resolveUrlParams");

var _config = require("../../../../../../plugins/apm/server/lib/ui_filters/local_ui_filters/config");

var _pickKeys = require("../../utils/pickKeys");

var _useDeepObjectIdentity = require("../../hooks/useDeepObjectIdentity");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useUiFilters(params) {
  var kuery = params.kuery,
      environment = params.environment,
      urlParams = _objectWithoutProperties(params, ["kuery", "environment"]);

  var localUiFilters = (0, _lodash.mapValues)(_pickKeys.pickKeys.apply(void 0, [urlParams].concat(_toConsumableArray(_config.localUIFilterNames))), function (val) {
    return val ? val.split(',') : [];
  });
  return (0, _useDeepObjectIdentity.useDeepObjectIdentity)(_objectSpread({
    kuery: kuery,
    environment: environment
  }, localUiFilters));
}

var defaultRefresh = function defaultRefresh(time) {};

var UrlParamsContext = (0, _react.createContext)({
  urlParams: {},
  refreshTimeRange: defaultRefresh,
  uiFilters: {}
});
exports.UrlParamsContext = UrlParamsContext;
var UrlParamsProvider = (0, _reactRouterDom.withRouter)(function (_ref) {
  var location = _ref.location,
      children = _ref.children;
  var refUrlParams = (0, _react.useRef)((0, _resolveUrlParams.resolveUrlParams)(location, {}));
  var _refUrlParams$current = refUrlParams.current,
      start = _refUrlParams$current.start,
      end = _refUrlParams$current.end,
      rangeFrom = _refUrlParams$current.rangeFrom,
      rangeTo = _refUrlParams$current.rangeTo;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      forceUpdate = _useState2[1];

  var urlParams = (0, _react.useMemo)(function () {
    return (0, _resolveUrlParams.resolveUrlParams)(location, {
      start: start,
      end: end,
      rangeFrom: rangeFrom,
      rangeTo: rangeTo
    });
  }, [location, start, end, rangeFrom, rangeTo]);
  refUrlParams.current = urlParams;
  var refreshTimeRange = (0, _react.useCallback)(function (timeRange) {
    refUrlParams.current = _objectSpread({}, refUrlParams.current, {
      start: (0, _helpers.getParsedDate)(timeRange.rangeFrom),
      end: (0, _helpers.getParsedDate)(timeRange.rangeTo, {
        roundUp: true
      })
    });
    forceUpdate((0, _lodash.uniqueId)());
  }, [forceUpdate]);
  var uiFilters = useUiFilters(urlParams);
  var contextValue = (0, _react.useMemo)(function () {
    return {
      urlParams: urlParams,
      refreshTimeRange: refreshTimeRange,
      uiFilters: uiFilters
    };
  }, [urlParams, refreshTimeRange, uiFilters]);
  return _react.default.createElement(UrlParamsContext.Provider, {
    children: children,
    value: contextValue
  });
});
exports.UrlParamsProvider = UrlParamsProvider;