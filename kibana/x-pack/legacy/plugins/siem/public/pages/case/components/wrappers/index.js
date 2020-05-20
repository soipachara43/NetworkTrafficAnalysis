"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionWrapper = exports.WhitePageWrapper = void 0;

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WhitePageWrapper = _styledComponents.default.div.withConfig({
  displayName: "WhitePageWrapper",
  componentId: "lm7zv2-0"
})(["", ""], function (_ref) {
  var theme = _ref.theme;
  return (0, _styledComponents.css)(["background-color:", ";border-top:", ";height:100%;min-height:100vh;"], theme.eui.euiColorEmptyShade, theme.eui.euiBorderThin);
});

exports.WhitePageWrapper = WhitePageWrapper;

var SectionWrapper = _styledComponents.default.div.withConfig({
  displayName: "SectionWrapper",
  componentId: "lm7zv2-1"
})(["box-sizing:content-box;margin:0 auto;max-width:1175px;"]);

exports.SectionWrapper = SectionWrapper;