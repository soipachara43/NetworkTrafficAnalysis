"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBreadcrumb = exports.getWorkpadBreadcrumb = exports.getBaseBreadcrumb = void 0;

var _legacy = require("../legacy");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getBaseBreadcrumb = function getBaseBreadcrumb() {
  return {
    text: 'Canvas',
    href: '#/'
  };
};

exports.getBaseBreadcrumb = getBaseBreadcrumb;

var getWorkpadBreadcrumb = function getWorkpadBreadcrumb() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? 'Workpad' : _ref$name,
      id = _ref.id;

  var output = {
    text: name
  };

  if (id != null) {
    output.href = "#/workpad/".concat(id);
  }

  return output;
};

exports.getWorkpadBreadcrumb = getWorkpadBreadcrumb;

var setBreadcrumb = function setBreadcrumb(paths) {
  var setBreadCrumbs = (0, _legacy.getCoreStart)().chrome.setBreadcrumbs;
  setBreadCrumbs(Array.isArray(paths) ? paths : [paths]);
};

exports.setBreadcrumb = setBreadcrumb;