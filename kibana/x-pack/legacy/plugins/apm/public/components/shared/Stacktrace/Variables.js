"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Variables = void 0;

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _variables = require("../../../style/variables");

var _KeyValueTable = require("../KeyValueTable");

var _flattenObject = require("../../../utils/flattenObject");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var VariablesContainer = _styledComponents.default.div.withConfig({
  displayName: "VariablesContainer",
  componentId: "uun7h7-0"
})(["background:", ";border-radius:0 0 ", " ", ";padding:", " ", ";"], _eui_theme_light.default.euiColorEmptyShade, _variables.borderRadius, _variables.borderRadius, (0, _variables.px)(_variables.units.half), (0, _variables.px)(_variables.unit));

var Variables = function Variables(_ref) {
  var vars = _ref.vars;

  if (!vars) {
    return null;
  }

  var flattenedVariables = (0, _flattenObject.flattenObject)(vars);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(VariablesContainer, null, _react.default.createElement(_eui.EuiAccordion, {
    id: "local-variables",
    className: "euiAccordion",
    buttonContent: _i18n.i18n.translate('xpack.apm.stacktraceTab.localVariablesToogleButtonLabel', {
      defaultMessage: 'Local variables'
    })
  }, _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_KeyValueTable.KeyValueTable, {
    keyValuePairs: flattenedVariables
  })))));
};

exports.Variables = Variables;