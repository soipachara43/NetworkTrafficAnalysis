"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexManagement = indexManagement;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function indexManagement(kibana) {
  return new kibana.Plugin({
    id: 'index_management',
    configPrefix: 'xpack.index_management'
  });
}