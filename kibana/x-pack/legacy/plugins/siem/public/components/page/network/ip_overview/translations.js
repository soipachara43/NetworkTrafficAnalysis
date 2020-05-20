"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INSPECT_TITLE = exports.AS_DESTINATION = exports.AS_SOURCE = exports.VIEW_TALOS_INTELLIGENCE = exports.VIEW_VIRUS_TOTAL = exports.REPUTATION = exports.VIEW_WHOIS = exports.WHOIS = exports.HOST_NAME = exports.HOST_ID = exports.LAST_SEEN = exports.FIRST_SEEN = exports.MAX_ANOMALY_SCORE_BY_JOB = exports.AUTONOMOUS_SYSTEM = exports.LOCATION = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LOCATION = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.locationTitle', {
  defaultMessage: 'Location'
});

exports.LOCATION = LOCATION;

var AUTONOMOUS_SYSTEM = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.autonomousSystemTitle', {
  defaultMessage: 'Autonomous system'
});

exports.AUTONOMOUS_SYSTEM = AUTONOMOUS_SYSTEM;

var MAX_ANOMALY_SCORE_BY_JOB = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.maxAnomalyScoreByJobTitle', {
  defaultMessage: 'Max anomaly score by job'
});

exports.MAX_ANOMALY_SCORE_BY_JOB = MAX_ANOMALY_SCORE_BY_JOB;

var FIRST_SEEN = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.firstSeenTitle', {
  defaultMessage: 'First seen'
});

exports.FIRST_SEEN = FIRST_SEEN;

var LAST_SEEN = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.lastSeenTitle', {
  defaultMessage: 'Last seen'
});

exports.LAST_SEEN = LAST_SEEN;

var HOST_ID = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.hostIdTitle', {
  defaultMessage: 'Host ID'
});

exports.HOST_ID = HOST_ID;

var HOST_NAME = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.hostNameTitle', {
  defaultMessage: 'Host name'
});

exports.HOST_NAME = HOST_NAME;

var WHOIS = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.whoIsTitle', {
  defaultMessage: 'WhoIs'
});

exports.WHOIS = WHOIS;

var VIEW_WHOIS = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.viewWhoisTitle', {
  defaultMessage: 'iana.org'
});

exports.VIEW_WHOIS = VIEW_WHOIS;

var REPUTATION = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.ipReputationTitle', {
  defaultMessage: 'Reputation'
});

exports.REPUTATION = REPUTATION;

var VIEW_VIRUS_TOTAL = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.viewVirusTotalTitle.', {
  defaultMessage: 'virustotal.com'
});

exports.VIEW_VIRUS_TOTAL = VIEW_VIRUS_TOTAL;

var VIEW_TALOS_INTELLIGENCE = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.viewTalosIntelligenceTitle', {
  defaultMessage: 'talosIntelligence.com'
});

exports.VIEW_TALOS_INTELLIGENCE = VIEW_TALOS_INTELLIGENCE;

var AS_SOURCE = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.asSourceDropDownOptionLabel', {
  defaultMessage: 'As Source'
});

exports.AS_SOURCE = AS_SOURCE;

var AS_DESTINATION = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.asDestinationDropDownOptionLabel', {
  defaultMessage: 'As Destination'
});

exports.AS_DESTINATION = AS_DESTINATION;

var INSPECT_TITLE = _i18n.i18n.translate('xpack.siem.network.ipDetails.ipOverview.inspectTitle', {
  defaultMessage: 'IP overview'
});

exports.INSPECT_TITLE = INSPECT_TITLE;