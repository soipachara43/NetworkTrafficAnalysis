"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNetworkDnsColumns = void 0;

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _react = _interopRequireDefault(require("react"));

var _types = require("../../../../graphql/types");

var _draggable_wrapper = require("../../../drag_and_drop/draggable_wrapper");

var _helpers = require("../../../drag_and_drop/helpers");

var _empty_value = require("../../../empty_value");

var _data_provider = require("../../../timeline/data_providers/data_provider");

var _formatted_bytes = require("../../../formatted_bytes");

var _provider = require("../../../timeline/data_providers/provider");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getNetworkDnsColumns = function getNetworkDnsColumns() {
  return [{
    field: "node.".concat(_types.NetworkDnsFields.dnsName),
    name: i18n.REGISTERED_DOMAIN,
    truncateText: false,
    hideForMobile: false,
    sortable: true,
    render: function render(dnsName) {
      if (dnsName != null) {
        var id = (0, _helpers.escapeDataProviderId)("networkDns-table--name-".concat(dnsName));
        return _react.default.createElement(_draggable_wrapper.DraggableWrapper, {
          key: id,
          dataProvider: {
            and: [],
            enabled: true,
            id: id,
            name: dnsName,
            excluded: false,
            kqlQuery: '',
            queryMatch: {
              field: 'dns.question.registered_domain',
              value: dnsName,
              operator: _data_provider.IS_OPERATOR
            }
          },
          render: function render(dataProvider, _, snapshot) {
            return snapshot.isDragging ? _react.default.createElement(_draggable_wrapper.DragEffects, null, _react.default.createElement(_provider.Provider, {
              dataProvider: dataProvider
            })) : (0, _empty_value.defaultToEmptyTag)(dnsName);
          }
        });
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }, {
    align: 'right',
    field: "node.".concat(_types.NetworkDnsFields.queryCount),
    name: i18n.TOTAL_QUERIES,
    sortable: true,
    truncateText: false,
    hideForMobile: false,
    render: function render(queryCount) {
      if (queryCount != null) {
        return (0, _numeral.default)(queryCount).format('0');
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }, {
    align: 'right',
    field: "node.".concat(_types.NetworkDnsFields.uniqueDomains),
    name: i18n.UNIQUE_DOMAINS,
    sortable: true,
    truncateText: false,
    hideForMobile: false,
    render: function render(uniqueDomains) {
      if (uniqueDomains != null) {
        return (0, _numeral.default)(uniqueDomains).format('0');
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }, {
    align: 'right',
    field: "node.".concat(_types.NetworkDnsFields.dnsBytesIn),
    name: i18n.DNS_BYTES_IN,
    sortable: true,
    truncateText: false,
    hideForMobile: false,
    render: function render(dnsBytesIn) {
      if (dnsBytesIn != null) {
        return _react.default.createElement(_formatted_bytes.PreferenceFormattedBytes, {
          value: dnsBytesIn
        });
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }, {
    align: 'right',
    field: "node.".concat(_types.NetworkDnsFields.dnsBytesOut),
    name: i18n.DNS_BYTES_OUT,
    sortable: true,
    truncateText: false,
    hideForMobile: false,
    render: function render(dnsBytesOut) {
      if (dnsBytesOut != null) {
        return _react.default.createElement(_formatted_bytes.PreferenceFormattedBytes, {
          value: dnsBytesOut
        });
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }];
};

exports.getNetworkDnsColumns = getNetworkDnsColumns;