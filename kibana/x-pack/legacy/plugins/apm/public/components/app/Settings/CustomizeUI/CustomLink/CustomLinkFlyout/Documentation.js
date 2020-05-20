"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Documentation = void 0;

var _react = _interopRequireDefault(require("react"));

var _ElasticDocsLink = require("../../../../../shared/Links/ElasticDocsLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Documentation = function Documentation(_ref) {
  var label = _ref.label;
  return _react.default.createElement(_ElasticDocsLink.ElasticDocsLink, {
    section: "/kibana",
    path: "/custom-links.html",
    target: "_blank"
  }, label);
};

exports.Documentation = Documentation;