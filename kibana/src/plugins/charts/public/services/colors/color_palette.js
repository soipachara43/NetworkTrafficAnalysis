"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createColorPalette = createColorPalette;

var _d = _interopRequireDefault(require("d3"));

var _lodash = _interopRequireDefault(require("lodash"));

var _seed_colors = require("./seed_colors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var offset = 300; // Hue offset to start at

var fraction = function fraction(goal) {
  var walkTree = function walkTree(numerator, denominator, bytes) {
    if (bytes.length) {
      return walkTree(numerator * 2 + (bytes.pop() ? 1 : -1), denominator * 2, bytes);
    } else {
      return numerator / denominator;
    }
  };

  var b = (goal + 2).toString(2).split('').map(function (num) {
    return parseInt(num, 10);
  });
  b.shift();
  return walkTree(1, 2, b);
};
/**
 * Generates an array of hex colors the length of the input number.
 * If the number is greater than the length of seed colors available,
 * new colors are generated up to the value of the input number.
 */


function createColorPalette(num) {
  if (!_lodash.default.isNumber(num)) {
    throw new TypeError('ColorPaletteUtilService expects a number');
  }

  var colors = _seed_colors.seedColors;
  var seedLength = _seed_colors.seedColors.length;

  _lodash.default.times(num - seedLength, function (i) {
    colors.push(_d.default.hsl((fraction(i + seedLength + 1) * 360 + offset) % 360, 0.5, 0.5).toString());
  });

  return colors;
}