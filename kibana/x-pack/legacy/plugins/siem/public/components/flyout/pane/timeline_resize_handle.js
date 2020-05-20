"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineResizeHandle = exports.TIMELINE_RESIZE_HANDLE_WIDTH = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TIMELINE_RESIZE_HANDLE_WIDTH = 2; // px

exports.TIMELINE_RESIZE_HANDLE_WIDTH = TIMELINE_RESIZE_HANDLE_WIDTH;

var TimelineResizeHandle = _styledComponents.default.div.withConfig({
  displayName: "TimelineResizeHandle",
  componentId: "sc-16v01wj-0"
})(["cursor:col-resize;height:100%;min-height:20px;width:0;border:", "px solid ", ";z-index:2;height:", ";position:absolute;"], TIMELINE_RESIZE_HANDLE_WIDTH, function (props) {
  return props.theme.eui.euiColorLightShade;
}, function (_ref) {
  var height = _ref.height;
  return "".concat(height, "px");
});

exports.TimelineResizeHandle = TimelineResizeHandle;