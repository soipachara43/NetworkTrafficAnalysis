"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfigureCasesUrl = exports.getCreateCaseUrl = exports.getCaseDetailsUrl = exports.getCaseUrl = exports.RedirectToConfigureCasesPage = exports.RedirectToCreatePage = exports.RedirectToCasePage = void 0;

var _react = _interopRequireDefault(require("react"));

var _helpers = require("./helpers");

var _redirect_wrapper = require("./redirect_wrapper");

var _types = require("../../pages/home/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RedirectToCasePage = function RedirectToCasePage(_ref) {
  var detailName = _ref.match.params.detailName;
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: detailName ? "/".concat(_types.SiemPageName.case, "/").concat(detailName) : "/".concat(_types.SiemPageName.case)
  });
};

exports.RedirectToCasePage = RedirectToCasePage;

var RedirectToCreatePage = function RedirectToCreatePage() {
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: "/".concat(_types.SiemPageName.case, "/create")
  });
};

exports.RedirectToCreatePage = RedirectToCreatePage;

var RedirectToConfigureCasesPage = function RedirectToConfigureCasesPage() {
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: "/".concat(_types.SiemPageName.case, "/configure")
  });
};

exports.RedirectToConfigureCasesPage = RedirectToConfigureCasesPage;
var baseCaseUrl = "#/link-to/".concat(_types.SiemPageName.case);

var getCaseUrl = function getCaseUrl(search) {
  return "".concat(baseCaseUrl).concat((0, _helpers.appendSearch)(search !== null && search !== void 0 ? search : undefined));
};

exports.getCaseUrl = getCaseUrl;

var getCaseDetailsUrl = function getCaseDetailsUrl(_ref2) {
  var id = _ref2.id,
      search = _ref2.search;
  return "".concat(baseCaseUrl, "/").concat(encodeURIComponent(id)).concat((0, _helpers.appendSearch)(search !== null && search !== void 0 ? search : undefined));
};

exports.getCaseDetailsUrl = getCaseDetailsUrl;

var getCreateCaseUrl = function getCreateCaseUrl(search) {
  return "".concat(baseCaseUrl, "/create").concat((0, _helpers.appendSearch)(search !== null && search !== void 0 ? search : undefined));
};

exports.getCreateCaseUrl = getCreateCaseUrl;

var getConfigureCasesUrl = function getConfigureCasesUrl(search) {
  return "".concat(baseCaseUrl, "/configure").concat((0, _helpers.appendSearch)(search !== null && search !== void 0 ? search : undefined));
};

exports.getConfigureCasesUrl = getConfigureCasesUrl;