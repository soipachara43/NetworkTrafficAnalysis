"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorCount = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ErrorCount = function ErrorCount(_ref) {
  var count = _ref.count;
  return _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement("h4", null, _react.default.createElement(_eui.EuiTextColor, {
    color: "danger",
    onClick: function onClick(e) {
      e.stopPropagation();
    }
  }, _i18n.i18n.translate('xpack.apm.transactionDetails.errorCount', {
    defaultMessage: '{errorCount, number} {errorCount, plural, one {Error} other {Errors}}',
    values: {
      errorCount: count
    }
  }))));
};

exports.ErrorCount = ErrorCount;