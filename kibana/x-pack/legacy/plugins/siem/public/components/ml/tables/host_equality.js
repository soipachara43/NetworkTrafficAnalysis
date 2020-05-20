"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hostEquality = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var hostEquality = function hostEquality(prevProps, nextProps) {
  return prevProps.startDate === nextProps.startDate && prevProps.endDate === nextProps.endDate && prevProps.skip === nextProps.skip;
};

exports.hostEquality = hostEquality;