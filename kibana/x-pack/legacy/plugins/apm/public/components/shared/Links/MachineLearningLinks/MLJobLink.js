"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLJobLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _ml_job_constants = require("../../../../../../../../plugins/apm/common/ml_job_constants");

var _MLLink = require("./MLLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MLJobLink = function MLJobLink(_ref) {
  var serviceName = _ref.serviceName,
      transactionType = _ref.transactionType,
      children = _ref.children;
  var jobId = (0, _ml_job_constants.getMlJobId)(serviceName, transactionType);
  var query = {
    ml: {
      jobIds: [jobId]
    }
  };
  return _react.default.createElement(_MLLink.MLLink, {
    children: children,
    query: query,
    path: "/timeseriesexplorer"
  });
};

exports.MLJobLink = MLJobLink;