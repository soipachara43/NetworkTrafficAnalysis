"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResponseTimeTickFormatter = getResponseTimeTickFormatter;
exports.getResponseTimeTooltipFormatter = getResponseTimeTooltipFormatter;
exports.getMaxY = getMaxY;
exports.TransactionCharts = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n2 = require("../../../../../../../../plugins/apm/common/i18n");

var _formatters = require("../../../../utils/formatters");

var _MLJobLink = require("../../Links/MachineLearningLinks/MLJobLink");

var _LicenseContext = require("../../../../context/LicenseContext");

var _TransactionLineChart = require("./TransactionLineChart");

var _isValidCoordinateValue = require("../../../../utils/isValidCoordinateValue");

var _BrowserLineChart = require("./BrowserLineChart");

var _DurationByCountryMap = require("./DurationByCountryMap");

var _transaction_types = require("../../../../../../../../plugins/apm/common/transaction_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var ShiftedIconWrapper = _styledComponents.default.span.withConfig({
  displayName: "ShiftedIconWrapper",
  componentId: "afb4wy-0"
})(["padding-right:5px;position:relative;top:-1px;display:inline-block;"]);

var ShiftedEuiText = (0, _styledComponents.default)(_eui.EuiText).withConfig({
  displayName: "ShiftedEuiText",
  componentId: "afb4wy-1"
})(["position:relative;top:5px;"]);

function getResponseTimeTickFormatter(formatter) {
  return function (t) {
    return formatter(t).formatted;
  };
}

function getResponseTimeTooltipFormatter(formatter) {
  return function (p) {
    return (0, _isValidCoordinateValue.isValidCoordinateValue)(p.y) ? formatter(p.y).formatted : _i18n2.NOT_AVAILABLE_LABEL;
  };
}

function getMaxY(responseTimeSeries) {
  var coordinates = (0, _lodash.flatten)(responseTimeSeries.map(function (serie) {
    return serie.data;
  }));
  var numbers = coordinates.map(function (c) {
    return c.y ? c.y : 0;
  });
  return Math.max.apply(Math, _toConsumableArray(numbers).concat([0]));
}

var TransactionCharts =
/*#__PURE__*/
function (_Component) {
  _inherits(TransactionCharts, _Component);

  function TransactionCharts() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TransactionCharts);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TransactionCharts)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getTPMFormatter", function (t) {
      var urlParams = _this.props.urlParams;
      var unit = (0, _formatters.tpmUnit)(urlParams.transactionType);
      return "".concat((0, _formatters.asInteger)(t), " ").concat(unit);
    });

    _defineProperty(_assertThisInitialized(_this), "getTPMTooltipFormatter", function (p) {
      return (0, _isValidCoordinateValue.isValidCoordinateValue)(p.y) ? _this.getTPMFormatter(p.y) : _i18n2.NOT_AVAILABLE_LABEL;
    });

    return _this;
  }

  _createClass(TransactionCharts, [{
    key: "renderMLHeader",
    value: function renderMLHeader(hasValidMlLicense) {
      var hasMLJob = this.props.hasMLJob;

      if (!hasValidMlLicense || !hasMLJob) {
        return null;
      }

      var _this$props$urlParams = this.props.urlParams,
          serviceName = _this$props$urlParams.serviceName,
          transactionType = _this$props$urlParams.transactionType,
          kuery = _this$props$urlParams.kuery;

      if (!serviceName) {
        return null;
      }

      var hasKuery = !(0, _lodash.isEmpty)(kuery);
      var icon = hasKuery ? _react.default.createElement(_eui.EuiIconTip, {
        "aria-label": "Warning",
        type: "alert",
        color: "warning",
        content: "The Machine learning results are hidden when the search bar is used for filtering"
      }) : _react.default.createElement(_eui.EuiIconTip, {
        content: _i18n.i18n.translate('xpack.apm.metrics.transactionChart.machineLearningTooltip', {
          defaultMessage: 'The stream around the average duration shows the expected bounds. An annotation is shown for anomaly scores >= 75.'
        })
      });
      return _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(ShiftedEuiText, {
        size: "xs"
      }, _react.default.createElement(ShiftedIconWrapper, null, icon), _react.default.createElement("span", null, _i18n.i18n.translate('xpack.apm.metrics.transactionChart.machineLearningLabel', {
        defaultMessage: 'Machine learning:'
      }), ' '), _react.default.createElement(_MLJobLink.MLJobLink, {
        serviceName: serviceName,
        transactionType: transactionType
      }, "View Job")));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          charts = _this$props.charts,
          urlParams = _this$props.urlParams;
      var responseTimeSeries = charts.responseTimeSeries,
          tpmSeries = charts.tpmSeries;
      var transactionType = urlParams.transactionType;
      var maxY = getMaxY(responseTimeSeries);
      var formatter = (0, _formatters.getDurationFormatter)(maxY);
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGrid, {
        columns: 2,
        gutterSize: "s"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        "data-cy": "transaction-duration-charts"
      }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
        justifyContent: "spaceBetween"
      }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react.default.createElement("span", null, responseTimeLabel(transactionType)))), _react.default.createElement(_LicenseContext.LicenseContext.Consumer, null, function (license) {
        return _this2.renderMLHeader(license === null || license === void 0 ? void 0 : license.getFeature('ml').isAvailable);
      })), _react.default.createElement(_TransactionLineChart.TransactionLineChart, {
        series: responseTimeSeries,
        tickFormatY: getResponseTimeTickFormatter(formatter),
        formatTooltipValue: getResponseTimeTooltipFormatter(formatter)
      })))), _react.default.createElement(_eui.EuiFlexItem, {
        style: {
          flexShrink: 1
        }
      }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react.default.createElement("span", null, tpmLabel(transactionType))), _react.default.createElement(_TransactionLineChart.TransactionLineChart, {
        series: tpmSeries,
        tickFormatY: this.getTPMFormatter,
        formatTooltipValue: this.getTPMTooltipFormatter,
        truncateLegends: true
      }))))), transactionType === _transaction_types.TRANSACTION_PAGE_LOAD && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_eui.EuiFlexGrid, {
        columns: 2,
        gutterSize: "s"
      }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_DurationByCountryMap.DurationByCountryMap, null))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_BrowserLineChart.BrowserLineChart, null))))));
    }
  }]);

  return TransactionCharts;
}(_react.Component);

exports.TransactionCharts = TransactionCharts;

function tpmLabel(type) {
  return type === _transaction_types.TRANSACTION_REQUEST ? _i18n.i18n.translate('xpack.apm.metrics.transactionChart.requestsPerMinuteLabel', {
    defaultMessage: 'Requests per minute'
  }) : _i18n.i18n.translate('xpack.apm.metrics.transactionChart.transactionsPerMinuteLabel', {
    defaultMessage: 'Transactions per minute'
  });
}

function responseTimeLabel(type) {
  switch (type) {
    case _transaction_types.TRANSACTION_PAGE_LOAD:
      return _i18n.i18n.translate('xpack.apm.metrics.transactionChart.pageLoadTimesLabel', {
        defaultMessage: 'Page load times'
      });

    case _transaction_types.TRANSACTION_ROUTE_CHANGE:
      return _i18n.i18n.translate('xpack.apm.metrics.transactionChart.routeChangeTimesLabel', {
        defaultMessage: 'Route change times'
      });

    default:
      return _i18n.i18n.translate('xpack.apm.metrics.transactionChart.transactionDurationLabel', {
        defaultMessage: 'Transaction duration'
      });
  }
}