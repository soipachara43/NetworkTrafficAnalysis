"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocLinkForBody = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var bodyDocsLink = 'https://www.elastic.co/guide/en/beats/heartbeat/current/configuration-heartbeat-options.html#monitor-http-response';

var DocLinkForBody = function DocLinkForBody() {
  var docsLink = _react.default.createElement(_eui.EuiLink, {
    href: bodyDocsLink,
    target: "_blank"
  }, _i18n.i18n.translate('xpack.uptime.pingList.drawer.body.docsLink', {
    defaultMessage: 'docs',
    description: 'Docs link to set response body'
  }), "\xA0", _react.default.createElement(_eui.EuiIcon, {
    size: "s",
    type: "popout"
  }));

  return _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.uptime.pingList.expandedRow.response_body.notRecorded",
    defaultMessage: "Body not recorded. Read our {docsLink} for more information on recording response bodies.",
    values: {
      docsLink: docsLink
    }
  }));
};

exports.DocLinkForBody = DocLinkForBody;