"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormsyEuiPasswordText = void 0;

var _eui = require("@elastic/eui");

var _formsyReact = require("formsy-react");

var _react = _interopRequireWildcard(require("react"));

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

var FieldPassword =
/*#__PURE__*/
function (_Component) {
  _inherits(FieldPassword, _Component);

  function FieldPassword(props) {
    var _this;

    _classCallCheck(this, FieldPassword);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FieldPassword).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {
      var value = e.currentTarget.value;

      _this.props.setValue(value);

      if (_this.props.onChange) {
        _this.props.onChange(e, value);
      }

      if (_this.props.instantValidation) {
        _this.showError();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function (e) {
      _this.showError();

      if (_this.props.onBlur) {
        _this.props.onBlur(e, e.currentTarget.value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "showError", function () {
      return _this.setState({
        allowError: true
      });
    });

    _this.state = {
      allowError: false
    };
    return _this;
  }

  _createClass(FieldPassword, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          defaultValue = _this$props.defaultValue,
          setValue = _this$props.setValue;

      if (defaultValue) {
        setValue(defaultValue);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          id = _this$props2.id,
          required = _this$props2.required,
          label = _this$props2.label,
          getValue = _this$props2.getValue,
          isValid = _this$props2.isValid,
          isPristine = _this$props2.isPristine,
          getErrorMessage = _this$props2.getErrorMessage,
          fullWidth = _this$props2.fullWidth,
          className = _this$props2.className,
          disabled = _this$props2.disabled,
          helpText = _this$props2.helpText,
          onBlur = _this$props2.onBlur;
      var allowError = this.state.allowError;
      var error = !isPristine() && !isValid() && allowError;
      return _react.default.createElement(_eui.EuiFormRow, {
        id: id,
        label: label,
        helpText: helpText,
        isInvalid: !disabled && error,
        error: !disabled && error ? getErrorMessage() : []
      }, _react.default.createElement(_eui.EuiFieldPassword, {
        id: id,
        name: name,
        value: getValue() || '',
        isInvalid: !disabled && error,
        onChange: this.handleChange,
        onBlur: onBlur,
        fullWidth: fullWidth,
        disabled: disabled,
        required: required,
        className: className
      }));
    }
  }]);

  return FieldPassword;
}(_react.Component);

var FormsyEuiPasswordText = (0, _formsyReact.withFormsy)(FieldPassword);
exports.FormsyEuiPasswordText = FormsyEuiPasswordText;