"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorMapsMock = void 0;

var _color_maps = require("./color_maps");

var _heatmap_color = require("./heatmap_color");

var _truncated_color_maps = require("./truncated_color_maps");

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
// Note: Using actual values due to existing test dependencies
var colorMapsMock = {
  getHeatmapColors: jest.fn(_heatmap_color.getHeatmapColors),
  vislibColorMaps: _color_maps.vislibColorMaps,
  colorSchemas: _color_maps.colorSchemas,
  truncatedColorMaps: _truncated_color_maps.truncatedColorMaps,
  truncatedColorSchemas: _truncated_color_maps.truncatedColorSchemas
};
exports.colorMapsMock = colorMapsMock;