"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyMessage = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyMessage = function EmptyMessage(_ref) {
  var _ref$heading = _ref.heading,
      heading = _ref$heading === void 0 ? _i18n.i18n.translate('xpack.apm.emptyMessage.noDataFoundLabel', {
    defaultMessage: 'No data found.'
  }) : _ref$heading,
      _ref$subheading = _ref.subheading,
      subheading = _ref$subheading === void 0 ? _i18n.i18n.translate('xpack.apm.emptyMessage.noDataFoundDescription', {
    defaultMessage: 'Try another time range or reset the search filter.'
  }) : _ref$subheading,
      _ref$hideSubheading = _ref.hideSubheading,
      hideSubheading = _ref$hideSubheading === void 0 ? false : _ref$hideSubheading;
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    titleSize: "s",
    title: _react.default.createElement("div", null, heading),
    body: !hideSubheading && subheading
  });
};

exports.EmptyMessage = EmptyMessage;