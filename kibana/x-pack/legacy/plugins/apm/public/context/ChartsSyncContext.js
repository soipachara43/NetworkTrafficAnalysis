"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsSyncContextProvider = exports.ChartsSyncContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _url_helpers = require("../components/shared/Links/url_helpers");

var _history = require("../utils/history");

var _useUrlParams2 = require("../hooks/useUrlParams");

var _useFetcher2 = require("../hooks/useFetcher");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ChartsSyncContext = _react.default.createContext(null);

exports.ChartsSyncContext = ChartsSyncContext;

var ChartsSyncContextProvider = function ChartsSyncContextProvider(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      time = _useState2[0],
      setTime = _useState2[1];

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams,
      uiFilters = _useUrlParams.uiFilters;

  var start = urlParams.start,
      end = urlParams.end,
      serviceName = urlParams.serviceName;
  var environment = uiFilters.environment;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (start && end && serviceName) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/annotations',
        params: {
          path: {
            serviceName: serviceName
          },
          query: {
            start: start,
            end: end,
            environment: environment
          }
        }
      });
    }
  }, [start, end, environment, serviceName]),
      _useFetcher$data = _useFetcher.data,
      data = _useFetcher$data === void 0 ? {
    annotations: []
  } : _useFetcher$data;

  var value = (0, _react.useMemo)(function () {
    var hoverXHandlers = {
      onHover: function onHover(hoverX) {
        setTime(hoverX);
      },
      onMouseLeave: function onMouseLeave() {
        setTime(null);
      },
      onSelectionEnd: function onSelectionEnd(range) {
        setTime(null);
        var currentSearch = (0, _url_helpers.toQuery)(_history.history.location.search);
        var nextSearch = {
          rangeFrom: new Date(range.start).toISOString(),
          rangeTo: new Date(range.end).toISOString()
        };

        _history.history.push(_objectSpread({}, _history.history.location, {
          search: (0, _url_helpers.fromQuery)(_objectSpread({}, currentSearch, {}, nextSearch))
        }));
      },
      hoverX: time,
      annotations: data.annotations
    };
    return _objectSpread({}, hoverXHandlers);
  }, [time, data.annotations]);
  return _react.default.createElement(ChartsSyncContext.Provider, {
    value: value,
    children: children
  });
};

exports.ChartsSyncContextProvider = ChartsSyncContextProvider;