"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSuggestions = getSuggestions;

var _chart_metric = _interopRequireDefault(require("../assets/chart_metric.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Generate suggestions for the metric chart.
 *
 * @param opts
 */
function getSuggestions(_ref) {
  var table = _ref.table,
      state = _ref.state,
      keptLayerIds = _ref.keptLayerIds;

  // We only render metric charts for single-row queries. We require a single, numeric column.
  if (table.isMultiRow || keptLayerIds.length > 1 || keptLayerIds.length && table.layerId !== keptLayerIds[0] || table.columns.length !== 1 || table.columns[0].operation.dataType !== 'number') {
    return [];
  } // don't suggest current table if visualization is active


  if (state && table.changeType === 'unchanged') {
    return [];
  }

  return [getSuggestion(table)];
}

function getSuggestion(table) {
  var col = table.columns[0];
  var title = table.label || col.operation.label;
  return {
    title: title,
    score: 0.5,
    previewIcon: _chart_metric.default,
    state: {
      layerId: table.layerId,
      accessor: col.columnId
    }
  };
}