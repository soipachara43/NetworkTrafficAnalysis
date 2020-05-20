"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionList = TransactionList;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n2 = require("../../../../../../../../plugins/apm/common/i18n");

var _variables = require("../../../../style/variables");

var _formatters = require("../../../../utils/formatters");

var _ImpactBar = require("../../../shared/ImpactBar");

var _ManagedTable = require("../../../shared/ManagedTable");

var _LoadingStatePrompt = require("../../../shared/LoadingStatePrompt");

var _EmptyMessage = require("../../../shared/EmptyMessage");

var _TransactionDetailLink = require("../../../shared/Links/apm/TransactionDetailLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TransactionNameLink = (0, _styledComponents.default)(_TransactionDetailLink.TransactionDetailLink).withConfig({
  displayName: "TransactionNameLink",
  componentId: "sc-1p719lf-0"
})(["", ";font-family:", ";"], (0, _variables.truncate)('100%'), _variables.fontFamilyCode);

var toMilliseconds = function toMilliseconds(time) {
  return (0, _formatters.convertTo)({
    unit: 'milliseconds',
    microseconds: time
  }).formatted;
};

function TransactionList(_ref) {
  var items = _ref.items,
      isLoading = _ref.isLoading;
  var columns = (0, _react.useMemo)(function () {
    return [{
      field: 'name',
      name: _i18n.i18n.translate('xpack.apm.transactionsTable.nameColumnLabel', {
        defaultMessage: 'Name'
      }),
      width: '50%',
      sortable: true,
      render: function render(transactionName, _ref2) {
        var sample = _ref2.sample;
        return _react.default.createElement(_eui.EuiToolTip, {
          id: "transaction-name-link-tooltip",
          content: transactionName || _i18n2.NOT_AVAILABLE_LABEL
        }, _react.default.createElement(TransactionNameLink, {
          serviceName: sample.service.name,
          transactionId: sample.transaction.id,
          traceId: sample.trace.id,
          transactionName: sample.transaction.name,
          transactionType: sample.transaction.type
        }, transactionName || _i18n2.NOT_AVAILABLE_LABEL));
      }
    }, {
      field: 'averageResponseTime',
      name: _i18n.i18n.translate('xpack.apm.transactionsTable.avgDurationColumnLabel', {
        defaultMessage: 'Avg. duration'
      }),
      sortable: true,
      dataType: 'number',
      render: function render(time) {
        return toMilliseconds(time);
      }
    }, {
      field: 'p95',
      name: _i18n.i18n.translate('xpack.apm.transactionsTable.95thPercentileColumnLabel', {
        defaultMessage: '95th percentile'
      }),
      sortable: true,
      dataType: 'number',
      render: function render(time) {
        return toMilliseconds(time);
      }
    }, {
      field: 'transactionsPerMinute',
      name: _i18n.i18n.translate('xpack.apm.transactionsTable.transactionsPerMinuteColumnLabel', {
        defaultMessage: 'Trans. per minute'
      }),
      sortable: true,
      dataType: 'number',
      render: function render(value) {
        return "".concat((0, _formatters.asDecimal)(value), " ").concat(_i18n.i18n.translate('xpack.apm.transactionsTable.transactionsPerMinuteUnitLabel', {
          defaultMessage: 'tpm'
        }));
      }
    }, {
      field: 'impact',
      name: _react.default.createElement(_eui.EuiToolTip, {
        content: _i18n.i18n.translate('xpack.apm.transactionsTable.impactColumnDescription', {
          defaultMessage: "The most used and slowest endpoints in your service. It's calculated by taking the relative average duration times the number of transactions per minute."
        })
      }, _react.default.createElement(_react.default.Fragment, null, _i18n.i18n.translate('xpack.apm.transactionsTable.impactColumnLabel', {
        defaultMessage: 'Impact'
      }), ' ', _react.default.createElement(_eui.EuiIcon, {
        size: "s",
        color: "subdued",
        type: "questionInCircle",
        className: "eui-alignTop"
      }))),
      sortable: true,
      dataType: 'number',
      render: function render(value) {
        return _react.default.createElement(_ImpactBar.ImpactBar, {
          value: value
        });
      }
    }];
  }, []);

  var noItemsMessage = _react.default.createElement(_EmptyMessage.EmptyMessage, {
    heading: _i18n.i18n.translate('xpack.apm.transactionsTable.notFoundLabel', {
      defaultMessage: 'No transactions were found.'
    })
  });

  return _react.default.createElement(_ManagedTable.ManagedTable, {
    noItemsMessage: isLoading ? _react.default.createElement(_LoadingStatePrompt.LoadingStatePrompt, null) : noItemsMessage,
    columns: columns,
    items: items,
    initialSortField: "impact",
    initialSortDirection: "desc",
    initialPageSize: 25
  });
}