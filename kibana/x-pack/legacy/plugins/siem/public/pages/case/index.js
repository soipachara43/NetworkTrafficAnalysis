"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Case = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _types = require("../home/types");

var _case_details = require("./case_details");

var _case = require("./case");

var _create_case = require("./create_case");

var _configure_cases = require("./configure_cases");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var casesPagePath = "/:pageName(".concat(_types.SiemPageName.case, ")");
var caseDetailsPagePath = "".concat(casesPagePath, "/:detailName");
var caseDetailsPagePathWithCommentId = "".concat(casesPagePath, "/:detailName/:commentId");
var createCasePagePath = "".concat(casesPagePath, "/create");
var configureCasesPagePath = "".concat(casesPagePath, "/configure");

var CaseContainerComponent = function CaseContainerComponent() {
  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    strict: true,
    exact: true,
    path: casesPagePath
  }, _react.default.createElement(_case.CasesPage, null)), _react.default.createElement(_reactRouterDom.Route, {
    strict: true,
    exact: true,
    path: createCasePagePath
  }, _react.default.createElement(_create_case.CreateCasePage, null)), _react.default.createElement(_reactRouterDom.Route, {
    strict: true,
    exact: true,
    path: configureCasesPagePath
  }, _react.default.createElement(_configure_cases.ConfigureCasesPage, null)), _react.default.createElement(_reactRouterDom.Route, {
    strict: true,
    path: caseDetailsPagePathWithCommentId
  }, _react.default.createElement(_case_details.CaseDetailsPage, null)), _react.default.createElement(_reactRouterDom.Route, {
    strict: true,
    path: caseDetailsPagePath
  }, _react.default.createElement(_case_details.CaseDetailsPage, null)));
};

var Case = _react.default.memo(CaseContainerComponent);

exports.Case = Case;