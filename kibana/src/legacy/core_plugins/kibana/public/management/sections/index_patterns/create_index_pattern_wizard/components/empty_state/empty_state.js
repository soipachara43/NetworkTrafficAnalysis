"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyState = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

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
var EmptyState = function EmptyState(_ref) {
  var onRefresh = _ref.onRefresh;
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiCallOut, {
    color: "warning",
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.emptyStateHeader",
      defaultMessage: "Couldn't find any Elasticsearch data"
    })
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPattern.emptyStateLabel.emptyStateDetail",
    defaultMessage: "{needToIndex} {learnHowLink} or {getStartedLink}",
    values: {
      needToIndex: _react.default.createElement(_eui.EuiTextColor, {
        color: "subdued"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.createIndexPattern.emptyStateLabel.needToIndexLabel",
        defaultMessage: "You'll need to index some data into Elasticsearch before you can create an index pattern."
      })),
      learnHowLink: _react.default.createElement(_eui.EuiLink, {
        href: "#/home/tutorial_directory"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.createIndexPattern.emptyStateLabel.learnHowLink",
        defaultMessage: "Learn how"
      })),
      getStartedLink: _react.default.createElement(_eui.EuiLink, {
        href: "#/home/tutorial_directory/sampleData"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.createIndexPattern.emptyStateLabel.getStartedLink",
        defaultMessage: "get started with some sample data sets."
      }))
    }
  })), _react.default.createElement(_eui.EuiButton, {
    iconType: "refresh",
    onClick: onRefresh,
    "data-test-subj": "refreshIndicesButton",
    color: "warning"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.createIndexPattern.emptyState.checkDataButton",
    defaultMessage: "Check for new data"
  }))));
};

exports.EmptyState = EmptyState;