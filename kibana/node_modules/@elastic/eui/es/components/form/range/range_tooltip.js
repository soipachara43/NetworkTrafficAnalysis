import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
export var EuiRangeTooltip = function EuiRangeTooltip(_ref) {
  var value = _ref.value,
      valueAppend = _ref.valueAppend,
      valuePrepend = _ref.valuePrepend,
      max = _ref.max,
      min = _ref.min,
      name = _ref.name,
      showTicks = _ref.showTicks,
      compressed = _ref.compressed;
  var classes = classNames('euiRangeTooltip', {
    'euiRangeTooltip--compressed': compressed
  }); // Calculate the left position based on value

  var val = 0;

  if (typeof value === 'number') {
    val = value;
  } else if (typeof value === 'string') {
    val = parseFloat(value);
  }

  var decimal = (val - min) / (max - min); // Must be between 0-100%

  var valuePosition = decimal <= 1 ? decimal : 1;
  valuePosition = valuePosition >= 0 ? valuePosition : 0;
  var valuePositionSide;
  var valuePositionStyle;

  if (valuePosition > 0.5) {
    valuePositionSide = 'left';
    valuePositionStyle = {
      right: "".concat((1 - valuePosition) * 100, "%")
    };
  } else {
    valuePositionSide = 'right';
    valuePositionStyle = {
      left: "".concat(valuePosition * 100, "%")
    };
  } // Change left/right position based on value (half way point)


  var valueClasses = classNames('euiRangeTooltip__value', "euiRangeTooltip__value--".concat(valuePositionSide), {
    'euiRangeTooltip__value--hasTicks': showTicks
  });
  return React.createElement("div", {
    className: classes
  }, React.createElement("output", {
    className: valueClasses,
    htmlFor: name,
    style: valuePositionStyle
  }, valuePrepend, value, valueAppend));
};
EuiRangeTooltip.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]),
  valueAppend: PropTypes.node,
  valuePrepend: PropTypes.node,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  name: PropTypes.string,
  showTicks: PropTypes.bool,
  compressed: PropTypes.bool
};
EuiRangeTooltip.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiRangeTooltip",
  "props": {
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
    "valueAppend": {
      "type": {
        "name": "node"
      },
      "required": false,
      "description": ""
    },
    "valuePrepend": {
      "type": {
        "name": "node"
      },
      "required": false,
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
    "name": {
      "type": {
        "name": "string"
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
    "compressed": {
      "type": {
        "name": "bool"
      },
      "required": false,
      "description": ""
    }
  }
};