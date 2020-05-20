"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAnnotationRequest = buildAnnotationRequest;

var _build_processor_function = require("../build_processor_function");

var _annotations = require("../request_processors/annotations");

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

/**
 * Builds annotation request body
 *
 * @param {...args}: [
 *   req: {Object} - a request object,
 *   panel: {Object} - a panel object,
 *   annotation: {Object} - an annotation object,
 *   esQueryConfig: {Object} - es query config object,
 *   indexPatternObject: {Object} - an index pattern object,
 *   capabilities: {Object} - a search capabilities object
 * ]
 * @returns {Object} doc - processed body
 */
function buildAnnotationRequest(...args) {
  const processor = (0, _build_processor_function.buildProcessorFunction)(_annotations.processors, ...args);
  const doc = processor({});
  return doc;
}