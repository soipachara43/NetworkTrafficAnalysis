"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkspacePanelWrapper = WorkspacePanelWrapper;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function WorkspacePanelWrapper(_ref) {
  var children = _ref.children,
      title = _ref.title;
  return _react.default.createElement(_eui.EuiPageContent, {
    className: "lnsWorkspacePanelWrapper"
  }, title && _react.default.createElement(_eui.EuiPageContentHeader, {
    className: "lnsWorkspacePanelWrapper__pageContentHeader"
  }, _react.default.createElement("span", {
    "data-test-subj": "lns_ChartTitle"
  }, title)), _react.default.createElement(_eui.EuiPageContentBody, {
    className: "lnsWorkspacePanelWrapper__pageContentBody"
  }, children));
}