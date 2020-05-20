"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionTypeFilter = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _useUrlParams2 = require("../../../../hooks/useUrlParams");

var _history = require("../../../../utils/history");

var _url_helpers = require("../../Links/url_helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TransactionTypeFilter = function TransactionTypeFilter(_ref) {
  var transactionTypes = _ref.transactionTypes;

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      transactionType = _useUrlParams.urlParams.transactionType;

  var options = transactionTypes.map(function (type) {
    return {
      text: type,
      value: type
    };
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs",
    textTransform: "uppercase"
  }, _react.default.createElement("h4", null, _i18n.i18n.translate('xpack.apm.localFilters.titles.transactionType', {
    defaultMessage: 'Transaction type'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "none"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiSelect, {
    options: options,
    value: transactionType,
    compressed: true,
    onChange: function onChange(event) {
      var newLocation = _objectSpread({}, _history.history.location, {
        search: (0, _url_helpers.fromQuery)(_objectSpread({}, (0, _url_helpers.toQuery)(_history.history.location.search), {
          transactionType: event.target.value
        }))
      });

      _history.history.push(newLocation);
    }
  }));
};

exports.TransactionTypeFilter = TransactionTypeFilter;