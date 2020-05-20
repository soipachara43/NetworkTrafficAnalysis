"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNetworkHttpColumns = void 0;

var _react = _interopRequireDefault(require("react"));

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _types = require("../../../../graphql/types");

var _helpers = require("../../../drag_and_drop/helpers");

var _empty_value = require("../../../empty_value");

var _links = require("../../../links");

var i18n = _interopRequireWildcard(require("./translations"));

var _helpers2 = require("../../../tables/helpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable react/display-name */
var getNetworkHttpColumns = function getNetworkHttpColumns(tableId) {
  return [{
    name: i18n.METHOD,
    render: function render(_ref) {
      var _ref$node = _ref.node,
          methods = _ref$node.methods,
          path = _ref$node.path;
      return Array.isArray(methods) && methods.length > 0 ? (0, _helpers2.getRowItemDraggables)({
        attrName: 'http.request.method',
        displayCount: 3,
        idPrefix: (0, _helpers.escapeDataProviderId)("".concat(tableId, "-table-methods-").concat(path)),
        rowItems: methods
      }) : (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    name: i18n.DOMAIN,
    render: function render(_ref2) {
      var _ref2$node = _ref2.node,
          domains = _ref2$node.domains,
          path = _ref2$node.path;
      return Array.isArray(domains) && domains.length > 0 ? (0, _helpers2.getRowItemDraggables)({
        attrName: 'url.domain',
        displayCount: 3,
        idPrefix: (0, _helpers.escapeDataProviderId)("".concat(tableId, "-table-domains-").concat(path)),
        rowItems: domains
      }) : (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    field: "node.".concat(_types.NetworkHttpFields.path),
    name: i18n.PATH,
    render: function render(path) {
      return path != null ? (0, _helpers2.getRowItemDraggable)({
        attrName: 'url.path',
        idPrefix: (0, _helpers.escapeDataProviderId)("".concat(tableId, "-table-path-").concat(path)),
        rowItem: path
      }) : (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    name: i18n.STATUS,
    render: function render(_ref3) {
      var _ref3$node = _ref3.node,
          statuses = _ref3$node.statuses,
          path = _ref3$node.path;
      return Array.isArray(statuses) && statuses.length > 0 ? (0, _helpers2.getRowItemDraggables)({
        attrName: 'http.response.status_code',
        displayCount: 3,
        idPrefix: (0, _helpers.escapeDataProviderId)("".concat(tableId, "-table-statuses-").concat(path)),
        rowItems: statuses
      }) : (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    name: i18n.LAST_HOST,
    render: function render(_ref4) {
      var _ref4$node = _ref4.node,
          lastHost = _ref4$node.lastHost,
          path = _ref4$node.path;
      return lastHost != null ? (0, _helpers2.getRowItemDraggable)({
        attrName: 'host.name',
        idPrefix: (0, _helpers.escapeDataProviderId)("".concat(tableId, "-table-lastHost-").concat(path)),
        rowItem: lastHost
      }) : (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    name: i18n.LAST_SOURCE_IP,
    render: function render(_ref5) {
      var _ref5$node = _ref5.node,
          lastSourceIp = _ref5$node.lastSourceIp,
          path = _ref5$node.path;
      return lastSourceIp != null ? (0, _helpers2.getRowItemDraggable)({
        attrName: 'source.ip',
        idPrefix: (0, _helpers.escapeDataProviderId)("".concat(tableId, "-table-lastSourceIp-").concat(path)),
        rowItem: lastSourceIp,
        render: function render() {
          return _react.default.createElement(_links.IPDetailsLink, {
            ip: lastSourceIp
          });
        }
      }) : (0, _empty_value.getEmptyTagValue)();
    }
  }, {
    align: 'right',
    field: "node.".concat(_types.NetworkHttpFields.requestCount),
    name: i18n.REQUESTS,
    sortable: true,
    render: function render(requestCount) {
      if (requestCount != null) {
        return (0, _numeral.default)(requestCount).format('0,000');
      } else {
        return (0, _empty_value.getEmptyTagValue)();
      }
    }
  }];
};

exports.getNetworkHttpColumns = getNetworkHttpColumns;