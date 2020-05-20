"use strict";

var _addonActions = require("@storybook/addon-actions");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _defaults = require("../../../../state/defaults");

var _simple_template = require("../simple_template");

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

var defaultExpression = {
  type: 'expression',
  chain: [{
    type: 'function',
    function: 'seriesStyle',
    arguments: {}
  }]
};
var defaultValues = {
  argValue: defaultExpression
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

    return _this;
  }

  _createClass(Interactive, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_simple_template.SimpleTemplate, {
        argValue: this.state.argValue,
        onValueChange: function onValueChange(argValue) {
          (0, _addonActions.action)('onValueChange')(argValue);

          _this2.setState({
            argValue: argValue
          });
        },
        workpad: (0, _defaults.getDefaultWorkpad)(),
        typeInstance: {
          name: 'defaultStyle'
        }
      });
    }
  }]);

  return Interactive;
}(_react2.default.Component);

(0, _react.storiesOf)('arguments/SeriesStyle', module).addDecorator(function (story) {
  return _react2.default.createElement("div", {
    style: {
      width: '323px',
      padding: '16px',
      background: '#fff'
    }
  }, story());
}).add('simple', function () {
  return _react2.default.createElement(Interactive, null);
});
(0, _react.storiesOf)('arguments/SeriesStyle/components', module).addDecorator(function (story) {
  return _react2.default.createElement("div", {
    style: {
      width: '323px',
      padding: '16px',
      background: '#fff'
    }
  }, story());
}).add('simple: no labels', function () {
  return _react2.default.createElement(_simple_template.SimpleTemplate, {
    argValue: defaultExpression,
    onValueChange: (0, _addonActions.action)('onValueChange'),
    workpad: (0, _defaults.getDefaultWorkpad)(),
    typeInstance: {
      name: 'defaultStyle'
    }
  });
}).add('simple: defaults', function () {
  return _react2.default.createElement(_simple_template.SimpleTemplate, {
    argValue: defaultExpression,
    labels: ['label1', 'label2'],
    onValueChange: (0, _addonActions.action)('onValueChange'),
    workpad: (0, _defaults.getDefaultWorkpad)(),
    typeInstance: {
      name: 'defaultStyle'
    }
  });
}).add('simple: no series', function () {
  return _react2.default.createElement(_simple_template.SimpleTemplate, {
    argValue: defaultExpression,
    onValueChange: (0, _addonActions.action)('onValueChange'),
    workpad: (0, _defaults.getDefaultWorkpad)(),
    typeInstance: {
      name: 'unknown'
    }
  });
}).add('simple: with series', function () {
  return _react2.default.createElement(_simple_template.SimpleTemplate, {
    argValue: defaultExpression,
    onValueChange: (0, _addonActions.action)('onValueChange'),
    labels: ['label1', 'label2'],
    workpad: (0, _defaults.getDefaultWorkpad)(),
    typeInstance: {
      name: 'unknown'
    }
  });
});