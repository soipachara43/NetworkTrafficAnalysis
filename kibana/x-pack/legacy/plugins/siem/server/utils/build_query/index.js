"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  assertUnreachable: true,
  inspectStringifyObject: true
};
exports.inspectStringifyObject = exports.assertUnreachable = void 0;

var _fields = require("./fields");

Object.keys(_fields).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fields[key];
    }
  });
});

var _filters = require("./filters");

Object.keys(_filters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filters[key];
    }
  });
});

var _merge_fields_with_hits = require("./merge_fields_with_hits");

Object.keys(_merge_fields_with_hits).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _merge_fields_with_hits[key];
    }
  });
});

var _calculate_timeseries_interval = require("./calculate_timeseries_interval");

Object.keys(_calculate_timeseries_interval).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _calculate_timeseries_interval[key];
    }
  });
});

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const assertUnreachable = (x, message = 'Unknown Field in switch statement') => {
  throw new Error(`${message} ${x}`);
};

exports.assertUnreachable = assertUnreachable;

const inspectStringifyObject = obj => {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return 'Sorry about that, something went wrong.';
  }
};

exports.inspectStringifyObject = inspectStringifyObject;