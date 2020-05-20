"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IS_KIBANA_RELEASE = exports.IS_KIBANA_DISTRIBUTABLE = void 0;

var _utils = require("../../core/server/utils");

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
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const IS_KIBANA_DISTRIBUTABLE = _utils.pkg.build && _utils.pkg.build.distributable === true;
exports.IS_KIBANA_DISTRIBUTABLE = IS_KIBANA_DISTRIBUTABLE;
const IS_KIBANA_RELEASE = _utils.pkg.build && _utils.pkg.build.release === true;
exports.IS_KIBANA_RELEASE = IS_KIBANA_RELEASE;