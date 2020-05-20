"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorManager = void 0;

var _eui = require("@elastic/eui");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

var _color_dot = require("../color_dot/color_dot");

var _components = require("../../../i18n/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _components.ComponentStrings.ColorManager;

var ColorManager = function ColorManager(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      onAddColor = _ref.onAddColor,
      onRemoveColor = _ref.onRemoveColor,
      _onChange = _ref.onChange,
      _ref$hasButtons = _ref.hasButtons,
      hasButtons = _ref$hasButtons === void 0 ? false : _ref$hasButtons;
  var tc = (0, _tinycolor.default)(value);
  var validColor = tc.isValid();
  var buttons = null;

  if (hasButtons) {
    buttons = _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonIcon, {
      "aria-label": strings.getAddAriaLabel(),
      iconType: "plusInCircle",
      isDisabled: !validColor || !onAddColor,
      onClick: function onClick() {
        return onAddColor && onAddColor(value);
      }
    }), _react.default.createElement(_eui.EuiButtonIcon, {
      "aria-label": strings.getRemoveAriaLabel(),
      iconType: "minusInCircle",
      isDisabled: !validColor || !onRemoveColor,
      onClick: function onClick() {
        return onRemoveColor && onRemoveColor(value);
      }
    }));
  }

  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_color_dot.ColorDot, {
    value: validColor ? value : undefined
  })), _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      display: 'inline-block'
    }
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: value,
    isInvalid: !validColor && value.length > 0,
    placeholder: strings.getCodePlaceholder(),
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    }
  })), buttons);
};

exports.ColorManager = ColorManager;
ColorManager.propTypes = {
  hasButtons: _propTypes.default.bool,
  onAddColor: _propTypes.default.func,
  onChange: _propTypes.default.func.isRequired,
  onRemoveColor: _propTypes.default.func,
  value: _propTypes.default.string
};