"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seriesStyleToFlot = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const seriesStyleToFlot = seriesStyle => {
  if (!seriesStyle) {
    return {};
  }

  const lines = (0, _lodash.get)(seriesStyle, 'lines');
  const bars = (0, _lodash.get)(seriesStyle, 'bars');
  const fill = (0, _lodash.get)(seriesStyle, 'fill');
  const color = (0, _lodash.get)(seriesStyle, 'color');
  const stack = (0, _lodash.get)(seriesStyle, 'stack');
  const horizontal = (0, _lodash.get)(seriesStyle, 'horizontalBars', false);
  const flotStyle = {
    numbers: {
      show: true
    },
    lines: {
      show: lines > 0,
      lineWidth: lines,
      fillColor: color,
      fill: fill / 10
    },
    bars: {
      show: bars > 0,
      barWidth: bars,
      fill: 1,
      align: 'center',
      horizontal
    },
    // This is here intentionally even though it is the default.
    // We use the `size` plugins for this and if the user says they want points
    // we just set the size to be static.
    points: {
      show: false
    },
    bubbles: {
      show: true,
      fill
    }
  };

  if (stack != null) {
    flotStyle.stack = stack;
  }

  if (color) {
    flotStyle.color = color;
  }

  return flotStyle;
};

exports.seriesStyleToFlot = seriesStyleToFlot;