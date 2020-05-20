"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureAppAngularModule = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = require("lodash");

var Rx = _interopRequireWildcard(require("rxjs"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isSystemApiRequest = function isSystemApiRequest(request) {
  return Boolean(request && request.headers && !!request.headers['kbn-system-api']);
};

var configureAppAngularModule = function configureAppAngularModule(angularModule, newPlatform) {
  var legacyMetadata = newPlatform.injectedMetadata.getLegacyMetadata();
  (0, _lodash.forOwn)(newPlatform.injectedMetadata.getInjectedVars(), function (val, name) {
    if (name !== undefined) {
      // The legacy platform modifies some of these values, clone to an unfrozen object.
      angularModule.value(name, (0, _lodash.cloneDeep)(val));
    }
  });
  angularModule.value('kbnVersion', newPlatform.injectedMetadata.getKibanaVersion()).value('buildNum', legacyMetadata.buildNum).value('buildSha', legacyMetadata.buildSha).value('serverName', legacyMetadata.serverName).value('esUrl', getEsUrl(newPlatform)).value('uiCapabilities', newPlatform.application.capabilities).config(setupCompileProvider(newPlatform)).config(setupLocationProvider()).config($setupXsrfRequestInterceptor(newPlatform)).run(capture$httpLoadingCount(newPlatform)).run($setupUICapabilityRedirect(newPlatform));
};

exports.configureAppAngularModule = configureAppAngularModule;

var getEsUrl = function getEsUrl(newPlatform) {
  var a = document.createElement('a');
  a.href = newPlatform.http.basePath.prepend('/elasticsearch');
  var protocolPort = /https/.test(a.protocol) ? 443 : 80;
  var port = a.port || protocolPort;
  return {
    host: a.hostname,
    port: port,
    protocol: a.protocol,
    pathname: a.pathname
  };
};

var setupCompileProvider = function setupCompileProvider(newPlatform) {
  return function ($compileProvider) {
    if (!newPlatform.injectedMetadata.getLegacyMetadata().devMode) {
      $compileProvider.debugInfoEnabled(false);
    }
  };
};

var setupLocationProvider = function setupLocationProvider() {
  return function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false,
      rewriteLinks: false
    });
    $locationProvider.hashPrefix('');
  };
};

var $setupXsrfRequestInterceptor = function $setupXsrfRequestInterceptor(newPlatform) {
  var version = newPlatform.injectedMetadata.getLegacyMetadata().version; // Configure jQuery prefilter

  _jquery.default.ajaxPrefilter(function (_ref, originalOptions, jqXHR) {
    var _ref$kbnXsrfToken = _ref.kbnXsrfToken,
        kbnXsrfToken = _ref$kbnXsrfToken === void 0 ? true : _ref$kbnXsrfToken;

    if (kbnXsrfToken) {
      jqXHR.setRequestHeader('kbn-version', version);
    }
  });

  return function ($httpProvider) {
    // Configure $httpProvider interceptor
    $httpProvider.interceptors.push(function () {
      return {
        request: function request(opts) {
          var _ref2 = opts,
              _ref2$kbnXsrfToken = _ref2.kbnXsrfToken,
              kbnXsrfToken = _ref2$kbnXsrfToken === void 0 ? true : _ref2$kbnXsrfToken;

          if (kbnXsrfToken) {
            (0, _lodash.set)(opts, ['headers', 'kbn-version'], version);
          }

          return opts;
        }
      };
    });
  };
};
/**
 * Injected into angular module by ui/chrome angular integration
 * and adds a root-level watcher that will capture the count of
 * active $http requests on each digest loop and expose the count to
 * the core.loadingCount api
 * @param  {Angular.Scope} $rootScope
 * @param  {HttpService} $http
 * @return {undefined}
 */


var capture$httpLoadingCount = function capture$httpLoadingCount(newPlatform) {
  return function ($rootScope, $http) {
    newPlatform.http.addLoadingCountSource(new Rx.Observable(function (observer) {
      var unwatch = $rootScope.$watch(function () {
        var reqs = $http.pendingRequests || [];
        observer.next(reqs.filter(function (req) {
          return !isSystemApiRequest(req);
        }).length);
      });
      return unwatch;
    }));
  };
};
/**
 * integrates with angular to automatically redirect to home if required
 * capability is not met
 */


var $setupUICapabilityRedirect = function $setupUICapabilityRedirect(newPlatform) {
  return function ($rootScope, $injector) {
    var isKibanaAppRoute = window.location.pathname.endsWith('/app/kibana'); // this feature only works within kibana app for now after everything is
    // switched to the application service, this can be changed to handle all
    // apps.

    if (!isKibanaAppRoute) {
      return;
    }

    $rootScope.$on('$routeChangeStart', function (event) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          route = _ref3.$$route;

      if (!route || !route.requireUICapability) {
        return;
      }

      if (!(0, _lodash.get)(newPlatform.application.capabilities, route.requireUICapability)) {
        $injector.get('kbnUrl').change('/home');
        event.preventDefault();
      }
    });
  };
};