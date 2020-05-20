"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeScale = computeScale;
exports.AutoScale = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AutoScale =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AutoScale, _React$Component);

  function AutoScale(props) {
    var _this;

    _classCallCheck(this, AutoScale);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AutoScale).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "child", null);

    _defineProperty(_assertThisInitialized(_this), "parent", null);

    _defineProperty(_assertThisInitialized(_this), "scale", void 0);

    _defineProperty(_assertThisInitialized(_this), "setParent", function (el) {
      if (el && _this.parent !== el) {
        _this.parent = el;
        setTimeout(function () {
          return _this.scale();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setChild", function (el) {
      if (el && _this.child !== el) {
        _this.child = el;
        setTimeout(function () {
          return _this.scale();
        });
      }
    });

    _this.scale = _lodash.default.throttle(function () {
      var scale = computeScale(_this.parent, _this.child, _this.props.minScale); // Prevent an infinite render loop

      if (_this.state.scale !== scale) {
        _this.setState({
          scale: scale
        });
      }
    }); // An initial scale of 0 means we always redraw
    // at least once, which is sub-optimal, but it
    // prevents an annoying flicker.

    _this.state = {
      scale: 0
    };
    return _this;
  }

  _createClass(AutoScale, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          minScale = _this$props.minScale,
          rest = _objectWithoutProperties(_this$props, ["children", "minScale"]);

      var scale = this.state.scale;
      var style = this.props.style || {};
      return _react.default.createElement(_eui.EuiResizeObserver, {
        onResize: this.scale
      }, function (resizeRef) {
        return _react.default.createElement("div", _extends({}, rest, {
          ref: function ref(el) {
            _this2.setParent(el);

            resizeRef(el);
          },
          style: _objectSpread({}, style, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
            lineHeight: 1.5
          })
        }), _react.default.createElement("div", {
          ref: _this2.setChild,
          style: {
            transform: "scale(".concat(scale, ")")
          }
        }, children));
      });
    }
  }]);

  return AutoScale;
}(_react.default.Component);

exports.AutoScale = AutoScale;
var MAX_SCALE = 1;
var MIN_SCALE = 0.3;
/**
 * computeScale computes the ratio by which the child needs to shrink in order
 * to fit into the parent. This function is only exported for testing purposes.
 */

function computeScale(parent, child) {
  var minScale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : MIN_SCALE;

  if (!parent || !child) {
    return 1;
  }

  var scaleX = parent.clientWidth / child.clientWidth;
  var scaleY = parent.clientHeight / child.clientHeight;
  return Math.max(Math.min(MAX_SCALE, Math.min(scaleX, scaleY)), minScale);
}