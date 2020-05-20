"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = renderApp;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _contexts = require("./contexts");

var _containers = require("./containers");

var _services = require("../services");

var localStorageObjectClient = _interopRequireWildcard(require("../lib/local_storage_object_client"));

var _tracker = require("../services/tracker");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
function renderApp(_ref) {
  var I18nContext = _ref.I18nContext,
      notifications = _ref.notifications,
      docLinkVersion = _ref.docLinkVersion,
      elasticsearchUrl = _ref.elasticsearchUrl,
      usageCollection = _ref.usageCollection,
      element = _ref.element;
  var trackUiMetric = (0, _tracker.createUsageTracker)(usageCollection);
  trackUiMetric.load('opened_app');
  var storage = (0, _services.createStorage)({
    engine: window.localStorage,
    prefix: 'sense:'
  });
  var history = (0, _services.createHistory)({
    storage: storage
  });
  var settings = (0, _services.createSettings)({
    storage: storage
  });
  var objectStorageClient = localStorageObjectClient.create(storage);
  (0, _reactDom.render)(_react.default.createElement(I18nContext, null, _react.default.createElement(_contexts.ServicesContextProvider, {
    value: {
      elasticsearchUrl: elasticsearchUrl,
      docLinkVersion: docLinkVersion,
      services: {
        storage: storage,
        history: history,
        settings: settings,
        notifications: notifications,
        trackUiMetric: trackUiMetric,
        objectStorageClient: objectStorageClient
      }
    }
  }, _react.default.createElement(_contexts.RequestContextProvider, null, _react.default.createElement(_contexts.EditorContextProvider, {
    settings: settings.toJSON()
  }, _react.default.createElement(_containers.Main, null))))), element);
  return function () {
    return (0, _reactDom.unmountComponentAtNode)(element);
  };
}