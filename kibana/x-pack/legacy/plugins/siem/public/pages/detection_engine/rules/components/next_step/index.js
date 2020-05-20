"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextStep = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var RuleI18n = _interopRequireWildcard(require("../../translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NextStep = _react.default.memo(function (_ref) {
  var onClick = _ref.onClick,
      isDisabled = _ref.isDisabled,
      _ref$dataTestSubj = _ref.dataTestSubj,
      dataTestSubj = _ref$dataTestSubj === void 0 ? 'nextStep-continue' : _ref$dataTestSubj;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "flexEnd",
    gutterSize: "xs",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    onClick: onClick,
    isDisabled: isDisabled,
    "data-test-subj": dataTestSubj
  }, RuleI18n.CONTINUE))));
});

exports.NextStep = NextStep;
NextStep.displayName = 'NextStep';