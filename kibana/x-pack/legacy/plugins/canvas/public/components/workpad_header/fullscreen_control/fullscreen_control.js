"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullscreenControl = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactShortcuts = require("react-shortcuts");

var _is_text_input = require("../../../lib/is_text_input");

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

var FullscreenControl =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(FullscreenControl, _React$PureComponent);

  function FullscreenControl() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FullscreenControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FullscreenControl)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_toggleFullscreen", function () {
      var _this$props = _this.props,
          setFullscreen = _this$props.setFullscreen,
          isFullscreen = _this$props.isFullscreen;
      setFullscreen(!isFullscreen);
    });

    _defineProperty(_assertThisInitialized(_this), "_keyMap", {
      REFRESH: _this.props.fetchAllRenderables,
      PREV: _this.props.previousPage,
      NEXT: _this.props.nextPage,
      FULLSCREEN: _this._toggleFullscreen,
      FULLSCREEN_EXIT: _this._toggleFullscreen,
      PAGE_CYCLE_TOGGLE: function PAGE_CYCLE_TOGGLE() {
        return _this.props.enableAutoplay(!_this.props.autoplayEnabled);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_keyHandler", function (action, event) {
      if (Object.keys(_this._keyMap).indexOf(action) < 0) {
        return;
      }

      if (!(0, _is_text_input.isTextInput)(event.target) && typeof _this._keyMap[action] === 'function') {
        event.preventDefault();

        _this._keyMap[action]();
      }
    });

    return _this;
  }

  _createClass(FullscreenControl, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          isFullscreen = _this$props2.isFullscreen;
      return _react.default.createElement("span", null, isFullscreen && _react.default.createElement(_reactShortcuts.Shortcuts, {
        name: "PRESENTATION",
        handler: this._keyHandler,
        targetNodeSelector: "body",
        global: true,
        isolate: true
      }), children({
        isFullscreen: isFullscreen,
        toggleFullscreen: this._toggleFullscreen
      }));
    }
  }]);

  return FullscreenControl;
}(_react.default.PureComponent);

exports.FullscreenControl = FullscreenControl;

_defineProperty(FullscreenControl, "propTypes", {
  setFullscreen: _propTypes.default.func.isRequired,
  isFullscreen: _propTypes.default.bool.isRequired,
  children: _propTypes.default.func.isRequired
});