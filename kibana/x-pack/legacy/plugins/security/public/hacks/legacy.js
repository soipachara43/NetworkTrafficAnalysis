"use strict";

var _modules = require("ui/modules");

var _new_platform = require("ui/new_platform");

var _routes = _interopRequireDefault(require("ui/routes"));

var _public = require("../../../../../../src/plugins/kibana_legacy/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var securityPluginSetup = _new_platform.npSetup.plugins.security;

if (securityPluginSetup) {
  _routes.default.when('/account', {
    template: '<div />',
    controller: function controller() {
      return _new_platform.npStart.core.application.navigateToApp('security_account');
    }
  });

  var getNextParameter = function getNextParameter() {
    var _window = window,
        location = _window.location;
    var next = encodeURIComponent("".concat(location.pathname).concat(location.search).concat(location.hash));
    return "&next=".concat(next);
  };

  var getProviderParameter = function getProviderParameter(tenant) {
    var key = "".concat(tenant, "/session_provider");
    var providerName = sessionStorage.getItem(key);
    return providerName ? "&provider=".concat(encodeURIComponent(providerName)) : '';
  };

  var _module = _modules.uiModules.get('security', []);

  _module.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $window, Promise) {
      var isAnonymous = _new_platform.npSetup.core.http.anonymousPaths.isAnonymous(window.location.pathname);

      function interceptorFactory(responseHandler) {
        return function interceptor(response) {
          if (!isAnonymous && !(0, _public.isSystemApiRequest)(response.config)) {
            securityPluginSetup.sessionTimeout.extend(response.config.url);
          }

          if (response.status !== 401 || isAnonymous) {
            return responseHandler(response);
          }

          var _securityPluginSetup$ = securityPluginSetup.__legacyCompat,
              logoutUrl = _securityPluginSetup$.logoutUrl,
              tenant = _securityPluginSetup$.tenant;
          var next = getNextParameter();
          var provider = getProviderParameter(tenant);
          $window.location.href = "".concat(logoutUrl, "?msg=SESSION_EXPIRED").concat(next).concat(provider);
          return Promise.halt();
        };
      }

      return {
        response: interceptorFactory(function (response) {
          return response;
        }),
        responseError: interceptorFactory($q.reject)
      };
    });
  });
}