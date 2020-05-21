"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiRangeHighlight = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EuiRangeHighlight = function EuiRangeHighlight(_ref) {
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
  var classes = (0, _classnames.default)('euiRangeHighlight', {
    'euiRangeHighlight--hasTicks': showTicks,
    'euiRangeHighlight--compressed': compressed
  }, className);
  var progressClasses = (0, _classnames.default)('euiRangeHighlight__progress', {
    'euiRangeHighlight__progress--hasFocus': hasFocus
  });
  return _react.default.createElement("div", {
    className: classes,
    onClick: onClick
  }, _react.default.createElement("div", {
    className: progressClasses,
    style: rangeWidthStyle
  }));
};

exports.EuiRangeHighlight = EuiRangeHighlight;
EuiRangeHighlight.propTypes = {
  className: _propTypes.default.string,
  background: _propTypes.default.string,
  compressed: _propTypes.default.bool,
  hasFocus: _propTypes.default.bool,
  showTicks: _propTypes.default.bool,
  lowerValue: _propTypes.default.number.isRequired,
  upperValue: _propTypes.default.number.isRequired,
  max: _propTypes.default.number.isRequired,
  min: _propTypes.default.number.isRequired,
  onClick: _propTypes.default.func
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