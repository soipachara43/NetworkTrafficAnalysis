"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INSERT_TIMELINE = exports.SEARCH_BOX_TIMELINE_PLACEHOLDER = exports.DEFAULT_TIMELINE_DESCRIPTION = exports.DEFAULT_TIMELINE_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DEFAULT_TIMELINE_TITLE = _i18n.i18n.translate('xpack.siem.timeline.defaultTimelineTitle', {
  defaultMessage: 'Default blank timeline'
});

exports.DEFAULT_TIMELINE_TITLE = DEFAULT_TIMELINE_TITLE;

var DEFAULT_TIMELINE_DESCRIPTION = _i18n.i18n.translate('xpack.siem.timeline.defaultTimelineDescription', {
  defaultMessage: 'Timeline offered by default when creating new timeline.'
});

exports.DEFAULT_TIMELINE_DESCRIPTION = DEFAULT_TIMELINE_DESCRIPTION;

var SEARCH_BOX_TIMELINE_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.timeline.searchBoxPlaceholder', {
  defaultMessage: 'e.g. timeline name or description'
});

exports.SEARCH_BOX_TIMELINE_PLACEHOLDER = SEARCH_BOX_TIMELINE_PLACEHOLDER;

var INSERT_TIMELINE = _i18n.i18n.translate('xpack.siem.insert.timeline.insertTimelineButton', {
  defaultMessage: 'Insert timeline link'
});

exports.INSERT_TIMELINE = INSERT_TIMELINE;