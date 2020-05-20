"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpContext = HttpContext;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _variables = require("../../../../../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ContextUrl = _styledComponents.default.div.withConfig({
  displayName: "ContextUrl",
  componentId: "uvknbf-0"
})(["padding:", " ", ";background:", ";border-radius:", ";border:1px solid ", ";font-family:", ";font-size:", ";"], (0, _variables.px)(_variables.units.half), (0, _variables.px)(_variables.unit), _eui_theme_light.default.euiColorLightestShade, _variables.borderRadius, _eui_theme_light.default.euiColorLightShade, _variables.fontFamilyCode, _variables.fontSize);

function HttpContext(_ref) {
  var _httpContext$url;

  var httpContext = _ref.httpContext;
  var url = httpContext === null || httpContext === void 0 ? void 0 : (_httpContext$url = httpContext.url) === null || _httpContext$url === void 0 ? void 0 : _httpContext$url.original;

  if (!url) {
    return null;
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, "HTTP URL")), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(ContextUrl, null, url), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }));
}