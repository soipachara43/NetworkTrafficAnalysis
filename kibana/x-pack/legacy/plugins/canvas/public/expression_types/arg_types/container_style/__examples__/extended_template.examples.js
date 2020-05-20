"use strict";

var _addonActions = require("@storybook/addon-actions");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _defaults = require("../../../../state/defaults");

var _extended_template = require("../extended_template");

var _border_form = require("../border_form");

var _appearance_form = require("../appearance_form");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultValues = {
  padding: 0,
  opacity: 1,
  overflow: 'visible',
  borderRadius: 0,
  borderStyle: _extended_template.BorderStyle.SOLID,
  borderWidth: 1,
  border: '1px solid #fff'
};

var Interactive =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Interactive, _React$Component);

  function Interactive() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Interactive);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Interactive)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", defaultValues);

    _defineProperty(_assertThisInitialized(_this), "_getArgValue", function (arg) {
      return _this.state[arg];
    });

    _defineProperty(_assertThisInitialized(_this), "_setArgValue", function (arg, val) {
      (0, _addonActions.action)('setArgValue')(arg, val);

      _this.setState(_objectSpread({}, _this.state, _defineProperty({}, arg, val)));
    });

    return _this;
  }

  _createClass(Interactive, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_extended_template.ExtendedTemplate, {
        getArgValue: this._getArgValue,
        setArgValue: this._setArgValue,
        workpad: (0, _defaults.getDefaultWorkpad)()
      });
    }
  }]);

  return Interactive;
}(_react2.default.Component);

var getArgValue = function getArgValue(arg) {
  return defaultValues[arg];
};

(0, _react.storiesOf)('arguments/ContainerStyle', module).addDecorator(function (story) {
  return _react2.default.createElement("div", {
    style: {
      width: '323px',
      padding: '16px',
      background: '#fff'
    }
  }, story());
}).add('extended', function () {
  return _react2.default.createElement(Interactive, null);
});
(0, _react.storiesOf)('arguments/ContainerStyle/components', module).addDecorator(function (story) {
  return _react2.default.createElement("div", {
    style: {
      width: '323px',
      padding: '16px',
      background: '#fff'
    }
  }, story());
}).add('appearance form', function () {
  return _react2.default.createElement(_appearance_form.AppearanceForm, {
    onChange: (0, _addonActions.action)('onChange'),
    padding: "4",
    opacity: "1",
    overflow: "visible"
  });
}).add('border form', function () {
  return _react2.default.createElement(_border_form.BorderForm, {
    onChange: (0, _addonActions.action)('onChange'),
    colors: (0, _defaults.getDefaultWorkpad)().colors,
    value: "1px dotted #000",
    radius: "1"
  });
}).add('extended template', function () {
  return _react2.default.createElement(_extended_template.ExtendedTemplate, {
    getArgValue: getArgValue,
    setArgValue: (0, _addonActions.action)('setArgValue'),
    workpad: (0, _defaults.getDefaultWorkpad)()
  });
});