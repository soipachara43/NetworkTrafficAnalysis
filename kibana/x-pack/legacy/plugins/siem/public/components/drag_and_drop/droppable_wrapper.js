"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DroppableWrapper = void 0;

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ReactDndDropTarget = _styledComponents.default.div.withConfig({
  displayName: "ReactDndDropTarget",
  componentId: "qi6zuc-0"
})(["transition:background-color 0.7s ease;width:100%;height:", ";.flyout-overlay{.euiPanel{background-color:", ";}}", " > div.timeline-drop-area{.drop-and-provider-timeline{display:none;}& + div{display:none !important;}}"], function (_ref) {
  var height = _ref.height;
  return height;
}, function (props) {
  return props.theme.eui.euiFormBackgroundColor;
}, function (props) {
  return props.isDraggingOver ? "\n    .drop-and-provider-timeline {\n      &:hover {\n        background-color: ".concat((0, _polished.rgba)(props.theme.eui.euiColorSuccess, 0.3), ";\n      }\n    }\n    .drop-and-provider-timeline:hover {\n        background-color: ").concat((0, _polished.rgba)(props.theme.eui.euiColorSuccess, 0.3), ";\n    }\n  > div.timeline-drop-area-empty {\n     color: ").concat(props.theme.eui.euiColorSuccess, ";\n     background-color: ").concat((0, _polished.rgba)(props.theme.eui.euiColorSuccess, 0.2), ";\n\n     & .euiTextColor--subdued {\n      color: ").concat(props.theme.eui.euiColorSuccess, ";\n     }\n  }\n  > div.timeline-drop-area {\n    background-color: ").concat((0, _polished.rgba)(props.theme.eui.euiColorSuccess, 0.2), ";\n    .provider-item-filter-container div:first-child{\n      /* Override dragNdrop beautiful so we do not have our droppable moving around for no good reason */\n      transform: none !important;\n    }\n    .drop-and-provider-timeline {\n      display: block !important;\n      + div {\n        display: none;\n      }\n    }\n\n    & .euiFormHelpText {\n      color: ").concat(props.theme.eui.euiColorSuccess, ";\n    }\n  }\n  .flyout-overlay {\n    .euiPanel {\n      background-color: ").concat(props.theme.eui.euiColorLightShade, ";\n    }\n    + div {\n      /* Override dragNdrop beautiful so we do not have our droppable moving around for no good reason */\n      display: none !important;\n    }\n  }\n  ") : '';
});

ReactDndDropTarget.displayName = 'ReactDndDropTarget';

var DroppableWrapper = _react.default.memo(function (_ref2) {
  var _ref2$children = _ref2.children,
      children = _ref2$children === void 0 ? null : _ref2$children,
      droppableId = _ref2.droppableId,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? '100%' : _ref2$height,
      _ref2$isDropDisabled = _ref2.isDropDisabled,
      isDropDisabled = _ref2$isDropDisabled === void 0 ? false : _ref2$isDropDisabled,
      type = _ref2.type,
      _ref2$render = _ref2.render,
      render = _ref2$render === void 0 ? null : _ref2$render,
      renderClone = _ref2.renderClone;
  return _react.default.createElement(_reactBeautifulDnd.Droppable, {
    isDropDisabled: isDropDisabled,
    droppableId: droppableId,
    direction: 'horizontal',
    type: type,
    renderClone: renderClone
  }, function (provided, snapshot) {
    return _react.default.createElement(ReactDndDropTarget, _extends({
      height: height,
      ref: provided.innerRef
    }, provided.droppableProps, {
      isDraggingOver: snapshot.isDraggingOver
    }), render == null ? children : render({
      isDraggingOver: snapshot.isDraggingOver
    }), provided.placeholder);
  });
});

exports.DroppableWrapper = DroppableWrapper;
DroppableWrapper.displayName = 'DroppableWrapper';