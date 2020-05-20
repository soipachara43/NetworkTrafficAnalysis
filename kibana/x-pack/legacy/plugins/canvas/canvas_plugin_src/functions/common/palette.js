"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.palette = palette;

var _palettes = require("../../../common/lib/palettes");

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore untyped local
function palette() {
  const {
    help,
    args: argHelp
  } = (0, _i18n.getFunctionHelp)().palette;
  return {
    name: 'palette',
    aliases: [],
    type: 'palette',
    inputTypes: ['null'],
    help,
    args: {
      color: {
        aliases: ['_'],
        multi: true,
        types: ['string'],
        help: argHelp.color
      },
      gradient: {
        types: ['boolean'],
        default: false,
        help: argHelp.gradient,
        options: [true, false]
      },
      reverse: {
        types: ['boolean'],
        default: false,
        help: argHelp.reverse,
        options: [true, false]
      }
    },
    fn: (input, args) => {
      const {
        color,
        reverse,
        gradient
      } = args;
      const colors = [].concat(color || _palettes.palettes.paul_tor_14.colors);
      return {
        type: 'palette',
        colors: reverse ? colors.reverse() : colors,
        gradient
      };
    }
  };
}