"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Description = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Description = (0, _react.memo)(function (_ref) {
  var children = _ref.children,
      validation = _ref.validation;

  var title = _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.bucketSpan.title', {
    defaultMessage: 'Bucket span'
  });

  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    title: _react.default.createElement("h3", null, title),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.bucketSpan.description",
      defaultMessage: "Set the interval for time series analysis, typically between 15m to 1h."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: title,
    error: validation.message,
    isInvalid: validation.valid === false
  }, _react.default.createElement(_react.default.Fragment, null, children)));
});
exports.Description = Description;