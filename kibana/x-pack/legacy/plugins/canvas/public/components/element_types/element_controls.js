"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementControls = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _eui = require("@elastic/eui");

var _components = require("../../../i18n/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var strings = _components.ComponentStrings.ElementControls;

var ElementControls = function ElementControls(_ref) {
  var onDelete = _ref.onDelete,
      onEdit = _ref.onEdit;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    className: "canvasElementCard__controls",
    gutterSize: "xs",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: strings.getEditTooltip()
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "pencil",
    "aria-label": strings.getEditAriaLabel(),
    onClick: onEdit
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: strings.getDeleteTooltip()
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    color: "danger",
    iconType: "trash",
    "aria-label": strings.getDeleteAriaLabel(),
    onClick: onDelete
  }))));
};

exports.ElementControls = ElementControls;
ElementControls.propTypes = {
  onDelete: _propTypes.default.func.isRequired,
  onEdit: _propTypes.default.func.isRequired
};