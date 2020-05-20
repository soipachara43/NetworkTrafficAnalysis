"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleTemplate = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _objectPathImmutable = _interopRequireDefault(require("object-path-immutable"));

var _lodash = require("lodash");

var _color_picker_popover = require("../../../components/color_picker_popover");

var _tooltip_icon = require("../../../components/tooltip_icon");

var _i18n = require("../../../../i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var set = _objectPathImmutable.default.set,
    del = _objectPathImmutable.default.del;
var strings = _i18n.ArgTypesStrings.SeriesStyle;

var SimpleTemplate = function SimpleTemplate(props) {
  var typeInstance = props.typeInstance,
      argValue = props.argValue,
      onValueChange = props.onValueChange,
      labels = props.labels,
      workpad = props.workpad;
  var name = typeInstance.name;
  var chain = (0, _lodash.get)(argValue, 'chain.0', {});
  var chainArgs = (0, _lodash.get)(chain, 'arguments', {});
  var color = (0, _lodash.get)(chainArgs, 'color.0', '');

  var handleChange = function handleChange(argName, val) {
    var fn = val === '' ? del : set;
    var newValue = fn(argValue, "chain.0.arguments.".concat(argName), [val]);
    return onValueChange(newValue);
  };

  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    alignItems: "center",
    className: "canvasArgSeries__colorPicker"
  }, !color || color.length === 0 ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, strings.getColorLabel())), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_eui.EuiLink, {
    "aria-label": "".concat(strings.getColorLabel(), ": ").concat(strings.getColorValueDefault()),
    onClick: function onClick() {
      return handleChange('color', '#000000');
    }
  }, strings.getColorValueDefault())))) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("label", {
    htmlFor: "series-style"
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, strings.getColorLabel()))), _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      fontSize: 0
    }
  }, _react.default.createElement(_color_picker_popover.ColorPickerPopover, {
    anchorPosition: "leftCenter",
    colors: workpad.colors,
    onChange: function onChange(val) {
      return handleChange('color', val);
    },
    value: color,
    ariaLabel: strings.getColorLabel()
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "cross",
    color: "danger",
    onClick: function onClick() {
      return handleChange('color', '');
    },
    "aria-label": strings.getRemoveAriaLabel()
  }))), name !== 'defaultStyle' && (!labels || labels.length === 0) && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_tooltip_icon.TooltipIcon, {
    position: "left",
    icon: _tooltip_icon.IconType.warning,
    content: strings.getNoSeriesTooltip()
  })));
};

exports.SimpleTemplate = SimpleTemplate;
SimpleTemplate.displayName = 'SeriesStyleArgSimpleInput';
SimpleTemplate.propTypes = {
  argValue: _propTypes.default.any.isRequired,
  labels: _propTypes.default.array,
  onValueChange: _propTypes.default.func.isRequired,
  workpad: _propTypes.default.shape({
    colors: _propTypes.default.array.isRequired
  }).isRequired
};