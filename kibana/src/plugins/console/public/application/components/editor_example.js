"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorExample = EditorExample;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _help_example = _interopRequireDefault(require("raw-loader!../constants/help_example.txt"));

var _react = _interopRequireWildcard(require("react"));

var _legacy_core_editor = require("../models/legacy_core_editor");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
// @ts-ignore
function EditorExample(props) {
  var elemId = "help-example-".concat(props.panel);
  var inputId = "help-example-".concat(props.panel, "-input");
  (0, _react.useEffect)(function () {
    var el = document.getElementById(elemId);
    el.textContent = _help_example.default.trim();
    var editor = (0, _legacy_core_editor.createReadOnlyAceEditor)(el);
    var textarea = el.querySelector('textarea');
    textarea.setAttribute('id', inputId);
    textarea.setAttribute('readonly', 'true');
    return function () {
      editor.destroy();
    };
  }, [elemId, inputId]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("label", {
    htmlFor: inputId
  }, _i18n.i18n.translate('console.exampleOutputTextarea', {
    defaultMessage: 'Dev Tools Console editor example'
  }))), _react.default.createElement("div", {
    id: elemId,
    className: "conHelp__example"
  }));
}