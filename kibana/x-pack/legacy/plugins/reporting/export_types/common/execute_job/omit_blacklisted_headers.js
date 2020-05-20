"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.omitBlacklistedHeaders = void 0;

var _lodash = require("lodash");

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const omitBlacklistedHeaders = ({
  job,
  decryptedHeaders
}) => {
  const filteredHeaders = (0, _lodash.omit)(decryptedHeaders, _constants.KBN_SCREENSHOT_HEADER_BLACKLIST);
  return filteredHeaders;
};

exports.omitBlacklistedHeaders = omitBlacklistedHeaders;