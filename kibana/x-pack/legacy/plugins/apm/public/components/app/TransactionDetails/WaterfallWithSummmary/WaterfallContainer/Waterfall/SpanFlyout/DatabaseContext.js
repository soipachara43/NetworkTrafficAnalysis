"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatabaseContext = DatabaseContext;

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _i18n = require("@kbn/i18n");

var _polished = require("polished");

var _react = _interopRequireWildcard(require("react"));

var _sql = _interopRequireDefault(require("react-syntax-highlighter/dist/languages/sql"));

var _light = _interopRequireWildcard(require("react-syntax-highlighter/dist/light"));

var _styles = require("react-syntax-highlighter/dist/styles");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../../../../style/variables");

var _TruncateHeightSection = require("./TruncateHeightSection");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
(0, _light.registerLanguage)('sql', _sql.default);

var DatabaseStatement = _styledComponents.default.div.withConfig({
  displayName: "DatabaseStatement",
  componentId: "sc-5mz4ii-0"
})(["padding:", " ", ";background:", ";border-radius:", ";border:1px solid ", ";font-family:", ";font-size:", ";"], (0, _variables.px)(_variables.units.half), (0, _variables.px)(_variables.unit), (0, _polished.tint)(0.1, _eui_theme_light.default.euiColorWarning), _variables.borderRadius, _eui_theme_light.default.euiColorLightShade, _variables.fontFamilyCode, _variables.fontSize);

var dbSyntaxLineHeight = _variables.unit * 1.5;

function DatabaseContext(_ref) {
  var dbContext = _ref.dbContext;

  if (!dbContext || !dbContext.statement) {
    return null;
  }

  if (dbContext.type !== 'sql') {
    return _react.default.createElement(DatabaseStatement, null, dbContext.statement);
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.apm.transactionDetails.spanFlyout.databaseStatementTitle', {
    defaultMessage: 'Database statement'
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(DatabaseStatement, null, _react.default.createElement(_TruncateHeightSection.TruncateHeightSection, {
    previewHeight: 10 * dbSyntaxLineHeight
  }, _react.default.createElement(_light.default, {
    language: 'sql',
    style: _styles.xcode,
    customStyle: {
      color: null,
      background: null,
      padding: null,
      lineHeight: (0, _variables.px)(dbSyntaxLineHeight),
      whiteSpace: 'pre-wrap',
      overflowX: 'scroll'
    }
  }, dbContext.statement))), _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }));
}