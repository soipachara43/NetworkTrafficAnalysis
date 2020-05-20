"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFunctionFactory = toFunctionFactory;

var _common = require("@kbn/interpreter/common");

var _i18n = require("../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped Elastic library
function toFunctionFactory(initialize) {
  return function to() {
    var _getFunctionHelp$to = (0, _i18n.getFunctionHelp)().to,
        help = _getFunctionHelp$to.help,
        argHelp = _getFunctionHelp$to.args;
    var errors = (0, _i18n.getFunctionErrors)().to;
    return {
      name: 'to',
      aliases: [],
      help: help,
      args: {
        type: {
          types: ['string'],
          help: argHelp.type,
          aliases: ['_'],
          multi: true
        }
      },
      fn: function fn(input, args) {
        if (!args.type) {
          throw errors.missingType();
        }

        return (0, _common.castProvider)(initialize.typesRegistry.toJS())(input, args.type);
      }
    };
  };
}