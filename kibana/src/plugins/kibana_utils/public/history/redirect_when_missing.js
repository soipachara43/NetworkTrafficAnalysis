"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redirectWhenMissing = redirectWhenMissing;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _public = require("../../../kibana_react/public");

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

/**
 * Creates an error handler that will redirect to a url when a SavedObjectNotFound
 * error is thrown
 */
function redirectWhenMissing(_ref) {
  var history = _ref.history,
      mapping = _ref.mapping,
      toastNotifications = _ref.toastNotifications,
      onBeforeRedirect = _ref.onBeforeRedirect;
  var localMappingObject;

  if (typeof mapping === 'string') {
    localMappingObject = {
      '*': mapping
    };
  } else {
    localMappingObject = mapping;
  }

  return function (error) {
    // if this error is not "404", rethrow
    // we can't check "error instanceof SavedObjectNotFound" since this class can live in a separate bundle
    // and the error will be an instance of other class with the same interface (actually the copy of SavedObjectNotFound class)
    if (!error.savedObjectType) {
      throw error;
    }

    var url = localMappingObject[error.savedObjectType] || localMappingObject['*'] || '/';
    url += (url.indexOf('?') >= 0 ? '&' : '?') + "notFound=".concat(error.savedObjectType);
    toastNotifications.addWarning({
      title: _i18n.i18n.translate('kibana_utils.history.savedObjectIsMissingNotificationMessage', {
        defaultMessage: 'Saved object is missing'
      }),
      text: (0, _public.toMountPoint)(_react.default.createElement(_public.MarkdownSimple, null, error.message))
    });

    if (onBeforeRedirect) {
      onBeforeRedirect(error);
    }

    history.replace(url);
  };
}