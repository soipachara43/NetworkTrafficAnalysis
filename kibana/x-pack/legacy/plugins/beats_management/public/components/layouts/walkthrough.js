"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WalkthroughLayout = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WalkthroughLayout = function WalkthroughLayout(_ref) {
  var walkthroughSteps = _ref.walkthroughSteps,
      title = _ref.title,
      activePath = _ref.activePath,
      goTo = _ref.goTo,
      children = _ref.children;
  var indexOfCurrent = walkthroughSteps.findIndex(function (step) {
    return activePath === step.id;
  });
  return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", {
    style: {
      textAlign: 'center'
    }
  }, title)), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement(_eui.EuiStepsHorizontal, {
    steps: walkthroughSteps.map(function (step, i) {
      return {
        title: step.name,
        isComplete: i <= indexOfCurrent,
        onClick: function onClick() {
          return goTo(step.id);
        }
      };
    })
  }), _react.default.createElement("br", null), _react.default.createElement("br", null), _react.default.createElement(_eui.EuiPageContentBody, null, children));
};

exports.WalkthroughLayout = WalkthroughLayout;