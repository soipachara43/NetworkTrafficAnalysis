"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINK_ELASTIC_ENDPOINT_SECURITY = exports.NON_EXISTENT = exports.IN = exports.SOURCE = exports.PROTOCOL = exports.DESTINATION = exports.TCP = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TCP = _i18n.i18n.translate('xpack.siem.timeline.tcp', {
  defaultMessage: 'TCP'
});

exports.TCP = TCP;

var DESTINATION = _i18n.i18n.translate('xpack.siem.timeline.destination', {
  defaultMessage: 'Destination'
});

exports.DESTINATION = DESTINATION;

var PROTOCOL = _i18n.i18n.translate('xpack.siem.timeline.protocol', {
  defaultMessage: 'Protocol'
});

exports.PROTOCOL = PROTOCOL;

var SOURCE = _i18n.i18n.translate('xpack.siem.timeline.source', {
  defaultMessage: 'Source'
});

exports.SOURCE = SOURCE;

var IN = _i18n.i18n.translate('xpack.siem.auditd.inDescription', {
  defaultMessage: 'in'
});

exports.IN = IN;

var NON_EXISTENT = _i18n.i18n.translate('xpack.siem.auditd.nonExistentDescription', {
  defaultMessage: 'an unknown process'
});

exports.NON_EXISTENT = NON_EXISTENT;

var LINK_ELASTIC_ENDPOINT_SECURITY = _i18n.i18n.translate('xpack.siem.event.module.linkToElasticEndpointSecurityDescription', {
  defaultMessage: 'Open in Elastic Endpoint Security'
});

exports.LINK_ELASTIC_ENDPOINT_SECURITY = LINK_ELASTIC_ENDPOINT_SECURITY;