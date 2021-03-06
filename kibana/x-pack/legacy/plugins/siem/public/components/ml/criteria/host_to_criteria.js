"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hostToCriteria = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var hostToCriteria = function hostToCriteria(hostItem) {
  if (hostItem.host != null && hostItem.host.name != null) {
    var criteria = [{
      fieldName: 'host.name',
      fieldValue: hostItem.host.name[0]
    }];
    return criteria;
  } else {
    return [];
  }
};

exports.hostToCriteria = hostToCriteria;