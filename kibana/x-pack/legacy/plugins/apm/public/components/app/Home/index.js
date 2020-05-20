"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = Home;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _useApmPluginContext2 = require("../../../hooks/useApmPluginContext");

var _ApmHeader = require("../../shared/ApmHeader");

var _EuiTabLink = require("../../shared/EuiTabLink");

var _ServiceMapLink = require("../../shared/Links/apm/ServiceMapLink");

var _ServiceOverviewLink = require("../../shared/Links/apm/ServiceOverviewLink");

var _SettingsLink = require("../../shared/Links/apm/SettingsLink");

var _TraceOverviewLink = require("../../shared/Links/apm/TraceOverviewLink");

var _SetupInstructionsLink = require("../../shared/Links/SetupInstructionsLink");

var _ServiceMap = require("../ServiceMap");

var _ServiceOverview = require("../ServiceOverview");

var _TraceOverview = require("../TraceOverview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getHomeTabs(_ref) {
  var _ref$serviceMapEnable = _ref.serviceMapEnabled,
      serviceMapEnabled = _ref$serviceMapEnable === void 0 ? true : _ref$serviceMapEnable;
  var homeTabs = [{
    link: _react.default.createElement(_ServiceOverviewLink.ServiceOverviewLink, null, _i18n.i18n.translate('xpack.apm.home.servicesTabLabel', {
      defaultMessage: 'Services'
    })),
    render: function render() {
      return _react.default.createElement(_ServiceOverview.ServiceOverview, null);
    },
    name: 'services'
  }, {
    link: _react.default.createElement(_TraceOverviewLink.TraceOverviewLink, null, _i18n.i18n.translate('xpack.apm.home.tracesTabLabel', {
      defaultMessage: 'Traces'
    })),
    render: function render() {
      return _react.default.createElement(_TraceOverview.TraceOverview, null);
    },
    name: 'traces'
  }];

  if (serviceMapEnabled) {
    homeTabs.push({
      link: _react.default.createElement(_ServiceMapLink.ServiceMapLink, null, _i18n.i18n.translate('xpack.apm.home.serviceMapTabLabel', {
        defaultMessage: 'Service Map'
      })),
      render: function render() {
        return _react.default.createElement(_ServiceMap.ServiceMap, null);
      },
      name: 'service-map'
    });
  }

  return homeTabs;
}

var SETTINGS_LINK_LABEL = _i18n.i18n.translate('xpack.apm.settingsLinkLabel', {
  defaultMessage: 'Settings'
});

function Home(_ref2) {
  var tab = _ref2.tab;

  var _useApmPluginContext = (0, _useApmPluginContext2.useApmPluginContext)(),
      config = _useApmPluginContext.config;

  var homeTabs = getHomeTabs(config);
  var selectedTab = homeTabs.find(function (homeTab) {
    return homeTab.name === tab;
  });
  return _react.default.createElement("div", null, _react.default.createElement(_ApmHeader.ApmHeader, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, "APM"))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_SettingsLink.SettingsLink, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    color: "primary",
    iconType: "gear"
  }, SETTINGS_LINK_LABEL))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_SetupInstructionsLink.SetupInstructionsLink, null)))), _react.default.createElement(_eui.EuiTabs, null, homeTabs.map(function (homeTab) {
    return _react.default.createElement(_EuiTabLink.EuiTabLink, {
      isSelected: homeTab === selectedTab,
      key: homeTab.name
    }, homeTab.link);
  })), selectedTab.render());
}