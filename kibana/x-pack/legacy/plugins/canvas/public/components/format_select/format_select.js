"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormatSelect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var FormatSelect =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(FormatSelect, _PureComponent);

  function FormatSelect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FormatSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormatSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isCustomFormat: !_this.props.formatOptions.map(function (_ref) {
        var value = _ref.value;
        return value;
      }).includes(_this.props.argValue)
    });

    _defineProperty(_assertThisInitialized(_this), "_options", _this.props.formatOptions.concat({
      value: 'custom',
      text: 'Custom'
    }));

    _defineProperty(_assertThisInitialized(_this), "_handleTextChange", function (ev) {
      return _this.props.onValueChange(ev.target.value);
    });

    _defineProperty(_assertThisInitialized(_this), "_handleSelectChange", function (ev) {
      var _this$props = _this.props,
          onValueChange = _this$props.onValueChange,
          defaultCustomFormat = _this$props.defaultCustomFormat;
      var value = _this._options[ev.target.selectedIndex].value;

      if (value === 'custom') {
        _this.setState({
          isCustomFormat: true
        });

        return onValueChange(defaultCustomFormat);
      }

      if (_this.state.isCustomFormat) {
        _this.setState({
          isCustomFormat: false
        });
      }

      return onValueChange(value);
    });

    return _this;
  }

  _createClass(FormatSelect, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          argId = _this$props2.argId,
          argValue = _this$props2.argValue,
          defaultCustomFormat = _this$props2.defaultCustomFormat;
      var isCustomFormat = this.state.isCustomFormat;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSelect, {
        compressed: true,
        id: argId,
        value: isCustomFormat ? 'custom' : argValue,
        options: this._options,
        onChange: this._handleSelectChange
      }), isCustomFormat && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_eui.EuiFieldText, {
        placeholder: defaultCustomFormat,
        value: argValue,
        compressed: true,
        onChange: this._handleTextChange
      })));
    }
  }]);

  return FormatSelect;
}(_react.PureComponent);

exports.FormatSelect = FormatSelect;

_defineProperty(FormatSelect, "propTypes", {
  argId: _propTypes.default.string,
  argValue: _propTypes.default.string,
  formatOptions: _propTypes.default.arrayOf(_propTypes.default.shape({
    value: _propTypes.default.string,
    text: _propTypes.default.string
  })).isRequired,
  onValueChange: _propTypes.default.func
});