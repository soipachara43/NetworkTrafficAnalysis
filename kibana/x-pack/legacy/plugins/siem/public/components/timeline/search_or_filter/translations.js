"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SIGNAL_EVENT = exports.RAW_EVENT = exports.ALL_EVENT = exports.FILTER_OR_SEARCH_WITH_KQL = exports.SEARCH_KQL_SELECTED_TEXT = exports.SEARCH_KQL_PLACEHOLDER = exports.SEARCH_KQL_TOOLTIP = exports.SEARCH_DESCRIPTION = exports.FILTER_KQL_SELECTED_TEXT = exports.FILTER_KQL_PLACEHOLDER = exports.FILTER_KQL_TOOLTIP = exports.FILTER_DESCRIPTION = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FILTER_DESCRIPTION = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.filterDescription', {
  defaultMessage: 'Events from the data providers above are filtered by the adjacent KQL'
});

exports.FILTER_DESCRIPTION = FILTER_DESCRIPTION;

var FILTER_KQL_TOOLTIP = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.filterKqlTooltip', {
  defaultMessage: 'Events from the data providers above are filtered by this KQL'
});

exports.FILTER_KQL_TOOLTIP = FILTER_KQL_TOOLTIP;

var FILTER_KQL_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.filterKqlPlaceholder', {
  defaultMessage: 'Filter events'
});

exports.FILTER_KQL_PLACEHOLDER = FILTER_KQL_PLACEHOLDER;

var FILTER_KQL_SELECTED_TEXT = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.filterKqlSelectedText', {
  defaultMessage: 'Filter'
});

exports.FILTER_KQL_SELECTED_TEXT = FILTER_KQL_SELECTED_TEXT;

var SEARCH_DESCRIPTION = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.searchDescription', {
  defaultMessage: 'Events from the data providers above are combined with results from the adjacent KQL'
});

exports.SEARCH_DESCRIPTION = SEARCH_DESCRIPTION;

var SEARCH_KQL_TOOLTIP = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.searchKqlTooltip', {
  defaultMessage: 'Events from the data providers above are combined with results from this KQL'
});

exports.SEARCH_KQL_TOOLTIP = SEARCH_KQL_TOOLTIP;

var SEARCH_KQL_PLACEHOLDER = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.searchKqlPlaceholder', {
  defaultMessage: 'Search events'
});

exports.SEARCH_KQL_PLACEHOLDER = SEARCH_KQL_PLACEHOLDER;

var SEARCH_KQL_SELECTED_TEXT = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.searchKqlSelectedText', {
  defaultMessage: 'Search'
});

exports.SEARCH_KQL_SELECTED_TEXT = SEARCH_KQL_SELECTED_TEXT;

var FILTER_OR_SEARCH_WITH_KQL = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.filterOrSearchWithKql', {
  defaultMessage: 'Filter or Search with KQL'
});

exports.FILTER_OR_SEARCH_WITH_KQL = FILTER_OR_SEARCH_WITH_KQL;

var ALL_EVENT = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.eventTypeAllEvent', {
  defaultMessage: 'All events'
});

exports.ALL_EVENT = ALL_EVENT;

var RAW_EVENT = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.eventTypeRawEvent', {
  defaultMessage: 'Raw events'
});

exports.RAW_EVENT = RAW_EVENT;

var SIGNAL_EVENT = _i18n.i18n.translate('xpack.siem.timeline.searchOrFilter.eventTypeSignalEvent', {
  defaultMessage: 'Signal events'
});

exports.SIGNAL_EVENT = SIGNAL_EVENT;