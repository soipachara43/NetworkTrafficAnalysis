"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoCases = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _redirect_to_case = require("../../link_to/redirect_to_case");

var _use_get_url_search = require("../../navigation/use_get_url_search");

var _home_navigations = require("../../../pages/home/home_navigations");

var i18n = _interopRequireWildcard(require("../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NoCasesComponent = function NoCasesComponent() {
  var urlSearch = (0, _use_get_url_search.useGetUrlSearch)(_home_navigations.navTabs.case);
  var newCaseLink = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiLink, {
      href: (0, _redirect_to_case.getCreateCaseUrl)(urlSearch)
    }, " ".concat(i18n.START_A_NEW_CASE));
  }, [urlSearch]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("span", null, i18n.NO_CASES), newCaseLink, '!');
};

NoCasesComponent.displayName = 'NoCasesComponent';

var NoCases = _react.default.memo(NoCasesComponent);

exports.NoCases = NoCases;