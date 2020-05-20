"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepPanel = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _header_section = require("../../../../../components/header_section");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MyPanel = (0, _styledComponents.default)(_eui.EuiPanel).withConfig({
  displayName: "MyPanel",
  componentId: "cwxpqk-0"
})(["position:relative;"]);

var StepPanelComponent = function StepPanelComponent(_ref) {
  var children = _ref.children,
      loading = _ref.loading,
      title = _ref.title;
  return _react.default.createElement(MyPanel, null, loading && _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent",
    position: "absolute"
  }), _react.default.createElement(_header_section.HeaderSection, {
    title: title
  }), children);
};

var StepPanel = (0, _react.memo)(StepPanelComponent);
exports.StepPanel = StepPanel;