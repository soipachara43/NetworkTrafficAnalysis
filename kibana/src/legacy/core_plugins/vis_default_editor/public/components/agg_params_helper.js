"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAggParamsToRender = getAggParamsToRender;
exports.getAggTypeOptions = getAggTypeOptions;
exports.isInvalidParamsTouched = isInvalidParamsTouched;

var _lodash = require("lodash");

var _utils = require("../utils");

var _agg_params_map = require("./agg_params_map");

var _schemas = require("../schemas");

var _public = require("../../../../../plugins/data/public");

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
function getAggParamsToRender(_ref, aggTypeFieldFilters) {
  var agg = _ref.agg,
      editorConfig = _ref.editorConfig,
      metricAggs = _ref.metricAggs,
      state = _ref.state,
      schemas = _ref.schemas,
      hideCustomLabel = _ref.hideCustomLabel;
  var params = {
    basic: [],
    advanced: []
  };
  var paramsToRender = agg.type && agg.type.params // Filter out, i.e. don't render, any parameter that is hidden via the editor config.
  .filter(function (param) {
    return !(0, _lodash.get)(editorConfig, [param.name, 'hidden'], false);
  }) || [];
  var schema = (0, _schemas.getSchemaByName)(schemas, agg.schema); // build collection of agg params components

  paramsToRender.forEach(function (param, index) {
    var indexedFields = [];
    var fields;

    if (hideCustomLabel && param.name === 'customLabel') {
      return;
    } // if field param exists, compute allowed fields


    if (param.type === 'field') {
      var availableFields = param.getAvailableFields(agg); // should be refactored in the future to provide a more general way
      // for visualization to override some agg config settings

      if (agg.type.name === 'top_hits' && param.name === 'field') {
        var allowStrings = _.get(schema, "aggSettings[".concat(agg.type.name, "].allowStrings"), false);

        if (!allowStrings) {
          availableFields = availableFields.filter(function (field) {
            return field.type === 'number';
          });
        }
      }

      fields = aggTypeFieldFilters.filter(availableFields, agg);
      indexedFields = (0, _utils.groupAndSortBy)(fields, 'type', 'name');

      if (fields && !indexedFields.length && index > 0) {
        // don't draw the rest of the options if there are no indexed fields and it's an extra param (index > 0).
        return;
      }
    }

    var type = param.advanced ? 'advanced' : 'basic';
    var paramEditor;

    if (agg.type.subtype && _agg_params_map.aggParamsMap[agg.type.subtype]) {
      paramEditor = (0, _lodash.get)(_agg_params_map.aggParamsMap, [agg.type.subtype, param.name]);
    } else {
      var aggType = agg.type.type;
      var aggName = agg.type.name;
      var aggParams = (0, _lodash.get)(_agg_params_map.aggParamsMap, [aggType, aggName], {});
      paramEditor = (0, _lodash.get)(aggParams, param.name) || (0, _lodash.get)(_agg_params_map.aggParamsMap, ['common', param.type]);
    } // show params with an editor component


    if (paramEditor) {
      params[type].push({
        agg: agg,
        aggParam: param,
        editorConfig: editorConfig,
        indexedFields: indexedFields,
        paramEditor: paramEditor,
        metricAggs: metricAggs,
        state: state,
        value: agg.params[param.name],
        schemas: schemas,
        hideCustomLabel: hideCustomLabel
      });
    }
  });
  return params;
}

function getAggTypeOptions(aggTypes, agg, indexPattern, groupName, allowedAggs) {
  var aggTypeOptions = _public.search.aggs.aggTypeFilters.filter(aggTypes[groupName], indexPattern, agg, allowedAggs);

  return (0, _utils.groupAndSortBy)(aggTypeOptions, 'subtype', 'title');
}
/**
 * Calculates a ngModel touched state.
 * If an aggregation is not selected, it returns a value of touched agg selector state.
 * Else if there are no invalid agg params, it returns false.
 * Otherwise it returns true if each invalid param is touched.
 * @param aggType Selected aggregation.
 * @param aggTypeState State of aggregation selector.
 * @param aggParams State of aggregation parameters.
 */


function isInvalidParamsTouched(aggType, aggTypeState, aggParams) {
  if (!aggType) {
    return aggTypeState.touched;
  }

  var invalidParams = Object.values(aggParams).filter(function (param) {
    return !param.valid;
  });

  if ((0, _lodash.isEmpty)(invalidParams)) {
    return false;
  }

  return invalidParams.every(function (param) {
    return param.touched;
  });
}