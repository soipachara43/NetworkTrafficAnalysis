"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionDurationAlertTrigger = TransactionDurationAlertTrigger;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../../plugins/triggers_actions_ui/public");

var _alert_types = require("../../../../../../../plugins/apm/common/alert_types");

var _ServiceAlertTrigger = require("../ServiceAlertTrigger");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _useServiceTransactionTypes = require("../../../hooks/useServiceTransactionTypes");

var _PopoverExpression = require("../ServiceAlertTrigger/PopoverExpression");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function TransactionDurationAlertTrigger(props) {
  var _params$threshold;

  var setAlertParams = props.setAlertParams,
      alertParams = props.alertParams,
      setAlertProperty = props.setAlertProperty;

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var transactionTypes = (0, _useServiceTransactionTypes.useServiceTransactionTypes)(urlParams);

  if (!transactionTypes.length) {
    return null;
  }

  var defaults = {
    threshold: 1500,
    aggregationType: 'avg',
    windowSize: 5,
    windowUnit: 'm',
    transactionType: transactionTypes[0]
  };

  var params = _objectSpread({}, defaults, {}, alertParams);

  var fields = [_react.default.createElement(_PopoverExpression.PopoverExpression, {
    value: params.transactionType,
    title: _i18n.i18n.translate('xpack.apm.transactionDurationAlertTrigger.type', {
      defaultMessage: 'Type'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    value: params.transactionType,
    options: transactionTypes.map(function (key) {
      return {
        text: key,
        value: key
      };
    }),
    onChange: function onChange(e) {
      return setAlertParams('transactionType', e.target.value);
    },
    compressed: true
  })), _react.default.createElement(_PopoverExpression.PopoverExpression, {
    value: params.aggregationType,
    title: _i18n.i18n.translate('xpack.apm.transactionDurationAlertTrigger.when', {
      defaultMessage: 'When'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    value: params.aggregationType,
    options: (0, _lodash.map)(_alert_types.TRANSACTION_ALERT_AGGREGATION_TYPES, function (label, key) {
      return {
        text: label,
        value: key
      };
    }),
    onChange: function onChange(e) {
      return setAlertParams('aggregationType', e.target.value);
    },
    compressed: true
  })), _react.default.createElement(_PopoverExpression.PopoverExpression, {
    value: params.threshold ? "".concat(params.threshold, "ms") : '',
    title: _i18n.i18n.translate('xpack.apm.transactionDurationAlertTrigger.isAbove', {
      defaultMessage: 'is above'
    })
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    value: (_params$threshold = params.threshold) !== null && _params$threshold !== void 0 ? _params$threshold : '',
    onChange: function onChange(e) {
      return setAlertParams('threshold', e.target.value);
    },
    append: _i18n.i18n.translate('xpack.apm.transactionDurationAlertTrigger.ms', {
      defaultMessage: 'ms'
    }),
    compressed: true
  })), _react.default.createElement(_public.ForLastExpression, {
    onChangeWindowSize: function onChangeWindowSize(timeWindowSize) {
      return setAlertParams('windowSize', timeWindowSize || '');
    },
    onChangeWindowUnit: function onChangeWindowUnit(timeWindowUnit) {
      return setAlertParams('windowUnit', timeWindowUnit);
    },
    timeWindowSize: params.windowSize,
    timeWindowUnit: params.windowUnit,
    errors: {
      timeWindowSize: [],
      timeWindowUnit: []
    }
  })];
  return _react.default.createElement(_ServiceAlertTrigger.ServiceAlertTrigger, {
    alertTypeName: _alert_types.ALERT_TYPES_CONFIG['apm.transaction_duration'].name,
    fields: fields,
    defaults: defaults,
    setAlertParams: setAlertParams,
    setAlertProperty: setAlertProperty
  });
}