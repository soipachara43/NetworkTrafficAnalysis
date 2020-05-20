"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrecisionParamEditor = PrecisionParamEditor;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function PrecisionParamEditor(_ref) {
  var agg = _ref.agg,
      value = _ref.value,
      setValue = _ref.setValue;

  var _useKibana = (0, _public.useKibana)(),
      services = _useKibana.services;

  var label = _i18n.i18n.translate('visDefaultEditor.controls.precisionLabel', {
    defaultMessage: 'Precision'
  });

  if (agg.params.autoPrecision) {
    return null;
  }

  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    compressed: true
  }, _react.default.createElement(_eui.EuiRange, {
    min: 1,
    max: services.uiSettings.get('visualization:tileMap:maxPrecision'),
    value: value || '',
    onChange: function onChange(ev) {
      return setValue(Number(ev.currentTarget.value));
    },
    "data-test-subj": "visEditorMapPrecision".concat(agg.id),
    showValue: true,
    compressed: true
  }));
}