"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationsPlot = AnnotationsPlot;

var _react = _interopRequireDefault(require("react"));

var _reactVis = require("react-vis");

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _plotUtils = require("./plotUtils");

var _formatters = require("../../../../utils/formatters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var style = {
  stroke: _eui_theme_light.default.euiColorSecondary,
  strokeDasharray: 'none'
};

function AnnotationsPlot(props) {
  var plotValues = props.plotValues,
      annotations = props.annotations;
  var tickValues = annotations.map(function (annotation) {
    return annotation.time;
  });
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_plotUtils.SharedPlot, {
    plotValues: plotValues
  }, _react.default.createElement(_reactVis.VerticalGridLines, {
    tickValues: tickValues,
    style: style
  })), annotations.map(function (annotation) {
    return _react.default.createElement("div", {
      key: annotation.id,
      style: {
        position: 'absolute',
        left: plotValues.x(annotation.time) - 8,
        top: -2
      }
    }, _react.default.createElement(_eui.EuiToolTip, {
      title: (0, _formatters.asAbsoluteDateTime)(annotation.time, 'seconds'),
      content: _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: true
      }, _react.default.createElement(_eui.EuiText, null, _i18n.i18n.translate('xpack.apm.version', {
        defaultMessage: 'Version'
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, annotation.text))
    }, _react.default.createElement(_eui.EuiIcon, {
      type: "dot",
      color: _eui_theme_light.default.euiColorSecondary
    })));
  }));
}