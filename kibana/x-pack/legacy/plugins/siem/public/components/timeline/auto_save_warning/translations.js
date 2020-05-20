"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REFRESH_TIMELINE = exports.DESCRIPTION = exports.TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TITLE = _i18n.i18n.translate('xpack.siem.timeline.autosave.warning.title', {
  defaultMessage: 'Auto-save disabled until refresh'
});

exports.TITLE = TITLE;

var DESCRIPTION = _i18n.i18n.translate('xpack.siem.timeline.autosave.warning.description', {
  defaultMessage: 'Another user has made changes to this timeline. Any changes you make will not be auto-saved until you have refreshed this timeline to absorb those changes.'
});

exports.DESCRIPTION = DESCRIPTION;

var REFRESH_TIMELINE = _i18n.i18n.translate('xpack.siem.timeline.autosave.warning.refresh.title', {
  defaultMessage: 'Refresh timeline'
});

exports.REFRESH_TIMELINE = REFRESH_TIMELINE;