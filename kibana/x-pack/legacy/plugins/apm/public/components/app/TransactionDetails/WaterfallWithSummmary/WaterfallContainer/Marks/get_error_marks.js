"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getErrorMarks = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getErrorMarks = function getErrorMarks(errorItems, serviceColors) {
  if ((0, _lodash.isEmpty)(errorItems)) {
    return [];
  }

  return errorItems.map(function (error) {
    return {
      type: 'errorMark',
      offset: error.offset + error.skew,
      verticalLine: false,
      id: error.doc.error.id,
      error: error.doc,
      serviceColor: serviceColors[error.doc.service.name]
    };
  });
};

exports.getErrorMarks = getErrorMarks;