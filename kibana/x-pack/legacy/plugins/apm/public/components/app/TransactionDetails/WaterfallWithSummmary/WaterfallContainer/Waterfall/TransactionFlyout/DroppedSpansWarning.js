"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DroppedSpansWarning = DroppedSpansWarning;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _ElasticDocsLink = require("../../../../../../shared/Links/ElasticDocsLink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function DroppedSpansWarning(_ref) {
  var _transactionDoc$trans;

  var transactionDoc = _ref.transactionDoc;
  var dropped = (_transactionDoc$trans = transactionDoc.transaction.span_count) === null || _transactionDoc$trans === void 0 ? void 0 : _transactionDoc$trans.dropped;

  if (!dropped) {
    return null;
  }

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
    size: "s"
  }, _i18n.i18n.translate('xpack.apm.transactionDetails.transFlyout.callout.agentDroppedSpansMessage', {
    defaultMessage: 'The APM agent that reported this transaction dropped {dropped} spans or more based on its configuration.',
    values: {
      dropped: dropped
    }
  }), ' ', _react.default.createElement(_ElasticDocsLink.ElasticDocsLink, {
    section: "/apm/get-started",
    path: "/transaction-spans.html#dropped-spans",
    target: "_blank"
  }, _i18n.i18n.translate('xpack.apm.transactionDetails.transFlyout.callout.learnMoreAboutDroppedSpansLinkText', {
    defaultMessage: 'Learn more about dropped spans.'
  }))), _react.default.createElement(_eui.EuiHorizontalRule, null));
}