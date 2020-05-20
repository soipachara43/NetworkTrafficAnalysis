"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceList = TraceList;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../style/variables");

var _formatters = require("../../../utils/formatters");

var _EmptyMessage = require("../../shared/EmptyMessage");

var _ImpactBar = require("../../shared/ImpactBar");

var _TransactionDetailLink = require("../../shared/Links/apm/TransactionDetailLink");

var _ManagedTable = require("../../shared/ManagedTable");

var _LoadingStatePrompt = require("../../shared/LoadingStatePrompt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StyledTransactionLink = (0, _styledComponents.default)(_TransactionDetailLink.TransactionDetailLink).withConfig({
  displayName: "StyledTransactionLink",
  componentId: "sc-137e0tc-0"
})(["font-size:", ";", ";"], _variables.fontSizes.large, (0, _variables.truncate)('100%'));
var traceListColumns = [{
  field: 'name',
  name: _i18n.i18n.translate('xpack.apm.tracesTable.nameColumnLabel', {
    defaultMessage: 'Name'
  }),
  width: '40%',
  sortable: true,
  render: function render(name, _ref) {
    var sample = _ref.sample;
    return _react.default.createElement(_eui.EuiToolTip, {
      id: "trace-transaction-link-tooltip",
      content: name
    }, _react.default.createElement(StyledTransactionLink, {
      serviceName: sample.service.name,
      transactionId: sample.transaction.id,
      traceId: sample.trace.id,
      transactionName: sample.transaction.name,
      transactionType: sample.transaction.type
    }, name));
  }
}, {
  field: 'sample.service.name',
  name: _i18n.i18n.translate('xpack.apm.tracesTable.originatingServiceColumnLabel', {
    defaultMessage: 'Originating service'
  }),
  sortable: true
}, {
  field: 'averageResponseTime',
  name: _i18n.i18n.translate('xpack.apm.tracesTable.avgResponseTimeColumnLabel', {
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
  name: _i18n.i18n.translate('xpack.apm.tracesTable.tracesPerMinuteColumnLabel', {
    defaultMessage: 'Traces per minute'
  }),
  sortable: true,
  dataType: 'number',
  render: function render(value) {
    return "".concat(value.toLocaleString(), " ").concat(_i18n.i18n.translate('xpack.apm.tracesTable.tracesPerMinuteUnitLabel', {
      defaultMessage: 'tpm'
    }));
  }
}, {
  field: 'impact',
  name: _react.default.createElement(_eui.EuiToolTip, {
    content: _i18n.i18n.translate('xpack.apm.tracesTable.impactColumnDescription', {
      defaultMessage: "The most used and slowest endpoints in your service. It's calculated by taking the relative average duration times the number of transactions per minute."
    })
  }, _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.apm.tracesTable.impactColumnLabel', {
    defaultMessage: 'Impact'
  }), ' ', _react.default.createElement(_eui.EuiIcon, {
    size: "s",
    color: "subdued",
    type: "questionInCircle",
    className: "eui-alignTop"
  }))),
  width: '20%',
  align: 'left',
  sortable: true,
  render: function render(value) {
    return _react.default.createElement(_ImpactBar.ImpactBar, {
      value: value
    });
  }
}];

var noItemsMessage = _react.default.createElement(_EmptyMessage.EmptyMessage, {
  heading: _i18n.i18n.translate('xpack.apm.tracesTable.notFoundLabel', {
    defaultMessage: 'No traces found for this query'
  })
});

function TraceList(_ref2) {
  var _ref2$items = _ref2.items,
      items = _ref2$items === void 0 ? [] : _ref2$items,
      isLoading = _ref2.isLoading;
  var noItems = isLoading ? _react.default.createElement(_LoadingStatePrompt.LoadingStatePrompt, null) : noItemsMessage;
  return _react.default.createElement(_ManagedTable.ManagedTable, {
    columns: traceListColumns,
    items: items,
    initialSortField: "impact",
    initialSortDirection: "desc",
    noItemsMessage: noItems,
    initialPageSize: 25
  });
}