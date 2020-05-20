"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatdate = void 0;

var _i18n = require("../../../i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const {
  FormatDate: strings
} = _i18n.TransformStrings;

const formatdate = () => ({
  name: 'formatdate',
  displayName: strings.getDisplayName(),
  args: [{
    name: 'format',
    displayName: strings.getFormatDisplayName(),
    argType: 'dateformat'
  }]
});

exports.formatdate = formatdate;