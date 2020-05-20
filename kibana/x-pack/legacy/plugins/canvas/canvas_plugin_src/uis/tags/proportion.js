"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.proportion = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const euiVisPalette = (0, _eui.euiPaletteColorBlind)();

const proportion = () => ({
  name: _i18n.TagStrings.proportion(),
  color: euiVisPalette[3]
});

exports.proportion = proportion;