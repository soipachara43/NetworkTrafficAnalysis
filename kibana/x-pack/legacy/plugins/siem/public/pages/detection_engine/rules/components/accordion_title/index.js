"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccordionTitle = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _status_icon = require("../status_icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AccordionTitleComponent = function AccordionTitleComponent(_ref) {
  var name = _ref.name,
      title = _ref.title,
      type = _ref.type;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "m",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_status_icon.RuleStatusIcon, {
    name: name,
    type: type
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s",
    className: "euiAccordionForm__title"
  }, _react.default.createElement("h6", null, title))));
};

var AccordionTitle = _react.default.memo(AccordionTitleComponent);

exports.AccordionTitle = AccordionTitle;