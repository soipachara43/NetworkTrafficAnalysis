"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEditRuleUrl = exports.getRuleDetailsUrl = exports.getCreateRuleUrl = exports.getRulesUrl = exports.getDetectionEngineTabUrl = exports.getDetectionEngineAlertUrl = exports.getDetectionEngineUrl = exports.RedirectToEditRulePage = exports.RedirectToRuleDetailsPage = exports.RedirectToCreateRulePage = exports.RedirectToRulesPage = exports.RedirectToDetectionEnginePage = exports.DETECTION_ENGINE_PAGE_NAME = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("../../pages/detection_engine/types");

var _helpers = require("./helpers");

var _redirect_wrapper = require("./redirect_wrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DETECTION_ENGINE_PAGE_NAME = 'detections';
exports.DETECTION_ENGINE_PAGE_NAME = DETECTION_ENGINE_PAGE_NAME;

var RedirectToDetectionEnginePage = function RedirectToDetectionEnginePage(_ref) {
  var tabName = _ref.match.params.tabName,
      search = _ref.location.search;
  var defaultSelectedTab = _types.DetectionEngineTab.signals;
  var selectedTab = tabName ? tabName : defaultSelectedTab;
  var to = "/".concat(DETECTION_ENGINE_PAGE_NAME, "/").concat(selectedTab).concat(search);
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: to
  });
};

exports.RedirectToDetectionEnginePage = RedirectToDetectionEnginePage;

var RedirectToRulesPage = function RedirectToRulesPage(_ref2) {
  var search = _ref2.location.search;
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: "/".concat(DETECTION_ENGINE_PAGE_NAME, "/rules").concat(search)
  });
};

exports.RedirectToRulesPage = RedirectToRulesPage;

var RedirectToCreateRulePage = function RedirectToCreateRulePage(_ref3) {
  var search = _ref3.location.search;
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: "/".concat(DETECTION_ENGINE_PAGE_NAME, "/rules/create").concat(search)
  });
};

exports.RedirectToCreateRulePage = RedirectToCreateRulePage;

var RedirectToRuleDetailsPage = function RedirectToRuleDetailsPage(_ref4) {
  var detailName = _ref4.match.params.detailName,
      search = _ref4.location.search;
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: "/".concat(DETECTION_ENGINE_PAGE_NAME, "/rules/id/").concat(detailName).concat(search)
  });
};

exports.RedirectToRuleDetailsPage = RedirectToRuleDetailsPage;

var RedirectToEditRulePage = function RedirectToEditRulePage(_ref5) {
  var detailName = _ref5.match.params.detailName,
      search = _ref5.location.search;
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: "/".concat(DETECTION_ENGINE_PAGE_NAME, "/rules/id/").concat(detailName, "/edit").concat(search)
  });
};

exports.RedirectToEditRulePage = RedirectToEditRulePage;
var baseDetectionEngineUrl = "#/link-to/".concat(DETECTION_ENGINE_PAGE_NAME);

var getDetectionEngineUrl = function getDetectionEngineUrl(search) {
  return "".concat(baseDetectionEngineUrl).concat((0, _helpers.appendSearch)(search));
};

exports.getDetectionEngineUrl = getDetectionEngineUrl;

var getDetectionEngineAlertUrl = function getDetectionEngineAlertUrl(search) {
  return "".concat(baseDetectionEngineUrl, "/").concat(_types.DetectionEngineTab.alerts).concat((0, _helpers.appendSearch)(search));
};

exports.getDetectionEngineAlertUrl = getDetectionEngineAlertUrl;

var getDetectionEngineTabUrl = function getDetectionEngineTabUrl(tabPath) {
  return "".concat(baseDetectionEngineUrl, "/").concat(tabPath);
};

exports.getDetectionEngineTabUrl = getDetectionEngineTabUrl;

var getRulesUrl = function getRulesUrl() {
  return "".concat(baseDetectionEngineUrl, "/rules");
};

exports.getRulesUrl = getRulesUrl;

var getCreateRuleUrl = function getCreateRuleUrl() {
  return "".concat(baseDetectionEngineUrl, "/rules/create");
};

exports.getCreateRuleUrl = getCreateRuleUrl;

var getRuleDetailsUrl = function getRuleDetailsUrl(detailName) {
  return "".concat(baseDetectionEngineUrl, "/rules/id/").concat(detailName);
};

exports.getRuleDetailsUrl = getRuleDetailsUrl;

var getEditRuleUrl = function getEditRuleUrl(detailName) {
  return "".concat(baseDetectionEngineUrl, "/rules/id/").concat(detailName, "/edit");
};

exports.getEditRuleUrl = getEditRuleUrl;