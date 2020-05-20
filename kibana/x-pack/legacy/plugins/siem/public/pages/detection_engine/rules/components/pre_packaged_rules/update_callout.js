"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdatePrePackagedRulesCallOut = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _kibana = require("../../../../../lib/kibana");

var i18n = _interopRequireWildcard(require("./translations"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UpdatePrePackagedRulesCallOutComponent = function UpdatePrePackagedRulesCallOutComponent(_ref) {
  var loading = _ref.loading,
      numberOfUpdatedRules = _ref.numberOfUpdatedRules,
      updateRules = _ref.updateRules;

  var _useKibana = (0, _kibana.useKibana)(),
      services = _useKibana.services;

  return _react.default.createElement(_eui.EuiCallOut, {
    title: i18n.UPDATE_PREPACKAGED_RULES_TITLE
  }, _react.default.createElement("p", null, i18n.UPDATE_PREPACKAGED_RULES_MSG(numberOfUpdatedRules), _react.default.createElement("br", null), _react.default.createElement(_eui.EuiLink, {
    href: "".concat(services.docLinks.ELASTIC_WEBSITE_URL, "guide/en/siem/guide/").concat(services.docLinks.DOC_LINK_VERSION, "/prebuilt-rules-changelog.html"),
    target: "_blank"
  }, i18n.RELEASE_NOTES_HELP)), _react.default.createElement(_eui.EuiButton, {
    onClick: updateRules,
    size: "s",
    isLoading: loading
  }, i18n.UPDATE_PREPACKAGED_RULES(numberOfUpdatedRules)));
};

var UpdatePrePackagedRulesCallOut = (0, _react.memo)(UpdatePrePackagedRulesCallOutComponent);
exports.UpdatePrePackagedRulesCallOut = UpdatePrePackagedRulesCallOut;