"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "css", {
  enumerable: true,
  get: function () {
    return _eui_styled_components.css;
  }
});
Object.defineProperty(exports, "euiStyled", {
  enumerable: true,
  get: function () {
    return _eui_styled_components.euiStyled;
  }
});
Object.defineProperty(exports, "EuiTheme", {
  enumerable: true,
  get: function () {
    return _eui_styled_components.EuiTheme;
  }
});
Object.defineProperty(exports, "EuiThemeProvider", {
  enumerable: true,
  get: function () {
    return _eui_styled_components.EuiThemeProvider;
  }
});
Object.defineProperty(exports, "createGlobalStyle", {
  enumerable: true,
  get: function () {
    return _eui_styled_components.createGlobalStyle;
  }
});
Object.defineProperty(exports, "keyframes", {
  enumerable: true,
  get: function () {
    return _eui_styled_components.keyframes;
  }
});
Object.defineProperty(exports, "withTheme", {
  enumerable: true,
  get: function () {
    return _eui_styled_components.withTheme;
  }
});
exports.default = void 0;

var _eui_styled_components = require("./eui_styled_components");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// In order to to mimic the styled-components module we need to ignore the following
// eslint-disable-next-line import/no-default-export
var _default = _eui_styled_components.euiStyled;
exports.default = _default;