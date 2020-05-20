"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initInfraSource = void 0;

var _ccs_utils = require("../ccs_utils");

var _constants = require("../../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const initInfraSource = (config, infraPlugin) => {
  if (infraPlugin) {
    const filebeatIndexPattern = (0, _ccs_utils.prefixIndexPattern)(config, config.ui.logs.index, '*');
    infraPlugin.defineInternalSourceConfiguration(_constants.INFRA_SOURCE_ID, {
      name: 'Elastic Stack Logs',
      logAlias: filebeatIndexPattern
    });
  }
};

exports.initInfraSource = initInfraSource;