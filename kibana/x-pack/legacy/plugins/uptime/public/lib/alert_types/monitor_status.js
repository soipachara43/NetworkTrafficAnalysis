"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMonitorStatusAlertType = exports.validate = void 0;

var _PathReporter = require("io-ts/lib/PathReporter");

var _react = _interopRequireDefault(require("react"));

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _Either = require("fp-ts/lib/Either");

var _runtime_types = require("../../../common/runtime_types");

var _alerts = require("../../components/connected/alerts");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var validate = function validate(alertParams) {
  var errors = {};

  var decoded = _runtime_types.StatusCheckExecutorParamsType.decode(alertParams);
  /*
   * When the UI initially loads, this validate function is called with an
   * empty set of params, we don't want to type check against that.
   */


  if (!(0, _Either.isRight)(decoded)) {
    errors.typeCheckFailure = 'Provided parameters do not conform to the expected type.';
    errors.typeCheckParsingMessage = _PathReporter.PathReporter.report(decoded);
  }

  if ((0, _Either.isRight)(decoded)) {
    var _DateMath$parse, _DateMath$parse2;

    var _decoded$right = decoded.right,
        numTimes = _decoded$right.numTimes,
        timerange = _decoded$right.timerange;
    var from = timerange.from,
        to = timerange.to;
    var fromAbs = (_DateMath$parse = _datemath.default.parse(from)) === null || _DateMath$parse === void 0 ? void 0 : _DateMath$parse.valueOf();
    var toAbs = (_DateMath$parse2 = _datemath.default.parse(to)) === null || _DateMath$parse2 === void 0 ? void 0 : _DateMath$parse2.valueOf();

    if (!fromAbs || isNaN(fromAbs)) {
      errors.timeRangeStartValueNaN = 'Specified time range `from` is an invalid value';
    }

    if (!toAbs || isNaN(toAbs)) {
      errors.timeRangeEndValueNaN = 'Specified time range `to` is an invalid value';
    } // the default values for this test will pass, we only want to specify an error
    // in the case that `from` is more recent than `to`


    if ((fromAbs !== null && fromAbs !== void 0 ? fromAbs : 0) > (toAbs !== null && toAbs !== void 0 ? toAbs : 1)) {
      errors.invalidTimeRange = 'Time range start cannot exceed time range end';
    }

    if (numTimes < 1) {
      errors.invalidNumTimes = 'Number of alert check down times must be an integer greater than 0';
    }
  }

  return {
    errors: errors
  };
};

exports.validate = validate;

var initMonitorStatusAlertType = function initMonitorStatusAlertType(_ref) {
  var autocomplete = _ref.autocomplete;
  return {
    id: 'xpack.uptime.alerts.monitorStatus',
    name: 'Uptime monitor status',
    iconClass: 'uptimeApp',
    alertParamsExpression: function alertParamsExpression(params) {
      return _react.default.createElement(_alerts.AlertMonitorStatus, _extends({}, params, {
        autocomplete: autocomplete
      }));
    },
    validate: validate,
    defaultActionMessage: "{{context.message}}\nLast triggered at: {{state.lastTriggeredAt}}\n{{context.downMonitorsWithGeo}}"
  };
};

exports.initMonitorStatusAlertType = initMonitorStatusAlertType;