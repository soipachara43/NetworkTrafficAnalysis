"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PingListExpandedRowComponent = void 0;

var _format = require("@elastic/eui/lib/services/format");

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _doc_link_body = require("./doc_link_body");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore formatNumber
var BodyDescription = function BodyDescription(_ref) {
  var body = _ref.body;
  var contentBytes = body.content_bytes || 0;
  var bodyBytes = body.bytes || 0;
  var truncatedText = contentBytes > 0 && contentBytes < bodyBytes ? _i18n.i18n.translate('xpack.uptime.pingList.expandedRow.truncated', {
    defaultMessage: 'Showing first {contentBytes} bytes.',
    values: {
      contentBytes: contentBytes
    }
  }) : null;
  var bodySizeText = bodyBytes > 0 ? _i18n.i18n.translate('xpack.uptime.pingList.expandedRow.bodySize', {
    defaultMessage: 'Body size is {bodyBytes}.',
    values: {
      bodyBytes: (0, _format.formatNumber)(bodyBytes, '0b')
    }
  }) : null;
  var combinedText = [truncatedText, bodySizeText].filter(function (s) {
    return s;
  }).join(' ');
  return _react.default.createElement(_eui.EuiText, null, combinedText);
};

var BodyExcerpt = function BodyExcerpt(_ref2) {
  var content = _ref2.content;
  return content ? _react.default.createElement(_eui.EuiCodeBlock, null, content) : null;
};

var PingListExpandedRowComponent = function PingListExpandedRowComponent(_ref3) {
  var _ping$http, _ping$http$response;

  var ping = _ref3.ping;
  var listItems = []; // Show the error block

  if (ping.error) {
    listItems.push({
      title: _i18n.i18n.translate('xpack.uptime.pingList.expandedRow.error', {
        defaultMessage: 'Error'
      }),
      description: _react.default.createElement(_eui.EuiText, null, ping.error.message)
    });
  } // Show the body, if present


  if ((_ping$http = ping.http) === null || _ping$http === void 0 ? void 0 : (_ping$http$response = _ping$http.response) === null || _ping$http$response === void 0 ? void 0 : _ping$http$response.body) {
    var body = ping.http.response.body;
    listItems.push({
      title: _i18n.i18n.translate('xpack.uptime.pingList.expandedRow.response_body', {
        defaultMessage: 'Response Body'
      }),
      description: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(BodyDescription, {
        body: body
      }), _react.default.createElement(_eui.EuiSpacer, {
        size: 's'
      }), body.content ? _react.default.createElement(BodyExcerpt, {
        content: body.content || ''
      }) : _react.default.createElement(_doc_link_body.DocLinkForBody, null))
    });
  }

  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCallOut, {
    color: (ping === null || ping === void 0 ? void 0 : ping.error) ? 'danger' : 'primary'
  }, _react.default.createElement(_eui.EuiDescriptionList, {
    listItems: listItems
  }))));
};

exports.PingListExpandedRowComponent = PingListExpandedRowComponent;