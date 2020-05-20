"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDocumentationLinks = void 0;

var _legacy = require("../legacy");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDocumentationLinks = function getDocumentationLinks() {
  return {
    canvas: "".concat((0, _legacy.getCoreStart)().docLinks.ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat((0, _legacy.getCoreStart)().docLinks.DOC_LINK_VERSION, "/canvas.html"),
    numeral: "".concat((0, _legacy.getCoreStart)().docLinks.ELASTIC_WEBSITE_URL, "guide/en/kibana/").concat((0, _legacy.getCoreStart)().docLinks.DOC_LINK_VERSION, "/guide/numeral.html")
  };
};

exports.getDocumentationLinks = getDocumentationLinks;