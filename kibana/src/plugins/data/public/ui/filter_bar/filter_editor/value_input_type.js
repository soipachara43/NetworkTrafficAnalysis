"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueInputType = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireWildcard(require("react"));

var _filter_editor_utils = require("./lib/filter_editor_utils");

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

var ValueInputTypeUI =
/*#__PURE__*/
function (_Component) {
  _inherits(ValueInputTypeUI, _Component);

  function ValueInputTypeUI() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ValueInputTypeUI);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ValueInputTypeUI)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onBoolChange", function (event) {
      var boolValue = event.target.value === 'true';

      _this.props.onChange(boolValue);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var params = event.target.value;

      _this.props.onChange(params);
    });

    return _this;
  }

  _createClass(ValueInputTypeUI, [{
    key: "render",
    value: function render() {
      var value = this.props.value;
      var inputElement;

      switch (this.props.type) {
        case 'string':
          inputElement = _react2.default.createElement(_eui.EuiFieldText, {
            placeholder: this.props.placeholder,
            value: value,
            onChange: this.onChange,
            controlOnly: this.props.controlOnly,
            className: this.props.className
          });
          break;

        case 'number':
          inputElement = _react2.default.createElement(_eui.EuiFieldNumber, {
            placeholder: this.props.placeholder,
            value: typeof value === 'string' ? parseFloat(value) : value,
            onChange: this.onChange,
            controlOnly: this.props.controlOnly,
            className: this.props.className
          });
          break;

        case 'date':
          inputElement = _react2.default.createElement(_eui.EuiFieldText, {
            placeholder: this.props.placeholder,
            value: value,
            onChange: this.onChange,
            isInvalid: !(0, _lodash.isEmpty)(value) && !(0, _filter_editor_utils.validateParams)(value, this.props.type),
            controlOnly: this.props.controlOnly,
            className: this.props.className
          });
          break;

        case 'ip':
          inputElement = _react2.default.createElement(_eui.EuiFieldText, {
            placeholder: this.props.placeholder,
            value: value,
            onChange: this.onChange,
            isInvalid: !(0, _lodash.isEmpty)(value) && !(0, _filter_editor_utils.validateParams)(value, this.props.type),
            controlOnly: this.props.controlOnly,
            className: this.props.className
          });
          break;

        case 'boolean':
          inputElement = _react2.default.createElement(_eui.EuiSelect, {
            options: [{
              value: undefined,
              text: this.props.placeholder
            }, {
              value: 'true',
              text: this.props.intl.formatMessage({
                id: 'data.filter.filterEditor.trueOptionLabel',
                defaultMessage: 'true'
              })
            }, {
              value: 'false',
              text: this.props.intl.formatMessage({
                id: 'data.filter.filterEditor.falseOptionLabel',
                defaultMessage: 'false'
              })
            }],
            value: value,
            onChange: this.onBoolChange,
            className: this.props.className
          });
          break;

        default:
          break;
      }

      return inputElement;
    }
  }]);

  return ValueInputTypeUI;
}(_react2.Component);

var ValueInputType = (0, _react.injectI18n)(ValueInputTypeUI);
exports.ValueInputType = ValueInputType;