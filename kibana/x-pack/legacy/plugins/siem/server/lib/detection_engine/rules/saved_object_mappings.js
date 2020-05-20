"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ruleStatusSavedObjectMappings = exports.ruleStatusSavedObjectType = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ruleStatusSavedObjectType = 'siem-detection-engine-rule-status';
exports.ruleStatusSavedObjectType = ruleStatusSavedObjectType;
const ruleStatusSavedObjectMappings = {
  [ruleStatusSavedObjectType]: {
    properties: {
      alertId: {
        type: 'keyword'
      },
      status: {
        type: 'keyword'
      },
      statusDate: {
        type: 'date'
      },
      lastFailureAt: {
        type: 'date'
      },
      lastSuccessAt: {
        type: 'date'
      },
      lastFailureMessage: {
        type: 'text'
      },
      lastSuccessMessage: {
        type: 'text'
      },
      lastLookBackDate: {
        type: 'date'
      },
      gap: {
        type: 'text'
      },
      bulkCreateTimeDurations: {
        type: 'float'
      },
      searchAfterTimeDurations: {
        type: 'float'
      }
    }
  }
};
exports.ruleStatusSavedObjectMappings = ruleStatusSavedObjectMappings;