"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrderByParamEditor = OrderByParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _utils = require("./utils");

var _public = require("../../../../../../plugins/data/public");

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
var termsAggFilter = _public.search.aggs.termsAggFilter;
var DEFAULT_VALUE = '_key';
var DEFAULT_OPTIONS = [{
  text: _i18n.i18n.translate('visDefaultEditor.controls.orderAgg.alphabeticalLabel', {
    defaultMessage: 'Alphabetical'
  }),
  value: DEFAULT_VALUE
}];
var isCompatibleAgg = (0, _utils.isCompatibleAggregation)(termsAggFilter);

function OrderByParamEditor(_ref) {
  var agg = _ref.agg,
      value = _ref.value,
      showValidation = _ref.showValidation,
      setValue = _ref.setValue,
      setValidity = _ref.setValidity,
      setTouched = _ref.setTouched,
      metricAggs = _ref.metricAggs;

  var label = _i18n.i18n.translate('visDefaultEditor.controls.orderAgg.orderByLabel', {
    defaultMessage: 'Order by'
  });

  var isValid = !!value;
  (0, _utils.useValidation)(setValidity, isValid);
  (0, _react.useEffect)(function () {
    // setup the initial value of orderBy
    if (!value) {
      var respAgg = {
        id: DEFAULT_VALUE
      };

      if (metricAggs) {
        respAgg = metricAggs.filter(isCompatibleAgg)[0] || respAgg;
      }

      setValue(respAgg.id);
    }
  }, []);
  (0, _utils.useFallbackMetric)(setValue, termsAggFilter, metricAggs, value, DEFAULT_VALUE);
  var options = (0, _utils.useAvailableOptions)(termsAggFilter, metricAggs, DEFAULT_OPTIONS);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    fullWidth: true,
    isInvalid: showValidation && !isValid,
    compressed: true
  }, _react.default.createElement(_eui.EuiSelect, {
    options: options,
    value: value,
    onChange: function onChange(ev) {
      return setValue(ev.target.value);
    },
    fullWidth: true,
    compressed: true,
    isInvalid: showValidation && !isValid,
    onBlur: setTouched,
    "data-test-subj": "visEditorOrderBy".concat(agg.id)
  }));
}