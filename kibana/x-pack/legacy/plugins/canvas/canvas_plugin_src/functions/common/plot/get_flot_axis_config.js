"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFlotAxisConfig = void 0;

var _lodash = require("lodash");

var _types = require("../../../../types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getFlotAxisConfig = (axis, argValue, {
  columns,
  ticks,
  font
} = {}) => {
  if (!argValue || (0, _types.isAxisConfig)(argValue) && argValue.show === false) {
    return {
      show: false
    };
  }

  const config = {
    show: true
  };
  const axisType = (0, _lodash.get)(columns, `${axis}.type`);

  if ((0, _types.isAxisConfig)(argValue)) {
    const {
      position,
      min,
      max,
      tickSize
    } = argValue; // first value is used as the default

    const acceptedPositions = axis === 'x' ? ['bottom', 'top'] : ['left', 'right'];
    config.position = position && acceptedPositions.includes(position) ? position : acceptedPositions[0];

    if (axisType === 'number' || axisType === 'date') {
      if (min != null) {
        config.min = min;
      }

      if (max != null) {
        config.max = max;
      }
    }

    if (tickSize && axisType === 'number') {
      config.tickSize = tickSize;
    }
  }

  if (axisType === 'string' && ticks) {
    const tickAxis = ticks[axis];

    if (tickAxis) {
      config.ticks = (0, _lodash.map)(tickAxis.hash, (position, name) => [position, name]);
    }
  }

  if (axisType === 'date') {
    config.mode = 'time';
  }

  if (typeof font === 'object') {
    config.font = font;
  }

  return config;
};

exports.getFlotAxisConfig = getFlotAxisConfig;