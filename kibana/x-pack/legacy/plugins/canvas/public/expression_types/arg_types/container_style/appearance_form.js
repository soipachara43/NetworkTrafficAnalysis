"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppearanceForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _i18n.ArgTypesStrings.ContainerStyle;
var overflows = [{
  value: 'hidden',
  text: strings.getOverflowHiddenOption()
}, {
  value: 'visible',
  text: strings.getOverflowVisibleOption()
}];
var opacities = [{
  value: 1,
  text: '100%'
}, {
  value: 0.9,
  text: '90%'
}, {
  value: 0.7,
  text: '70%'
}, {
  value: 0.5,
  text: '50%'
}, {
  value: 0.3,
  text: '30%'
}, {
  value: 0.1,
  text: '10%'
}];

var AppearanceForm = function AppearanceForm(_ref) {
  var _ref$padding = _ref.padding,
      padding = _ref$padding === void 0 ? '' : _ref$padding,
      _ref$opacity = _ref.opacity,
      opacity = _ref$opacity === void 0 ? 1 : _ref$opacity,
      _ref$overflow = _ref.overflow,
      overflow = _ref$overflow === void 0 ? 'hidden' : _ref$overflow,
      onChange = _ref.onChange;

  if (typeof padding === 'string') {
    padding = padding.replace('px', '');
  }

  var namedChange = function namedChange(name) {
    return function (ev) {
      if (name === 'padding') {
        return onChange(name, "".concat(ev.target.value, "px"));
      }

      onChange(name, ev.target.value);
    };
  };

  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    "justify-content": "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 2
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getPaddingLabel(),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    compressed: true,
    value: Number(padding),
    onChange: namedChange('padding')
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 3
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getOpacityLabel(),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiSelect, {
    compressed: true,
    value: opacity,
    options: opacities,
    onChange: namedChange('opacity')
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 3
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: strings.getOverflowLabel(),
    display: "rowCompressed"
  }, _react.default.createElement(_eui.EuiSelect, {
    compressed: true,
    value: overflow,
    options: overflows,
    onChange: namedChange('overflow')
  }))));
};

exports.AppearanceForm = AppearanceForm;
AppearanceForm.propTypes = {
  padding: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  opacity: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  overflow: _propTypes.default.oneOf(['hidden', 'visible']),
  onChange: _propTypes.default.func.isRequired
};
AppearanceForm.defaultProps = {
  opacity: 1,
  overflow: 'hidden'
};