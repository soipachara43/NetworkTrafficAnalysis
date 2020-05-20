"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.totalAggregations = void 0;

var _i18n = require("@kbn/i18n");

var _types = require("../types");

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
var totalAggregations = [{
  value: _types.AggTypes.SUM,
  text: _i18n.i18n.translate('visTypeTable.totalAggregations.sumText', {
    defaultMessage: 'Sum'
  })
}, {
  value: _types.AggTypes.AVG,
  text: _i18n.i18n.translate('visTypeTable.totalAggregations.averageText', {
    defaultMessage: 'Average'
  })
}, {
  value: _types.AggTypes.MIN,
  text: _i18n.i18n.translate('visTypeTable.totalAggregations.minText', {
    defaultMessage: 'Min'
  })
}, {
  value: _types.AggTypes.MAX,
  text: _i18n.i18n.translate('visTypeTable.totalAggregations.maxText', {
    defaultMessage: 'Max'
  })
}, {
  value: _types.AggTypes.COUNT,
  text: _i18n.i18n.translate('visTypeTable.totalAggregations.countText', {
    defaultMessage: 'Count'
  })
}];
exports.totalAggregations = totalAggregations;