import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
export var LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];
export var EuiRangeLevels = function EuiRangeLevels(_ref) {
  var _ref$levels = _ref.levels,
      levels = _ref$levels === void 0 ? [] : _ref$levels,
      max = _ref.max,
      min = _ref.min,
      showTicks = _ref.showTicks,
      compressed = _ref.compressed;

  var validateLevelIsInRange = function validateLevelIsInRange(level) {
    if (level.min < min) {
      throw new Error("The level min of ".concat(level.min, " is lower than the min value of ").concat(min, "."));
    }

    if (level.max > max) {
      throw new Error("The level max of ".concat(level.max, " is higher than the max value of ").concat(max, "."));
    }
  };

  var classes = classNames('euiRangeLevels', {
    'euiRangeLevels--hasTicks': showTicks,
    'euiRangeLevels--compressed': compressed
  });
  return React.createElement("div", {
    className: classes
  }, levels.map(function (level, index) {
    validateLevelIsInRange(level);
    var range = level.max - level.min;
    var width = range / (max - min) * 100;
    return React.createElement("span", {
      key: index,
      style: {
        width: "".concat(width, "%")
      },
      className: "euiRangeLevel euiRangeLevel--".concat(level.color)
    });
  }));
};
EuiRangeLevels.propTypes = {
  levels: PropTypes.arrayOf(PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    color: PropTypes.oneOf(["primary", "success", "warning", "danger"]).isRequired
  }).isRequired),
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  showTicks: PropTypes.bool,
  compressed: PropTypes.bool
};
EuiRangeLevels.__docgenInfo = {
  "description": "",
  "methods": [],
  "displayName": "EuiRangeLevels",
  "props": {
    "levels": {
      "defaultValue": {
        "value": "[]",
        "computed": false
      },
      "type": {
        "name": "arrayOf",
        "value": {
          "name": "shape",
          "value": {
            "min": {
              "name": "number",
              "required": true
            },
            "max": {
              "name": "number",
              "required": true
            },
            "color": {
              "name": "enum",
              "value": [{
                "value": "\"primary\"",
                "computed": false
              }, {
                "value": "\"success\"",
                "computed": false
              }, {
                "value": "\"warning\"",
                "computed": false
              }, {
                "value": "\"danger\"",
                "computed": false
              }],
              "required": true
            }
          }
        }
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