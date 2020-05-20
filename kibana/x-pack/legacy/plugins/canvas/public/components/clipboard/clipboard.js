"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clipboard = void 0;

var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

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

var Clipboard =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Clipboard, _React$PureComponent);

  function Clipboard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Clipboard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Clipboard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onClick", function (ev) {
      var _this$props = _this.props,
          content = _this$props.content,
          onCopy = _this$props.onCopy;
      ev.preventDefault();
      onCopy((0, _copyToClipboard.default)(content.toString(), {
        debug: true
      }));
    });

    return _this;
  }

  _createClass(Clipboard, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "canvasClipboard",
        onClick: this.onClick,
        onKeyPress: this.onClick,
        role: "button",
        tabIndex: 0
      }, this.props.children);
    }
  }]);

  return Clipboard;
}(_react.default.PureComponent);

exports.Clipboard = Clipboard;

_defineProperty(Clipboard, "propTypes", {
  children: _propTypes.default.element.isRequired,
  content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired,
  onCopy: _propTypes.default.func
});