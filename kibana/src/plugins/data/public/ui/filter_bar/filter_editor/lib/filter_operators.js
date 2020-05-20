"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FILTER_OPERATORS = exports.doesNotExistOperator = exports.existsOperator = exports.isNotBetweenOperator = exports.isBetweenOperator = exports.isNotOneOfOperator = exports.isOneOfOperator = exports.isNotOperator = exports.isOperator = void 0;

var _i18n = require("@kbn/i18n");

var _filters = require("../../../../../common/es_query/filters");

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
var isOperator = {
  message: _i18n.i18n.translate('data.filter.filterEditor.isOperatorOptionLabel', {
    defaultMessage: 'is'
  }),
  type: _filters.FILTERS.PHRASE,
  negate: false
};
exports.isOperator = isOperator;
var isNotOperator = {
  message: _i18n.i18n.translate('data.filter.filterEditor.isNotOperatorOptionLabel', {
    defaultMessage: 'is not'
  }),
  type: _filters.FILTERS.PHRASE,
  negate: true
};
exports.isNotOperator = isNotOperator;
var isOneOfOperator = {
  message: _i18n.i18n.translate('data.filter.filterEditor.isOneOfOperatorOptionLabel', {
    defaultMessage: 'is one of'
  }),
  type: _filters.FILTERS.PHRASES,
  negate: false,
  fieldTypes: ['string', 'number', 'date', 'ip', 'geo_point', 'geo_shape']
};
exports.isOneOfOperator = isOneOfOperator;
var isNotOneOfOperator = {
  message: _i18n.i18n.translate('data.filter.filterEditor.isNotOneOfOperatorOptionLabel', {
    defaultMessage: 'is not one of'
  }),
  type: _filters.FILTERS.PHRASES,
  negate: true,
  fieldTypes: ['string', 'number', 'date', 'ip', 'geo_point', 'geo_shape']
};
exports.isNotOneOfOperator = isNotOneOfOperator;
var isBetweenOperator = {
  message: _i18n.i18n.translate('data.filter.filterEditor.isBetweenOperatorOptionLabel', {
    defaultMessage: 'is between'
  }),
  type: _filters.FILTERS.RANGE,
  negate: false,
  fieldTypes: ['number', 'date', 'ip']
};
exports.isBetweenOperator = isBetweenOperator;
var isNotBetweenOperator = {
  message: _i18n.i18n.translate('data.filter.filterEditor.isNotBetweenOperatorOptionLabel', {
    defaultMessage: 'is not between'
  }),
  type: _filters.FILTERS.RANGE,
  negate: true,
  fieldTypes: ['number', 'date', 'ip']
};
exports.isNotBetweenOperator = isNotBetweenOperator;
var existsOperator = {
  message: _i18n.i18n.translate('data.filter.filterEditor.existsOperatorOptionLabel', {
    defaultMessage: 'exists'
  }),
  type: _filters.FILTERS.EXISTS,
  negate: false
};
exports.existsOperator = existsOperator;
var doesNotExistOperator = {
  message: _i18n.i18n.translate('data.filter.filterEditor.doesNotExistOperatorOptionLabel', {
    defaultMessage: 'does not exist'
  }),
  type: _filters.FILTERS.EXISTS,
  negate: true
};
exports.doesNotExistOperator = doesNotExistOperator;
var FILTER_OPERATORS = [isOperator, isNotOperator, isOneOfOperator, isNotOneOfOperator, isBetweenOperator, isNotBetweenOperator, existsOperator, doesNotExistOperator];
exports.FILTER_OPERATORS = FILTER_OPERATORS;