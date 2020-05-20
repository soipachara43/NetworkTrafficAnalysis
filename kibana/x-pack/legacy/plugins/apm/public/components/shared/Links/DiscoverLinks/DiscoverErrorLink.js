"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscoverErrorLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _elasticsearch_fieldnames = require("../../../../../../../../plugins/apm/common/elasticsearch_fieldnames");

var _DiscoverLink = require("./DiscoverLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getDiscoverQuery(error, kuery) {
  var serviceName = error.service.name;
  var groupId = error.error.grouping_key;
  var query = "".concat(_elasticsearch_fieldnames.SERVICE_NAME, ":\"").concat(serviceName, "\" AND ").concat(_elasticsearch_fieldnames.ERROR_GROUP_ID, ":\"").concat(groupId, "\"");

  if (kuery) {
    query += " AND ".concat(kuery);
  }

  return {
    _a: {
      interval: 'auto',
      query: {
        language: 'kuery',
        query: query
      },
      sort: {
        '@timestamp': 'desc'
      }
    }
  };
}

var DiscoverErrorLink = function DiscoverErrorLink(_ref) {
  var error = _ref.error,
      kuery = _ref.kuery,
      children = _ref.children;
  return _react.default.createElement(_DiscoverLink.DiscoverLink, {
    query: getDiscoverQuery(error, kuery),
    children: children
  });
};

exports.DiscoverErrorLink = DiscoverErrorLink;