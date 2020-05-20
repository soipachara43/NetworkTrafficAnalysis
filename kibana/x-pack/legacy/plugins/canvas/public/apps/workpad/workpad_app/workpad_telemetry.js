"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withElementsLoadedTelemetry = exports.withUnconnectedElementsLoadedTelemetry = exports.WorkpadLoadedWithErrorsMetric = exports.WorkpadLoadedMetric = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _ui_metric = require("../../../lib/ui_metric");

var _workpad = require("../../../state/selectors/workpad");

var _resolved_args = require("../../../state/selectors/resolved_args");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var WorkpadLoadedMetric = 'workpad-loaded';
exports.WorkpadLoadedMetric = WorkpadLoadedMetric;
var WorkpadLoadedWithErrorsMetric = 'workpad-loaded-with-errors';
exports.WorkpadLoadedWithErrorsMetric = WorkpadLoadedWithErrorsMetric;

var mapStateToProps = function mapStateToProps(state) {
  return {
    telemetryElementCounts: (0, _workpad.getElementCounts)(state),
    telemetryResolvedArgs: (0, _resolved_args.getArgs)(state)
  };
}; // TODO: Build out full workpad types

/**
  Individual Page of a Workpad
 */


function areAllElementsInResolvedArgs(workpad, resolvedArgs) {
  var resolvedArgsElements = Object.keys(resolvedArgs);
  var workpadElements = workpad.pages.reduce(function (reduction, page) {
    return [].concat(_toConsumableArray(reduction), _toConsumableArray(page.elements.map(function (element) {
      return element.id;
    })));
  }, []);
  return workpadElements.every(function (element) {
    return resolvedArgsElements.includes(element);
  });
}

var withUnconnectedElementsLoadedTelemetry = function withUnconnectedElementsLoadedTelemetry(Component) {
  var trackMetric = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ui_metric.trackCanvasUiMetric;
  return function ElementsLoadedTelemetry(props) {
    var telemetryElementCounts = props.telemetryElementCounts,
        workpad = props.workpad,
        telemetryResolvedArgs = props.telemetryResolvedArgs,
        other = _objectWithoutProperties(props, ["telemetryElementCounts", "workpad", "telemetryResolvedArgs"]);

    var _useState = (0, _react.useState)(undefined),
        _useState2 = _slicedToArray(_useState, 2),
        currentWorkpadId = _useState2[0],
        setWorkpadId = _useState2[1];

    var _useState3 = (0, _react.useState)(false),
        _useState4 = _slicedToArray(_useState3, 2),
        hasReported = _useState4[0],
        setHasReported = _useState4[1];

    (0, _react.useEffect)(function () {
      var resolvedArgsAreForWorkpad = areAllElementsInResolvedArgs(workpad, telemetryResolvedArgs);

      if (workpad.id !== currentWorkpadId) {
        setWorkpadId(workpad.id);
        var workpadElementCount = workpad.pages.reduce(function (reduction, page) {
          return reduction + page.elements.length;
        }, 0);

        if (workpadElementCount === 0 || resolvedArgsAreForWorkpad && telemetryElementCounts.pending === 0) {
          setHasReported(true);
        } else {
          setHasReported(false);
        }
      } else if (!hasReported && telemetryElementCounts.pending === 0 && resolvedArgsAreForWorkpad) {
        if (telemetryElementCounts.error > 0) {
          trackMetric(_ui_metric.METRIC_TYPE.LOADED, [WorkpadLoadedMetric, WorkpadLoadedWithErrorsMetric]);
        } else {
          trackMetric(_ui_metric.METRIC_TYPE.LOADED, WorkpadLoadedMetric);
        }

        setHasReported(true);
      }
    });
    return _react.default.createElement(Component, _extends({}, other, {
      workpad: workpad
    }));
  };
};

exports.withUnconnectedElementsLoadedTelemetry = withUnconnectedElementsLoadedTelemetry;
var connector = (0, _reactRedux.connect)(mapStateToProps, {});

var withElementsLoadedTelemetry = function withElementsLoadedTelemetry(Component) {
  var telemetry = withUnconnectedElementsLoadedTelemetry(Component);
  return connector(telemetry);
};

exports.withElementsLoadedTelemetry = withElementsLoadedTelemetry;