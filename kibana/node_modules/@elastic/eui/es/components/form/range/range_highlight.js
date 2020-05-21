import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
export var EuiRangeHighlight = function EuiRangeHighlight(_ref) {
  var className = _ref.className,
      hasFocus = _ref.hasFocus,
      showTicks = _ref.showTicks,
      lowerValue = _ref.lowerValue,
      upperValue = _ref.upperValue,
      max = _ref.max,
      min = _ref.min,
      compressed = _ref.compressed,
      background = _ref.background,
      onClick = _ref.onClick;
  // Calculate the width the range based on value
  // const rangeWidth = (value - min) / (max - min);
  var leftPosition = (lowerValue - min) / (max - min);
  var rangeWidth = (upperValue - lowerValue) / (max - min);
  var rangeWidthStyle = {
    background: background,
    marginLeft: "".concat(leftPosition * 100, "%"),
    width: "".concat(rangeWidth * 100, "%")
  };
  var classes = classNames('euiRangeHighlight', {
    'euiRangeHighlight--hasTicks': showTicks,
    'euiRangeHighlight--compressed': compressed
  }, className);
  var progressClasses = classNames('euiRangeHighlight__progress', {
    'euiRangeHighlight__progress--hasFocus': hasFocus
  });
  return React.createElement("div", {
    className: classes,
    onClick: onClick
  }, React.createElement("div", {
    className: progressClasses,
    style: rangeWidthStyle
  }));
};
EuiRangeHighlight.propTypes = {
  className: PropTypes.string,
  background: PropTypes.string,
  compressed: PropTypes.bool,
  hasFocus: PropTypes.bool,
  showTicks: PropTypes.bool,
  lowerValue: PropTypes.number.isRequired,
  upperValue: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onClick: PropTypes.func
};
EuiRangeHighlight.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiRangeHighlight",
  "props": {
    "className": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "background": {
      "type": {
        "name": "string"
      },
      "required": false,
      "description": ""
    },
    "compressed": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    },
    "hasFocus": {
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
    "lowerValue": {
      "type": {
        "name": "number"
      },
      "required": true,
      "description": ""
    },
    "upperValue": {
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
    "min": {
      "type": {
        "name": "number"
      },
      "required": true,
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