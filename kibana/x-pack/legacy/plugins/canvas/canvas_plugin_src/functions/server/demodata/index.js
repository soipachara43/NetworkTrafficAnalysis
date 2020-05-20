"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demodata = demodata;

var _lodash = require("lodash");

var _query = require("../../../../common/lib/datatable/query");

var _demo_rows_types = require("./demo_rows_types");

var _get_demo_rows = require("./get_demo_rows");

var _i18n = require("../../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore unconverted lib file
function demodata() {
  const {
    help,
    args: argHelp
  } = (0, _i18n.getFunctionHelp)().demodata;
  return {
    name: 'demodata',
    aliases: [],
    type: 'datatable',
    context: {
      types: ['filter']
    },
    help,
    args: {
      type: {
        types: ['string'],
        aliases: ['_'],
        help: argHelp.type,
        default: 'ci',
        options: ['ci', 'shirts']
      }
    },
    fn: (input, args) => {
      const demoRows = (0, _get_demo_rows.getDemoRows)(args.type);
      let set = {};

      if (args.type === _demo_rows_types.DemoRows.CI) {
        set = {
          columns: [{
            name: '@timestamp',
            type: 'date'
          }, {
            name: 'time',
            type: 'date'
          }, {
            name: 'cost',
            type: 'number'
          }, {
            name: 'username',
            type: 'string'
          }, {
            name: 'price',
            type: 'number'
          }, {
            name: 'age',
            type: 'number'
          }, {
            name: 'country',
            type: 'string'
          }, {
            name: 'state',
            type: 'string'
          }, {
            name: 'project',
            type: 'string'
          }, {
            name: 'percent_uptime',
            type: 'number'
          }],
          rows: (0, _lodash.sortBy)(demoRows, 'time')
        };
      } else if (args.type === _demo_rows_types.DemoRows.SHIRTS) {
        set = {
          columns: [{
            name: 'size',
            type: 'string'
          }, {
            name: 'color',
            type: 'string'
          }, {
            name: 'price',
            type: 'number'
          }, {
            name: 'cut',
            type: 'string'
          }],
          rows: demoRows
        };
      }

      const {
        columns,
        rows
      } = set;
      return (0, _query.queryDatatable)({
        type: 'datatable',
        columns,
        rows
      }, input);
    }
  };
}