"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationTooltip = void 0;

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Header = _styledComponents.default.div.withConfig({
  displayName: "Header",
  componentId: "sc-1xemht4-0"
})(["font-weight:bold;padding-left:4px;"]);

var RecordSeverity = _styledComponents.default.div.withConfig({
  displayName: "RecordSeverity",
  componentId: "sc-1xemht4-1"
})(["font-weight:bold;border-left:4px solid ", ";padding-left:2px;"], function (props) {
  return props.color;
});

var TimeDiv = _styledComponents.default.div.withConfig({
  displayName: "TimeDiv",
  componentId: "sc-1xemht4-2"
})(["font-weight:500;border-bottom:1px solid gray;padding-bottom:2px;"]);

var AnnotationTooltip = function AnnotationTooltip(_ref) {
  var details = _ref.details;
  var data = JSON.parse(details);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(TimeDiv, null, (0, _moment.default)(data.time).format('lll')), _react.default.createElement(Header, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.charts.mlAnnotation.header",
    defaultMessage: "Score: {score}",
    values: {
      score: data.score.toFixed(2)
    }
  })), _react.default.createElement(RecordSeverity, {
    color: data.color
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.charts.mlAnnotation.severity",
    defaultMessage: "Severity: {severity}",
    values: {
      severity: capitalizeFirstLetter(data.severity)
    }
  })));
};

exports.AnnotationTooltip = AnnotationTooltip;