"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gte = gte;

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function gte() {
  const {
    help,
    args: argHelp
  } = (0, _i18n.getFunctionHelp)().gte;
  return {
    name: 'gte',
    type: 'boolean',
    inputTypes: ['number', 'string'],
    help,
    args: {
      value: {
        aliases: ['_'],
        types: ['number', 'string'],
        required: true,
        help: argHelp.value
      }
    },
    fn: (input, args) => {
      const {
        value
      } = args;

      if (typeof input !== typeof value) {
        return false;
      }

      return input >= value;
    }
  };
}