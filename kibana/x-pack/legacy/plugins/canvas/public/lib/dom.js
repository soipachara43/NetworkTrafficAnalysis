"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matrixToCSS = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// converts a transform matrix to a CSS string
var matrixToCSS = function matrixToCSS(transformMatrix) {
  return transformMatrix ? 'matrix3d(' + transformMatrix.join(',') + ')' : 'translate3d(0,0,0)';
};

exports.matrixToCSS = matrixToCSS;