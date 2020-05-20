"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Settings = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _HomeLink = require("../../shared/Links/apm/HomeLink");

var _useLocation2 = require("../../../hooks/useLocation");

var _APMLink = require("../../shared/Links/apm/APMLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Settings = function Settings(props) {
  var _useLocation = (0, _useLocation2.useLocation)(),
      search = _useLocation.search,
      pathname = _useLocation.pathname;

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_HomeLink.HomeLink, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    color: "primary",
    iconType: "arrowLeft"
  }, _i18n.i18n.translate('xpack.apm.settings.returnToOverviewLinkLabel', {
    defaultMessage: 'Return to overview'
  }))), _react.default.createElement(_eui.EuiPage, null, _react.default.createElement(_eui.EuiPageSideBar, null, _react.default.createElement(_eui.EuiSideNav, {
    items: [{
      name: _i18n.i18n.translate('xpack.apm.settings.pageTitle', {
        defaultMessage: 'Settings'
      }),
      id: 0,
      items: [{
        name: _i18n.i18n.translate('xpack.apm.settings.agentConfig', {
          defaultMessage: 'Agent Configuration'
        }),
        id: '1',
        href: (0, _APMLink.getAPMHref)('/settings/agent-configuration', search),
        isSelected: pathname.startsWith('/settings/agent-configuration')
      }, {
        name: _i18n.i18n.translate('xpack.apm.settings.indices', {
          defaultMessage: 'Indices'
        }),
        id: '2',
        href: (0, _APMLink.getAPMHref)('/settings/apm-indices', search),
        isSelected: pathname === '/settings/apm-indices'
      }, {
        name: _i18n.i18n.translate('xpack.apm.settings.customizeApp', {
          defaultMessage: 'Customize app'
        }),
        id: '3',
        href: (0, _APMLink.getAPMHref)('/settings/customize-ui', search),
        isSelected: pathname === '/settings/customize-ui'
      }]
    }]
  })), _react.default.createElement(_eui.EuiPageBody, null, props.children)));
};

exports.Settings = Settings;