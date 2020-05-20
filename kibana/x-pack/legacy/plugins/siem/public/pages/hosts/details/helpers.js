"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHostDetailsPageFilters = exports.getHostDetailsEventsKqlQueryExpression = void 0;

var _keury = require("../../../lib/keury");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/** Returns the kqlQueryExpression for the `Events` widget on the `Host Details` page */
var getHostDetailsEventsKqlQueryExpression = function getHostDetailsEventsKqlQueryExpression(_ref) {
  var filterQueryExpression = _ref.filterQueryExpression,
      hostName = _ref.hostName;

  if (filterQueryExpression.length) {
    return "".concat(filterQueryExpression).concat(hostName.length ? " and host.name: ".concat((0, _keury.escapeQueryValue)(hostName)) : '');
  } else {
    return hostName.length ? "host.name: ".concat((0, _keury.escapeQueryValue)(hostName)) : '';
  }
};

exports.getHostDetailsEventsKqlQueryExpression = getHostDetailsEventsKqlQueryExpression;

var getHostDetailsPageFilters = function getHostDetailsPageFilters(hostName) {
  return [{
    meta: {
      alias: null,
      negate: false,
      disabled: false,
      type: 'phrase',
      key: 'host.name',
      value: hostName,
      params: {
        query: hostName
      }
    },
    query: {
      match: {
        'host.name': {
          query: hostName,
          type: 'phrase'
        }
      }
    }
  }];
};

exports.getHostDetailsPageFilters = getHostDetailsPageFilters;