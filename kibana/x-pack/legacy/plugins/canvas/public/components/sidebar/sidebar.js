"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = void 0;

var _react = _interopRequireDefault(require("react"));

var _sidebar_content = require("./sidebar_content");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore unconverted component
var Sidebar = function Sidebar(_ref) {
  var commit = _ref.commit;
  return _react.default.createElement("div", {
    className: "canvasSidebar"
  }, _react.default.createElement(_sidebar_content.SidebarContent, {
    commit: commit
  }));
};

exports.Sidebar = Sidebar;