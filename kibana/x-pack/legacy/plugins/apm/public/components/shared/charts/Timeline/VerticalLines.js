"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VerticalLines = void 0;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireWildcard(require("react"));

var _reactVis = require("react-vis");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var VerticalLines =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(VerticalLines, _PureComponent);

  function VerticalLines() {
    _classCallCheck(this, VerticalLines);

    return _possibleConstructorReturn(this, _getPrototypeOf(VerticalLines).apply(this, arguments));
  }

  _createClass(VerticalLines, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          topTraceDuration = _this$props.topTraceDuration,
          _this$props$marks = _this$props.marks,
          marks = _this$props$marks === void 0 ? [] : _this$props$marks;
      var _this$props$plotValue = this.props.plotValues,
          width = _this$props$plotValue.width,
          height = _this$props$plotValue.height,
          margins = _this$props$plotValue.margins,
          xDomain = _this$props$plotValue.xDomain,
          tickValues = _this$props$plotValue.tickValues;
      var markTimes = marks.filter(function (mark) {
        return mark.verticalLine;
      }).map(function (_ref) {
        var offset = _ref.offset;
        return offset;
      });
      return _react.default.createElement("div", {
        style: {
          position: 'absolute',
          top: 0,
          left: 0
        }
      }, _react.default.createElement(_reactVis.XYPlot, {
        dontCheckIfEmpty: true,
        width: width,
        height: height + margins.top,
        margin: margins,
        xDomain: xDomain
      }, _react.default.createElement(_reactVis.VerticalGridLines, {
        tickValues: tickValues,
        style: {
          stroke: _eui_theme_light.default.euiColorLightestShade
        }
      }), _react.default.createElement(_reactVis.VerticalGridLines, {
        tickValues: markTimes,
        style: {
          stroke: _eui_theme_light.default.euiColorMediumShade
        }
      }), topTraceDuration > 0 && _react.default.createElement(_reactVis.VerticalGridLines, {
        tickValues: [topTraceDuration],
        style: {
          stroke: _eui_theme_light.default.euiColorMediumShade
        }
      })));
    }
  }]);

  return VerticalLines;
}(_react.PureComponent);

exports.VerticalLines = VerticalLines;