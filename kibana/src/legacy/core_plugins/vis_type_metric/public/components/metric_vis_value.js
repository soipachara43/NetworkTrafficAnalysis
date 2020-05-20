"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricVisValue = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _eui = require("@elastic/eui");

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

var MetricVisValue =
/*#__PURE__*/
function (_Component) {
  _inherits(MetricVisValue, _Component);

  function MetricVisValue() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MetricVisValue);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MetricVisValue)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      if (_this.props.onFilter) {
        _this.props.onFilter(_this.props.metric);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyPress", function (event) {
      if (event.keyCode === _eui.keyCodes.ENTER) {
        _this.onClick();
      }
    });

    return _this;
  }

  _createClass(MetricVisValue, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          fontSize = _this$props.fontSize,
          metric = _this$props.metric,
          onFilter = _this$props.onFilter,
          showLabel = _this$props.showLabel;
      var hasFilter = Boolean(onFilter);
      var metricValueStyle = {
        fontSize: "".concat(fontSize, "pt"),
        color: metric.color
      };
      var containerClassName = (0, _classnames.default)('mtrVis__container', {
        'mtrVis__container--light': metric.lightText,
        'mtrVis__container-isfilterable': hasFilter
      });

      var metricComponent = _react.default.createElement("div", {
        className: containerClassName,
        style: {
          backgroundColor: metric.bgColor
        },
        onClick: hasFilter ? this.onClick : undefined,
        onKeyPress: hasFilter ? this.onKeyPress : undefined,
        tabIndex: hasFilter ? 0 : undefined,
        role: hasFilter ? 'button' : undefined
      }, _react.default.createElement("div", {
        className: "mtrVis__value",
        style: metricValueStyle
        /*
         * Justification for dangerouslySetInnerHTML:
         * This is one of the visualizations which makes use of the HTML field formatters.
         * Since these formatters produce raw HTML, this visualization needs to be able to render them as-is, relying
         * on the field formatter to only produce safe HTML.
         * `metric.value` is set by the MetricVisComponent, so this component must make sure this value never contains
         * any unsafe HTML (e.g. by bypassing the field formatter).
         */
        ,
        dangerouslySetInnerHTML: {
          __html: metric.value
        } // eslint-disable-line react/no-danger

      }), showLabel && _react.default.createElement("div", null, metric.label));

      if (hasFilter) {
        return _react.default.createElement(_eui.EuiKeyboardAccessible, null, metricComponent);
      }

      return metricComponent;
    }
  }]);

  return MetricVisValue;
}(_react.Component);

exports.MetricVisValue = MetricVisValue;