"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSignalInfo = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _use_query = require("../../../../containers/detection_engine/signals/use_query");

var _query = require("./query.dsl");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSignalInfo = function useSignalInfo(_ref) {
  var _ref$ruleId = _ref.ruleId,
      ruleId = _ref$ruleId === void 0 ? null : _ref$ruleId;

  var _useState = (0, _react2.useState)(_react2.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  })),
      _useState2 = _slicedToArray(_useState, 2),
      lastSignals = _useState2[0],
      setLastSignals = _useState2[1];

  var _useState3 = (0, _react2.useState)(_react2.default.createElement(_eui.EuiLoadingSpinner, {
    size: "m"
  })),
      _useState4 = _slicedToArray(_useState3, 2),
      totalSignals = _useState4[0],
      setTotalSignals = _useState4[1];

  var _useQuerySignals = (0, _use_query.useQuerySignals)((0, _query.buildLastSignalsQuery)(ruleId)),
      loading = _useQuerySignals.loading,
      signals = _useQuerySignals.data;

  (0, _react2.useEffect)(function () {
    if (signals != null) {
      var _mySignals$aggregatio, _ref2, _mySignals$aggregatio2;

      var mySignals = signals;
      setLastSignals(((_mySignals$aggregatio = mySignals.aggregations) === null || _mySignals$aggregatio === void 0 ? void 0 : _mySignals$aggregatio.lastSeen.value) != null ? _react2.default.createElement(_react.FormattedRelative, {
        value: new Date((_ref2 = (_mySignals$aggregatio2 = mySignals.aggregations) === null || _mySignals$aggregatio2 === void 0 ? void 0 : _mySignals$aggregatio2.lastSeen.value_as_string) !== null && _ref2 !== void 0 ? _ref2 : '')
      }) : null);
      setTotalSignals(_react2.default.createElement(_react2.default.Fragment, null, mySignals.hits.total.value));
    } else {
      setLastSignals(null);
      setTotalSignals(null);
    }
  }, [loading, signals]);
  return [lastSignals, totalSignals];
};

exports.useSignalInfo = useSignalInfo;