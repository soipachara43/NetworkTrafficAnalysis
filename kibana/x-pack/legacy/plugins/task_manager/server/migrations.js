"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.migrations = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const migrations = {
  task: {
    '7.4.0': doc => ({ ...doc,
      updated_at: new Date().toISOString()
    }),
    '7.6.0': moveIntervalIntoSchedule
  }
};
exports.migrations = migrations;

function moveIntervalIntoSchedule({
  attributes: {
    interval,
    ...attributes
  },
  ...doc
}) {
  return { ...doc,
    attributes: { ...attributes,
      ...(interval ? {
        schedule: {
          interval
        }
      } : {})
    }
  };
}