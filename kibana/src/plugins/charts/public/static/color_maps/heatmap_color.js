"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHeatmapColors = getHeatmapColors;

var _lodash = _interopRequireDefault(require("lodash"));

var _color_maps = require("./color_maps");

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
function enforceBounds(x) {
  if (x < 0) {
    return 0;
  } else if (x > 1) {
    return 1;
  } else {
    return x;
  }
}

function interpolateLinearly(x, values) {
  // Split values into four lists
  var xValues = [];
  var rValues = [];
  var gValues = [];
  var bValues = [];
  values.forEach(function (value) {
    xValues.push(value[0]);
    rValues.push(value[1][0]);
    gValues.push(value[1][1]);
    bValues.push(value[1][2]);
  });
  var i = 1;

  while (xValues[i] < x) {
    i++;
  }

  var width = Math.abs(xValues[i - 1] - xValues[i]);
  var scalingFactor = (x - xValues[i - 1]) / width; // Get the new color values though interpolation

  var r = rValues[i - 1] + scalingFactor * (rValues[i] - rValues[i - 1]);
  var g = gValues[i - 1] + scalingFactor * (gValues[i] - gValues[i - 1]);
  var b = bValues[i - 1] + scalingFactor * (bValues[i] - bValues[i - 1]);
  return [enforceBounds(r), enforceBounds(g), enforceBounds(b)];
}

function getHeatmapColors(value, colorSchemaName) {
  if (!_lodash.default.isNumber(value) || value < 0 || value > 1) {
    throw new Error('heatmap_color expects a number from 0 to 1 as first parameter');
  } // @ts-ignore


  var colorSchema = _color_maps.vislibColorMaps[colorSchemaName].value;

  if (!colorSchema) {
    throw new Error('invalid colorSchemaName provided');
  }

  var color = interpolateLinearly(value, colorSchema);
  var r = Math.round(255 * color[0]);
  var g = Math.round(255 * color[1]);
  var b = Math.round(255 * color[2]);
  return "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
}

function drawColormap(colorSchema) {
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext('2d');

  if (ctx === null) {
    throw new Error('no HeatmapColors canvas context found');
  }

  for (var i = 0; i <= width; i++) {
    ctx.fillStyle = getHeatmapColors(i / width, colorSchema);
    ctx.fillRect(i, 0, 1, height);
  }

  return canvas;
}

getHeatmapColors.prototype.drawColormap = drawColormap;