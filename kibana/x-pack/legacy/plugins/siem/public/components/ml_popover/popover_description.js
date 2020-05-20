"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoverDescription = exports.PopoverDescriptionComponent = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _kibana = require("../../lib/kibana");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PopoverDescriptionComponent = function PopoverDescriptionComponent() {
  return _react2.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.siem.components.mlPopup.anomalyDetectionDescription",
    defaultMessage: "Run any of the Machine Learning jobs below to prepare for creating signal detection rules that produce signals for detected anomalies, and to view anomalous events throughout the SIEM application. We\u2019ve provided a collection of common detection jobs to get you started. If you wish to add your own custom ML jobs, create and add them to the \u201CSIEM\u201D group from the {machineLearning} application.",
    values: {
      machineLearning: _react2.default.createElement(_eui.EuiLink, {
        href: "".concat((0, _kibana.useBasePath)(), "/app/ml"),
        target: "_blank"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.siem.components.mlPopup.machineLearningLink",
        defaultMessage: "Machine Learning"
      }))
    }
  }));
};

exports.PopoverDescriptionComponent = PopoverDescriptionComponent;
PopoverDescriptionComponent.displayName = 'PopoverDescriptionComponent';

var PopoverDescription = _react2.default.memo(PopoverDescriptionComponent);

exports.PopoverDescription = PopoverDescription;
PopoverDescription.displayName = 'PopoverDescription';