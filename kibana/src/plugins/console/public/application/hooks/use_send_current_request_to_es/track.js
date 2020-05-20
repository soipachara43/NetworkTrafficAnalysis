"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.track = void 0;

var _get_endpoint_from_position = require("../../../lib/autocomplete/get_endpoint_from_position");

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
var track = function track(requests, editor, trackUiMetric) {
  var coreEditor = editor.getCoreEditor(); // `getEndpointFromPosition` gets values from the server-side generated JSON files which
  // are a combination of JS, automatically generated JSON and manual overrides. That means
  // the metrics reported from here will be tied to the definitions in those files.
  // See src/legacy/core_plugins/console/server/api_server/spec

  var endpointDescription = (0, _get_endpoint_from_position.getEndpointFromPosition)(coreEditor, coreEditor.getCurrentPosition(), editor.parser);

  if (requests[0] && endpointDescription) {
    var _endpointDescription$;

    var eventName = "".concat(requests[0].method, "_").concat((_endpointDescription$ = endpointDescription.id) !== null && _endpointDescription$ !== void 0 ? _endpointDescription$ : 'unknown');
    trackUiMetric.count(eventName);
  }
};

exports.track = track;