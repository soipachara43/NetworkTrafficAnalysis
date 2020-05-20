"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createQueryFilterClauses = void 0;

var _fp = require("lodash/fp");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createQueryFilterClauses = filterQuery => !(0, _fp.isEmpty)(filterQuery) ? [filterQuery] : [];

exports.createQueryFilterClauses = createQueryFilterClauses;