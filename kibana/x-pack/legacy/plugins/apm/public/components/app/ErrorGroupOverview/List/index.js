"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorGroupList = void 0;

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _i18n2 = require("../../../../../../../../plugins/apm/common/i18n");

var _variables = require("../../../../style/variables");

var _useUrlParams2 = require("../../../../hooks/useUrlParams");

var _ManagedTable = require("../../../shared/ManagedTable");

var _ErrorDetailLink = require("../../../shared/Links/apm/ErrorDetailLink");

var _TimestampTooltip = require("../../../shared/TimestampTooltip");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var GroupIdLink = (0, _styledComponents.default)(_ErrorDetailLink.ErrorDetailLink).withConfig({
  displayName: "GroupIdLink",
  componentId: "sc-12m0avg-0"
})(["font-family:", ";"], _variables.fontFamilyCode);

var MessageAndCulpritCell = _styledComponents.default.div.withConfig({
  displayName: "MessageAndCulpritCell",
  componentId: "sc-12m0avg-1"
})(["", ";"], (0, _variables.truncate)('100%'));

var MessageLink = (0, _styledComponents.default)(_ErrorDetailLink.ErrorDetailLink).withConfig({
  displayName: "MessageLink",
  componentId: "sc-12m0avg-2"
})(["font-family:", ";font-size:", ";", ";"], _variables.fontFamilyCode, _variables.fontSizes.large, (0, _variables.truncate)('100%'));

var Culprit = _styledComponents.default.div.withConfig({
  displayName: "Culprit",
  componentId: "sc-12m0avg-3"
})(["font-family:", ";"], _variables.fontFamilyCode);

var ErrorGroupList = function ErrorGroupList(props) {
  var items = props.items;

  var _useUrlParams = (0, _useUrlParams2.useUrlParams)(),
      serviceName = _useUrlParams.urlParams.serviceName;

  if (!serviceName) {
    throw new Error('Service name is required');
  }

  var columns = (0, _react.useMemo)(function () {
    return [{
      name: _i18n.i18n.translate('xpack.apm.errorsTable.groupIdColumnLabel', {
        defaultMessage: 'Group ID'
      }),
      field: 'groupId',
      sortable: false,
      width: (0, _variables.px)(_variables.unit * 6),
      render: function render(groupId) {
        return _react.default.createElement(GroupIdLink, {
          serviceName: serviceName,
          errorGroupId: groupId
        }, groupId.slice(0, 5) || _i18n2.NOT_AVAILABLE_LABEL);
      }
    }, {
      name: _i18n.i18n.translate('xpack.apm.errorsTable.errorMessageAndCulpritColumnLabel', {
        defaultMessage: 'Error message and culprit'
      }),
      field: 'message',
      sortable: false,
      width: '50%',
      render: function render(message, item) {
        return _react.default.createElement(MessageAndCulpritCell, null, _react.default.createElement(_eui.EuiToolTip, {
          id: "error-message-tooltip",
          content: message || _i18n2.NOT_AVAILABLE_LABEL
        }, _react.default.createElement(MessageLink, {
          serviceName: serviceName,
          errorGroupId: item.groupId
        }, message || _i18n2.NOT_AVAILABLE_LABEL)), _react.default.createElement("br", null), _react.default.createElement(_eui.EuiToolTip, {
          id: "error-culprit-tooltip",
          content: item.culprit || _i18n2.NOT_AVAILABLE_LABEL
        }, _react.default.createElement(Culprit, null, item.culprit || _i18n2.NOT_AVAILABLE_LABEL)));
      }
    }, {
      name: '',
      field: 'handled',
      sortable: false,
      align: 'right',
      render: function render(isUnhandled) {
        return isUnhandled === false && _react.default.createElement(_eui.EuiBadge, {
          color: "warning"
        }, _i18n.i18n.translate('xpack.apm.errorsTable.unhandledLabel', {
          defaultMessage: 'Unhandled'
        }));
      }
    }, {
      name: _i18n.i18n.translate('xpack.apm.errorsTable.occurrencesColumnLabel', {
        defaultMessage: 'Occurrences'
      }),
      field: 'occurrenceCount',
      sortable: true,
      dataType: 'number',
      render: function render(value) {
        return value ? (0, _numeral.default)(value).format('0.[0]a') : _i18n2.NOT_AVAILABLE_LABEL;
      }
    }, {
      field: 'latestOccurrenceAt',
      sortable: true,
      name: _i18n.i18n.translate('xpack.apm.errorsTable.latestOccurrenceColumnLabel', {
        defaultMessage: 'Latest occurrence'
      }),
      align: 'right',
      render: function render(value) {
        return value ? _react.default.createElement(_TimestampTooltip.TimestampTooltip, {
          time: value,
          timeUnit: "minutes"
        }) : _i18n2.NOT_AVAILABLE_LABEL;
      }
    }];
  }, [serviceName]);
  return _react.default.createElement(_ManagedTable.ManagedTable, {
    noItemsMessage: _i18n.i18n.translate('xpack.apm.errorsTable.noErrorsLabel', {
      defaultMessage: 'No errors were found'
    }),
    items: items,
    columns: columns,
    initialPageSize: 25,
    initialSortField: "occurrenceCount",
    initialSortDirection: "desc",
    sortItems: false
  });
};

exports.ErrorGroupList = ErrorGroupList;