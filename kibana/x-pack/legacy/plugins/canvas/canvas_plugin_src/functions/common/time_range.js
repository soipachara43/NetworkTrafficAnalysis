"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timerange = timerange;

var _functions = require("../../../i18n/functions");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function timerange() {
  const {
    help,
    args: argHelp
  } = (0, _functions.getFunctionHelp)().timerange;
  return {
    name: 'timerange',
    help,
    type: 'timerange',
    inputTypes: ['null'],
    args: {
      from: {
        types: ['string'],
        required: true,
        help: argHelp.from
      },
      to: {
        types: ['string'],
        required: true,
        help: argHelp.to
      }
    },
    fn: (input, args) => {
      return {
        type: 'timerange',
        ...args
      };
    }
  };
}