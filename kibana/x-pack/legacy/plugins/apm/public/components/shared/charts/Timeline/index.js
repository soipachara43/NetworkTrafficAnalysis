"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timeline = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactVis = require("react-vis");

var _plotUtils = require("./plotUtils");

var _TimelineAxis = require("./TimelineAxis");

var _VerticalLines = require("./VerticalLines");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TL =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(TL, _PureComponent);

  function TL() {
    _classCallCheck(this, TL);

    return _possibleConstructorReturn(this, _getPrototypeOf(TL).apply(this, arguments));
  }

  _createClass(TL, [{
    key: "render",
    // We normally do not define propTypes for TypeScript components, but the
    // `makeWidthFlexible` HOC from react-vis depends on them.
    value: function render() {
      var _this$props = this.props,
          width = _this$props.width,
          xMin = _this$props.xMin,
          xMax = _this$props.xMax,
          marks = _this$props.marks,
          height = _this$props.height,
          margins = _this$props.margins;

      if (xMax == null || !width) {
        return null;
      }

      var plotValues = (0, _plotUtils.getPlotValues)({
        width: width,
        xMin: xMin,
        xMax: xMax,
        height: height,
        margins: margins
      });
      var topTraceDuration = xMax - (xMin !== null && xMin !== void 0 ? xMin : 0);
      return _react.default.createElement("div", null, _react.default.createElement(_TimelineAxis.TimelineAxis, {
        plotValues: plotValues,
        marks: marks,
        topTraceDuration: topTraceDuration
      }), _react.default.createElement(_VerticalLines.VerticalLines, {
        plotValues: plotValues,
        marks: marks,
        topTraceDuration: topTraceDuration
      }));
    }
  }]);

  return TL;
}(_react.PureComponent);

_defineProperty(TL, "propTypes", {
  marks: _propTypes.default.array,
  xMin: _propTypes.default.number,
  xMax: _propTypes.default.number,
  height: _propTypes.default.number.isRequired,
  header: _propTypes.default.node,
  margins: _propTypes.default.object.isRequired,
  width: _propTypes.default.number
});

var Timeline = (0, _reactVis.makeWidthFlexible)(TL);
exports.Timeline = Timeline;