"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaseDetailsPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _use_get_url_search = require("../../components/navigation/use_get_url_search");

var _kibana = require("../../lib/kibana");

var _spy_routes = require("../../utils/route/spy_routes");

var _link_to = require("../../components/link_to");

var _home_navigations = require("../home/home_navigations");

var _case_view = require("./components/case_view");

var _callout = require("./components/callout");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var infoReadSavedObject = (0, _callout.getSavedObjectReadOnly)();

var CaseDetailsPage = _react.default.memo(function () {
  var _ref;

  var userPermissions = (0, _kibana.useGetUserSavedObjectPermissions)();

  var _useParams = (0, _reactRouterDom.useParams)(),
      caseId = _useParams.detailName;

  var search = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);

  if (userPermissions != null && !userPermissions.read) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: (0, _link_to.getCaseUrl)(search)
    });
  }

  return caseId != null ? _react.default.createElement(_react.default.Fragment, null, userPermissions != null && !(userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.crud) && (userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.read) && _react.default.createElement(_callout.CaseCallOut, {
    title: infoReadSavedObject.title,
    message: infoReadSavedObject.description
  }), _react.default.createElement(_case_view.CaseView, {
    caseId: caseId,
    userCanCrud: (_ref = userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.crud) !== null && _ref !== void 0 ? _ref : false
  }), _react.default.createElement(_spy_routes.SpyRoute, null)) : null;
});

exports.CaseDetailsPage = CaseDetailsPage;
CaseDetailsPage.displayName = 'CaseDetailsPage';