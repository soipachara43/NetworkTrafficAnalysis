"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.templateSpecs = void 0;

var _templates = require("../../i18n/templates");

var _theme_dark = _interopRequireDefault(require("./theme_dark.json"));

var _theme_light = _interopRequireDefault(require("./theme_light.json"));

var _status_report = _interopRequireDefault(require("./status_report.json"));

var _summary_report = _interopRequireDefault(require("./summary_report.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// import pitchTemplate from './pitch_presentation.json';
// Registry expects a function that returns a spec object
const templateSpecs = (0, _templates.applyTemplateStrings)([_theme_dark.default, _theme_light.default, // pitchTemplate,
_status_report.default, _summary_report.default]);
exports.templateSpecs = templateSpecs;