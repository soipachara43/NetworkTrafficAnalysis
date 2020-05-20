"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StatusMessage = void 0;

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
var StatusMessage = function StatusMessage(_ref) {
  var _ref$matchedIndices = _ref.matchedIndices,
      _ref$matchedIndices$a = _ref$matchedIndices.allIndices,
      allIndices = _ref$matchedIndices$a === void 0 ? [] : _ref$matchedIndices$a,
      _ref$matchedIndices$e = _ref$matchedIndices.exactMatchedIndices,
      exactMatchedIndices = _ref$matchedIndices$e === void 0 ? [] : _ref$matchedIndices$e,
      _ref$matchedIndices$p = _ref$matchedIndices.partialMatchedIndices,
      partialMatchedIndices = _ref$matchedIndices$p === void 0 ? [] : _ref$matchedIndices$p,
      isIncludingSystemIndices = _ref.isIncludingSystemIndices,
      query = _ref.query,
      showSystemIndices = _ref.showSystemIndices;
  var statusIcon;
  var statusMessage;
  var statusColor;
  var allIndicesLength = allIndices.length;

  if (query.length === 0) {
    statusIcon = null;
    statusColor = 'default';

    if (allIndicesLength > 1) {
      statusMessage = _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.createIndexPattern.step.status.matchAnyLabel.matchAnyDetail",
        defaultMessage: "Your index pattern can match any of your {strongIndices}, below.",
        values: {
          strongIndices: _react.default.createElement("strong", null, allIndicesLength, " indices")
        }
      }));
    } else if (!isIncludingSystemIndices && showSystemIndices) {
      statusMessage = _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.createIndexPattern.step.status.noSystemIndicesWithPromptLabel",
        defaultMessage: "No Elasticsearch indices match your pattern. To view the matching system indices, toggle the switch in the upper right."
      }));
    } else {
      statusMessage = _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.createIndexPattern.step.status.noSystemIndicesLabel",
        defaultMessage: "No Elasticsearch indices match your pattern."
      }));
    }
  } else if (exactMatchedIndices.length) {
    statusIcon = 'check';
    statusColor = 'secondary';
    statusMessage = _react.default.createElement("span", null, "\xA0", _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.step.status.successLabel.successDetail",
      defaultMessage: "{strongSuccess} Your index pattern matches {strongIndices}.",
      values: {
        strongSuccess: _react.default.createElement("strong", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.management.createIndexPattern.step.status.successLabel.strongSuccessLabel",
          defaultMessage: "Success!"
        })),
        strongIndices: _react.default.createElement("strong", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.management.createIndexPattern.step.status.successLabel.strongIndicesLabel",
          defaultMessage: "{indicesLength, plural, one {# index} other {# indices}}",
          values: {
            indicesLength: exactMatchedIndices.length
          }
        }))
      }
    }));
  } else if (partialMatchedIndices.length) {
    statusIcon = null;
    statusColor = 'default';
    statusMessage = _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.step.status.partialMatchLabel.partialMatchDetail",
      defaultMessage: "Your index pattern doesn't match any indices, but you have {strongIndices} which {matchedIndicesLength, plural, one {looks} other {look}} similar.",
      values: {
        matchedIndicesLength: partialMatchedIndices.length,
        strongIndices: _react.default.createElement("strong", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.management.createIndexPattern.step.status.partialMatchLabel.strongIndicesLabel",
          defaultMessage: "{matchedIndicesLength, plural, one {# index} other {# indices}}",
          values: {
            matchedIndicesLength: partialMatchedIndices.length
          }
        }))
      }
    }));
  } else if (allIndicesLength) {
    statusIcon = null;
    statusColor = 'default';
    statusMessage = _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.createIndexPattern.step.status.notMatchLabel.notMatchDetail",
      defaultMessage: "The index pattern you've entered doesn't match any indices. You can match {indicesLength, plural, one {your} other {any of your}} {strongIndices}, below.",
      values: {
        strongIndices: _react.default.createElement("strong", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.management.createIndexPattern.step.status.notMatchLabel.allIndicesLabel",
          defaultMessage: "{indicesLength, plural, one {# index} other {# indices}}",
          values: {
            indicesLength: allIndicesLength
          }
        })),
        indicesLength: allIndicesLength
      }
    }));
  }

  return _react.default.createElement(_eui.EuiText, {
    size: "s",
    "data-test-subj": "createIndexPatternStatusMessage"
  }, _react.default.createElement(_eui.EuiTextColor, {
    color: statusColor
  }, statusIcon ? _react.default.createElement(_eui.EuiIcon, {
    type: statusIcon
  }) : null, statusMessage));
};

exports.StatusMessage = StatusMessage;