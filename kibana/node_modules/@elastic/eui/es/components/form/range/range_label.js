import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
export var EuiRangeLabel = function EuiRangeLabel(_ref) {
  var children = _ref.children,
      disabled = _ref.disabled,
      _ref$side = _ref.side,
      side = _ref$side === void 0 ? 'max' : _ref$side;
  var classes = classNames('euiRangeLabel', "euiRangeLabel--".concat(side), {
    'euiRangeLabel--isDisabled': disabled
  });
  return React.createElement("label", {
    className: classes
  }, children);
};
EuiRangeLabel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]).isRequired,
  disabled: PropTypes.bool,
  side: PropTypes.oneOf(["min", "max"])
};
EuiRangeLabel.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiRangeLabel",
  "props": {
    "side": {
      "defaultValue": {
        "value": "'max'",
        "computed": false
      },
      "type": {
        "name": "enum",
        "value": [{
          "value": "\"min\"",
          "computed": false
        }, {
          "value": "\"max\"",
          "computed": false
        }]
      },
      "required": false,
      "description": ""
    },
    "children": {
      "type": {
        "name": "union",
        "value": [{
          "name": "string"
        }, {
          "name": "number"
        }]
      },
      "required": true,
      "description": ""
    },
    "disabled": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    }
  }
};