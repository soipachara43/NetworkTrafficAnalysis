"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEditorConfig = getEditorConfig;

var _i18n = require("@kbn/i18n");

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
function getEditorConfig(indexPattern, aggTypeName, fieldName) {
  var aggRestrictions = indexPattern.getAggregationRestrictions();

  if (!aggRestrictions || !aggTypeName || !fieldName) {
    return {};
  } // Exclude certain param options for terms:
  // otherBucket, missingBucket, orderBy, orderAgg


  if (aggTypeName === 'terms') {
    return {
      otherBucket: {
        hidden: true
      },
      missingBucket: {
        hidden: true
      }
    };
  }

  var fieldAgg = aggRestrictions[aggTypeName] && aggRestrictions[aggTypeName][fieldName];

  if (!fieldAgg) {
    return {};
  } // Set interval and base interval for histograms based on agg restrictions


  if (aggTypeName === 'histogram') {
    var interval = fieldAgg.interval;
    return interval ? {
      intervalBase: {
        fixedValue: interval
      },
      interval: {
        base: interval,
        help: _i18n.i18n.translate('visDefaultEditor.editorConfig.histogram.interval.helpText', {
          defaultMessage: 'Must be a multiple of configuration interval: {interval}',
          values: {
            interval: interval
          }
        })
      }
    } : {};
  } // Set date histogram time zone based on agg restrictions


  if (aggTypeName === 'date_histogram') {
    // Interval is deprecated on date_histogram rollups, but may still be present
    // See https://github.com/elastic/kibana/pull/36310
    var _interval = fieldAgg.calendar_interval || fieldAgg.fixed_interval;

    return {
      useNormalizedEsInterval: {
        fixedValue: false
      },
      interval: {
        default: _interval,
        timeBase: _interval,
        help: _i18n.i18n.translate('visDefaultEditor.editorConfig.dateHistogram.customInterval.helpText', {
          defaultMessage: 'Must be a multiple of configuration interval: {interval}',
          values: {
            interval: _interval
          }
        })
      }
    };
  }

  return {};
}