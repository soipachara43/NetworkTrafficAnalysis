"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultHeaders = void 0;

var _default_headers = require("../timeline/body/column_headers/default_headers");

var _constants = require("../timeline/body/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var defaultHeaders = [{
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: '@timestamp',
  width: _constants.DEFAULT_DATE_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'message',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'host.name',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'event.module',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'event.dataset',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'event.action',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'user.name',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'source.ip',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: _default_headers.defaultColumnHeaderType,
  id: 'destination.ip',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}];
exports.defaultHeaders = defaultHeaders;