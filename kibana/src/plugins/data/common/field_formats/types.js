"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FieldFormat", {
  enumerable: true,
  get: function () {
    return _field_format.FieldFormat;
  }
});
exports.FIELD_FORMAT_IDS = void 0;

var _field_format = require("./field_format");

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

/** @public **/
let FIELD_FORMAT_IDS;
exports.FIELD_FORMAT_IDS = FIELD_FORMAT_IDS;

(function (FIELD_FORMAT_IDS) {
  FIELD_FORMAT_IDS["_SOURCE"] = "_source";
  FIELD_FORMAT_IDS["BOOLEAN"] = "boolean";
  FIELD_FORMAT_IDS["BYTES"] = "bytes";
  FIELD_FORMAT_IDS["COLOR"] = "color";
  FIELD_FORMAT_IDS["CUSTOM"] = "custom";
  FIELD_FORMAT_IDS["DATE"] = "date";
  FIELD_FORMAT_IDS["DATE_NANOS"] = "date_nanos";
  FIELD_FORMAT_IDS["DURATION"] = "duration";
  FIELD_FORMAT_IDS["IP"] = "ip";
  FIELD_FORMAT_IDS["NUMBER"] = "number";
  FIELD_FORMAT_IDS["PERCENT"] = "percent";
  FIELD_FORMAT_IDS["RELATIVE_DATE"] = "relative_date";
  FIELD_FORMAT_IDS["STATIC_LOOKUP"] = "static_lookup";
  FIELD_FORMAT_IDS["STRING"] = "string";
  FIELD_FORMAT_IDS["TRUNCATE"] = "truncate";
  FIELD_FORMAT_IDS["URL"] = "url";
})(FIELD_FORMAT_IDS || (exports.FIELD_FORMAT_IDS = FIELD_FORMAT_IDS = {}));