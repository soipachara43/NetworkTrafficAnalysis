"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markdown = markdown;

var _handlebars = require("../../../common/lib/handlebars");

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
function markdown() {
  const {
    help,
    args: argHelp
  } = (0, _i18n.getFunctionHelp)().markdown;
  return {
    name: 'markdown',
    aliases: [],
    type: 'render',
    help,
    inputTypes: ['datatable', 'null'],
    args: {
      content: {
        aliases: ['_', 'expression'],
        types: ['string'],
        help: argHelp.content,
        default: '""',
        multi: true
      },
      font: {
        types: ['style'],
        help: argHelp.font,
        default: '{font}'
      },
      openLinksInNewTab: {
        types: ['boolean'],
        help: argHelp.openLinksInNewTab,
        default: false
      }
    },
    fn: (input, args) => {
      const compileFunctions = args.content.map(str => _handlebars.Handlebars.compile(String(str), {
        knownHelpersOnly: true
      }));
      const ctx = {
        columns: [],
        rows: [],
        type: null,
        ...input
      };
      return {
        type: 'render',
        as: 'markdown',
        value: {
          content: compileFunctions.map(fn => fn(ctx)).join(''),
          font: args.font,
          openLinksInNewTab: args.openLinksInNewTab
        }
      };
    }
  };
}