"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTabsOnHostDetailsUrl = exports.getHostDetailsUrl = exports.getTabsOnHostsUrl = exports.getHostsUrl = exports.RedirectToHostDetailsPage = exports.RedirectToHostsPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _model = require("../../store/hosts/model");

var _types = require("../../pages/home/types");

var _helpers = require("./helpers");

var _redirect_wrapper = require("./redirect_wrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RedirectToHostsPage = function RedirectToHostsPage(_ref) {
  var tabName = _ref.match.params.tabName,
      search = _ref.location.search;
  var defaultSelectedTab = _model.HostsTableType.hosts;
  var selectedTab = tabName ? tabName : defaultSelectedTab;
  var to = "/".concat(_types.SiemPageName.hosts, "/").concat(selectedTab).concat(search);
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: to
  });
};

exports.RedirectToHostsPage = RedirectToHostsPage;

var RedirectToHostDetailsPage = function RedirectToHostDetailsPage(_ref2) {
  var _ref2$match$params = _ref2.match.params,
      detailName = _ref2$match$params.detailName,
      tabName = _ref2$match$params.tabName,
      search = _ref2.location.search;
  var defaultSelectedTab = _model.HostsTableType.authentications;
  var selectedTab = tabName ? tabName : defaultSelectedTab;
  var to = "/".concat(_types.SiemPageName.hosts, "/").concat(detailName, "/").concat(selectedTab).concat(search);
  return _react.default.createElement(_redirect_wrapper.RedirectWrapper, {
    to: to
  });
};

exports.RedirectToHostDetailsPage = RedirectToHostDetailsPage;
var baseHostsUrl = "#/link-to/".concat(_types.SiemPageName.hosts);

var getHostsUrl = function getHostsUrl(search) {
  return "".concat(baseHostsUrl).concat((0, _helpers.appendSearch)(search));
};

exports.getHostsUrl = getHostsUrl;

var getTabsOnHostsUrl = function getTabsOnHostsUrl(tabName, search) {
  return "".concat(baseHostsUrl, "/").concat(tabName).concat((0, _helpers.appendSearch)(search));
};

exports.getTabsOnHostsUrl = getTabsOnHostsUrl;

var getHostDetailsUrl = function getHostDetailsUrl(detailName) {
  return "".concat(baseHostsUrl, "/").concat(detailName);
};

exports.getHostDetailsUrl = getHostDetailsUrl;

var getTabsOnHostDetailsUrl = function getTabsOnHostDetailsUrl(detailName, tabName) {
  return "".concat(baseHostsUrl, "/").concat(detailName, "/").concat(tabName);
};

exports.getTabsOnHostDetailsUrl = getTabsOnHostDetailsUrl;