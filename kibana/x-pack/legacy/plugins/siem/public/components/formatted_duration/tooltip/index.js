"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormattedDurationTooltip = exports.FormattedDurationTooltipContent = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _helpers = require("../helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var P = _styledComponents.default.p.withConfig({
  displayName: "P",
  componentId: "sc-15dlwg0-0"
})(["margin-bottom:5px;"]);

P.displayName = 'P';

var FormattedDurationTooltipContent = _react.default.memo(function (_ref) {
  var maybeDurationNanoseconds = _ref.maybeDurationNanoseconds,
      tooltipTitle = _ref.tooltipTitle;
  return _react.default.createElement(_react.default.Fragment, null, tooltipTitle != null ? _react.default.createElement(P, {
    "data-test-subj": "title"
  }, tooltipTitle) : null, _react.default.createElement(P, {
    "data-test-subj": "humanized"
  }, (0, _helpers.getHumanizedDuration)(maybeDurationNanoseconds)), _react.default.createElement(P, {
    "data-test-subj": "raw-value"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.siem.formattedDuration.tooltipLabel",
    defaultMessage: "raw"
  }), ': ', maybeDurationNanoseconds));
});

exports.FormattedDurationTooltipContent = FormattedDurationTooltipContent;
FormattedDurationTooltipContent.displayName = 'FormattedDurationTooltipContent';

var FormattedDurationTooltip = _react.default.memo(function (_ref2) {
  var children = _ref2.children,
      maybeDurationNanoseconds = _ref2.maybeDurationNanoseconds,
      tooltipTitle = _ref2.tooltipTitle;
  return _react.default.createElement(_eui.EuiToolTip, {
    "data-test-subj": "formatted-duration-tooltip",
    content: _react.default.createElement(FormattedDurationTooltipContent, {
      maybeDurationNanoseconds: maybeDurationNanoseconds,
      tooltipTitle: tooltipTitle
    })
  }, _react.default.createElement(_react.default.Fragment, null, children));
});

exports.FormattedDurationTooltip = FormattedDurationTooltip;
FormattedDurationTooltip.displayName = 'FormattedDurationTooltip';