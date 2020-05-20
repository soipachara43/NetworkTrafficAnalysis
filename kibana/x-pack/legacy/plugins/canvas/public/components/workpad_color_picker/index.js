"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkpadColorPicker = void 0;

var _reactRedux = require("react-redux");

var _workpad = require("../../state/actions/workpad");

var _workpad2 = require("../../state/selectors/workpad");

var _workpad_color_picker = require("../workpad_color_picker/workpad_color_picker");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var mapStateToProps = function mapStateToProps(state) {
  return {
    colors: (0, _workpad2.getWorkpadColors)(state)
  };
};

var mapDispatchToProps = {
  onAddColor: _workpad.addColor,
  onRemoveColor: _workpad.removeColor
};
var WorkpadColorPicker = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_workpad_color_picker.WorkpadColorPicker);
exports.WorkpadColorPicker = WorkpadColorPicker;