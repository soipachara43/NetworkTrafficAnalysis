"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorCountSummaryItemBadge = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _eui = require("@elastic/eui");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _variables = require("../../../../public/style/variables");

var _variables2 = require("../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Badge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "Badge",
  componentId: "sc-1evs9np-0"
})(["margin-top:", ";"], (0, _variables.px)(_variables2.units.eighth));

var ErrorCountSummaryItemBadge = function ErrorCountSummaryItemBadge(_ref) {
  var count = _ref.count;
  return _react.default.createElement(Badge, {
    color: _eui_theme_light.default.euiColorDanger
  }, _i18n.i18n.translate('xpack.apm.transactionDetails.errorCount', {
    defaultMessage: '{errorCount, number} {errorCount, plural, one {Error} other {Errors}}',
    values: {
      errorCount: count
    }
  }));
};

exports.ErrorCountSummaryItemBadge = ErrorCountSummaryItemBadge;