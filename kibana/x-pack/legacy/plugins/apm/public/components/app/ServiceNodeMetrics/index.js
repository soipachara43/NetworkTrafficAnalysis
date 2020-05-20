"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceNodeMetrics = ServiceNodeMetrics;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react2 = require("@kbn/i18n/react");

var _service_nodes = require("../../../../../../../plugins/apm/common/service_nodes");

var _ApmHeader = require("../../shared/ApmHeader");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _useAgentName2 = require("../../../hooks/useAgentName");

var _useServiceMetricCharts = require("../../../hooks/useServiceMetricCharts");

var _ChartsSyncContext = require("../../../context/ChartsSyncContext");

var _MetricsChart = require("../../shared/charts/MetricsChart");

var _useFetcher2 = require("../../../hooks/useFetcher");

var _variables = require("../../../style/variables");

var _ElasticDocsLink = require("../../shared/Links/ElasticDocsLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INITIAL_DATA = {
  host: '',
  containerId: ''
};

var Truncate = _styledComponents.default.span.withConfig({
  displayName: "Truncate",
  componentId: "sc-1e367jm-0"
})(["display:block;", ""], (0, _variables.truncate)((0, _variables.px)(_variables.unit * 12)));

function ServiceNodeMetrics() {
  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      urlParams = _useUrlParams.urlParams,
      uiFilters = _useUrlParams.uiFilters;

  var serviceName = urlParams.serviceName,
      serviceNodeName = urlParams.serviceNodeName;

  var _useAgentName = (0, _useAgentName2.useAgentName)(),
      agentName = _useAgentName.agentName;

  var _useServiceMetricChar = (0, _useServiceMetricCharts.useServiceMetricCharts)(urlParams, agentName),
      data = _useServiceMetricChar.data;

  var start = urlParams.start,
      end = urlParams.end;

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (serviceName && serviceNodeName && start && end) {
      return callApmApi({
        pathname: '/api/apm/services/{serviceName}/node/{serviceNodeName}/metadata',
        params: {
          path: {
            serviceName: serviceName,
            serviceNodeName: serviceNodeName
          },
          query: {
            start: start,
            end: end,
            uiFilters: JSON.stringify(uiFilters)
          }
        }
      });
    }
  }, [serviceName, serviceNodeName, start, end, uiFilters]),
      _useFetcher$data = _useFetcher.data;

  _useFetcher$data = _useFetcher$data === void 0 ? INITIAL_DATA : _useFetcher$data;
  var host = _useFetcher$data.host,
      containerId = _useFetcher$data.containerId,
      status = _useFetcher.status;
  var isLoading = status === _useFetcher2.FETCH_STATUS.LOADING;
  var isAggregatedData = serviceNodeName === _service_nodes.SERVICE_NODE_NAME_MISSING;
  return _react.default.createElement("div", null, _react.default.createElement(_ApmHeader.ApmHeader, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "l"
  }, _react.default.createElement("h1", null, serviceName))))), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), isAggregatedData ? _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.apm.serviceNodeMetrics.unidentifiedServiceNodesWarningTitle', {
      defaultMessage: 'Could not identify JVMs'
    }),
    iconType: "help",
    color: "warning"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.apm.serviceNodeMetrics.unidentifiedServiceNodesWarningText",
    defaultMessage: "We could not identify which JVMs these metrics belong to. This is likely caused by running a version of APM Server that is older than 7.5. Upgrading to APM Server 7.5 or higher should resolve this issue. For more information on upgrading, see the {link}. As an alternative, you can use the Kibana Query bar to filter by hostname, container ID or other fields.",
    values: {
      link: _react.default.createElement(_ElasticDocsLink.ElasticDocsLink, {
        target: "_blank",
        section: "/apm/server",
        path: "/upgrading.html"
      }, _i18n.i18n.translate('xpack.apm.serviceNodeMetrics.unidentifiedServiceNodesWarningDocumentationLink', {
        defaultMessage: 'documentation of APM Server'
      }))
    }
  })) : _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xl"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiStat, {
    titleSize: "s",
    description: _i18n.i18n.translate('xpack.apm.serviceNodeMetrics.serviceName', {
      defaultMessage: 'Service name'
    }),
    title: _react.default.createElement(_eui.EuiToolTip, {
      content: serviceName
    }, _react.default.createElement(Truncate, null, serviceName))
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiStat, {
    titleSize: "s",
    isLoading: isLoading,
    description: _i18n.i18n.translate('xpack.apm.serviceNodeMetrics.host', {
      defaultMessage: 'Host'
    }),
    title: _react.default.createElement(_eui.EuiToolTip, {
      content: host
    }, _react.default.createElement(Truncate, null, host))
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiStat, {
    titleSize: "s",
    isLoading: isLoading,
    description: _i18n.i18n.translate('xpack.apm.serviceNodeMetrics.containerId', {
      defaultMessage: 'Container ID'
    }),
    title: _react.default.createElement(_eui.EuiToolTip, {
      content: containerId
    }, _react.default.createElement(Truncate, null, containerId))
  }))), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), agentName && serviceNodeName && _react.default.createElement(_ChartsSyncContext.ChartsSyncContextProvider, null, _react.default.createElement(_eui.EuiFlexGrid, {
    columns: 2,
    gutterSize: "s"
  }, data.charts.map(function (chart) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: chart.key
    }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_MetricsChart.MetricsChart, {
      start: start,
      end: end,
      chart: chart
    })));
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "xxl"
  })));
}