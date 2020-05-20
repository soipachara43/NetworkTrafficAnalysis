"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithHoverActions = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var HoverActionsPanelContainer = _styledComponents.default.div.withConfig({
  displayName: "HoverActionsPanelContainer",
  componentId: "sc-1wr19fv-0"
})(["color:", ";height:100%;position:relative;"], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.textColors.default;
});

HoverActionsPanelContainer.displayName = 'HoverActionsPanelContainer';

var HoverActionsPanel = _react.default.memo(function (_ref2) {
  var children = _ref2.children,
      show = _ref2.show;
  return _react.default.createElement(HoverActionsPanelContainer, {
    "data-test-subj": "hover-actions-panel-container"
  }, show ? children : null);
});

HoverActionsPanel.displayName = 'HoverActionsPanel';

var WithHoverActionsContainer = _styledComponents.default.div.withConfig({
  displayName: "WithHoverActionsContainer",
  componentId: "sc-1wr19fv-1"
})(["display:flex;flex-direction:row;height:100%;padding-right:5px;"]);

WithHoverActionsContainer.displayName = 'WithHoverActionsContainer';
/**
 * Decorates it's children with actions that are visible on hover.
 * This component does not enforce an opinion on the styling and
 * positioning of the hover content, but see the documentation for
 * the `hoverContent` for tips on (not) effecting layout on-hover.
 *
 * In addition to rendering the `hoverContent` prop on hover, this
 * component also passes `showHoverContent` as a render prop, which
 * provides a signal to the content that the user is in a hover state.
 */

var WithHoverActions = _react.default.memo(function (_ref3) {
  var _ref3$alwaysShow = _ref3.alwaysShow,
      alwaysShow = _ref3$alwaysShow === void 0 ? false : _ref3$alwaysShow,
      hoverContent = _ref3.hoverContent,
      render = _ref3.render;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showHoverContent = _useState2[0],
      setShowHoverContent = _useState2[1];

  var onMouseEnter = (0, _react.useCallback)(function () {
    setShowHoverContent(true);
  }, []);
  var onMouseLeave = (0, _react.useCallback)(function () {
    setShowHoverContent(false);
  }, []);
  return _react.default.createElement(WithHoverActionsContainer, {
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  }, _react.default.createElement(_react.default.Fragment, null, render(showHoverContent)), _react.default.createElement(HoverActionsPanel, {
    show: showHoverContent || alwaysShow
  }, hoverContent != null ? hoverContent : _react.default.createElement(_react.default.Fragment, null)));
});

exports.WithHoverActions = WithHoverActions;
WithHoverActions.displayName = 'WithHoverActions';