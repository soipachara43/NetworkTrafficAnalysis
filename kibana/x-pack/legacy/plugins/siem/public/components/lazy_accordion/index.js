"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LazyAccordion = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * An accordion that doesn't render it's content unless it's expanded.
 * This component was created because `EuiAccordion`'s eager rendering of
 * accordion content was creating performance issues when used in repeating
 * content on the page.
 *
 * The current implementation actually renders the content *outside* of the
 * actual EuiAccordion when the accordion is expanded! It does this because
 * EuiAccordian applies a `translate` style to the content that causes
 * any draggable content (inside `EuiAccordian`) to have a `translate` style
 * that messes up rendering while the user drags it.
 *
 * TODO: animate the expansion and collapse of content rendered "below"
 * the real `EuiAccordion`.
 */
var LazyAccordion = _react.default.memo(function (_ref) {
  var buttonContent = _ref.buttonContent,
      buttonContentClassName = _ref.buttonContentClassName,
      extraAction = _ref.extraAction,
      forceExpand = _ref.forceExpand,
      id = _ref.id,
      onCollapse = _ref.onCollapse,
      onExpand = _ref.onExpand,
      paddingSize = _ref.paddingSize,
      renderExpandedContent = _ref.renderExpandedContent;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      expanded = _useState2[0],
      setExpanded = _useState2[1];

  var onCollapsedClick = (0, _react.useCallback)(function () {
    setExpanded(true);

    if (onExpand != null) {
      onExpand();
    }
  }, [onExpand]);
  var onExpandedClick = (0, _react.useCallback)(function () {
    setExpanded(false);

    if (onCollapse != null) {
      onCollapse();
    }
  }, [onCollapse]);
  return _react.default.createElement(_react.default.Fragment, null, forceExpand || expanded ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiAccordion, {
    buttonContent: buttonContent,
    buttonContentClassName: buttonContentClassName,
    "data-test-subj": "lazy-accordion-expanded",
    extraAction: extraAction,
    id: id,
    initialIsOpen: true,
    onClick: onExpandedClick,
    paddingSize: paddingSize
  }, _react.default.createElement(_react.default.Fragment, null)), renderExpandedContent(expanded)) : _react.default.createElement(_eui.EuiAccordion, {
    buttonContent: buttonContent,
    buttonContentClassName: buttonContentClassName,
    "data-test-subj": "lazy-accordion-placeholder",
    extraAction: extraAction,
    id: id,
    onClick: onCollapsedClick,
    paddingSize: paddingSize
  }));
});

exports.LazyAccordion = LazyAccordion;
LazyAccordion.displayName = 'LazyAccordion';