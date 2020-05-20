"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeUnitsUrl = exports.getByteUnitsUrl = exports.getFollowerIndexUrl = exports.getAutoFollowPatternUrl = exports.setDocLinks = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var esBase;

var setDocLinks = function setDocLinks(_ref) {
  var DOC_LINK_VERSION = _ref.DOC_LINK_VERSION,
      ELASTIC_WEBSITE_URL = _ref.ELASTIC_WEBSITE_URL;
  esBase = "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION);
};

exports.setDocLinks = setDocLinks;

var getAutoFollowPatternUrl = function getAutoFollowPatternUrl() {
  return "".concat(esBase, "/ccr-put-auto-follow-pattern.html");
};

exports.getAutoFollowPatternUrl = getAutoFollowPatternUrl;

var getFollowerIndexUrl = function getFollowerIndexUrl() {
  return "".concat(esBase, "/ccr-put-follow.html");
};

exports.getFollowerIndexUrl = getFollowerIndexUrl;

var getByteUnitsUrl = function getByteUnitsUrl() {
  return "".concat(esBase, "/common-options.html#byte-units");
};

exports.getByteUnitsUrl = getByteUnitsUrl;

var getTimeUnitsUrl = function getTimeUnitsUrl() {
  return "".concat(esBase, "/common-options.html#time-units");
};

exports.getTimeUnitsUrl = getTimeUnitsUrl;