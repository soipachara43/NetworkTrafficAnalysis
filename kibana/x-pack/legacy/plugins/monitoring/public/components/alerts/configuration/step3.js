"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step3 = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Step3 = function Step3(props) {
  var errorUi = null;

  if (props.error) {
    errorUi = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.monitoring.alerts.configuration.step3.saveError', {
        defaultMessage: 'Unable to save'
      }),
      color: "danger",
      iconType: "alert"
    }, _react.default.createElement("p", null, props.error)), _react.default.createElement(_eui.EuiSpacer, null));
  }

  return _react.default.createElement(_react.Fragment, null, errorUi, _react.default.createElement(_eui.EuiButton, {
    isLoading: props.isSaving,
    isDisabled: props.isDisabled,
    onClick: props.save
  }, _i18n.i18n.translate('xpack.monitoring.alerts.configuration.save', {
    defaultMessage: 'Save'
  })));
};

exports.Step3 = Step3;