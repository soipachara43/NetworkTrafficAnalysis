"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNIT = exports.LOADING_EVENTS = exports.EVENTS = exports.ERROR_FETCHING_EVENTS_DATA = exports.SHOWING = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SHOWING = _i18n.i18n.translate('xpack.siem.eventsViewer.showingLabel', {
  defaultMessage: 'Showing'
});

exports.SHOWING = SHOWING;

var ERROR_FETCHING_EVENTS_DATA = _i18n.i18n.translate('xpack.siem.eventsViewer.errorFetchingEventsData', {
  defaultMessage: 'Failed to query events data'
});

exports.ERROR_FETCHING_EVENTS_DATA = ERROR_FETCHING_EVENTS_DATA;

var EVENTS = _i18n.i18n.translate('xpack.siem.eventsViewer.eventsLabel', {
  defaultMessage: 'Events'
});

exports.EVENTS = EVENTS;

var LOADING_EVENTS = _i18n.i18n.translate('xpack.siem.eventsViewer.footer.loadingEventsDataLabel', {
  defaultMessage: 'Loading Events'
});

exports.LOADING_EVENTS = LOADING_EVENTS;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.eventsViewer.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {event} other {events}}"
  });
};

exports.UNIT = UNIT;