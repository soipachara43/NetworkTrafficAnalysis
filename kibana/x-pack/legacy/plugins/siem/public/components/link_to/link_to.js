"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkToPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _types = require("../../pages/home/types");

var _model = require("../../store/hosts/model");

var _redirect_to_detection_engine = require("./redirect_to_detection_engine");

var _redirect_to_hosts = require("./redirect_to_hosts");

var _redirect_to_network = require("./redirect_to_network");

var _redirect_to_overview = require("./redirect_to_overview");

var _redirect_to_timelines = require("./redirect_to_timelines");

var _redirect_to_case = require("./redirect_to_case");

var _types2 = require("../../pages/detection_engine/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LinkToPage = _react.default.memo(function (_ref) {
  var match = _ref.match;
  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_overview.RedirectToOverviewPage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.overview, ")")
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    component: _redirect_to_case.RedirectToCasePage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.case, ")")
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    component: _redirect_to_case.RedirectToCreatePage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.case, ")/create")
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    component: _redirect_to_case.RedirectToConfigureCasesPage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.case, ")/configure")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_case.RedirectToCasePage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.case, ")/:detailName")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_hosts.RedirectToHostsPage,
    exact: true,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.hosts, ")")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_hosts.RedirectToHostsPage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.hosts, ")/:tabName(").concat(_model.HostsTableType.hosts, "|").concat(_model.HostsTableType.authentications, "|").concat(_model.HostsTableType.uncommonProcesses, "|").concat(_model.HostsTableType.anomalies, "|").concat(_model.HostsTableType.events, "|").concat(_model.HostsTableType.alerts, ")")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_hosts.RedirectToHostDetailsPage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.hosts, ")/:detailName/:tabName(").concat(_model.HostsTableType.authentications, "|").concat(_model.HostsTableType.uncommonProcesses, "|").concat(_model.HostsTableType.anomalies, "|").concat(_model.HostsTableType.events, "|").concat(_model.HostsTableType.alerts, ")")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_hosts.RedirectToHostDetailsPage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.hosts, ")/:detailName")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_network.RedirectToNetworkPage,
    exact: true,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.network, ")")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_network.RedirectToNetworkPage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.network, ")/ip/:detailName/:flowTarget")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_detection_engine.RedirectToDetectionEnginePage,
    exact: true,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.detections, ")")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_detection_engine.RedirectToDetectionEnginePage,
    exact: true,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.detections, ")/:tabName(").concat(_types2.DetectionEngineTab.alerts, "|").concat(_types2.DetectionEngineTab.signals, ")")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_detection_engine.RedirectToRulesPage,
    exact: true,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.detections, ")/rules")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_detection_engine.RedirectToCreateRulePage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.detections, ")/rules/create")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_detection_engine.RedirectToRuleDetailsPage,
    exact: true,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.detections, ")/rules/id/:detailName")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_detection_engine.RedirectToEditRulePage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.detections, ")/rules/id/:detailName/edit")
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _redirect_to_timelines.RedirectToTimelinesPage,
    path: "".concat(match.url, "/:pageName(").concat(_types.SiemPageName.timelines, ")")
  }), _react.default.createElement(_reactRouterDom.Redirect, {
    to: "/"
  }));
});

exports.LinkToPage = LinkToPage;
LinkToPage.displayName = 'LinkToPage';