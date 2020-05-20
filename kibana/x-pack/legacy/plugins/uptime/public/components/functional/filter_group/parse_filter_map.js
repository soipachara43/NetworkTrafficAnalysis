"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFiltersMap = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * These are the only filter fields we are looking to catch at the moment.
 * If your code needs to support custom fields, introduce a second parameter to
 * `parseFiltersMap` to take a list of FilterField objects.
 */
var filterWhitelist = [{
  name: 'ports',
  fieldName: 'url.port'
}, {
  name: 'locations',
  fieldName: 'observer.geo.name'
}, {
  name: 'tags',
  fieldName: 'tags'
}, {
  name: 'schemes',
  fieldName: 'monitor.type'
}];

var parseFiltersMap = function parseFiltersMap(filterMapString) {
  if (!filterMapString) {
    return {};
  }

  var filterSlices = {};

  try {
    var map = new Map(JSON.parse(filterMapString));
    filterWhitelist.forEach(function (_ref) {
      var _map$get;

      var name = _ref.name,
          fieldName = _ref.fieldName;
      filterSlices[name] = (_map$get = map.get(fieldName)) !== null && _map$get !== void 0 ? _map$get : [];
    });
    return filterSlices;
  } catch (_unused) {
    throw new Error('Unable to parse invalid filter string');
  }
};

exports.parseFiltersMap = parseFiltersMap;