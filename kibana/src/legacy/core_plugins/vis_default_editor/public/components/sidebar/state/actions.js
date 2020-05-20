"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateStateParams = exports.toggleEnabledAgg = exports.reorderAggs = exports.removeAgg = exports.setStateParamValue = exports.setAggParamValue = exports.changeAggType = exports.discardChanges = exports.addNewAgg = void 0;

var _constants = require("./constants");

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
var addNewAgg = function addNewAgg(schema) {
  return {
    type: _constants.EditorStateActionTypes.ADD_NEW_AGG,
    payload: {
      schema: schema
    }
  };
};

exports.addNewAgg = addNewAgg;

var discardChanges = function discardChanges(vis) {
  return {
    type: _constants.EditorStateActionTypes.DISCARD_CHANGES,
    payload: vis
  };
};

exports.discardChanges = discardChanges;

var changeAggType = function changeAggType(aggId, value) {
  return {
    type: _constants.EditorStateActionTypes.CHANGE_AGG_TYPE,
    payload: {
      aggId: aggId,
      value: value
    }
  };
};

exports.changeAggType = changeAggType;

var setAggParamValue = function setAggParamValue(aggId, paramName, value) {
  return {
    type: _constants.EditorStateActionTypes.SET_AGG_PARAM_VALUE,
    payload: {
      aggId: aggId,
      paramName: paramName,
      value: value
    }
  };
};

exports.setAggParamValue = setAggParamValue;

var setStateParamValue = function setStateParamValue(paramName, value) {
  return {
    type: _constants.EditorStateActionTypes.SET_STATE_PARAM_VALUE,
    payload: {
      paramName: paramName,
      value: value
    }
  };
};

exports.setStateParamValue = setStateParamValue;

var removeAgg = function removeAgg(aggId, schemas) {
  return {
    type: _constants.EditorStateActionTypes.REMOVE_AGG,
    payload: {
      aggId: aggId,
      schemas: schemas
    }
  };
};

exports.removeAgg = removeAgg;

var reorderAggs = function reorderAggs(sourceAgg, destinationAgg) {
  return {
    type: _constants.EditorStateActionTypes.REORDER_AGGS,
    payload: {
      sourceAgg: sourceAgg,
      destinationAgg: destinationAgg
    }
  };
};

exports.reorderAggs = reorderAggs;

var toggleEnabledAgg = function toggleEnabledAgg(aggId, enabled) {
  return {
    type: _constants.EditorStateActionTypes.TOGGLE_ENABLED_AGG,
    payload: {
      aggId: aggId,
      enabled: enabled
    }
  };
};

exports.toggleEnabledAgg = toggleEnabledAgg;

var updateStateParams = function updateStateParams(params) {
  return {
    type: _constants.EditorStateActionTypes.UPDATE_STATE_PARAMS,
    payload: {
      params: params
    }
  };
};

exports.updateStateParams = updateStateParams;