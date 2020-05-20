"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFillFilterExpression = getFillFilterExpression;
exports.getLineFilterExpression = getLineFilterExpression;
exports.getPointFilterExpression = getPointFilterExpression;

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var VISIBILITY_FILTER_CLAUSE = ['all', ['==', ['get', _constants.FEATURE_VISIBLE_PROPERTY_NAME], true]];
var CLOSED_SHAPE_MB_FILTER = ['any', ['==', ['geometry-type'], _constants.GEO_JSON_TYPE.POLYGON], ['==', ['geometry-type'], _constants.GEO_JSON_TYPE.MULTI_POLYGON]];
var VISIBLE_CLOSED_SHAPE_MB_FILTER = [].concat(VISIBILITY_FILTER_CLAUSE, [CLOSED_SHAPE_MB_FILTER]);
var ALL_SHAPE_MB_FILTER = ['any', ['==', ['geometry-type'], _constants.GEO_JSON_TYPE.POLYGON], ['==', ['geometry-type'], _constants.GEO_JSON_TYPE.MULTI_POLYGON], ['==', ['geometry-type'], _constants.GEO_JSON_TYPE.LINE_STRING], ['==', ['geometry-type'], _constants.GEO_JSON_TYPE.MULTI_LINE_STRING]];
var VISIBLE_ALL_SHAPE_MB_FILTER = [].concat(VISIBILITY_FILTER_CLAUSE, [ALL_SHAPE_MB_FILTER]);
var POINT_MB_FILTER = ['any', ['==', ['geometry-type'], _constants.GEO_JSON_TYPE.POINT], ['==', ['geometry-type'], _constants.GEO_JSON_TYPE.MULTI_POINT]];
var VISIBLE_POINT_MB_FILTER = [].concat(VISIBILITY_FILTER_CLAUSE, [POINT_MB_FILTER]);

function getFillFilterExpression(hasJoins) {
  return hasJoins ? VISIBLE_CLOSED_SHAPE_MB_FILTER : CLOSED_SHAPE_MB_FILTER;
}

function getLineFilterExpression(hasJoins) {
  return hasJoins ? VISIBLE_ALL_SHAPE_MB_FILTER : ALL_SHAPE_MB_FILTER;
}

function getPointFilterExpression(hasJoins) {
  return hasJoins ? VISIBLE_POINT_MB_FILTER : POINT_MB_FILTER;
}