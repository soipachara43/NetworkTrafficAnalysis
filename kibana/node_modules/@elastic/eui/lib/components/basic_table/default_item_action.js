"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultItemAction = void 0;

var _react = _interopRequireDefault(require("react"));

var _predicate = require("../../services/predicate");

var _button = require("../button");

var _tool_tip = require("../tool_tip");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// In order to use generics with an arrow function inside a .tsx file, it's necessary to use
// this `extends` hack and declare the types as shown, instead of declaring the const as a
// FunctionComponent
var DefaultItemAction = function DefaultItemAction(_ref) {
  var action = _ref.action,
      enabled = _ref.enabled,
      item = _ref.item,
      className = _ref.className;

  if (!action.onClick && !action.href) {
    throw new Error("Cannot render item action [".concat(action.name, "]. Missing required 'onClick' callback\n      or 'href' string. If you want to provide a custom action control, make sure to define the 'render' callback"));
  }

  var onClick = action.onClick ? function () {
    return action.onClick(item);
  } : undefined;

  var resolveActionColor = function resolveActionColor(action) {
    return (0, _predicate.isString)(action.color) ? action.color : action.color(item);
  };

  var color = action.color ? resolveActionColor(action) : 'primary';
  var _ref2 = action,
      buttonIcon = _ref2.icon;

  var resolveActionIcon = function resolveActionIcon(action) {
    return (0, _predicate.isString)(action.icon) ? action.icon : action.icon(item);
  };

  var icon = buttonIcon ? resolveActionIcon(action) : undefined;
  var button;

  if (action.type === 'icon') {
    if (!icon) {
      throw new Error("Cannot render item action [".concat(action.name, "]. It is configured to render as an icon but no\n      icon is provided. Make sure to set the 'icon' property of the action"));
    }

    button = _react.default.createElement(_button.EuiButtonIcon, {
      className: className,
      "aria-label": action.name,
      isDisabled: !enabled,
      color: color,
      iconType: icon,
      onClick: onClick,
      href: action.href,
      target: action.target,
      "data-test-subj": action['data-test-subj']
    });
  } else {
    button = _react.default.createElement(_button.EuiButtonEmpty, {
      className: className,
      size: "s",
      isDisabled: !enabled,
      color: color,
      iconType: icon,
      onClick: onClick,
      href: action.href,
      target: action.target,
      "data-test-subj": action['data-test-subj'],
      flush: "right"
    }, action.name);
  }

  return enabled && action.description ? _react.default.createElement(_tool_tip.EuiToolTip, {
    content: action.description,
    delay: "long"
  }, button) : button;
};

exports.DefaultItemAction = DefaultItemAction;