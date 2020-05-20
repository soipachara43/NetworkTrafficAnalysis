"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseFormatters = void 0;

var _converters = require("../converters");

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
const baseFormatters = [_converters.BoolFormat, _converters.BytesFormat, _converters.ColorFormat, _converters.DateNanosFormat, _converters.DurationFormat, _converters.IpFormat, _converters.NumberFormat, _converters.PercentFormat, _converters.RelativeDateFormat, _converters.SourceFormat, _converters.StaticLookupFormat, _converters.StringFormat, _converters.TruncateFormat, _converters.UrlFormat];
exports.baseFormatters = baseFormatters;