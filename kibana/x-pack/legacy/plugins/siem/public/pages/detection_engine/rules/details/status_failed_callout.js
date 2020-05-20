"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RuleStatusFailedCallOut = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _formatted_date = require("../../../../components/formatted_date");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RuleStatusFailedCallOutComponent = function RuleStatusFailedCallOutComponent(_ref) {
  var date = _ref.date,
      message = _ref.message;
  return _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "xs",
      alignItems: "center",
      justifyContent: "flexStart"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, i18n.ERROR_CALLOUT_TITLE), _react.default.createElement(_eui.EuiFlexItem, {
      grow: true
    }, _react.default.createElement(_formatted_date.FormattedDate, {
      value: date,
      fieldName: "last_failure_at"
    }))),
    color: "danger",
    iconType: "alert"
  }, _react.default.createElement("p", null, message));
};

var RuleStatusFailedCallOut = (0, _react.memo)(RuleStatusFailedCallOutComponent);
exports.RuleStatusFailedCallOut = RuleStatusFailedCallOut;