"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubMetricParamEditor = SubMetricParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../plugins/data/public");

var _utils = require("./utils");

var _agg_params = require("../agg_params");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
function SubMetricParamEditor(_ref) {
  var agg = _ref.agg,
      aggParam = _ref.aggParam,
      formIsTouched = _ref.formIsTouched,
      metricAggs = _ref.metricAggs,
      state = _ref.state,
      setValue = _ref.setValue,
      setValidity = _ref.setValidity,
      setTouched = _ref.setTouched,
      schemas = _ref.schemas;

  var metricTitle = _i18n.i18n.translate('visDefaultEditor.controls.metrics.metricTitle', {
    defaultMessage: 'Metric'
  });

  var bucketTitle = _i18n.i18n.translate('visDefaultEditor.controls.metrics.bucketTitle', {
    defaultMessage: 'Bucket'
  });

  var type = aggParam.name;
  var aggTitle = type === 'customMetric' ? metricTitle : bucketTitle;
  var aggGroup = type === 'customMetric' ? _public.AggGroupNames.Metrics : _public.AggGroupNames.Buckets;
  (0, _react.useEffect)(function () {
    if (agg.params[type]) {
      setValue(agg.params[type]);
    } else {
      setValue(aggParam.makeAgg(agg));
    }
  }, []);

  var _useSubAggParamsHandl = (0, _utils.useSubAggParamsHandlers)(agg, aggParam, agg.params[type], setValue),
      onAggTypeChange = _useSubAggParamsHandl.onAggTypeChange,
      setAggParamValue = _useSubAggParamsHandl.setAggParamValue;

  if (!agg.params[type]) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFormLabel, null, aggTitle), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_agg_params.DefaultEditorAggParams, {
    agg: agg.params[type],
    allowedAggs: aggParam.allowedAggs,
    groupName: aggGroup,
    className: "visEditorAgg__subAgg",
    formIsTouched: formIsTouched,
    indexPattern: agg.getIndexPattern(),
    metricAggs: metricAggs,
    state: state,
    setAggParamValue: setAggParamValue,
    onAggTypeChange: onAggTypeChange,
    setValidity: setValidity,
    setTouched: setTouched,
    schemas: schemas,
    hideCustomLabel: true
  }));
}