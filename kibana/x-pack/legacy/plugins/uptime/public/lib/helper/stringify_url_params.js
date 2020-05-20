"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringifyUrlParams = void 0;

var _queryString = require("query-string");

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AUTOREFRESH_INTERVAL = _constants.CLIENT_DEFAULTS.AUTOREFRESH_INTERVAL,
    AUTOREFRESH_IS_PAUSED = _constants.CLIENT_DEFAULTS.AUTOREFRESH_IS_PAUSED,
    DATE_RANGE_START = _constants.CLIENT_DEFAULTS.DATE_RANGE_START,
    DATE_RANGE_END = _constants.CLIENT_DEFAULTS.DATE_RANGE_END;

var stringifyUrlParams = function stringifyUrlParams(params) {
  var ignoreEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (ignoreEmpty) {
    Object.keys(params).forEach(function (key) {
      // @ts-ignore
      var val = params[key];

      if (val == null || val === '') {
        // @ts-ignore
        delete params[key];
      }

      if (key === 'dateRangeStart' && val === DATE_RANGE_START) {
        delete params[key];
      }

      if (key === 'dateRangeEnd' && val === DATE_RANGE_END) {
        delete params[key];
      }

      if (key === 'autorefreshIsPaused' && val === AUTOREFRESH_IS_PAUSED) {
        delete params[key];
      }

      if (key === 'autorefreshInterval' && val === AUTOREFRESH_INTERVAL) {
        delete params[key];
      }
    });
  }

  return "?".concat((0, _queryString.stringify)(params, {
    sort: false
  }));
};

exports.stringifyUrlParams = stringifyUrlParams;