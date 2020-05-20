"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidatedDualRange = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _is_range_valid = require("./is_range_valid");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var ValidatedDualRange =
/*#__PURE__*/
function (_Component) {
  _inherits(ValidatedDualRange, _Component);

  function ValidatedDualRange() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ValidatedDualRange);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ValidatedDualRange)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "_onChange", function (value) {
      var _isRangeValid = (0, _is_range_valid.isRangeValid)(value, _this.props.min, _this.props.max, _this.props.allowEmptyRange),
          isValid = _isRangeValid.isValid,
          errorMessage = _isRangeValid.errorMessage;

      _this.setState({
        value: value,
        isValid: isValid,
        errorMessage: errorMessage
      });

      if (_this.props.onChange && isValid) {
        _this.props.onChange([value[0], value[1]]);
      }
    });

    return _this;
  }

  _createClass(ValidatedDualRange, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          compressed = _this$props.compressed,
          fullWidth = _this$props.fullWidth,
          label = _this$props.label,
          formRowDisplay = _this$props.formRowDisplay,
          value = _this$props.value,
          onChange = _this$props.onChange,
          allowEmptyRange = _this$props.allowEmptyRange,
          rest = _objectWithoutProperties(_this$props, ["compressed", "fullWidth", "label", "formRowDisplay", "value", "onChange", "allowEmptyRange"]);

      return _react.default.createElement(_eui.EuiFormRow, {
        compressed: compressed,
        fullWidth: fullWidth,
        isInvalid: !this.state.isValid,
        error: this.state.errorMessage ? [this.state.errorMessage] : [],
        label: label,
        display: formRowDisplay
      }, _react.default.createElement(_eui.EuiDualRange, _extends({
        compressed: compressed,
        fullWidth: fullWidth,
        value: this.state.value,
        onChange: this._onChange // @ts-ignore
        ,
        focusable: false // remove when #59039 is fixed

      }, rest)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.value !== prevState.prevValue) {
        var _isRangeValid2 = (0, _is_range_valid.isRangeValid)(nextProps.value, nextProps.min, nextProps.max, nextProps.allowEmptyRange),
            isValid = _isRangeValid2.isValid,
            errorMessage = _isRangeValid2.errorMessage;

        return {
          value: nextProps.value,
          prevValue: nextProps.value,
          isValid: isValid,
          errorMessage: errorMessage
        };
      }

      return null;
    } // @ts-ignore state populated by getDerivedStateFromProps

  }]);

  return ValidatedDualRange;
}(_react.Component);

exports.ValidatedDualRange = ValidatedDualRange;

_defineProperty(ValidatedDualRange, "defaultProps", {
  allowEmptyRange: true,
  fullWidth: false,
  compressed: false
});