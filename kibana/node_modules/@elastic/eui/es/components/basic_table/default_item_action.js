import React from 'react';
import { isString } from '../../services/predicate';
import { EuiButtonEmpty, EuiButtonIcon } from '../button';
import { EuiToolTip } from '../tool_tip';
// In order to use generics with an arrow function inside a .tsx file, it's necessary to use
// this `extends` hack and declare the types as shown, instead of declaring the const as a
// FunctionComponent
export var DefaultItemAction = function DefaultItemAction(_ref) {
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
    return isString(action.color) ? action.color : action.color(item);
  };

  var color = action.color ? resolveActionColor(action) : 'primary';
  var _ref2 = action,
      buttonIcon = _ref2.icon;

  var resolveActionIcon = function resolveActionIcon(action) {
    return isString(action.icon) ? action.icon : action.icon(item);
  };

  var icon = buttonIcon ? resolveActionIcon(action) : undefined;
  var button;

  if (action.type === 'icon') {
    if (!icon) {
      throw new Error("Cannot render item action [".concat(action.name, "]. It is configured to render as an icon but no\n      icon is provided. Make sure to set the 'icon' property of the action"));
    }

    button = React.createElement(EuiButtonIcon, {
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
    button = React.createElement(EuiButtonEmpty, {
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

  return enabled && action.description ? React.createElement(EuiToolTip, {
    content: action.description,
    delay: "long"
  }, button) : button;
};