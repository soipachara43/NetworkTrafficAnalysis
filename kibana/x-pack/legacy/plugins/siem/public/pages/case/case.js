"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CasesPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _wrapper_page = require("../../components/wrapper_page");

var _kibana = require("../../lib/kibana");

var _spy_routes = require("../../utils/route/spy_routes");

var _all_cases = require("./components/all_cases");

var _callout = require("./components/callout");

var _saved_object_no_permissions = require("./saved_object_no_permissions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var infoReadSavedObject = (0, _callout.getSavedObjectReadOnly)();

var CasesPage = _react.default.memo(function () {
  var _ref;

  var userPermissions = (0, _kibana.useGetUserSavedObjectPermissions)();
  return userPermissions == null || (userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.read) ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_wrapper_page.WrapperPage, null, userPermissions != null && !(userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.crud) && (userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.read) && _react.default.createElement(_callout.CaseCallOut, {
    title: infoReadSavedObject.title,
    message: infoReadSavedObject.description
  }), _react.default.createElement(_all_cases.AllCases, {
    userCanCrud: (_ref = userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.crud) !== null && _ref !== void 0 ? _ref : false
  })), _react.default.createElement(_spy_routes.SpyRoute, null)) : _react.default.createElement(_saved_object_no_permissions.CaseSavedObjectNoPermissions, null);
});

exports.CasesPage = CasesPage;
CasesPage.displayName = 'CasesPage';