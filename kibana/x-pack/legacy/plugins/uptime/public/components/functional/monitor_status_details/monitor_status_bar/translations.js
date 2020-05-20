"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadingMessage = exports.timestampFromNowTextAriaLabel = exports.durationTextAriaLabel = exports.monitorUrlLinkAriaLabel = exports.downLabel = exports.upLabel = exports.healthStatusMessageAriaLabel = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var healthStatusMessageAriaLabel = _i18n.i18n.translate('xpack.uptime.monitorStatusBar.healthStatusMessageAriaLabel', {
  defaultMessage: 'Monitor status'
});

exports.healthStatusMessageAriaLabel = healthStatusMessageAriaLabel;

var upLabel = _i18n.i18n.translate('xpack.uptime.monitorStatusBar.healthStatusMessage.upLabel', {
  defaultMessage: 'Up'
});

exports.upLabel = upLabel;

var downLabel = _i18n.i18n.translate('xpack.uptime.monitorStatusBar.healthStatusMessage.downLabel', {
  defaultMessage: 'Down'
});

exports.downLabel = downLabel;

var monitorUrlLinkAriaLabel = _i18n.i18n.translate('xpack.uptime.monitorStatusBar.monitorUrlLinkAriaLabel', {
  defaultMessage: 'Monitor URL link'
});

exports.monitorUrlLinkAriaLabel = monitorUrlLinkAriaLabel;

var durationTextAriaLabel = _i18n.i18n.translate('xpack.uptime.monitorStatusBar.durationTextAriaLabel', {
  defaultMessage: 'Monitor duration in milliseconds'
});

exports.durationTextAriaLabel = durationTextAriaLabel;

var timestampFromNowTextAriaLabel = _i18n.i18n.translate('xpack.uptime.monitorStatusBar.timestampFromNowTextAriaLabel', {
  defaultMessage: 'Time since last check'
});

exports.timestampFromNowTextAriaLabel = timestampFromNowTextAriaLabel;

var loadingMessage = _i18n.i18n.translate('xpack.uptime.monitorStatusBar.loadingMessage', {
  defaultMessage: 'Loading…'
});

exports.loadingMessage = loadingMessage;