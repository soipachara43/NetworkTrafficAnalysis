"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SPAN_METADATA_SECTIONS = void 0;

var _sections = require("../sections");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SPAN_METADATA_SECTIONS = [_sections.LABELS, _sections.SPAN, _sections.TRANSACTION, _sections.TRACE, _sections.SERVICE, _sections.MESSAGE_SPAN, _sections.AGENT];
exports.SPAN_METADATA_SECTIONS = SPAN_METADATA_SECTIONS;