"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeTables = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../src/plugins/data/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var toAbsoluteDates = _public.search.aggs.toAbsoluteDates;
var mergeTables = {
  name: 'lens_merge_tables',
  type: 'lens_multitable',
  help: _i18n.i18n.translate('xpack.lens.functions.mergeTables.help', {
    defaultMessage: 'A helper to merge any number of kibana tables into a single table'
  }),
  args: {
    layerIds: {
      types: ['string'],
      help: '',
      multi: true
    },
    tables: {
      types: ['kibana_datatable'],
      help: '',
      multi: true
    }
  },
  inputTypes: ['kibana_context', 'null'],
  fn: function fn(input, _ref) {
    var layerIds = _ref.layerIds,
        tables = _ref.tables;
    var resultTables = {};
    tables.forEach(function (table, index) {
      resultTables[layerIds[index]] = table;
    });
    return {
      type: 'lens_multitable',
      tables: resultTables,
      dateRange: getDateRange(input)
    };
  }
};
exports.mergeTables = mergeTables;

function getDateRange(value) {
  if (!value || !value.timeRange) {
    return;
  }

  var dateRange = toAbsoluteDates(value.timeRange);

  if (!dateRange) {
    return;
  }

  return {
    fromDate: dateRange.from,
    toDate: dateRange.to
  };
}