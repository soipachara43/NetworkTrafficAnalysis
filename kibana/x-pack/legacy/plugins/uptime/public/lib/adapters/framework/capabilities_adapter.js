"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntegratedAppAvailability = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getIntegratedAppAvailability = function getIntegratedAppAvailability(capabilities, integratedApps) {
  return integratedApps.reduce(function (supportedSolutions, solutionName) {
    supportedSolutions[solutionName] = capabilities[solutionName] && capabilities[solutionName].show === true;
    return supportedSolutions;
  }, {});
};

exports.getIntegratedAppAvailability = getIntegratedAppAvailability;