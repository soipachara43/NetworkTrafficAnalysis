"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropdownControl = dropdownControl;

var _lodash = require("lodash");

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function dropdownControl() {
  const {
    help,
    args: argHelp
  } = (0, _i18n.getFunctionHelp)().dropdownControl;
  return {
    name: 'dropdownControl',
    aliases: [],
    type: 'render',
    inputTypes: ['datatable'],
    help,
    args: {
      filterColumn: {
        types: ['string'],
        required: true,
        help: argHelp.filterColumn
      },
      valueColumn: {
        types: ['string'],
        required: true,
        help: argHelp.valueColumn
      },
      filterGroup: {
        types: ['string'],
        help: argHelp.filterGroup
      }
    },
    fn: (input, {
      valueColumn,
      filterColumn,
      filterGroup
    }) => {
      let choices = [];

      if (input.rows[0][valueColumn]) {
        choices = (0, _lodash.uniq)(input.rows.map(row => row[valueColumn])).sort();
      }

      const column = filterColumn || valueColumn;
      return {
        type: 'render',
        as: 'dropdown_filter',
        value: {
          column,
          choices,
          filterGroup
        }
      };
    }
  };
}