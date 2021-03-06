"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTickHash = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getTickHash = (columns, rows) => {
  const ticks = {
    x: {
      hash: {},
      counter: 0
    },
    y: {
      hash: {},
      counter: 0
    }
  };

  if ((0, _lodash.get)(columns, 'x.type') === 'string') {
    (0, _lodash.sortBy)(rows, ['x']).forEach(row => {
      if (!ticks.x.hash[row.x]) {
        ticks.x.hash[row.x] = ticks.x.counter++;
      }
    });
  }

  if ((0, _lodash.get)(columns, 'y.type') === 'string') {
    (0, _lodash.sortBy)(rows, ['y']).reverse().forEach(row => {
      if (!ticks.y.hash[row.y]) {
        ticks.y.hash[row.y] = ticks.y.counter++;
      }
    });
  }

  return ticks;
};

exports.getTickHash = getTickHash;