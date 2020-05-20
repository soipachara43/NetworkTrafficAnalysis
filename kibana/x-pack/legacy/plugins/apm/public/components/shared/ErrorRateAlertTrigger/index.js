"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorRateAlertTrigger = ErrorRateAlertTrigger;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _public = require("../../../../../../../plugins/triggers_actions_ui/public");

var _alert_types = require("../../../../../../../plugins/apm/common/alert_types");

var _ServiceAlertTrigger = require("../ServiceAlertTrigger");

var _PopoverExpression = require("../ServiceAlertTrigger/PopoverExpression");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ErrorRateAlertTrigger(props) {
  var setAlertParams = props.setAlertParams,
      setAlertProperty = props.setAlertProperty,
      alertParams = props.alertParams;
  var defaults = {
    threshold: 25,
    windowSize: 1,
    windowUnit: 'm'
  };

  var params = _objectSpread({}, defaults, {}, alertParams);

  var threshold = (0, _lodash.isFinite)(params.threshold) ? params.threshold : '';
  var fields = [_react.default.createElement(_PopoverExpression.PopoverExpression, {
    title: _i18n.i18n.translate('xpack.apm.errorRateAlertTrigger.isAbove', {
      defaultMessage: 'is above'
    }),
    value: threshold.toString()
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    value: threshold,
    step: 0,
    onChange: function onChange(e) {
      return setAlertParams('threshold', parseInt(e.target.value, 10));
    },
    compressed: true,
    append: _i18n.i18n.translate('xpack.apm.errorRateAlertTrigger.errors', {
      defaultMessage: 'errors'
    })
  })), _react.default.createElement(_public.ForLastExpression, {
    onChangeWindowSize: function onChangeWindowSize(windowSize) {
      return setAlertParams('windowSize', windowSize || '');
    },
    onChangeWindowUnit: function onChangeWindowUnit(windowUnit) {
      return setAlertParams('windowUnit', windowUnit);
    },
    timeWindowSize: params.windowSize,
    timeWindowUnit: params.windowUnit,
    errors: {
      timeWindowSize: [],
      timeWindowUnit: []
    }
  })];
  return _react.default.createElement(_ServiceAlertTrigger.ServiceAlertTrigger, {
    alertTypeName: _alert_types.ALERT_TYPES_CONFIG['apm.error_rate'].name,
    defaults: defaults,
    fields: fields,
    setAlertParams: setAlertParams,
    setAlertProperty: setAlertProperty
  });
}