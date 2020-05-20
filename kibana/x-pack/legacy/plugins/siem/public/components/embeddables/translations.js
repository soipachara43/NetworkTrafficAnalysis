"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SERVER = exports.CLIENT = exports.DESTINATION = exports.SOURCE = exports.ASN = exports.LOCATION = exports.SERVER_DOMAIN = exports.CLIENT_DOMAIN = exports.DESTINATION_DOMAIN = exports.SOURCE_DOMAIN = exports.SERVER_IP = exports.CLIENT_IP = exports.DESTINATION_IP = exports.SOURCE_IP = exports.HOST = exports.MAP_TOOL_TIP_FEATURES_FOOTER = exports.MAP_TOOL_TIP_ERROR = exports.FILTER_FOR_VALUE = exports.ERROR_BUTTON = exports.ERROR_TITLE = exports.ERROR_CREATING_EMBEDDABLE = exports.ERROR_CONFIGURING_EMBEDDABLES_API = exports.LINE_LAYER = exports.SERVER_LAYER = exports.CLIENT_LAYER = exports.DESTINATION_LAYER = exports.SOURCE_LAYER = exports.MAP_TITLE = exports.EMBEDDABLE_HEADER_HELP = exports.EMBEDDABLE_HEADER_TITLE = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EMBEDDABLE_HEADER_TITLE = _i18n.i18n.translate('xpack.siem.components.embeddables.embeddedMap.embeddableHeaderTitle', {
  defaultMessage: 'Network map'
});

exports.EMBEDDABLE_HEADER_TITLE = EMBEDDABLE_HEADER_TITLE;

var EMBEDDABLE_HEADER_HELP = _i18n.i18n.translate('xpack.siem.components.embeddables.embeddedMap.embeddableHeaderHelp', {
  defaultMessage: 'Map configuration help'
});

exports.EMBEDDABLE_HEADER_HELP = EMBEDDABLE_HEADER_HELP;

var MAP_TITLE = _i18n.i18n.translate('xpack.siem.components.embeddables.embeddedMap.embeddablePanelTitle', {
  defaultMessage: 'Source -> Destination Point-to-Point Map'
});

exports.MAP_TITLE = MAP_TITLE;

var SOURCE_LAYER = _i18n.i18n.translate('xpack.siem.components.embeddables.embeddedMap.sourceLayerLabel', {
  defaultMessage: 'Source Point'
});

exports.SOURCE_LAYER = SOURCE_LAYER;

var DESTINATION_LAYER = _i18n.i18n.translate('xpack.siem.components.embeddables.embeddedMap.destinationLayerLabel', {
  defaultMessage: 'Destination Point'
});

exports.DESTINATION_LAYER = DESTINATION_LAYER;

var CLIENT_LAYER = _i18n.i18n.translate('xpack.siem.components.embeddables.embeddedMap.clientLayerLabel', {
  defaultMessage: 'Client Point'
});

exports.CLIENT_LAYER = CLIENT_LAYER;

var SERVER_LAYER = _i18n.i18n.translate('xpack.siem.components.embeddables.embeddedMap.serverLayerLabel', {
  defaultMessage: 'Server Point'
});

exports.SERVER_LAYER = SERVER_LAYER;

var LINE_LAYER = _i18n.i18n.translate('xpack.siem.components.embeddables.embeddedMap.lineLayerLabel', {
  defaultMessage: 'Line'
});

exports.LINE_LAYER = LINE_LAYER;

var ERROR_CONFIGURING_EMBEDDABLES_API = _i18n.i18n.translate('xpack.siem.components.embeddables.embeddedMap.errorConfiguringEmbeddableApiTitle', {
  defaultMessage: 'Error configuring Embeddables API'
});

exports.ERROR_CONFIGURING_EMBEDDABLES_API = ERROR_CONFIGURING_EMBEDDABLES_API;

var ERROR_CREATING_EMBEDDABLE = _i18n.i18n.translate('xpack.siem.components.embeddables.embeddedMap.errorCreatingMapEmbeddableTitle', {
  defaultMessage: 'Error creating Map Embeddable'
});

exports.ERROR_CREATING_EMBEDDABLE = ERROR_CREATING_EMBEDDABLE;

var ERROR_TITLE = _i18n.i18n.translate('xpack.siem.components.embeddables.indexPatternsMissingPrompt.errorTitle', {
  defaultMessage: 'Required index patterns not configured'
});

exports.ERROR_TITLE = ERROR_TITLE;

var ERROR_BUTTON = _i18n.i18n.translate('xpack.siem.components.embeddables.indexPatternsMissingPrompt.errorButtonLabel', {
  defaultMessage: 'Configure index patterns'
});

exports.ERROR_BUTTON = ERROR_BUTTON;

var FILTER_FOR_VALUE = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.filterForValueHoverAction', {
  defaultMessage: 'Filter for value'
});

exports.FILTER_FOR_VALUE = FILTER_FOR_VALUE;

var MAP_TOOL_TIP_ERROR = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.errorTitle', {
  defaultMessage: 'Error loading map features'
});

exports.MAP_TOOL_TIP_ERROR = MAP_TOOL_TIP_ERROR;

var MAP_TOOL_TIP_FEATURES_FOOTER = function MAP_TOOL_TIP_FEATURES_FOOTER(currentFeature, totalFeatures) {
  return _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.footerLabel', {
    values: {
      currentFeature: currentFeature,
      totalFeatures: totalFeatures
    },
    defaultMessage: '{currentFeature} of {totalFeatures} {totalFeatures, plural, =1 {feature} other {features}}'
  });
};

exports.MAP_TOOL_TIP_FEATURES_FOOTER = MAP_TOOL_TIP_FEATURES_FOOTER;

var HOST = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.hostTitle', {
  defaultMessage: 'Host'
});

exports.HOST = HOST;

var SOURCE_IP = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.sourceIPTitle', {
  defaultMessage: 'Source IP'
});

exports.SOURCE_IP = SOURCE_IP;

var DESTINATION_IP = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.destinationIPTitle', {
  defaultMessage: 'Destination IP'
});

exports.DESTINATION_IP = DESTINATION_IP;

var CLIENT_IP = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.clientIPTitle', {
  defaultMessage: 'Client IP'
});

exports.CLIENT_IP = CLIENT_IP;

var SERVER_IP = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.serverIPTitle', {
  defaultMessage: 'Server IP'
});

exports.SERVER_IP = SERVER_IP;

var SOURCE_DOMAIN = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.sourceDomainTitle', {
  defaultMessage: 'Source domain'
});

exports.SOURCE_DOMAIN = SOURCE_DOMAIN;

var DESTINATION_DOMAIN = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.destinationDomainTitle', {
  defaultMessage: 'Destination domain'
});

exports.DESTINATION_DOMAIN = DESTINATION_DOMAIN;

var CLIENT_DOMAIN = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.clientDomainTitle', {
  defaultMessage: 'Client domain'
});

exports.CLIENT_DOMAIN = CLIENT_DOMAIN;

var SERVER_DOMAIN = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.serverDomainTitle', {
  defaultMessage: 'Server domain'
});

exports.SERVER_DOMAIN = SERVER_DOMAIN;

var LOCATION = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.locationTitle', {
  defaultMessage: 'Location'
});

exports.LOCATION = LOCATION;

var ASN = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.pointContent.asnTitle', {
  defaultMessage: 'ASN'
});

exports.ASN = ASN;

var SOURCE = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.lineContent.sourceLabel', {
  defaultMessage: 'Source'
});

exports.SOURCE = SOURCE;

var DESTINATION = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.lineContent.destinationLabel', {
  defaultMessage: 'Destination'
});

exports.DESTINATION = DESTINATION;

var CLIENT = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.lineContent.clientLabel', {
  defaultMessage: 'Client'
});

exports.CLIENT = CLIENT;

var SERVER = _i18n.i18n.translate('xpack.siem.components.embeddables.mapToolTip.lineContent.serverLabel', {
  defaultMessage: 'Server'
});

exports.SERVER = SERVER;