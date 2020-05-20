"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyncBadge = SyncBadge;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _variables = require("../../../../../../style/variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SpanBadge = (0, _styledComponents.default)(_eui.EuiBadge).withConfig({
  displayName: "SpanBadge",
  componentId: "sc-1r6psyi-0"
})(["display:inline-block;margin-right:", ";"], (0, _variables.px)(_variables.units.quarter));

function SyncBadge(_ref) {
  var sync = _ref.sync;

  switch (sync) {
    case true:
      return _react.default.createElement(SpanBadge, null, _i18n.i18n.translate('xpack.apm.transactionDetails.syncBadgeBlocking', {
        defaultMessage: 'blocking'
      }));

    case false:
      return _react.default.createElement(SpanBadge, null, _i18n.i18n.translate('xpack.apm.transactionDetails.syncBadgeAsync', {
        defaultMessage: 'async'
      }));

    default:
      return null;
  }
}