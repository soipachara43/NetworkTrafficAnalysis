"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MockUrlParamsContextProvider = void 0;

var _react = _interopRequireDefault(require("react"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultUrlParams = {
  page: 0,
  serviceName: 'opbeans-python',
  transactionType: 'request',
  start: '2018-01-10T09:51:41.050Z',
  end: '2018-01-10T10:06:41.050Z'
};

var MockUrlParamsContextProvider = function MockUrlParamsContextProvider(_ref) {
  var params = _ref.params,
      children = _ref.children,
      _ref$refreshTimeRange = _ref.refreshTimeRange,
      refreshTimeRange = _ref$refreshTimeRange === void 0 ? function () {
    return undefined;
  } : _ref$refreshTimeRange;

  var urlParams = _objectSpread({}, defaultUrlParams, {}, params);

  return _react.default.createElement(_.UrlParamsContext.Provider, {
    value: {
      urlParams: urlParams,
      refreshTimeRange: refreshTimeRange,
      uiFilters: (0, _.useUiFilters)(urlParams)
    },
    children: children
  });
};

exports.MockUrlParamsContextProvider = MockUrlParamsContextProvider;