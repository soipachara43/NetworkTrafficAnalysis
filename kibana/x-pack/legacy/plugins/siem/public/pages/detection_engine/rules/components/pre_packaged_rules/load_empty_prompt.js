"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrePackagedRulesPrompt = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _redirect_to_detection_engine = require("../../../../../components/link_to/redirect_to_detection_engine");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyPrompt = (0, _styledComponents.default)(_eui.EuiEmptyPrompt).withConfig({
  displayName: "EmptyPrompt",
  componentId: "sc-158kmbb-0"
})(["align-self:center;"]);

var PrePackagedRulesPromptComponent = function PrePackagedRulesPromptComponent(_ref) {
  var createPrePackagedRules = _ref.createPrePackagedRules,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      _ref$userHasNoPermiss = _ref.userHasNoPermissions,
      userHasNoPermissions = _ref$userHasNoPermiss === void 0 ? true : _ref$userHasNoPermiss;
  var handlePreBuiltCreation = (0, _react.useCallback)(function () {
    createPrePackagedRules();
  }, [createPrePackagedRules]);
  return _react.default.createElement(EmptyPrompt, {
    iconType: "securityAnalyticsApp",
    title: _react.default.createElement("h2", null, i18n.PRE_BUILT_TITLE),
    body: _react.default.createElement("p", null, i18n.PRE_BUILT_MSG),
    actions: _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      fill: true,
      iconType: "indexOpen",
      isDisabled: userHasNoPermissions,
      isLoading: loading,
      onClick: handlePreBuiltCreation,
      "data-test-subj": "load-prebuilt-rules"
    }, i18n.PRE_BUILT_ACTION)), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      isDisabled: userHasNoPermissions,
      href: "#".concat(_redirect_to_detection_engine.DETECTION_ENGINE_PAGE_NAME, "/rules/create"),
      iconType: "plusInCircle"
    }, i18n.CREATE_RULE_ACTION)))
  });
};

var PrePackagedRulesPrompt = (0, _react.memo)(PrePackagedRulesPromptComponent);
exports.PrePackagedRulesPrompt = PrePackagedRulesPrompt;