function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
export var EuiRangeThumb = function EuiRangeThumb(_ref) {
  var className = _ref.className,
      min = _ref.min,
      max = _ref.max,
      value = _ref.value,
      disabled = _ref.disabled,
      showInput = _ref.showInput,
      showTicks = _ref.showTicks,
      onClick = _ref.onClick,
      onMouseDown = _ref.onMouseDown,
      tabIndex = _ref.tabIndex,
      rest = _objectWithoutProperties(_ref, ["className", "min", "max", "value", "disabled", "showInput", "showTicks", "onClick", "onMouseDown", "tabIndex"]);

  var classes = classNames('euiRangeThumb', {
    'euiRangeThumb--hasTicks': showTicks
  }, className);
  var commonAttrs = {
    className: classes,
    role: 'slider',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': Number(value),
    'aria-disabled': !!disabled,
    tabIndex: showInput || !!disabled ? -1 : tabIndex || 0
  };
  return onClick || onMouseDown ? React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    onMouseDown: onMouseDown,
    disabled: disabled
  }, commonAttrs, rest)) : React.createElement("div", _extends({}, commonAttrs, rest));
};
EuiRangeThumb.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]),
  disabled: PropTypes.bool,
  showInput: PropTypes.bool,
  showTicks: PropTypes.bool,
  className: PropTypes.string,
  "aria-label": PropTypes.string,
  "data-test-subj": PropTypes.string
};
EuiRangeThumb.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiRangeThumb",
  "props": {
    "min": {
      "type": {
        "name": "number"
      },
      "required": true,
      "description": ""
    },
    "max": {
      "type": {
        "name": "number"
      },
      "required": true,
      "description": ""
    },
    "value": {
      "type": {
        "name": "union",
        "value": [{
          "name": "number"
        }, {
          "name": "string"
        }]
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
    "showInput": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    },
    "showTicks": {
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
    }
  }
};