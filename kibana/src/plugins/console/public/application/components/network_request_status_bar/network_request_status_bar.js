"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetworkRequestStatusBar = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var mapStatusCodeToBadgeColor = function mapStatusCodeToBadgeColor(statusCode) {
  if (statusCode <= 199) {
    return 'default';
  }

  if (statusCode <= 299) {
    return 'secondary';
  }

  if (statusCode <= 399) {
    return 'primary';
  }

  if (statusCode <= 499) {
    return 'warning';
  }

  return 'danger';
};

var NetworkRequestStatusBar = function NetworkRequestStatusBar(_ref) {
  var requestInProgress = _ref.requestInProgress,
      requestResult = _ref.requestResult;
  var content = null;

  if (requestInProgress) {
    content = _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiBadge, {
      color: "hollow"
    }, _i18n.i18n.translate('console.requestInProgressBadgeText', {
      defaultMessage: 'Request in progress'
    })));
  } else if (requestResult) {
    var endpoint = requestResult.endpoint,
        method = requestResult.method,
        statusCode = requestResult.statusCode,
        statusText = requestResult.statusText,
        timeElapsedMs = requestResult.timeElapsedMs;
    content = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, "".concat(method, " ").concat(endpoint.startsWith('/') ? endpoint : '/' + endpoint))
    }, _react.default.createElement(_eui.EuiBadge, {
      color: mapStatusCodeToBadgeColor(statusCode)
    }, statusCode, "\xA0-\xA0", statusText))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _i18n.i18n.translate('console.requestTimeElapasedBadgeTooltipContent', {
        defaultMessage: 'Time Elapsed'
      }))
    }, _react.default.createElement(_eui.EuiText, {
      size: "s"
    }, _react.default.createElement(_eui.EuiBadge, {
      color: "default"
    }, timeElapsedMs, "\xA0", 'ms')))));
  }

  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    alignItems: "center",
    direction: "row",
    gutterSize: "s",
    responsive: false
  }, content);
};

exports.NetworkRequestStatusBar = NetworkRequestStatusBar;