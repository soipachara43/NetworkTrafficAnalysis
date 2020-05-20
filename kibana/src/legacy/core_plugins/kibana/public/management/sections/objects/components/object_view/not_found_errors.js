"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundErrors = void 0;

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
var NotFoundErrors = function NotFoundErrors(_ref) {
  var type = _ref.type;

  var getMessage = function getMessage() {
    switch (type) {
      case 'search':
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.management.objects.view.savedSearchDoesNotExistErrorMessage",
          defaultMessage: "The saved search associated with this object no longer exists."
        });

      case 'index-pattern':
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.management.objects.view.indexPatternDoesNotExistErrorMessage",
          defaultMessage: "The index pattern associated with this object no longer exists."
        });

      case 'index-pattern-field':
        return _react.default.createElement(_react2.FormattedMessage, {
          id: "kbn.management.objects.view.fieldDoesNotExistErrorMessage",
          defaultMessage: "A field associated with this object no longer exists in the index pattern."
        });

      default:
        return null;
    }
  };

  return _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "kbn.management.objects.view.savedObjectProblemErrorMessage",
      defaultMessage: "There is a problem with this saved object"
    }),
    iconType: "alert",
    color: "danger"
  }, _react.default.createElement("div", null, getMessage()), _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.management.objects.view.howToFixErrorDescription",
    defaultMessage: "If you know what this error means, go ahead and fix it \u2014 otherwise click the delete button above."
  })));
};

exports.NotFoundErrors = NotFoundErrors;