"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithOptions = exports.withOptions = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _lib = require("../lib/lib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var euiVisColorPalette = (0, _eui.euiPaletteColorBlind)();
var initialState = {
  options: {
    timerange: {
      interval: '1m',
      to: _moment.default.utc().valueOf(),
      from: _moment.default.utc().subtract(1, 'h').valueOf()
    },
    wafflemap: {
      formatter: _lib.InfraFormatterType.percent,
      formatTemplate: '{{value}}',
      metric: {
        type: 'cpu'
      },
      groupBy: [],
      legend: {
        type: _lib.InfraWaffleMapLegendMode.gradient,
        rules: [{
          value: 0,
          color: '#D3DAE6'
        }, {
          value: 1,
          color: euiVisColorPalette[1]
        }]
      }
    }
  }
};

var withOptions = function withOptions(WrappedComponent) {
  return _react.default.createElement(WithOptions, null, function (args) {
    return _react.default.createElement(WrappedComponent, args);
  });
};

exports.withOptions = withOptions;

var WithOptions =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WithOptions, _React$Component);

  function WithOptions() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WithOptions);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WithOptions)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", initialState);

    return _this;
  }

  _createClass(WithOptions, [{
    key: "render",
    value: function render() {
      return this.props.children(this.state.options);
    }
  }]);

  return WithOptions;
}(_react.default.Component);

exports.WithOptions = WithOptions;