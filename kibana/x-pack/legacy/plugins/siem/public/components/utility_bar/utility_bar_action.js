"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UtilityBarAction = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _link_icon = require("../link_icon");

var _styles = require("./styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Popover = _react.default.memo(function (_ref) {
  var children = _ref.children,
      color = _ref.color,
      iconSide = _ref.iconSide,
      iconSize = _ref.iconSize,
      iconType = _ref.iconType,
      popoverContent = _ref.popoverContent;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      popoverState = _useState2[0],
      setPopoverState = _useState2[1];

  var closePopover = (0, _react.useCallback)(function () {
    return setPopoverState(false);
  }, [setPopoverState]);
  return _react.default.createElement(_eui.EuiPopover, {
    ownFocus: true,
    button: _react.default.createElement(_link_icon.LinkIcon, {
      color: color,
      iconSide: iconSide,
      iconSize: iconSize,
      iconType: iconType,
      onClick: function onClick() {
        return setPopoverState(!popoverState);
      }
    }, children),
    closePopover: function closePopover() {
      return setPopoverState(false);
    },
    isOpen: popoverState
  }, popoverContent === null || popoverContent === void 0 ? void 0 : popoverContent(closePopover));
});

Popover.displayName = 'Popover';

var UtilityBarAction = _react.default.memo(function (_ref2) {
  var children = _ref2.children,
      color = _ref2.color,
      dataTestSubj = _ref2.dataTestSubj,
      disabled = _ref2.disabled,
      href = _ref2.href,
      iconSide = _ref2.iconSide,
      iconSize = _ref2.iconSize,
      iconType = _ref2.iconType,
      onClick = _ref2.onClick,
      popoverContent = _ref2.popoverContent;
  return _react.default.createElement(_styles.BarAction, {
    "data-test-subj": dataTestSubj
  }, popoverContent ? _react.default.createElement(Popover, {
    color: color,
    iconSide: iconSide,
    iconSize: iconSize,
    iconType: iconType,
    popoverContent: popoverContent
  }, children) : _react.default.createElement(_link_icon.LinkIcon, {
    color: color,
    disabled: disabled,
    href: href,
    iconSide: iconSide,
    iconSize: iconSize,
    iconType: iconType,
    onClick: onClick
  }, children));
});

exports.UtilityBarAction = UtilityBarAction;
UtilityBarAction.displayName = 'UtilityBarAction';