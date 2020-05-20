"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unknownColumnRenderer = void 0;

var _empty_value = require("../../../empty_value");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var unknownColumnRenderer = {
  isInstance: function isInstance() {
    return true;
  },
  renderColumn: function renderColumn() {
    return (0, _empty_value.getEmptyTagValue)();
  }
};
exports.unknownColumnRenderer = unknownColumnRenderer;