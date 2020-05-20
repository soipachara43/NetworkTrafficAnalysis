"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExceptionStacktrace = ExceptionStacktrace;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _Stacktrace = require("../../../shared/Stacktrace");

var _CauseStacktrace = require("../../../shared/Stacktrace/CauseStacktrace");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function ExceptionStacktrace(_ref) {
  var _exceptions$;

  var codeLanguage = _ref.codeLanguage,
      exceptions = _ref.exceptions;
  var title = (_exceptions$ = exceptions[0]) === null || _exceptions$ === void 0 ? void 0 : _exceptions$.message;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h4", null, title)), exceptions.map(function (ex, index) {
    return index === 0 ? _react.default.createElement(_Stacktrace.Stacktrace, {
      key: index,
      stackframes: ex.stacktrace,
      codeLanguage: codeLanguage
    }) : _react.default.createElement(_CauseStacktrace.CauseStacktrace, {
      codeLanguage: codeLanguage,
      key: index,
      id: index.toString(),
      message: ex.message,
      stackframes: ex.stacktrace
    });
  }));
}