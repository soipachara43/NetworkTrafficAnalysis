"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getParentCandidates = getParentCandidates;

var _editor_utils = require("../editor_utils");

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
function getParentCandidates(controlParamsList, controlId, lineageMap) {
  return controlParamsList.filter(function (controlParams) {
    // Ignore controls that do not have index pattern and field set
    if (!controlParams.indexPattern || !controlParams.fieldName) {
      return false;
    } // Ignore controls that would create a circular graph


    var lineage = lineageMap.get(controlParams.id);

    if (lineage === null || lineage === void 0 ? void 0 : lineage.includes(controlId)) {
      return false;
    }

    return true;
  }).map(function (controlParams, controlIndex) {
    return {
      value: controlParams.id,
      text: (0, _editor_utils.getTitle)(controlParams, controlIndex)
    };
  });
}