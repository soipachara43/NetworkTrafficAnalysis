function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import { getSecureRelForTarget } from '../../services';
export var EuiTab = function EuiTab(_ref) {
  var isSelected = _ref.isSelected,
      children = _ref.children,
      className = _ref.className,
      disabled = _ref.disabled,
      href = _ref.href,
      target = _ref.target,
      rel = _ref.rel,
      rest = _objectWithoutProperties(_ref, ["isSelected", "children", "className", "disabled", "href", "target", "rel"]);

  var classes = classNames('euiTab', className, {
    'euiTab-isSelected': isSelected,
    'euiTab-isDisabled': disabled
  }); //  <a> elements don't respect the `disabled` attribute. So if we're disabled, we'll just pretend
  //  this is a button and piggyback off its disabled styles.

  if (href && !disabled) {
    var secureRel = getSecureRelForTarget({
      href: href,
      target: target,
      rel: rel
    });
    return React.createElement("a", _extends({
      role: "tab",
      "aria-selected": !!isSelected,
      className: classes,
      href: href,
      target: target,
      rel: secureRel
    }, rest), React.createElement("span", {
      className: "euiTab__content"
    }, children));
  }

  return React.createElement("button", _extends({
    role: "tab",
    "aria-selected": !!isSelected,
    type: "button",
    className: classes,
    disabled: disabled
  }, rest), React.createElement("span", {
    className: "euiTab__content"
  }, children));
};
EuiTab.propTypes = {
  isSelected: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  "aria-label": PropTypes.string,
  "data-test-subj": PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func
};
EuiTab.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiTab",
  "props": {
    "isSelected": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    },
    "disabled": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    },
    "className": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "aria-label": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "data-test-subj": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "href": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "onClick": {
      "type": {
        "name": "func"
      },
      "required": false,
      "description": ""
    }
  }
};