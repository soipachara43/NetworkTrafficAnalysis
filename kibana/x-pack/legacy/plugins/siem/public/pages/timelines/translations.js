"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ALL_TIMELINES_IMPORT_TIMELINE_TITLE = exports.ALL_TIMELINES_PANEL_TITLE = exports.PAGE_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.timelines.pageTitle', {
  defaultMessage: 'Timelines'
});

exports.PAGE_TITLE = PAGE_TITLE;

var ALL_TIMELINES_PANEL_TITLE = _i18n.i18n.translate('xpack.siem.timelines.allTimelines.panelTitle', {
  defaultMessage: 'All timelines'
});

exports.ALL_TIMELINES_PANEL_TITLE = ALL_TIMELINES_PANEL_TITLE;

var ALL_TIMELINES_IMPORT_TIMELINE_TITLE = _i18n.i18n.translate('xpack.siem.timelines.allTimelines.importTimelineTitle', {
  defaultMessage: 'Import Timeline'
});

exports.ALL_TIMELINES_IMPORT_TIMELINE_TITLE = ALL_TIMELINES_IMPORT_TIMELINE_TITLE;