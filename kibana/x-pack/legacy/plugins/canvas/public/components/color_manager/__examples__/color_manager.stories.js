"use strict";

var _addonActions = require("@storybook/addon-actions");

var _react = require("@storybook/react");

var _react2 = _interopRequireDefault(require("react"));

var _color_manager = require("../color_manager");

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

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasButtons: true,
      value: ''
    });

    return _this;
  }

  _createClass(Interactive, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement("div", null, _react2.default.createElement(_color_manager.ColorManager, {
        hasButtons: this.state.hasButtons,
        onAddColor: (0, _addonActions.action)('onAddColor'),
        onRemoveColor: (0, _addonActions.action)('onRemoveColor'),
        onChange: function onChange(value) {
          return _this2.setState({
            value: value
          });
        },
        value: this.state.value
      }), _react2.default.createElement("p", {
        style: {
          marginTop: 20
        }
      }, _react2.default.createElement("label", null, _react2.default.createElement("input", {
        "aria-checked": this.state.hasButtons,
        type: "checkbox",
        checked: this.state.hasButtons,
        onChange: function onChange() {
          return _this2.setState({
            hasButtons: !_this2.state.hasButtons
          });
        }
      }), '  ', _react2.default.createElement("span", null, "Show Buttons?"))));
    }
  }]);

  return Interactive;
}(_react2.default.Component);

(0, _react.storiesOf)('components/Color/ColorManager', module).addParameters({
  info: {
    inline: true,
    styles: {
      infoBody: {
        margin: 20
      },
      infoStory: {
        margin: '40px 60px',
        width: '320px'
      }
    }
  }
}).add('default', function () {
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_color_manager.ColorManager, {
    key: "1",
    onChange: (0, _addonActions.action)('onChange'),
    value: "blue"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "2",
    onChange: (0, _addonActions.action)('onChange'),
    value: "#abc"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "3",
    onChange: (0, _addonActions.action)('onChange'),
    value: "#abcd"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "4",
    onChange: (0, _addonActions.action)('onChange'),
    value: "#abcdef"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "5",
    onChange: (0, _addonActions.action)('onChange'),
    value: "#aabbccdd"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "6",
    onChange: (0, _addonActions.action)('onChange'),
    value: "rgb(50, 100, 150)"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "7",
    onChange: (0, _addonActions.action)('onChange'),
    value: "rgba(50, 100, 150, .5)"
  }));
}).add('invalid colors', function () {
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_color_manager.ColorManager, {
    key: "1",
    onChange: (0, _addonActions.action)('onChange'),
    value: "elastic"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "2",
    onChange: (0, _addonActions.action)('onChange'),
    value: "#xyz"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "3",
    onChange: (0, _addonActions.action)('onChange'),
    value: "#ghij"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "4",
    onChange: (0, _addonActions.action)('onChange'),
    value: "#canvas"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "5",
    onChange: (0, _addonActions.action)('onChange'),
    value: "#12345xyz"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "6",
    onChange: (0, _addonActions.action)('onChange'),
    value: "rgb(a,b,c)"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    key: "7",
    onChange: (0, _addonActions.action)('onChange'),
    value: "rgba(w,x,y,z)"
  }));
}).add('with buttons', function () {
  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_color_manager.ColorManager, {
    hasButtons: true,
    key: "1",
    onAddColor: (0, _addonActions.action)('onAddColor'),
    onChange: (0, _addonActions.action)('onChange'),
    value: "#abcdef"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    hasButtons: true,
    key: "2",
    onChange: (0, _addonActions.action)('onChange'),
    onRemoveColor: (0, _addonActions.action)('onRemoveColor'),
    value: "#abcdef"
  }), _react2.default.createElement(_color_manager.ColorManager, {
    hasButtons: true,
    key: "3",
    onAddColor: (0, _addonActions.action)('onAddColor'),
    onChange: (0, _addonActions.action)('onChange'),
    onRemoveColor: (0, _addonActions.action)('onRemoveColor'),
    value: "#abcdef"
  }));
}).add('interactive', function () {
  return _react2.default.createElement(Interactive, null);
}, {
  info: {
    inline: true,
    source: false,
    propTablesExclude: [Interactive],
    styles: {
      infoBody: {
        margin: 20
      },
      infoStory: {
        margin: '40px 60px',
        width: '320px'
      }
    }
  }
});