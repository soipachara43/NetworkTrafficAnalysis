"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_CATEGORY_NAME = exports.defaultHeaders = exports.defaultColumnHeaderType = void 0;

var _constants = require("../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var defaultColumnHeaderType = 'not-filtered';
exports.defaultColumnHeaderType = defaultColumnHeaderType;
var defaultHeaders = [{
  columnHeaderType: defaultColumnHeaderType,
  id: '@timestamp',
  width: _constants.DEFAULT_DATE_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: defaultColumnHeaderType,
  id: 'message',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: defaultColumnHeaderType,
  id: 'event.category',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: defaultColumnHeaderType,
  id: 'event.action',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: defaultColumnHeaderType,
  id: 'host.name',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: defaultColumnHeaderType,
  id: 'source.ip',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: defaultColumnHeaderType,
  id: 'destination.ip',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}, {
  columnHeaderType: defaultColumnHeaderType,
  id: 'user.name',
  width: _constants.DEFAULT_COLUMN_MIN_WIDTH
}];
/** The default category of fields shown in the Timeline */

exports.defaultHeaders = defaultHeaders;
var DEFAULT_CATEGORY_NAME = 'default ECS';
exports.DEFAULT_CATEGORY_NAME = DEFAULT_CATEGORY_NAME;