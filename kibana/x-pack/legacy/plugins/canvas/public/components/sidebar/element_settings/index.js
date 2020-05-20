"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementSettings = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _workpad = require("../../../state/selectors/workpad");

var _element_settings = require("./element_settings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var mapStateToProps = function mapStateToProps(state, _ref) {
  var selectedElementId = _ref.selectedElementId;
  return {
    element: (0, _workpad.getElementById)(state, selectedElementId, (0, _workpad.getSelectedPage)(state))
  };
};

var renderIfElement = function renderIfElement(props) {
  if (props.element) {
    return _react.default.createElement(_element_settings.ElementSettings, {
      element: props.element
    });
  }

  return null;
};

var ElementSettings = (0, _reactRedux.connect)(mapStateToProps)(renderIfElement);
exports.ElementSettings = ElementSettings;