"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkpadZoom = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _popover = require("../../popover");

var _constants = require("../../../../common/lib/constants");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var strings = _i18n.ComponentStrings.WorkpadHeaderWorkpadZoom;
var QUICK_ZOOM_LEVELS = [0.5, 1, 2];

var WorkpadZoom =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(WorkpadZoom, _PureComponent);

  function WorkpadZoom() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WorkpadZoom);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WorkpadZoom)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_fitToWindow", function () {
      var _this$props = _this.props,
          boundingBox = _this$props.boundingBox,
          setZoomScale = _this$props.setZoomScale,
          workpadWidth = _this$props.workpadWidth,
          workpadHeight = _this$props.workpadHeight;
      var canvasLayoutContent = document.querySelector("#".concat(_constants.CANVAS_LAYOUT_STAGE_CONTENT_SELECTOR));
      var layoutWidth = canvasLayoutContent.clientWidth;
      var layoutHeight = canvasLayoutContent.clientHeight;
      var offsetLeft = boundingBox.left;
      var offsetTop = boundingBox.top;
      var offsetRight = boundingBox.right - workpadWidth;
      var offsetBottom = boundingBox.bottom - workpadHeight;

      var boundingWidth = workpadWidth + Math.max(Math.abs(offsetLeft), Math.abs(offsetRight)) * 2 + _constants.WORKPAD_CANVAS_BUFFER;

      var boundingHeight = workpadHeight + Math.max(Math.abs(offsetTop), Math.abs(offsetBottom)) * 2 + _constants.WORKPAD_CANVAS_BUFFER;

      var xScale = layoutWidth / boundingWidth;
      var yScale = layoutHeight / boundingHeight;
      setZoomScale(Math.min(xScale, yScale));
    });

    _defineProperty(_assertThisInitialized(_this), "_button", function (togglePopover) {
      return _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: "magnifyWithPlus",
        "aria-label": strings.getZoomControlsAriaLabel(),
        onClick: togglePopover
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getScaleMenuItems", function () {
      return QUICK_ZOOM_LEVELS.map(function (scale) {
        return {
          name: strings.getZoomPercentage(scale),
          icon: 'empty',
          onClick: function onClick() {
            return _this.props.setZoomScale(scale);
          }
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getPanels", function () {
      var _this$props2 = _this.props,
          zoomScale = _this$props2.zoomScale,
          zoomIn = _this$props2.zoomIn,
          zoomOut = _this$props2.zoomOut,
          resetZoom = _this$props2.resetZoom;
      var items = [{
        name: strings.getZoomFitToWindowText(),
        icon: 'empty',
        onClick: _this._fitToWindow,
        disabled: zoomScale === _constants.MAX_ZOOM_LEVEL
      }].concat(_toConsumableArray(_this._getScaleMenuItems()), [{
        name: strings.getZoomInText(),
        icon: 'magnifyWithPlus',
        onClick: zoomIn,
        disabled: zoomScale === _constants.MAX_ZOOM_LEVEL,
        className: 'canvasContextMenu--topBorder'
      }, {
        name: strings.getZoomOutText(),
        icon: 'magnifyWithMinus',
        onClick: zoomOut,
        disabled: zoomScale <= _constants.MIN_ZOOM_LEVEL
      }, {
        name: strings.getZoomResetText(),
        icon: 'empty',
        onClick: resetZoom,
        disabled: zoomScale >= _constants.MAX_ZOOM_LEVEL,
        className: 'canvasContextMenu--topBorder'
      }]);
      var panels = [{
        id: 0,
        title: strings.getZoomPanelTitle(),
        items: items
      }];
      return panels;
    });

    return _this;
  }

  _createClass(WorkpadZoom, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_popover.Popover, {
        button: this._button,
        panelPaddingSize: "none",
        tooltip: strings.getZoomControlsTooltip(),
        tooltipPosition: "bottom"
      }, function () {
        return _react.default.createElement(_eui.EuiContextMenu, {
          initialPanelId: 0,
          panels: _this2._getPanels()
        });
      });
    }
  }]);

  return WorkpadZoom;
}(_react.PureComponent);

exports.WorkpadZoom = WorkpadZoom;

_defineProperty(WorkpadZoom, "propTypes", {
  zoomScale: _propTypes.default.number.isRequired,
  setZoomScale: _propTypes.default.func.isRequired,
  zoomIn: _propTypes.default.func.isRequired,
  zoomOut: _propTypes.default.func.isRequired,
  resetZoom: _propTypes.default.func.isRequired,
  boundingBox: _propTypes.default.shape({
    left: _propTypes.default.number.isRequired,
    right: _propTypes.default.number.isRequired,
    top: _propTypes.default.number.isRequired,
    bottom: _propTypes.default.number.isRequired
  }),
  workpadWidth: _propTypes.default.number.isRequired,
  workpadHeight: _propTypes.default.number.isRequired
});