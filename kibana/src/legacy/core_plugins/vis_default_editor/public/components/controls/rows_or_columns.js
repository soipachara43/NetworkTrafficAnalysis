"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RowsOrColumnsControl = RowsOrColumnsControl;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

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
var PARAMS = {
  NAME: 'row',
  ROWS: 'visEditorSplitBy__true',
  COLUMNS: 'visEditorSplitBy__false'
};

function RowsOrColumnsControl(_ref) {
  var editorStateParams = _ref.editorStateParams,
      setStateParamValue = _ref.setStateParamValue;

  if (editorStateParams.row === undefined) {
    setStateParamValue(PARAMS.NAME, true);
  }

  var idSelected = "visEditorSplitBy__".concat(editorStateParams.row);
  var options = [{
    id: PARAMS.ROWS,
    label: _i18n.i18n.translate('visDefaultEditor.controls.rowsLabel', {
      defaultMessage: 'Rows'
    })
  }, {
    id: PARAMS.COLUMNS,
    label: _i18n.i18n.translate('visDefaultEditor.controls.columnsLabel', {
      defaultMessage: 'Columns'
    })
  }];
  var onChange = (0, _react.useCallback)(function (optionId) {
    return setStateParamValue(PARAMS.NAME, optionId === PARAMS.ROWS);
  }, [setStateParamValue]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    compressed: true,
    fullWidth: true
  }, _react.default.createElement(_eui.EuiButtonGroup, {
    "data-test-subj": "visEditorSplitBy",
    legend: _i18n.i18n.translate('visDefaultEditor.controls.splitByLegend', {
      defaultMessage: 'Split chart by rows or columns.'
    }),
    options: options,
    isFullWidth: true,
    idSelected: idSelected,
    onChange: onChange
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }));
}