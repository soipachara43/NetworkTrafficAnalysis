"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceNodeOverview = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n2 = require("../../../../../../../plugins/apm/common/i18n");

var _service_nodes = require("../../../../../../../plugins/apm/common/service_nodes");

var _typings = require("../../../../../../../plugins/apm/common/projections/typings");

var _LocalUIFilters = require("../../shared/LocalUIFilters");

var _useUrlParams2 = require("../../../hooks/useUrlParams");

var _ManagedTable = require("../../shared/ManagedTable");

var _useFetcher2 = require("../../../hooks/useFetcher");

var _formatters = require("../../../utils/formatters");

var _ServiceNodeMetricOverviewLink = require("../../shared/Links/apm/ServiceNodeMetricOverviewLink");

var _variables = require("../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INITIAL_PAGE_SIZE = 25;
var INITIAL_SORT_FIELD = 'cpu';
var INITIAL_SORT_DIRECTION = 'desc';

var ServiceNodeName = _styledComponents.default.div.withConfig({
  displayName: "ServiceNodeName",
  componentId: "sc-1pmt842-0"
})(["", ""], (0, _variables.truncate)((0, _variables.px)(8 * _variables.unit)));

var ServiceNodeOverview = function ServiceNodeOverview() {
  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      uiFilters = _useUrlParams.uiFilters,
      urlParams = _useUrlParams.urlParams;

  var serviceName = urlParams.serviceName,
      start = urlParams.start,
      end = urlParams.end;
  var localFiltersConfig = (0, _react.useMemo)(function () {
    return {
      filterNames: ['host', 'containerId', 'podName'],
      params: {
        serviceName: serviceName
      },
      projection: _typings.PROJECTION.SERVICE_NODES
    };
  }, [serviceName]);

  var _useFetcher = (0, _useFetcher2.useFetcher)(function (callApmApi) {
    if (!serviceName || !start || !end) {
      return undefined;
    }

    return callApmApi({
      pathname: '/api/apm/services/{serviceName}/serviceNodes',
      params: {
        path: {
          serviceName: serviceName
        },
        query: {
          start: start,
          end: end,
          uiFilters: JSON.stringify(uiFilters)
        }
      }
    });
  }, [serviceName, start, end, uiFilters]),
      _useFetcher$data = _useFetcher.data,
      items = _useFetcher$data === void 0 ? [] : _useFetcher$data;

  if (!serviceName) {
    return null;
  }

  var columns = [{
    name: _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.apm.jvmsTable.nameExplanation', {
        defaultMessage: "By default, the JVM name is the container ID (where applicable) or the hostname, but it can be manually configured through the agent's 'service_node_name' configuration."
      })
    }, _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.apm.jvmsTable.nameColumnLabel', {
      defaultMessage: 'Name'
    }))),
    field: 'name',
    sortable: true,
    render: function render(name) {
      var _ref = name === _service_nodes.SERVICE_NODE_NAME_MISSING ? {
        displayedName: _i18n2.UNIDENTIFIED_SERVICE_NODES_LABEL,
        tooltip: _i18n.i18n.translate('xpack.apm.jvmsTable.explainServiceNodeNameMissing', {
          defaultMessage: 'We could not identify which JVMs these metrics belong to. This is likely caused by running a version of APM Server that is older than 7.5. Upgrading to APM Server 7.5 or higher should resolve this issue.'
        })
      } : {
        displayedName: name,
        tooltip: name
      },
          displayedName = _ref.displayedName,
          tooltip = _ref.tooltip;

      return _react.default.createElement(_eui.EuiToolTip, {
        content: tooltip
      }, _react.default.createElement(_ServiceNodeMetricOverviewLink.ServiceNodeMetricOverviewLink, {
        serviceName: serviceName,
        serviceNodeName: name
      }, _react.default.createElement(ServiceNodeName, null, displayedName)));
    }
  }, {
    name: _i18n.i18n.translate('xpack.apm.jvmsTable.cpuColumnLabel', {
      defaultMessage: 'CPU avg'
    }),
    field: 'cpu',
    sortable: true,
    render: function render(value) {
      return (0, _formatters.asPercent)(value || 0, 1);
    }
  }, {
    name: _i18n.i18n.translate('xpack.apm.jvmsTable.heapMemoryColumnLabel', {
      defaultMessage: 'Heap memory avg'
    }),
    field: 'heapMemory',
    sortable: true,
    render: _formatters.asDynamicBytes
  }, {
    name: _i18n.i18n.translate('xpack.apm.jvmsTable.nonHeapMemoryColumnLabel', {
      defaultMessage: 'Non-heap memory avg'
    }),
    field: 'nonHeapMemory',
    sortable: true,
    render: _formatters.asDynamicBytes
  }, {
    name: _i18n.i18n.translate('xpack.apm.jvmsTable.threadCountColumnLabel', {
      defaultMessage: 'Thread count max'
    }),
    field: 'threadCount',
    sortable: true,
    render: _formatters.asInteger
  }];
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_LocalUIFilters.LocalUIFilters, localFiltersConfig)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 7
  }, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_ManagedTable.ManagedTable, {
    noItemsMessage: _i18n.i18n.translate('xpack.apm.jvmsTable.noJvmsLabel', {
      defaultMessage: 'No JVMs were found'
    }),
    items: items,
    columns: columns,
    initialPageSize: INITIAL_PAGE_SIZE,
    initialSortField: INITIAL_SORT_FIELD,
    initialSortDirection: INITIAL_SORT_DIRECTION
  })))));
};

exports.ServiceNodeOverview = ServiceNodeOverview;