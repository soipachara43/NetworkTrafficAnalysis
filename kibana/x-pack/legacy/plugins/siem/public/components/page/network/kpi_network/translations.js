"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DESTINATION_CHART_LABEL = exports.SOURCE_CHART_LABEL = exports.DESTINATION_UNIT_LABEL = exports.SOURCE_UNIT_LABEL = exports.UNIQUE_PRIVATE_IPS = exports.TLS_HANDSHAKES = exports.DNS_QUERIES = exports.UNIQUE_FLOW_IDS = exports.NETWORK_EVENTS = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NETWORK_EVENTS = _i18n.i18n.translate('xpack.siem.kpiNetwork.networkEvents.title', {
  defaultMessage: 'Network events'
});

exports.NETWORK_EVENTS = NETWORK_EVENTS;

var UNIQUE_FLOW_IDS = _i18n.i18n.translate('xpack.siem.kpiNetwork.uniqueFlowIds.title', {
  defaultMessage: 'Unique flow IDs'
});

exports.UNIQUE_FLOW_IDS = UNIQUE_FLOW_IDS;

var DNS_QUERIES = _i18n.i18n.translate('xpack.siem.kpiNetwork.dnsQueries.title', {
  defaultMessage: 'DNS queries'
});

exports.DNS_QUERIES = DNS_QUERIES;

var TLS_HANDSHAKES = _i18n.i18n.translate('xpack.siem.kpiNetwork.tlsHandshakes.title', {
  defaultMessage: 'TLS handshakes'
});

exports.TLS_HANDSHAKES = TLS_HANDSHAKES;

var UNIQUE_PRIVATE_IPS = _i18n.i18n.translate('xpack.siem.kpiNetwork.uniquePrivateIps.title', {
  defaultMessage: 'Unique private IPs'
});

exports.UNIQUE_PRIVATE_IPS = UNIQUE_PRIVATE_IPS;

var SOURCE_UNIT_LABEL = _i18n.i18n.translate('xpack.siem.kpiNetwork.uniquePrivateIps.sourceUnitLabel', {
  defaultMessage: 'source'
});

exports.SOURCE_UNIT_LABEL = SOURCE_UNIT_LABEL;

var DESTINATION_UNIT_LABEL = _i18n.i18n.translate('xpack.siem.kpiNetwork.uniquePrivateIps.destinationUnitLabel', {
  defaultMessage: 'destination'
});

exports.DESTINATION_UNIT_LABEL = DESTINATION_UNIT_LABEL;

var SOURCE_CHART_LABEL = _i18n.i18n.translate('xpack.siem.kpiNetwork.uniquePrivateIps.sourceChartLabel', {
  defaultMessage: 'Src.'
});

exports.SOURCE_CHART_LABEL = SOURCE_CHART_LABEL;

var DESTINATION_CHART_LABEL = _i18n.i18n.translate('xpack.siem.kpiNetwork.uniquePrivateIps.destinationChartLabel', {
  defaultMessage: 'Dest.'
});

exports.DESTINATION_CHART_LABEL = DESTINATION_CHART_LABEL;