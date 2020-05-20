"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultMapping = exports.connectors = void 0;

var _servicenow = _interopRequireDefault(require("./logos/servicenow.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var connectors = {
  '.servicenow': {
    actionTypeId: '.servicenow',
    logo: _servicenow.default
  }
};
exports.connectors = connectors;
var defaultMapping = [{
  source: 'title',
  target: 'short_description',
  actionType: 'overwrite'
}, {
  source: 'description',
  target: 'description',
  actionType: 'overwrite'
}, {
  source: 'comments',
  target: 'comments',
  actionType: 'append'
}];
exports.defaultMapping = defaultMapping;