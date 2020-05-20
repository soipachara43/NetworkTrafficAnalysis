"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigureCaseButton = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _link_to = require("../../../../components/link_to");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ConfigureCaseButtonComponent = function ConfigureCaseButtonComponent(_ref) {
  var isDisabled = _ref.isDisabled,
      label = _ref.label,
      msgTooltip = _ref.msgTooltip,
      showToolTip = _ref.showToolTip,
      titleTooltip = _ref.titleTooltip,
      urlSearch = _ref.urlSearch;
  var configureCaseButton = (0, _react.useMemo)(function () {
    return _react.default.createElement(_eui.EuiButton, {
      href: (0, _link_to.getConfigureCasesUrl)(urlSearch),
      iconType: "controlsHorizontal",
      isDisabled: isDisabled,
      "aria-label": label,
      "data-test-subj": "configure-case-button"
    }, label);
  }, [label, isDisabled, urlSearch]);
  return showToolTip ? _react.default.createElement(_eui.EuiToolTip, {
    position: "top",
    title: titleTooltip,
    content: _react.default.createElement("p", null, msgTooltip),
    "data-test-subj": "configure-case-tooltip"
  }, configureCaseButton) : _react.default.createElement(_react.default.Fragment, null, configureCaseButton);
};

var ConfigureCaseButton = (0, _react.memo)(ConfigureCaseButtonComponent);
exports.ConfigureCaseButton = ConfigureCaseButton;