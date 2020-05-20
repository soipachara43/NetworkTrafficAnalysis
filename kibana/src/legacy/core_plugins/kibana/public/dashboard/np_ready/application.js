"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = void 0;

var _eui = require("@elastic/eui");

var _angular = _interopRequireDefault(require("angular"));

var _angular2 = require("@kbn/i18n/angular");

var _legacy_imports = require("../legacy_imports");

var _legacy_app = require("./legacy_app");

var _public = require("../../../../../../plugins/kibana_legacy/public");

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
// @ts-ignore
var angularModuleInstance = null;

var renderApp = function renderApp(element, appBasePath, deps) {
  if (!angularModuleInstance) {
    angularModuleInstance = createLocalAngularModule(deps.core, deps.navigation); // global routing stuff

    (0, _legacy_imports.configureAppAngularModule)(angularModuleInstance, {
      core: deps.core,
      env: deps.pluginInitializerContext.env
    }, true);
    (0, _legacy_app.initDashboardApp)(angularModuleInstance, deps);
  }

  var $injector = mountDashboardApp(appBasePath, element);
  return function () {
    $injector.get('$rootScope').$destroy();
  };
};

exports.renderApp = renderApp;

var mainTemplate = function mainTemplate(basePath) {
  return "<div ng-view class=\"kbnLocalApplicationWrapper\">\n  <base href=\"".concat(basePath, "\" />\n</div>");
};

var moduleName = 'app/dashboard';
var thirdPartyAngularDependencies = ['ngSanitize', 'ngRoute', 'react'];

function mountDashboardApp(appBasePath, element) {
  var mountpoint = document.createElement('div');
  mountpoint.setAttribute('class', 'kbnLocalApplicationWrapper'); // eslint-disable-next-line

  mountpoint.innerHTML = mainTemplate(appBasePath); // bootstrap angular into detached element and attach it later to
  // make angular-within-angular possible

  var $injector = _angular.default.bootstrap(mountpoint, [moduleName]); // initialize global state handler


  element.appendChild(mountpoint);
  return $injector;
}

function createLocalAngularModule(core, navigation) {
  createLocalI18nModule();
  createLocalConfigModule(core);
  createLocalTopNavModule(navigation);
  createLocalIconModule();

  var dashboardAngularModule = _angular.default.module(moduleName, [].concat(thirdPartyAngularDependencies, ['app/dashboard/Config', 'app/dashboard/I18n', 'app/dashboard/TopNav', 'app/dashboard/icon']));

  return dashboardAngularModule;
}

function createLocalIconModule() {
  _angular.default.module('app/dashboard/icon', ['react']).directive('icon', function (reactDirective) {
    return reactDirective(_eui.EuiIcon);
  });
}

function createLocalConfigModule(core) {
  _angular.default.module('app/dashboard/Config', []).provider('config', function () {
    return {
      $get: function $get() {
        return {
          get: core.uiSettings.get.bind(core.uiSettings)
        };
      }
    };
  });
}

function createLocalTopNavModule(navigation) {
  _angular.default.module('app/dashboard/TopNav', ['react']).directive('kbnTopNav', _public.createTopNavDirective).directive('kbnTopNavHelper', (0, _public.createTopNavHelper)(navigation.ui));
}

function createLocalI18nModule() {
  _angular.default.module('app/dashboard/I18n', []).provider('i18n', _angular2.I18nProvider).filter('i18n', _angular2.i18nFilter).directive('i18nId', _angular2.i18nDirective);
}