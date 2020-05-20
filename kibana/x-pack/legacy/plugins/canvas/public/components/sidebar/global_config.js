"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalConfig = void 0;

var _react = _interopRequireWildcard(require("react"));

var _element_config = require("../element_config");

var _page_config = require("../page_config");

var _workpad_config = require("../workpad_config");

var _sidebar_section = require("./sidebar_section");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore unconverted component
// @ts-ignore unconverted component
// @ts-ignore unconverted component
// @ts-ignore unconverted component
var GlobalConfig = function GlobalConfig() {
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_sidebar_section.SidebarSection, null, _react.default.createElement(_workpad_config.WorkpadConfig, null)), _react.default.createElement(_sidebar_section.SidebarSection, null, _react.default.createElement(_element_config.ElementConfig, null)), _react.default.createElement(_sidebar_section.SidebarSection, null, _react.default.createElement(_page_config.PageConfig, null)));
};

exports.GlobalConfig = GlobalConfig;