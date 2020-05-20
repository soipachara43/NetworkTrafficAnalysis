"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UptimeThemeContextProvider = exports.UptimeThemeContext = void 0;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _react = _interopRequireWildcard(require("react"));

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * These are default values for the context. These defaults are typically
 * overwritten by the Uptime App upon its invocation.
 */
var defaultContext = {
  colors: {
    danger: _eui_theme_light.default.euiColorDanger,
    mean: _eui_theme_light.default.euiColorPrimary,
    range: _eui_theme_light.default.euiFocusBackgroundColor,
    success: _eui_theme_light.default.euiColorSuccess,
    warning: _eui_theme_light.default.euiColorWarning,
    gray: _eui_theme_light.default.euiColorLightShade
  }
};
var UptimeThemeContext = (0, _react.createContext)(defaultContext);
exports.UptimeThemeContext = UptimeThemeContext;

var UptimeThemeContextProvider = function UptimeThemeContextProvider(_ref) {
  var darkMode = _ref.darkMode,
      children = _ref.children;
  var colors;

  if (darkMode) {
    colors = {
      danger: _eui_theme_dark.default.euiColorDanger,
      mean: _eui_theme_dark.default.euiColorPrimary,
      gray: _eui_theme_dark.default.euiColorLightShade,
      range: _eui_theme_dark.default.euiFocusBackgroundColor,
      success: _eui_theme_dark.default.euiColorSuccess,
      warning: _eui_theme_dark.default.euiColorWarning
    };
  } else {
    colors = {
      danger: _eui_theme_light.default.euiColorDanger,
      mean: _eui_theme_light.default.euiColorPrimary,
      gray: _eui_theme_light.default.euiColorLightShade,
      range: _eui_theme_light.default.euiFocusBackgroundColor,
      success: _eui_theme_light.default.euiColorSuccess,
      warning: _eui_theme_light.default.euiColorWarning
    };
  }

  var value = (0, _react.useMemo)(function () {
    return {
      colors: colors
    };
  }, [colors]);
  return _react.default.createElement(UptimeThemeContext.Provider, {
    value: value,
    children: children
  });
};

exports.UptimeThemeContextProvider = UptimeThemeContextProvider;