"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderSection = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _inspect = require("../inspect");

var _subtitle = require("../subtitle");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Header = _styledComponents.default.header.attrs(function () {
  return {
    className: 'siemHeaderSection'
  };
}).withConfig({
  displayName: "Header",
  componentId: "sc-1jb53l6-0"
})(["margin-bottom:", ";user-select:text;", ""], function (_ref) {
  var theme = _ref.theme;
  return theme.eui.euiSizeL;
}, function (_ref2) {
  var border = _ref2.border;
  return border && (0, _styledComponents.css)(["border-bottom:", ";padding-bottom:", ";"], function (_ref3) {
    var theme = _ref3.theme;
    return theme.eui.euiBorderThin;
  }, function (_ref4) {
    var theme = _ref4.theme;
    return theme.eui.paddingSizes.l;
  });
});

Header.displayName = 'Header';

var HeaderSectionComponent = function HeaderSectionComponent(_ref5) {
  var border = _ref5.border,
      children = _ref5.children,
      id = _ref5.id,
      split = _ref5.split,
      subtitle = _ref5.subtitle,
      title = _ref5.title,
      tooltip = _ref5.tooltip;
  return _react.default.createElement(Header, {
    border: border
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h2", {
    "data-test-subj": "header-section-title"
  }, title, tooltip && _react.default.createElement(_react.default.Fragment, null, ' ', _react.default.createElement(_eui.EuiIconTip, {
    color: "subdued",
    content: tooltip,
    size: "l",
    type: "iInCircle"
  })))), subtitle && _react.default.createElement(_subtitle.Subtitle, {
    "data-test-subj": "header-section-subtitle",
    items: subtitle
  })), id && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_inspect.InspectButton, {
    queryId: id,
    inspectIndex: 0,
    title: title
  })))), children && _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "header-section-supplements",
    grow: split ? true : false
  }, children)));
};

var HeaderSection = _react.default.memo(HeaderSectionComponent);

exports.HeaderSection = HeaderSection;