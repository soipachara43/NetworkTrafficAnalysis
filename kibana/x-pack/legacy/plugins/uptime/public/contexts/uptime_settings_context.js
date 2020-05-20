"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UptimeSettingsContextProvider = exports.UptimeSettingsContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _constants = require("../../common/constants");

var _hooks = require("../hooks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var BASE_PATH = _constants.CONTEXT_DEFAULTS.BASE_PATH;
var DATE_RANGE_START = _constants.CLIENT_DEFAULTS.DATE_RANGE_START,
    DATE_RANGE_END = _constants.CLIENT_DEFAULTS.DATE_RANGE_END;
/**
 * These are default values for the context. These defaults are typically
 * overwritten by the Uptime App upon its invocation.
 */

var defaultContext = {
  basePath: BASE_PATH,
  dateRangeStart: DATE_RANGE_START,
  dateRangeEnd: DATE_RANGE_END,
  isApmAvailable: true,
  isInfraAvailable: true,
  isLogsAvailable: true
};
var UptimeSettingsContext = (0, _react.createContext)(defaultContext);
exports.UptimeSettingsContext = UptimeSettingsContext;

var UptimeSettingsContextProvider = function UptimeSettingsContextProvider(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  var basePath = props.basePath,
      isApmAvailable = props.isApmAvailable,
      isInfraAvailable = props.isInfraAvailable,
      isLogsAvailable = props.isLogsAvailable,
      commonlyUsedRanges = props.commonlyUsedRanges,
      plugins = props.plugins;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 1),
      getUrlParams = _useUrlParams2[0];

  var _getUrlParams = getUrlParams(),
      dateRangeStart = _getUrlParams.dateRangeStart,
      dateRangeEnd = _getUrlParams.dateRangeEnd;

  var license = null; // @ts-ignore

  plugins.licensing.license$.subscribe(function (licenseItem) {
    license = licenseItem;
  });
  var value = (0, _react.useMemo)(function () {
    return {
      license: license,
      basePath: basePath,
      isApmAvailable: isApmAvailable,
      isInfraAvailable: isInfraAvailable,
      isLogsAvailable: isLogsAvailable,
      commonlyUsedRanges: commonlyUsedRanges,
      dateRangeStart: dateRangeStart !== null && dateRangeStart !== void 0 ? dateRangeStart : DATE_RANGE_START,
      dateRangeEnd: dateRangeEnd !== null && dateRangeEnd !== void 0 ? dateRangeEnd : DATE_RANGE_END
    };
  }, [license, basePath, isApmAvailable, isInfraAvailable, isLogsAvailable, dateRangeStart, dateRangeEnd, commonlyUsedRanges]);
  return _react.default.createElement(UptimeSettingsContext.Provider, {
    value: value,
    children: children
  });
};

exports.UptimeSettingsContextProvider = UptimeSettingsContextProvider;