"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLJobLink = exports.getMLJobLinkHref = void 0;

var _react = _interopRequireDefault(require("react"));

var _url = _interopRequireDefault(require("url"));

var _eui = require("@elastic/eui");

var _risonNode = _interopRequireDefault(require("rison-node"));

var _ml_anomaly = require("../../../state/api/ml_anomaly");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getMLJobLinkHref = function getMLJobLinkHref(_ref) {
  var basePath = _ref.basePath,
      monitorId = _ref.monitorId,
      dateRange = _ref.dateRange;
  var query = {
    ml: {
      jobIds: [(0, _ml_anomaly.getMLJobId)(monitorId)]
    },
    refreshInterval: {
      pause: true,
      value: 0
    },
    time: dateRange
  };
  var queryParams = {
    mlExplorerFilter: {
      filterActive: true,
      filteredFields: ['monitor.id', monitorId]
    },
    mlExplorerSwimlane: {
      viewByFieldName: 'observer.geo.name'
    }
  };
  var path = '/explorer';
  return _url.default.format({
    pathname: basePath + '/app/ml',
    hash: "".concat(path, "?_g=").concat(_risonNode.default.encode(query)) + (monitorId ? "&_a=".concat(_risonNode.default.encode(queryParams)) : '')
  });
};

exports.getMLJobLinkHref = getMLJobLinkHref;

var MLJobLink = function MLJobLink(_ref2) {
  var basePath = _ref2.basePath,
      monitorId = _ref2.monitorId,
      dateRange = _ref2.dateRange,
      children = _ref2.children;
  var href = getMLJobLinkHref({
    basePath: basePath,
    monitorId: monitorId,
    dateRange: dateRange
  });
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    children: children,
    size: "s",
    href: href,
    target: "_blank"
  });
};

exports.MLJobLink = MLJobLink;