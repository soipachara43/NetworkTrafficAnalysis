"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_EVENTS = exports.VIEW_ALERTS = exports.SIGNAL_COUNT = exports.RECENT_TIMELINES = exports.RECENT_CASES = exports.PAGE_SUBTITLE = exports.PAGE_TITLE = exports.NEWS_FEED_TITLE = exports.EVENTS = exports.ALERTS_GRAPH_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ALERTS_GRAPH_TITLE = _i18n.i18n.translate('xpack.siem.overview.alertsGraphTitle', {
  defaultMessage: 'External alert count'
});

exports.ALERTS_GRAPH_TITLE = ALERTS_GRAPH_TITLE;

var EVENTS = _i18n.i18n.translate('xpack.siem.overview.eventsTitle', {
  defaultMessage: 'Event count'
});

exports.EVENTS = EVENTS;

var NEWS_FEED_TITLE = _i18n.i18n.translate('xpack.siem.overview.newsFeedSidebarTitle', {
  defaultMessage: 'Security news'
});

exports.NEWS_FEED_TITLE = NEWS_FEED_TITLE;

var PAGE_TITLE = _i18n.i18n.translate('xpack.siem.overview.pageTitle', {
  defaultMessage: 'SIEM'
});

exports.PAGE_TITLE = PAGE_TITLE;

var PAGE_SUBTITLE = _i18n.i18n.translate('xpack.siem.overview.pageSubtitle', {
  defaultMessage: 'Security Information & Event Management with the Elastic Stack'
});

exports.PAGE_SUBTITLE = PAGE_SUBTITLE;

var RECENT_CASES = _i18n.i18n.translate('xpack.siem.overview.recentCasesSidebarTitle', {
  defaultMessage: 'Recent cases'
});

exports.RECENT_CASES = RECENT_CASES;

var RECENT_TIMELINES = _i18n.i18n.translate('xpack.siem.overview.recentTimelinesSidebarTitle', {
  defaultMessage: 'Recent timelines'
});

exports.RECENT_TIMELINES = RECENT_TIMELINES;

var SIGNAL_COUNT = _i18n.i18n.translate('xpack.siem.overview.signalCountTitle', {
  defaultMessage: 'Signal count'
});

exports.SIGNAL_COUNT = SIGNAL_COUNT;

var VIEW_ALERTS = _i18n.i18n.translate('xpack.siem.overview.viewAlertsButtonLabel', {
  defaultMessage: 'View alerts'
});

exports.VIEW_ALERTS = VIEW_ALERTS;

var VIEW_EVENTS = _i18n.i18n.translate('xpack.siem.overview.viewEventsButtonLabel', {
  defaultMessage: 'View events'
});

exports.VIEW_EVENTS = VIEW_EVENTS;