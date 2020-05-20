"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceDetailTabs = ServiceDetailTabs;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _agent_name = require("../../../../../../../plugins/apm/common/agent_name");

var _useAgentName2 = require("../../../hooks/useAgentName");

var _useApmPluginContext = require("../../../hooks/useApmPluginContext");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _EuiTabLink = require("../../shared/EuiTabLink");

var _ErrorOverviewLink = require("../../shared/Links/apm/ErrorOverviewLink");

var _MetricOverviewLink = require("../../shared/Links/apm/MetricOverviewLink");

var _ServiceMapLink = require("../../shared/Links/apm/ServiceMapLink");

var _ServiceNodeOverviewLink = require("../../shared/Links/apm/ServiceNodeOverviewLink");

var _TransactionOverviewLink = require("../../shared/Links/apm/TransactionOverviewLink");

var _ErrorGroupOverview = require("../ErrorGroupOverview");

var _ServiceMap = require("../ServiceMap");

var _ServiceMetrics = require("../ServiceMetrics");

var _ServiceNodeOverview = require("../ServiceNodeOverview");

var _TransactionOverview = require("../TransactionOverview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function ServiceDetailTabs(_ref) {
  var tab = _ref.tab;

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams;

  var serviceName = urlParams.serviceName;

  var _useAgentName = (0, _useAgentName2.useAgentName)(),
      agentName = _useAgentName.agentName;

  var serviceMapEnabled = (0, _useApmPluginContext.useApmPluginContext)().config.serviceMapEnabled;

  if (!serviceName) {
    // this never happens, urlParams type is not accurate enough
    throw new Error('Service name was not defined');
  }

  var transactionsTab = {
    link: _react.default.createElement(_TransactionOverviewLink.TransactionOverviewLink, {
      serviceName: serviceName
    }, _i18n.i18n.translate('xpack.apm.serviceDetails.transactionsTabLabel', {
      defaultMessage: 'Transactions'
    })),
    render: function render() {
      return _react.default.createElement(_TransactionOverview.TransactionOverview, null);
    },
    name: 'transactions'
  };
  var errorsTab = {
    link: _react.default.createElement(_ErrorOverviewLink.ErrorOverviewLink, {
      serviceName: serviceName
    }, _i18n.i18n.translate('xpack.apm.serviceDetails.errorsTabLabel', {
      defaultMessage: 'Errors'
    })),
    render: function render() {
      return _react.default.createElement(_ErrorGroupOverview.ErrorGroupOverview, null);
    },
    name: 'errors'
  };
  var tabs = [transactionsTab, errorsTab];

  if ((0, _agent_name.isJavaAgentName)(agentName)) {
    var nodesListTab = {
      link: _react.default.createElement(_ServiceNodeOverviewLink.ServiceNodeOverviewLink, {
        serviceName: serviceName
      }, _i18n.i18n.translate('xpack.apm.serviceDetails.nodesTabLabel', {
        defaultMessage: 'JVMs'
      })),
      render: function render() {
        return _react.default.createElement(_ServiceNodeOverview.ServiceNodeOverview, null);
      },
      name: 'nodes'
    };
    tabs.push(nodesListTab);
  } else if (agentName && !(0, _agent_name.isRumAgentName)(agentName)) {
    var metricsTab = {
      link: _react.default.createElement(_MetricOverviewLink.MetricOverviewLink, {
        serviceName: serviceName
      }, _i18n.i18n.translate('xpack.apm.serviceDetails.metricsTabLabel', {
        defaultMessage: 'Metrics'
      })),
      render: function render() {
        return _react.default.createElement(_ServiceMetrics.ServiceMetrics, {
          agentName: agentName
        });
      },
      name: 'metrics'
    };
    tabs.push(metricsTab);
  }

  var serviceMapTab = {
    link: _react.default.createElement(_ServiceMapLink.ServiceMapLink, {
      serviceName: serviceName
    }, _i18n.i18n.translate('xpack.apm.home.serviceMapTabLabel', {
      defaultMessage: 'Service Map'
    })),
    render: function render() {
      return _react.default.createElement(_ServiceMap.ServiceMap, {
        serviceName: serviceName
      });
    },
    name: 'service-map'
  };

  if (serviceMapEnabled) {
    tabs.push(serviceMapTab);
  }

  var selectedTab = tabs.find(function (serviceTab) {
    return serviceTab.name === tab;
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTabs, null, tabs.map(function (serviceTab) {
    return _react.default.createElement(_EuiTabLink.EuiTabLink, {
      isSelected: serviceTab.name === tab,
      key: serviceTab.name
    }, serviceTab.link);
  })), selectedTab ? selectedTab.render() : null);
}