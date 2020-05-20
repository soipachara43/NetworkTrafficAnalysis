"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.networkToCriteria = void 0;

var _types = require("../../../graphql/types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var networkToCriteria = function networkToCriteria(ip, flowTarget) {
  if (flowTarget === _types.FlowTarget.source) {
    return [{
      fieldName: 'source.ip',
      fieldValue: ip
    }];
  } else if (flowTarget === _types.FlowTarget.destination) {
    return [{
      fieldName: 'destination.ip',
      fieldValue: ip
    }];
  } else {
    return [];
  }
};

exports.networkToCriteria = networkToCriteria;