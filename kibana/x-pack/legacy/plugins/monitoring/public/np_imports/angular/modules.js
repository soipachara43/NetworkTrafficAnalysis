"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localAppModule = exports.appModuleName = void 0;

var _angular = _interopRequireDefault(require("angular"));

var _angular2 = require("@kbn/i18n/angular");

var _public = require("../../../../../../../src/plugins/kibana_utils/public");

var _public2 = require("../../../../../../../src/plugins/kibana_legacy/public");

var _legacy_imports = require("../legacy_imports");

var _promises = require("./providers/promises");

var _private = require("./providers/private");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
// @ts-ignore
var appModuleName = 'monitoring';
exports.appModuleName = appModuleName;
var thirdPartyAngularDependencies = ['ngSanitize', 'ngRoute', 'react'];

var localAppModule = function localAppModule(core) {
  createLocalI18nModule();
  createLocalPrivateModule();
  createLocalPromiseModule();
  createLocalStorage();
  createLocalConfigModule(core);
  createLocalKbnUrlModule();
  createLocalStateModule();
  createLocalTopNavModule(_legacy_imports.npStart.plugins.navigation);
  createHrefModule(core);

  var appModule = _angular.default.module(appModuleName, [].concat(thirdPartyAngularDependencies, ['monitoring/Config', 'monitoring/I18n', 'monitoring/Private', 'monitoring/TopNav', 'monitoring/State', 'monitoring/Storage', 'monitoring/href', 'monitoring/services', 'monitoring/filters', 'monitoring/directives']));

  return appModule;
};

exports.localAppModule = localAppModule;

function createLocalStateModule() {
  _angular.default.module('monitoring/State', ['monitoring/Private', 'monitoring/Config', 'monitoring/KbnUrl', 'monitoring/Promise']).factory('AppState', function (Private) {
    return Private(_legacy_imports.AppStateProvider);
  }).service('globalState', function (Private) {
    return Private(_legacy_imports.GlobalStateProvider);
  });
}

function createLocalKbnUrlModule() {
  _angular.default.module('monitoring/KbnUrl', ['monitoring/Private', 'ngRoute']).service('kbnUrl', function (Private) {
    return Private(_legacy_imports.KbnUrlProvider);
  });
}

function createLocalConfigModule(core) {
  _angular.default.module('monitoring/Config', ['monitoring/Private']).provider('stateManagementConfig', _legacy_imports.StateManagementConfigProvider).provider('config', function () {
    return {
      $get: function $get() {
        return {
          get: core.uiSettings.get.bind(core.uiSettings)
        };
      }
    };
  });
}

function createLocalPromiseModule() {
  _angular.default.module('monitoring/Promise', []).service('Promise', _promises.PromiseServiceCreator);
}

function createLocalStorage() {
  _angular.default.module('monitoring/Storage', []).service('localStorage', function ($window) {
    return new _public.Storage($window.localStorage);
  }).service('sessionStorage', function ($window) {
    return new _public.Storage($window.sessionStorage);
  }).service('sessionTimeout', function () {});
}

function createLocalPrivateModule() {
  _angular.default.module('monitoring/Private', []).provider('Private', _private.PrivateProvider);
}

function createLocalTopNavModule(_ref) {
  var ui = _ref.ui;

  _angular.default.module('monitoring/TopNav', ['react']).directive('kbnTopNav', _public2.createTopNavDirective).directive('kbnTopNavHelper', (0, _public2.createTopNavHelper)(ui));
}

function createLocalI18nModule() {
  _angular.default.module('monitoring/I18n', []).provider('i18n', _angular2.I18nProvider).filter('i18n', _angular2.i18nFilter).directive('i18nId', _angular2.i18nDirective);
}

function createHrefModule(core) {
  var name = 'kbnHref';

  _angular.default.module('monitoring/href', []).directive(name, function () {
    return {
      restrict: 'A',
      link: {
        pre: function pre(_$scope, _$el, $attr) {
          $attr.$observe(name, function (val) {
            if (val) {
              $attr.$set('href', core.http.basePath.prepend(val));
            }
          });
        }
      }
    };
  });
}