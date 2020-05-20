"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCriteriaFromHostType = void 0;

var _model = require("../../../store/hosts/model");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getCriteriaFromHostType = function getCriteriaFromHostType(type, hostName) {
  if (type === _model.HostsType.details && hostName != null) {
    return [{
      fieldName: 'host.name',
      fieldValue: hostName
    }];
  } else {
    return [];
  }
};

exports.getCriteriaFromHostType = getCriteriaFromHostType;