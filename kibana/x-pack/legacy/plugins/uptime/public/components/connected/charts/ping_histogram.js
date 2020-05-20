"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PingHistogram = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _ping_histogram = require("../../functional/charts/ping_histogram");

var _actions = require("../../../state/actions");

var _selectors = require("../../../state/selectors");

var _higher_order = require("../../higher_order");

var _hooks = require("../../../hooks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PingHistogramContainer = function PingHistogramContainer(_ref) {
  var data = _ref.data,
      loadData = _ref.loadData,
      monitorId = _ref.monitorId,
      lastRefresh = _ref.lastRefresh,
      height = _ref.height,
      loading = _ref.loading,
      esKuery = _ref.esKuery;

  var _useUrlParams = (0, _hooks.useUrlParams)(),
      _useUrlParams2 = _slicedToArray(_useUrlParams, 1),
      getUrlParams = _useUrlParams2[0];

  var _getUrlParams = getUrlParams(),
      absoluteDateRangeStart = _getUrlParams.absoluteDateRangeStart,
      absoluteDateRangeEnd = _getUrlParams.absoluteDateRangeEnd,
      dateStart = _getUrlParams.dateRangeStart,
      dateEnd = _getUrlParams.dateRangeEnd,
      statusFilter = _getUrlParams.statusFilter;

  (0, _react.useEffect)(function () {
    loadData({
      monitorId: monitorId,
      dateStart: dateStart,
      dateEnd: dateEnd,
      statusFilter: statusFilter,
      filters: esKuery
    });
  }, [loadData, dateStart, dateEnd, monitorId, statusFilter, lastRefresh, esKuery]);
  return _react.default.createElement(_ping_histogram.PingHistogramComponent, {
    data: data,
    absoluteStartDate: absoluteDateRangeStart,
    absoluteEndDate: absoluteDateRangeEnd,
    height: height,
    loading: loading
  });
};

var mapStateToProps = function mapStateToProps(state) {
  return _objectSpread({}, (0, _selectors.selectPingHistogram)(state));
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    loadData: function loadData(params) {
      return dispatch((0, _actions.getPingHistogram)(params));
    }
  };
};

var PingHistogram = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)((0, _higher_order.withResponsiveWrapper)(PingHistogramContainer));
exports.PingHistogram = PingHistogram;