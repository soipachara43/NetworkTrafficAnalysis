"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceList = ServiceList;
exports.SERVICE_COLUMNS = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n2 = require("../../../../../../../../plugins/apm/common/i18n");

var _variables = require("../../../../style/variables");

var _formatters = require("../../../../utils/formatters");

var _ManagedTable = require("../../../shared/ManagedTable");

var _EnvironmentBadge = require("../../../shared/EnvironmentBadge");

var _TransactionOverviewLink = require("../../../shared/Links/apm/TransactionOverviewLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function formatNumber(value) {
  if (value === 0) {
    return '0';
  } else if (value <= 0.1) {
    return '< 0.1';
  } else {
    return (0, _formatters.asDecimal)(value);
  }
}

function formatString(value) {
  return value || _i18n2.NOT_AVAILABLE_LABEL;
}

var AppLink = (0, _styledComponents.default)(_TransactionOverviewLink.TransactionOverviewLink).withConfig({
  displayName: "AppLink",
  componentId: "sc-1axllds-0"
})(["font-size:", ";", ";"], _variables.fontSizes.large, (0, _variables.truncate)('100%'));
var SERVICE_COLUMNS = [{
  field: 'serviceName',
  name: _i18n.i18n.translate('xpack.apm.servicesTable.nameColumnLabel', {
    defaultMessage: 'Name'
  }),
  width: '40%',
  sortable: true,
  render: function render(serviceName) {
    return _react.default.createElement(_eui.EuiToolTip, {
      content: formatString(serviceName),
      id: "service-name-tooltip"
    }, _react.default.createElement(AppLink, {
      serviceName: serviceName
    }, formatString(serviceName)));
  }
}, {
  field: 'environments',
  name: _i18n.i18n.translate('xpack.apm.servicesTable.environmentColumnLabel', {
    defaultMessage: 'Environment'
  }),
  width: '20%',
  sortable: true,
  render: function render(environments) {
    return _react.default.createElement(_EnvironmentBadge.EnvironmentBadge, {
      environments: environments
    });
  }
}, {
  field: 'agentName',
  name: _i18n.i18n.translate('xpack.apm.servicesTable.agentColumnLabel', {
    defaultMessage: 'Agent'
  }),
  sortable: true,
  render: function render(agentName) {
    return formatString(agentName);
  }
}, {
  field: 'avgResponseTime',
  name: _i18n.i18n.translate('xpack.apm.servicesTable.avgResponseTimeColumnLabel', {
    defaultMessage: 'Avg. response time'
  }),
  sortable: true,
  dataType: 'number',
  render: function render(time) {
    return (0, _formatters.convertTo)({
      unit: 'milliseconds',
      microseconds: time
    }).formatted;
  }
}, {
  field: 'transactionsPerMinute',
  name: _i18n.i18n.translate('xpack.apm.servicesTable.transactionsPerMinuteColumnLabel', {
    defaultMessage: 'Trans. per minute'
  }),
  sortable: true,
  dataType: 'number',
  render: function render(value) {
    return "".concat(formatNumber(value), " ").concat(_i18n.i18n.translate('xpack.apm.servicesTable.transactionsPerMinuteUnitLabel', {
      defaultMessage: 'tpm'
    }));
  }
}, {
  field: 'errorsPerMinute',
  name: _i18n.i18n.translate('xpack.apm.servicesTable.errorsPerMinuteColumnLabel', {
    defaultMessage: 'Errors per minute'
  }),
  sortable: true,
  dataType: 'number',
  render: function render(value) {
    return "".concat(formatNumber(value), " ").concat(_i18n.i18n.translate('xpack.apm.servicesTable.errorsPerMinuteUnitLabel', {
      defaultMessage: 'err.'
    }));
  }
}];
exports.SERVICE_COLUMNS = SERVICE_COLUMNS;

function ServiceList(_ref) {
  var items = _ref.items,
      noItemsMessage = _ref.noItemsMessage;
  return _react.default.createElement(_ManagedTable.ManagedTable, {
    columns: SERVICE_COLUMNS,
    items: items,
    noItemsMessage: noItemsMessage,
    initialSortField: "serviceName",
    initialPageSize: 50
  });
}