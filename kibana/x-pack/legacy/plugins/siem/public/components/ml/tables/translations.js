"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TIME_STAMP = exports.NETWORK_NAME = exports.DETECTOR = exports.ENTITY = exports.INFLUENCED_BY = exports.HOST_NAME = exports.SCORE = exports.TOOLTIP = exports.UNIT = exports.ANOMALIES = exports.SHOWING = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SHOWING = _i18n.i18n.translate('xpack.siem.anomaliesTable.table.showingDescription', {
  defaultMessage: 'Showing'
});

exports.SHOWING = SHOWING;

var ANOMALIES = _i18n.i18n.translate('xpack.siem.anomaliesTable.table.anomaliesDescription', {
  defaultMessage: 'Anomalies'
});

exports.ANOMALIES = ANOMALIES;

var UNIT = function UNIT(totalCount) {
  return _i18n.i18n.translate('xpack.siem.anomaliesTable.table.unit', {
    values: {
      totalCount: totalCount
    },
    defaultMessage: "{totalCount, plural, =1 {anomaly} other {anomalies}}"
  });
};

exports.UNIT = UNIT;

var TOOLTIP = _i18n.i18n.translate('xpack.siem.anomaliesTable.table.anomaliesTooltip', {
  defaultMessage: 'The anomalies table is not filterable via the SIEM global KQL search.'
});

exports.TOOLTIP = TOOLTIP;

var SCORE = _i18n.i18n.translate('xpack.siem.ml.table.scoreTitle', {
  defaultMessage: 'Anomaly score'
});

exports.SCORE = SCORE;

var HOST_NAME = _i18n.i18n.translate('xpack.siem.ml.table.hostNameTitle', {
  defaultMessage: 'Host name'
});

exports.HOST_NAME = HOST_NAME;

var INFLUENCED_BY = _i18n.i18n.translate('xpack.siem.ml.table.influencedByTitle', {
  defaultMessage: 'Influenced by'
});

exports.INFLUENCED_BY = INFLUENCED_BY;

var ENTITY = _i18n.i18n.translate('xpack.siem.ml.table.entityTitle', {
  defaultMessage: 'Entity'
});

exports.ENTITY = ENTITY;

var DETECTOR = _i18n.i18n.translate('xpack.siem.ml.table.detectorTitle', {
  defaultMessage: 'Job'
});

exports.DETECTOR = DETECTOR;

var NETWORK_NAME = _i18n.i18n.translate('xpack.siem.ml.table.networkNameTitle', {
  defaultMessage: 'Network IP'
});

exports.NETWORK_NAME = NETWORK_NAME;

var TIME_STAMP = _i18n.i18n.translate('xpack.siem.ml.table.timestampTitle', {
  defaultMessage: 'Timestamp'
});

exports.TIME_STAMP = TIME_STAMP;