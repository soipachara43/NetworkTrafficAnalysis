"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RESPONSE_ANOMALY_SCORE = exports.DOWN = exports.UP = exports.URL = exports.NO_DATA_MESSAGE = exports.NO_MONITOR_ITEM_SELECTED = exports.getDescriptionLabel = exports.getExpandDrawerLabel = exports.HISTORY_COLUMN_LABEL = exports.NAME_COLUMN_LABEL = exports.STATUS_COLUMN_LABEL = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var STATUS_COLUMN_LABEL = _i18n.i18n.translate('xpack.uptime.monitorList.statusColumnLabel', {
  defaultMessage: 'Status'
});

exports.STATUS_COLUMN_LABEL = STATUS_COLUMN_LABEL;

var NAME_COLUMN_LABEL = _i18n.i18n.translate('xpack.uptime.monitorList.nameColumnLabel', {
  defaultMessage: 'Name'
});

exports.NAME_COLUMN_LABEL = NAME_COLUMN_LABEL;

var HISTORY_COLUMN_LABEL = _i18n.i18n.translate('xpack.uptime.monitorList.monitorHistoryColumnLabel', {
  defaultMessage: 'Downtime history'
});

exports.HISTORY_COLUMN_LABEL = HISTORY_COLUMN_LABEL;

var getExpandDrawerLabel = function getExpandDrawerLabel(id) {
  return _i18n.i18n.translate('xpack.uptime.monitorList.expandDrawerButton.ariaLabel', {
    defaultMessage: 'Expand row for monitor with ID {id}',
    description: 'The user can click a button on this table and expand further details.',
    values: {
      id: id
    }
  });
};

exports.getExpandDrawerLabel = getExpandDrawerLabel;

var getDescriptionLabel = function getDescriptionLabel(itemsLength) {
  return _i18n.i18n.translate('xpack.uptime.monitorList.table.description', {
    defaultMessage: 'Monitor Status table with columns for Status, Name, URL, IP, Downtime History and Integrations. The table is currently displaying {length} items.',
    values: {
      length: itemsLength
    }
  });
};

exports.getDescriptionLabel = getDescriptionLabel;

var NO_MONITOR_ITEM_SELECTED = _i18n.i18n.translate('xpack.uptime.monitorList.noItemForSelectedFiltersMessage', {
  defaultMessage: 'No monitors found for selected filter criteria',
  description: 'This message is show if there are no monitors in the table and some filter or search criteria exists'
});

exports.NO_MONITOR_ITEM_SELECTED = NO_MONITOR_ITEM_SELECTED;

var NO_DATA_MESSAGE = _i18n.i18n.translate('xpack.uptime.monitorList.noItemMessage', {
  defaultMessage: 'No uptime monitors found',
  description: 'This message is shown if the monitors table is rendered but has no items.'
});

exports.NO_DATA_MESSAGE = NO_DATA_MESSAGE;

var URL = _i18n.i18n.translate('xpack.uptime.monitorList.table.url.name', {
  defaultMessage: 'Url'
});

exports.URL = URL;

var UP = _i18n.i18n.translate('xpack.uptime.monitorList.statusColumn.upLabel', {
  defaultMessage: 'Up'
});

exports.UP = UP;

var DOWN = _i18n.i18n.translate('xpack.uptime.monitorList.statusColumn.downLabel', {
  defaultMessage: 'Down'
});

exports.DOWN = DOWN;

var RESPONSE_ANOMALY_SCORE = _i18n.i18n.translate('xpack.uptime.monitorList.anomalyColumn.label', {
  defaultMessage: 'Response Anomaly Score'
});

exports.RESPONSE_ANOMALY_SCORE = RESPONSE_ANOMALY_SCORE;