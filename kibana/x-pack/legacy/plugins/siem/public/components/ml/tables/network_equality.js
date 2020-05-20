"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.networkEquality = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var networkEquality = function networkEquality(prevProps, nextProps) {
  return prevProps.startDate === nextProps.startDate && prevProps.endDate === nextProps.endDate && prevProps.skip === nextProps.skip && prevProps.flowTarget === nextProps.flowTarget;
};

exports.networkEquality = networkEquality;