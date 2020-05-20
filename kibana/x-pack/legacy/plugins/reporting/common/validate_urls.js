"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUrls = void 0;

var _url = require("url");

var _ = _interopRequireWildcard(require("lodash"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * isBogusUrl
 *
 * Besides checking to see if the URL is relative, we also
 * need to verify that window.location.href won't navigate
 * to it, which url.parse doesn't catch all variants of
 */
const isBogusUrl = url => {
  const {
    host,
    protocol,
    port
  } = (0, _url.parse)(url, false, true);
  return host !== null || protocol !== null || port !== null;
};

const validateUrls = urls => {
  const badUrls = _.filter(urls, url => isBogusUrl(url));

  if (badUrls.length) {
    throw new Error(`Found invalid URL(s), all URLs must be relative: ${badUrls.join(' ')}`);
  }
};

exports.validateUrls = validateUrls;