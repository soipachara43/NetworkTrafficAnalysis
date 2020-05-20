"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockDataServices = mockDataServices;

var _mocks = require("../../../../../../../src/core/public/mocks");

var _mocks2 = require("../../../../public/mocks");

var _services = require("../../../../public/services");

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
// eslint-disable-next-line @kbn/eslint/no-restricted-paths

/**
 * Testing helper which calls all of the service setters used in the
 * data plugin. Services are added using their provided mocks.
 *
 * @internal
 */
function mockDataServices() {
  var core = _mocks.coreMock.createStart();

  var data = _mocks2.dataPluginMock.createStartContract();

  (0, _services.setFieldFormats)(data.fieldFormats);
  (0, _services.setIndexPatterns)(data.indexPatterns);
  (0, _services.setInjectedMetadata)(core.injectedMetadata);
  (0, _services.setNotifications)(core.notifications);
  (0, _services.setOverlays)(core.overlays);
  (0, _services.setQueryService)(data.query);
  (0, _services.setSearchService)(data.search);
  (0, _services.setUiSettings)(core.uiSettings);
}