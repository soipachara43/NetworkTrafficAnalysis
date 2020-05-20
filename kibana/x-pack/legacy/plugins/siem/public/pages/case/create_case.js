"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCasePage = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _link_to = require("../../components/link_to");

var _use_get_url_search = require("../../components/navigation/use_get_url_search");

var _wrapper_page = require("../../components/wrapper_page");

var _kibana = require("../../lib/kibana");

var _spy_routes = require("../../utils/route/spy_routes");

var _home_navigations = require("../home/home_navigations");

var _case_header_page = require("./components/case_header_page");

var _create = require("./components/create");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CreateCasePage = _react.default.memo(function () {
  var userPermissions = (0, _kibana.useGetUserSavedObjectPermissions)();
  var search = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);
  var backOptions = (0, _react.useMemo)(function () {
    return {
      href: (0, _link_to.getCaseUrl)(search),
      text: i18n.BACK_TO_ALL
    };
  }, [search]);

  if (userPermissions != null && !userPermissions.crud) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: (0, _link_to.getCaseUrl)(search)
    });
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_wrapper_page.WrapperPage, null, _react.default.createElement(_case_header_page.CaseHeaderPage, {
    backOptions: backOptions,
    title: i18n.CREATE_TITLE
  }), _react.default.createElement(_create.Create, null)), _react.default.createElement(_spy_routes.SpyRoute, null));
});

exports.CreateCasePage = CreateCasePage;
CreateCasePage.displayName = 'CreateCasePage';