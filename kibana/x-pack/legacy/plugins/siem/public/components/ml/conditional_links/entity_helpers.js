"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMultipleEntities = exports.multipleEntities = exports.emptyEntity = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var emptyEntity = function emptyEntity(entity) {
  return entity.trim() === '' || entity.startsWith('$') && entity.endsWith('$');
};

exports.emptyEntity = emptyEntity;

var multipleEntities = function multipleEntities(entity) {
  return entity.split(',').length > 1;
};

exports.multipleEntities = multipleEntities;

var getMultipleEntities = function getMultipleEntities(entity) {
  return entity.split(',');
};

exports.getMultipleEntities = getMultipleEntities;